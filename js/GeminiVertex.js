// Gemini 3 via Vertex AI (GDPR-friendly, europe-west4)
// This module mirrors the behaviour of Gemini3.js but calls the Vertex AI Gemini endpoint
// using a project ID + API key stored in sessionStorage.
//
// Required sessionStorage keys (set on index.html):
//   - "gemini_api_key"      → Vertex / Gemini API key
//   - "vertex_project_id"   → Google Cloud project ID
//
// This module is loaded when note_provider === "gemini3-vertex".
// It exposes initNoteGeneration(), which main.js calls.

const VERTEX_LOCATION = "europe-west4";
const VERTEX_MODEL_ID = "gemini-3-pro-preview";

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

/**
 * Minimal SSE parser for Vertex/Gemini streamGenerateContent responses.
 * Expects `response.body` (ReadableStream) and callback hooks.
 */
async function streamGeminiSSE(body, callbacks) {
  const { onDelta, onDone, onError } = callbacks || {};
  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let sepIndex;
      // Events are separated by double newline
      while ((sepIndex = buffer.indexOf("\n\n")) !== -1) {
        const rawEvent = buffer.slice(0, sepIndex).trim();
        buffer = buffer.slice(sepIndex + 2);

        // Ignore comments/empty lines
        if (!rawEvent || rawEvent.startsWith(":")) continue;

        // We only care about data: lines
        const dataPrefix = "data:";
        if (!rawEvent.startsWith(dataPrefix)) continue;

        const jsonStr = rawEvent.slice(dataPrefix.length).trim();
        if (!jsonStr) continue;
        if (jsonStr === "[DONE]") {
          if (typeof onDone === "function") onDone();
          return;
        }

        let payload;
        try {
          payload = JSON.parse(jsonStr);
        } catch (e) {
          console.warn("Failed to parse SSE JSON chunk:", e, jsonStr);
          continue;
        }

        try {
          const candidates = payload.candidates || [];
          if (!candidates.length) continue;

          for (const cand of candidates) {
            // Vertex/Gemini responses can have either `content.parts` or top-level `parts`
            const parts = (cand.content && cand.content.parts) || cand.parts || [];
            const textChunk = parts
              .map((p) => (p && typeof p.text === "string" ? p.text : ""))
              .join("");

            if (textChunk && typeof onDelta === "function") {
              onDelta(textChunk);
            }
          }
        } catch (e) {
          console.warn("Error extracting text from SSE payload:", e, payload);
        }
      }
    }

    // Stream ended without explicit [DONE]
    if (typeof onDone === "function") onDone();
  } catch (err) {
    if (typeof onError === "function") onError(err);
  }
}

// Handles the note generation process using Gemini 3 via Vertex AI (streaming)
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

  // Pull credentials from sessionStorage (set in index.html)
  const apiKey = sessionStorage.getItem("gemini_api_key");
  if (!apiKey) {
    alert("No Gemini / Vertex API key available for note generation.");
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    return;
  }

  const projectId = sessionStorage.getItem("vertex_project_id");
  if (!projectId) {
    alert("No Vertex Project ID available for note generation.");
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    return;
  }

  // Fixed formatting instruction – aligned with Gemini3.js behaviour
  const baseInstruction = `
Do not use bold text. Do not use asterisks (*) or Markdown formatting anywhere in the output.
All headings should be plain text with a colon.
`.trim();

  const finalPromptText =
    (promptText || "") +
    "\n\n" +
    baseInstruction +
    "\n\nTRANSCRIPTION:\n" +
    transcriptionText;

  // Build Vertex AI endpoint URL for europe-west4
  const baseUrl = `https://${VERTEX_LOCATION}-aiplatform.googleapis.com`;
  const makeUrl = (apiVersion) =>
    `${baseUrl}/${apiVersion}/projects/${encodeURIComponent(
      projectId
    )}/locations/${VERTEX_LOCATION}/publishers/google/models/${encodeURIComponent(
      VERTEX_MODEL_ID
    )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

  try {
    // Prefer v1beta1, fall back to v1 if needed
    let resp = await fetch(makeUrl("v1beta1"), {
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
            thinkingLevel: "low"
          }
        }
      })
    });

    if (resp.status === 404) {
      console.warn(
        "Vertex streamGenerateContent v1beta1 returned 404, trying v1"
      );
      resp = await fetch(makeUrl("v1"), {
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
              thinkingLevel: "low"
            }
          }
        })
      });
    }

    if (!resp.ok || !resp.body) {
      const text = await resp.text().catch(() => "");
      throw new Error("Vertex Gemini stream HTTP " + resp.status + ": " + text);
    }

    await streamGeminiSSE(resp.body, {
      onDelta: (textChunk) => {
        generatedNoteField.value += textChunk;
      },
      onDone: () => {
        clearInterval(noteTimerInterval);
        if (noteTimerElement) {
          noteTimerElement.innerText = "Text generation completed!";
        }
      },
      onError: (err) => {
        console.error("Vertex Gemini streaming error:", err);
        clearInterval(noteTimerInterval);
        if (generatedNoteField) {
          generatedNoteField.value =
            "Error during note generation: " + String(err);
        }
        if (noteTimerElement) {
          noteTimerElement.innerText = "";
        }
      }
    });
  } catch (error) {
    console.error("Vertex Gemini streaming error:", error);
    clearInterval(noteTimerInterval);
    if (generatedNoteField) {
      generatedNoteField.value = "Error generating note: " + error;
    }
    if (noteTimerElement) {
      noteTimerElement.innerText = "";
    }
  }
}

// Initializes note generation functionality, including cookie/consent gating.
function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  // Disable note generation if consent isn’t accepted (same behaviour as Gemini3.js)
  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title =
      "Note generation is disabled until you accept cookies/ads.";
  }

  // Attach click handler only
  generateNoteButton.addEventListener("click", generateNote);
}

export { initNoteGeneration };
