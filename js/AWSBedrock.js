// AWSBedrock.js
// Note generation via a user-configured AWS Bedrock proxy (Lambda Function URL / API Gateway) in eu-north-1.
//
// sessionStorage keys used:
//   bedrock_backend_url
//   bedrock_backend_secret
//   bedrock_model  (haiku-4-5 | sonnet-4 | sonnet-4-5 | opus-4-5)

// Only allow known model keys to be sent to the backend.
// (Prevents weird/stale values from sessionStorage from causing confusing backend errors.)
const ALLOWED_BEDROCK_MODEL_KEYS = new Set([
  "haiku-4-5",
  "sonnet-4",
  "sonnet-4-5",
  "opus-4-5",
]);

// On-Demand text pricing (USD) per 1M tokens.
// NOTE: Keep this in sync with your Bedrock/Anthropic pricing if AWS changes rates.
const BEDROCK_USD_PER_MTOK = {
  "haiku-4-5": { input: 1.0, output: 5.0 },
  "sonnet-4-5": { input: 3.0, output: 15.0 },
  "opus-4-5": { input: 5.0, output: 25.0 },
};

function formatUsd(amount) {
  if (!Number.isFinite(amount)) return "$0.00";
  // Show more precision for tiny calls.
  const decimals = amount < 0.01 ? 6 : 4;
  return `$${amount.toFixed(decimals)}`;
}

function estimateOnDemandUsd({ modelKey, inputTokens, outputTokens }) {
  const rates = BEDROCK_USD_PER_MTOK[modelKey];
  if (!rates) return null;
  const inTok = Number(inputTokens);
  const outTok = Number(outputTokens);
  if (!Number.isFinite(inTok) || !Number.isFinite(outTok)) return null;
  const inputUsd = (inTok / 1_000_000) * rates.input;
  const outputUsd = (outTok / 1_000_000) * rates.output;
  return {
    rates,
    inputUsd,
    outputUsd,
    totalUsd: inputUsd + outputUsd,
  };
}
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} sec`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes} min ${remainder} sec`;
}

async function generateNote() {
  const transcriptionElem = document.getElementById("transcription");
  if (!transcriptionElem) {
    alert("No transcription text available.");
    return;
  }
  const transcriptionText = transcriptionElem.value.trim();
  if (!transcriptionText) {
    alert("No transcription text available.");
    return;
  }

  const customPromptTextarea = document.getElementById("customPrompt");
  const promptText = customPromptTextarea ? customPromptTextarea.value : "";

  const supplementaryElem = document.getElementById("supplementaryInfo");
  const supplementaryRaw = supplementaryElem ? supplementaryElem.value.trim() : "";
  const supplementaryWrapped = supplementaryRaw
    ? `Tilleggsopplysninger(brukes som kontekst):\\"${supplementaryRaw}\\"`
    : "";

  const generatedNoteField = document.getElementById("generatedNote");
  if (!generatedNoteField) return;

  generatedNoteField.value = "";
  const noteTimerElement = document.getElementById("noteTimer");
  const noteStartTime = Date.now();
  if (noteTimerElement) noteTimerElement.innerText = "Note Generation Timer: 0 sec";

  const noteTimerInterval = setInterval(() => {
    if (noteTimerElement) {
      noteTimerElement.innerText =
        "Note Generation Timer: " + formatTime(Date.now() - noteStartTime);
    }
  }, 1000);

  const backendUrl = (sessionStorage.getItem("bedrock_backend_url") || "").trim();
  const backendSecret = (sessionStorage.getItem("bedrock_backend_secret") || "").trim();

  if (!backendUrl) {
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    alert(
      "No Bedrock backend URL configured.\n\n" +
      "Please paste your Bedrock proxy URL on the start page before using AWS Bedrock."
    );
    return;
  }

  if (!backendSecret) {
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    alert(
      "No Bedrock backend secret configured.\n\n" +
      "Please paste your backend secret (X-Proxy-Secret) on the start page before using AWS Bedrock."
    );
    return;
  }

  const modelSelect = document.getElementById("bedrockModel");
  let modelKey =
    (sessionStorage.getItem("bedrock_model") || "").trim() ||
    (modelSelect ? modelSelect.value : "");
  if (modelKey && !ALLOWED_BEDROCK_MODEL_KEYS.has(modelKey)) {
    modelKey = "";
  }

  const combinedPrompt =
    (promptText || "") +
    (supplementaryWrapped ? "\n\n" + supplementaryWrapped : "");

  try {
    const resp = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Proxy-Secret": backendSecret,
      },
      body: JSON.stringify({
        transcription: transcriptionText,
        customPrompt: combinedPrompt,
        modelKey: modelKey || undefined,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      throw new Error("Bedrock backend HTTP " + resp.status + (text ? ": " + text : ""));
    }

    const data = await resp.json().catch(() => ({}));
const noteText = (data && (data.noteText || data.text || data.output || data.note)) || "";

const usage = data && data.usage;
if (usage) {
  const inputTokens = usage.inputTokens;
  const outputTokens = usage.outputTokens;
  console.log(`Input tokens: ${inputTokens}`);
  console.log(`Output tokens: ${outputTokens}`);

  // Prefer the model key reported by the backend (if it returns it), otherwise use the request selection.
  const effectiveModelKey =
    (data && (data.modelKey || data.model)) ||
    modelKey ||
    "backend_default";

  const estimate = estimateOnDemandUsd({
    modelKey: effectiveModelKey,
    inputTokens,
    outputTokens,
  });

  if (estimate) {
    console.log(
      `[Bedrock cost estimate] model=${effectiveModelKey} ` +
        `rates=$${estimate.rates.input}/MTok in, $${estimate.rates.output}/MTok out ` +
        `input=${formatUsd(estimate.inputUsd)} output=${formatUsd(estimate.outputUsd)} total=${formatUsd(estimate.totalUsd)}`
    );
  } else {
    console.log(
      `[Bedrock cost estimate] Skipped (unknown modelKey="${effectiveModelKey}" or missing token counts).`
    );
  }
}

clearInterval(noteTimerInterval);
if (noteTimerElement) noteTimerElement.innerText = "Text generation completed!";

generatedNoteField.value = noteText || "[No text returned from Bedrock backend]";

    
  } catch (err) {
    console.error("Bedrock note error:", err);
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    generatedNoteField.value = "Error generating note via AWS Bedrock: " + String(err);
  }
}

function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title =
      "Note generation is disabled until you accept cookies/ads.";
  }

  generateNoteButton.addEventListener("click", generateNote);
}

export { initNoteGeneration };
