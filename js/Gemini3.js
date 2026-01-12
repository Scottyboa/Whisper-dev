// Utility function to hash a string (used for storing prompts keyed by API key)
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

// Helper functions for base64 conversions (kept in case they’re used elsewhere)
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Since encryption is no longer needed, the decryption functions are removed.
// We now assume that the plain API key is stored in sessionStorage under "user_api_key".

// Auto-resizes a textarea based on its content
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// Formats milliseconds into a human-readable string
function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) {
    return totalSec + " sec";
  } else {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return minutes + " min" + (seconds > 0 ? " " + seconds + " sec" : "");
  }
}

// Handles the note generation process using the Gemini API with streaming
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

  // Supplementary info (prepended before transcription)
  const supplementaryElem = document.getElementById("supplementaryInfo");
  const supplementaryRaw = supplementaryElem ? supplementaryElem.value.trim() : "";

  // EXACT required format:
  // Tilleggsopplysninger(brukes som kontekst):"[content]"
  const supplementaryWrapped = supplementaryRaw
    ? `Tilleggsopplysninger(brukes som kontekst):"${supplementaryRaw}"`
    : "";

  const generatedNoteField = document.getElementById("generatedNote");
  if (!generatedNoteField) return;

  // Reset generated note field and start timer
  generatedNoteField.value = "";
  const noteTimerElement = document.getElementById("noteTimer");
  const noteStartTime = Date.now();
  if (noteTimerElement) {
    noteTimerElement.innerText = "Note Generation Timer: 0 sec";
  }
  const noteTimerInterval = setInterval(() => {
    if (noteTimerElement) {
      noteTimerElement.innerText =
        "Note Generation Timer: " + formatTime(Date.now() - noteStartTime);
    }
  }, 1000);

  // Use the Gemini key for note generation
  const apiKey = sessionStorage.getItem("gemini_api_key");
  if (!apiKey) {
    alert("No Gemini API key available for note generation.");
    clearInterval(noteTimerInterval);
    return;
  }

  // Fixed formatting instruction
  const baseInstruction = `
Do not use bold text. Do not use asterisks (*) or Markdown formatting anywhere in the output.
All headings should be plain text with a colon.
`.trim();

  const finalPromptText =
    (promptText || "") +
    "\n\n" +
    baseInstruction +
    "\n\n" +
    (supplementaryWrapped ? supplementaryWrapped + "\n\n" : "") +
    "TRANSCRIPTION:\n" +
    transcriptionText;

  // Determine Gemini reasoning level from dropdown (default: "low")
  const geminiReasoningSelect = document.getElementById("geminiReasoning");
  const geminiThinkingLevel = geminiReasoningSelect
    ? geminiReasoningSelect.value
    : "low";

  // Helper to build the URL for different API versions
  const makeUrl = (apiVersion) =>
    `https://generativelanguage.googleapis.com/${apiVersion}/models/gemini-3-pro-preview:streamGenerateContent?alt=sse&key=${encodeURIComponent(
      apiKey
    )}`;

  try {
    // First try v1beta
    let resp = await fetch(makeUrl("v1beta"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: finalPromptText
              }
            ]
          }
        ],
        generationConfig: {
          thinkingConfig: {
            thinkingLevel: geminiThinkingLevel
          }
        }
      })
    });

    // If v1beta streaming isn’t available, fall back to v1alpha
    if (resp.status === 404) {
      console.warn("v1beta streamGenerateContent returned 404, trying v1alpha");
      resp = await fetch(makeUrl("v1alpha"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: finalPromptText
                }
              ]
            }
          ],
          generationConfig: {
            thinkingConfig: {
              thinkingLevel: geminiThinkingLevel
            }
          }
        })
      });
    }

    if (!resp.ok || !resp.body) {
      const text = await resp.text().catch(() => "");
      throw new Error("Gemini stream HTTP " + resp.status + ": " + text);
    }

    await streamGeminiSSE(resp.body, {
      onDelta: (textChunk) => {
        generatedNoteField.value += textChunk;
      },
      onDone: (usage) => {
        clearInterval(noteTimerInterval);
        if (noteTimerElement) {
          noteTimerElement.innerText = "Text generation completed!";
        }

        // ---- Token usage logging (input/output/reasoning/total) ----
        if (!usage) {
          console.log("[Gemini] Token usage: (not provided in stream)");
          return;
        }

        const {
          promptTokenCount,
          candidatesTokenCount,
          thoughtsTokenCount,
          toolUsePromptTokenCount,
          cachedContentTokenCount,
          totalTokenCount
        } = usage;

        const inputTokens = Number(promptTokenCount ?? 0);
        const outputTokens = Number(candidatesTokenCount ?? 0);
        const reasoningTokens =
          typeof thoughtsTokenCount === "number" ? Number(thoughtsTokenCount) : 0;
        const toolTokens =
          typeof toolUsePromptTokenCount === "number"
            ? Number(toolUsePromptTokenCount)
            : 0;

        const outputIncludingReasoning =
          typeof thoughtsTokenCount === "number"
            ? outputTokens + reasoningTokens
            : null;

        const computedTotal = inputTokens + toolTokens + outputTokens + reasoningTokens;

        console.log("[Gemini] usageMetadata:", usage);
        console.log(
          `[Gemini] input(promptTokenCount)=${promptTokenCount ?? "?"}` +
            (typeof cachedContentTokenCount === "number"
              ? ` (cached=${cachedContentTokenCount})`
              : "") +
            ` | output(candidatesTokenCount)=${candidatesTokenCount ?? "?"}` +
            ` | reasoning(thoughtsTokenCount)=${
              typeof thoughtsTokenCount === "number" ? thoughtsTokenCount : "?"
            }` +
            (typeof toolUsePromptTokenCount === "number"
              ? ` | toolUsePromptTokenCount=${toolUsePromptTokenCount}`
              : "") +
            ` | output+reasoning=${
              outputIncludingReasoning !== null ? outputIncludingReasoning : "?"
            }` +
            ` | totalTokenCount=${totalTokenCount ?? "?"}` +
            (typeof totalTokenCount === "number"
              ? ` (computed=${computedTotal})`
              : "")
        );
        // ---- USD cost estimation (Gemini API pricing) ----
        // Prices are per 1,000,000 tokens. Output pricing includes thinking tokens. :contentReference[oaicite:2]{index=2}
        const MODEL_ID = "gemini-3-pro-preview";
        const PRICING_USD_PER_1M = {
          "gemini-3-pro-preview": {
            // Tiering for this model is based on prompt size (<=200k vs >200k tokens). :contentReference[oaicite:3]{index=3}
            standard: { input: 2.0, output: 12.0 }, // prompts <= 200k tokens
            long: { input: 4.0, output: 18.0 }      // prompts > 200k tokens
          }
        };

        const tier = inputTokens > 200_000 ? "long" : "standard";
        const modelPricing = PRICING_USD_PER_1M[MODEL_ID] && PRICING_USD_PER_1M[MODEL_ID][tier];
        if (!modelPricing) {
          console.warn("[Gemini] Pricing table missing for model/tier:", MODEL_ID, tier);
          return;
        }

        // Treat tool-use prompt tokens as additional input tokens when present.
        // Note: cachedContentTokenCount may have separate caching charges; not included here. :contentReference[oaicite:4]{index=4}
        const billableInputTokens = inputTokens + toolTokens;
        const billableOutputTokens = outputTokens + reasoningTokens; // reasoning billed at output rate :contentReference[oaicite:5]{index=5}

        const inputCostUsd = (billableInputTokens / 1_000_000) * modelPricing.input;
        const outputCostUsd = (billableOutputTokens / 1_000_000) * modelPricing.output;
        const totalCostUsd = inputCostUsd + outputCostUsd;

        console.log(
          `[Gemini] pricing model=${MODEL_ID} tier=${tier} ` +
          `rates: input=$${modelPricing.input}/1M, output=$${modelPricing.output}/1M`
        );
        console.log(
          `[Gemini] cost estimate (USD): ` +
          `input=${inputCostUsd.toFixed(6)} ` +
          `output(incl reasoning)=${outputCostUsd.toFixed(6)} ` +
          `total=${totalCostUsd.toFixed(6)} ` +
          `(billableInputTokens=${billableInputTokens}, billableOutputTokens=${billableOutputTokens})`
        );
        // -----------------------------------------------------------
      },
      onError: (err) => {
        console.error("Gemini streaming error:", err);
        clearInterval(noteTimerInterval);
        if (generatedNoteField) {
          generatedNoteField.value = "Error during note generation: " + String(err);
        }
        if (noteTimerElement) {
          noteTimerElement.innerText = "";
        }
      }
    });
  } catch (error) {
    console.error("Gemini streaming error:", error);
    clearInterval(noteTimerInterval);
    if (generatedNoteField) {
      generatedNoteField.value = "Error generating note: " + error;
    }
  }
}

