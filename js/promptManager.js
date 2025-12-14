// js/promptManager.js

export const PromptManager = (() => {
  const PROMPT_PROFILE_STORAGE_KEY = "prompt_profile_id";
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  function getPromptProfileId() {
    try {
      return (localStorage.getItem(PROMPT_PROFILE_STORAGE_KEY) || "").trim();
    } catch {
      return "";
    }
  }

  // Namespace helpers (needed for migration)
  function getLegacyNamespaceHash() {
    // IMPORTANT: legacy behavior is hash(raw openai_api_key)
    const apiKey = sessionStorage.getItem("openai_api_key") || "";
    return hashString(apiKey);
  }

  function getProfileNamespaceHash(profileId) {
    return hashString(`profile:${(profileId || "").trim()}`);
  }

  function migrateLegacyPromptsToProfileIfNeeded(profileId) {
    const pid = (profileId || "").trim();
    if (!pid) return;

    const newNs = getProfileNamespaceHash(pid);
    const migratedFlagKey = `prompt_migrated_${newNs}`;

    try {
      if (localStorage.getItem(migratedFlagKey) === "1") return;
    } catch {
      // If localStorage isn't available, do nothing.
      return;
    }

    const oldNs = getLegacyNamespaceHash();

    // Copy slot 1–10: only fill empty new slots; never overwrite.
    for (let i = 1; i <= 10; i++) {
      const slot = String(i);
      const oldKey = `customPrompt_${oldNs}_${slot}`;
      const newKey = `customPrompt_${newNs}_${slot}`;

      let newVal = "";
      let oldVal = "";
      try { newVal = (localStorage.getItem(newKey) || ""); } catch {}
      if (newVal && newVal.trim()) continue;

      try { oldVal = (localStorage.getItem(oldKey) || ""); } catch {}
      if (!oldVal) continue;

      try { localStorage.setItem(newKey, oldVal); } catch {}
    }

    // Mark migration as done for this profile namespace
    try { localStorage.setItem(migratedFlagKey, "1"); } catch {}
  }


  function setPromptProfileId(profileId) {
    const v = (profileId || "").trim();
    try {
      if (v) localStorage.setItem(PROMPT_PROFILE_STORAGE_KEY, v);
      else localStorage.removeItem(PROMPT_PROFILE_STORAGE_KEY);
    } catch {}
    // One-time migration: if a profile is being set, copy legacy prompts into it (non-destructive).
    if (v) {
      migrateLegacyPromptsToProfileIfNeeded(v);
    }
    return v;
  }

  // Centralized namespace logic:
  // - If profileId exists -> hash("profile:" + profileId)
  // - Else -> legacy hash(openai_api_key) (IMPORTANT: do not change legacy hashing)
  function getPromptNamespaceHash() {
    const profileId = getPromptProfileId();
    if (profileId) {
      return getProfileNamespaceHash(profileId);
    }
    // Legacy fallback (do NOT change): hash(raw openai_api_key)
    return getLegacyNamespaceHash();
  }



  function getPromptStorageKey(slot) {
    const ns = getPromptNamespaceHash();
    return `customPrompt_${ns}_${slot}`;
  }

  function sanitizeForFilename(s) {
    return (s || "")
      .toString()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]+/g, "")
      .slice(0, 50) || "profile";
  }

  function downloadTextFile(filename, text, mime = "application/json") {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function exportPromptsToFile() {
    // Behavior: export prompts for CURRENT profile namespace only.
    // UI should ensure a profile is set (Behavior 1 design).
    const profileId = getPromptProfileId();
    if (!profileId) {
      console.warn("Cannot export prompts: prompt profile id not set.");
      return;
    }

    const slots = {};
    for (let i = 1; i <= 10; i++) {
      const key = getPromptStorageKey(String(i));
      const val = localStorage.getItem(key) || "";
      slots[String(i)] = val;
    }

    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      // profileId included as metadata only (Behavior 1 import will ignore it)
      profileId,
      slots
    };

    const safe = sanitizeForFilename(profileId);
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    downloadTextFile(`prompts-${safe}-${date}.json`, JSON.stringify(payload, null, 2));
  }
  async function importPromptsFromFile(file) {
    // Behavior 1: import into CURRENT profile namespace (ignores file.profileId).
    const profileId = getPromptProfileId();
    if (!profileId) {
      console.warn("Cannot import prompts: prompt profile id not set.");
      return;
    }

    if (!file) return;

    let text = "";
    try {
      text = await file.text();
    } catch (e) {
      console.warn("Failed to read import file:", e);
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      window.alert("Import failed: file is not valid JSON.");
      return;
    }

    const slotsObj = parsed && parsed.slots;
    if (!slotsObj || typeof slotsObj !== "object") {
      window.alert("Import failed: missing 'slots' object.");
      return;
    }

    const ok = window.confirm("Replace existing prompts in this profile?");
    if (!ok) return;

    // Write slots 1–10 into current namespace.
    for (let i = 1; i <= 10; i++) {
      const k = String(i);
      const v = (k in slotsObj) ? (slotsObj[k] ?? "") : "";
      try {
        localStorage.setItem(getPromptStorageKey(k), String(v));
      } catch {}
    }
  }

  function loadPrompt(slot) {
    const key = getPromptStorageKey(slot);
    const val = localStorage.getItem(key);
    const textarea = document.getElementById("customPrompt");
    if (textarea) {
      textarea.value = val || "";
      textarea.dispatchEvent(new Event("input"));
    }
  }

  function savePrompt(slot, value) {
    const key = getPromptStorageKey(slot);
    try { localStorage.setItem(key, value || ""); } catch {}
  }

  // Expose profile helpers for the UI (index.html / transcribe.html) to set and read.
  return {
    loadPrompt,
    savePrompt,
    getPromptProfileId,
    setPromptProfileId,
    exportPromptsToFile,
    importPromptsFromFile
  };
})();
