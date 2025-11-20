// File: js/GeminiVertex.js
// Gemini 3 via Vertex AI (GDPR-friendly, europe-west4)
//
// This module is loaded when note_provider === "gemini3-vertex".
// It expects these to be in sessionStorage (set on index.html):
//   - vertex_project_id     → Your Google Cloud Project ID
//   - vertex_access_token   → OAuth access token (from "Sign in with Google for Vertex")
//
// It mirrors the UX of Gemini3.js: same button, same timer, same text areas.

const VERTEX_LOCATION = "europe-west4";
const VERTEX_MODEL_ID = "gemini-3-pro-preview";

// Small helper to format the timer display
function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) return totalSec + " sec";
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return minutes + " min" + (seconds > 0 ? " " + seconds + " sec" : "");
}

// SSE parser for Vertex streamGenerateContent
async function streamGeminiSSE(body, callbacks) {
  const { onDelta, onDone, onError } = callbacks || {};
  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let eventBuffer = [];

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process line-by-line
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || ""; // keep the last partial line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          // End of one SSE event block
          if (eventBuffer.length) {
            const dataLines = eventBuffer
              .filter((l) => l.startsWith("data:"))
              .map((l) => l.slice("data:".length).trim())
              .filter(Boolean);

            eventBuffer = [];

            for (const jsonStr of dataLines) {
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
                  const parts =
                    (cand.content && cand.content.parts) ||
                    cand.parts ||
                    [];
                  const textChunk = parts
                    .map((p) =>
                      p && typeof p.text === "string" ? p.text : ""
                    )
                    .join("");
                  if (textChunk && typeof onDelta === "function") {
                    onDelta(textChunk);
                  }
                }
              } catch (e) {
                console.warn(
                  "Error extracting text from SSE payload:",
                  e,
                  payload
                );
              }
            }
          }
        } else if (!trimmed.startsWith(":")) {
          // Ignore comments, but keep other lines
          eventBuffer.push(trimmed);
        }
      }
    }

    // Stream ended without explicit [DONE]
    if (typeof onDone === "function") onDone();
  } catch (err) {
    if (typeof onError === "function") onError(err);
  }
}

// Main note generation function using Vertex Gemini 3 (streaming)
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

  // Reset note area and start timer
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

  // Read Vertex credentials from sessionStorage (provided on index.html)
  const accessToken = sessionStorage.getItem("vertex_access_token");
  if (!accessToken) {
    alert(
      "No Vertex access token found.\n\nGo back to the main page, paste your Vertex OAuth Client ID and click 'Sign in with Google for Vertex' first."
    );
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    return;
  }

  const projectId = sessionStorage.getItem("vertex_project_id");
  if (!projectId) {
    alert(
      "No Vertex Project ID found.\n\nGo back to the main page and fill in the Vertex Project ID field."
    );
    clearInterval(noteTimerInterval);
    if (noteTimerElement) noteTimerElement.innerText = "";
    return;
  }

  // Same formatting rule as Gemini3.js
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
    )}:streamGenerateContent?alt=sse`;

  try {
    // Try v1beta1 first, then fall back to v1 if needed
    let resp = await fetch(makeUrl("v1beta1"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
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
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken
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

// Initialize note generation for this provider
function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  // Same consent gating as other note modules
  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title =
      "Note generation is disabled until you accept cookies/ads.";
  }

  generateNoteButton.addEventListener("click", generateNote);
}

export { initNoteGeneration };
