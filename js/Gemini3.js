

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

// Handles the note generation process using the OpenAI API
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
      noteTimerElement.innerText = "Note Generation Timer: " + formatTime(Date.now() - noteStartTime);
    }
  }, 1000);
  
    // Phase 3: Always use the OpenAI key for note generation (independent of transcription provider)
  // Phase 3: Always use the Gemini key for note generation (independent of transcription provider)
const apiKey = sessionStorage.getItem("gemini_api_key");
if (!apiKey) {
    alert("No Gemini API key available for note generation.");
    clearInterval(noteTimerInterval);
    return;
}
  
  // Add the fixed formatting instruction as a hidden prompt component.
  const baseInstruction = `
Do not use bold text. Do not use asterisks (*) or Markdown formatting anywhere in the output.
All headings should be plain text with a colon.`.trim();

// Append the hidden instruction to the user's prompt so it is always included.
const finalPromptText = promptText + "\n\n" + baseInstruction;

try {
  // Call the Google Gemini 3 Pro Preview API (non-streaming)
  const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: finalPromptText + "\n\nTRANSCRIPTION:\n" + transcriptionText
            }
          ]
        }
      ],
      generationConfig: {
        thinkingConfig: {
          thinkingLevel: "low"   // low reasoning for faster, cheaper responses
        }
      }
    })
  });

  if (!resp.ok) {
    const errorText = await resp.text().catch(() => "");
    throw new Error("Gemini error " + resp.status + ": " + errorText);
  }

  const data = await resp.json();

  // Safely extract concatenated text from Gemini response
  const geminiText =
    data &&
    Array.isArray(data.candidates) &&
    data.candidates[0] &&
    data.candidates[0].content &&
    Array.isArray(data.candidates[0].content.parts)
      ? data.candidates[0].content.parts
          .map(part => (typeof part.text === "string" ? part.text : ""))
          .join("")
      : "";

  generatedNoteField.value = geminiText || "[No text returned from Gemini]";

  clearInterval(noteTimerInterval);
  if (noteTimerElement) {
    noteTimerElement.innerText = "Text generation completed!";
  }
} catch (error) {
  clearInterval(noteTimerInterval);
  if (generatedNoteField) {
    generatedNoteField.value = "Error generating note: " + error;
  }
  if (noteTimerElement) {
    noteTimerElement.innerText = "";
  }
}

}

 
// Initializes note generation functionality, including prompt slot handling and event listeners.
function initNoteGeneration() {
  const generateNoteButton = document.getElementById("generateNoteButton");
  if (!generateNoteButton) return;

  // Disable note generation if consent isn’t accepted
  if (document.cookie.indexOf("user_consent=accepted") === -1) {
    generateNoteButton.disabled = true;
    generateNoteButton.title = "Note generation is disabled until you accept cookies/ads.";
  }

  // Attach click handler only
  generateNoteButton.addEventListener("click", generateNote);}
 
export { initNoteGeneration };
