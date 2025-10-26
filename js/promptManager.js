// promptManager.js
export const PromptManager = (() => {
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  function getPromptStorageKey(slot) {
    const apiKey = sessionStorage.getItem("openai_api_key") || "";
    return "customPrompt_" + hashString(apiKey) + "_" + slot;
  }

  function loadPrompt(slot) {
    const key = getPromptStorageKey(slot);
    const val = localStorage.getItem(key);
    const textarea = document.getElementById("customPrompt");
    if (textarea) {
      textarea.value = val || "";
      textarea.dispatchEvent(new Event("input")); // auto-resize etc.
    }
  }

  function savePrompt(slot, value) {
    const key = getPromptStorageKey(slot);
    try { localStorage.setItem(key, value || ""); } catch {}
  }

  return { loadPrompt, savePrompt };
})();