async function streamGeminiSSE(body, callbacks) {
  const { onDelta, onDone, onError } = callbacks;
  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let lastUsage = null;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split into lines; keep incomplete line in buffer
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":")) {
          // comment / keep-alive
          continue;
        }

        if (trimmed === "data: [DONE]") {
          if (typeof onDone === "function") onDone(lastUsage);
          return;
        }

        if (!trimmed.startsWith("data:")) continue;

        const jsonStr = trimmed.slice(5).trim();
        if (!jsonStr) continue;

        let payload;
        try {
          payload = JSON.parse(jsonStr);
        } catch (e) {
          console.warn("Failed to parse SSE JSON chunk:", e, jsonStr);
          continue;
        }

        // Capture token usage if/when it appears (often near the end of the stream)
        if (payload && payload.usageMetadata) {
          lastUsage = payload.usageMetadata;
        }

        try {
          const candidates = payload.candidates || [];
          if (!candidates.length) continue;

          const parts =
            (candidates[0].content && candidates[0].content.parts) || [];
          const textChunk = parts
            .map((p) => (typeof p.text === "string" ? p.text : ""))
            .join("");

          if (textChunk && typeof onDelta === "function") {
            onDelta(textChunk);
          }
        } catch (e) {
          console.warn("Error extracting text from SSE payload:", e, payload);
        }
      }
    }

    // Stream ended without explicit [DONE]
    if (typeof onDone === "function") onDone(lastUsage);
  } catch (err) {
    if (typeof onError === "function") onError(err);
  }
}

// Initializes note generation functionality, including prompt slot handling and event listeners.
function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  // Disable note generation if consent isn’t accepted
  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title =
      "Note generation is disabled until you accept cookies/ads.";
  }

  // Attach click handler only
  generateNoteButton.addEventListener("click", generateNote);
}

export { initNoteGeneration };
