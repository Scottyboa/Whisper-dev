** File: js/GeminiVertex.js
// GeminiVertex.js
// Note generation via a user-configured Vertex AI backend (Cloud Run) using Gemini 2.5 Pro (EU).
//
// IMPORTANT:
// - There is NO hardcoded backend URL here.
// - The module ONLY uses values from sessionStorage:
//     vertex_backend_url    → Cloud Run URL (e.g. https://...run.app)
//     vertex_backend_secret → X-Proxy-Secret for that backend
//     vertex_project_id     → optional, informational only
//
// Backend contract (your Cloud Run index.js):
//   POST JSON:
//     {
//       transcription: string,
//       customPrompt: string,
//       provider: "gemini",
//       modelVariant: "g25"
//     }

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

  // Supplementary info (prepended before transcription, same style as Gemini3)
  const supplementaryElem = document.getElementById("supplementaryInfo");
  const supplementaryRaw = supplementaryElem ? supplementaryElem.value.trim() : "";
  const supplementaryWrapped = supplementaryRaw
    ? `Tilleggsopplysninger(brukes som kontekst):"${supplementaryRaw}"`
    : "";

  const generatedNoteField = document.getElementById("generatedNote");
  if (!generatedNoteField) return;

  // Reset note field and start timer
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

  // --- Read Vertex config from sessionStorage (NO DEFAULTS) ---
  const backendUrl = (sessionStorage.getItem("vertex_backend_url") || "").trim();
  const backendSecret = (sessionStorage.getItem("vertex_backend_secret") || "").trim();

  if (!backendUrl) {
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    alert(
      "No Vertex backend URL configured.\n\n" +
      "Please paste your Cloud Run URL on the start page before using Google Vertex."
    );
    return;
  }

  if (!backendSecret) {
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    alert(
      "No Vertex backend secret configured.\n\n" +
      "Please paste your backend secret (X-Proxy-Secret) on the start page before using Google Vertex."
    );
    return;
  }

  // For now we always target Gemini 2.5 Pro in the backend:
  //   modelVariant: "g25"
  // If you later add more options, read sessionStorage.vertex_model or #vertexModel here.
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
        provider: "gemini",
        modelVariant: "g25"
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      throw new Error(
        "Vertex backend HTTP " + resp.status + (text ? ": " + text : "")
      );
    }

    const data = await resp.json().catch(() => ({}));
    const noteText = data.note || "";

    clearInterval(noteTimerInterval);
    if (noteTimerElement) {
      noteTimerElement.innerText =
        "Text generation completed! (Vertex Gemini 2.5 Pro)";
    }

    generatedNoteField.value = noteText;
  } catch (err) {
    console.error("Vertex Gemini note error:", err);
    clearInterval(noteTimerInterval);
    if (noteTimerElement) {
      noteTimerElement.innerText = "";
    }
    generatedNoteField.value =
      "Error generating note via Vertex backend: " + String(err);
  }
}

function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  // Same consent gate as other note modules
  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title =
      "Note generation is disabled until you accept cookies/ads.";
  }

  generateNoteButton.addEventListener("click", generateNote);
}

export { initNoteGeneration };
