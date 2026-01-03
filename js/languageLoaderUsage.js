import { loadLanguageModule } from './languageLoader.js';
import { initInfoModals } from './ui.js';

// For the index page
export async function initIndexLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select");
  if (!langSelect) return;
  langSelect.value = currentLang;
  
  // Load the language module and update the index page UI
  const mod = await loadLanguageModule(currentLang);
  console.log("Loaded index language module:", mod);
  const indexTranslations = mod?.indexTranslations || mod?.default?.indexTranslations;
  if (!indexTranslations) {
    console.error("Index translations not found for language:", currentLang);
    return;
  }
  updateIndexUI(indexTranslations);
  // Reinitialize info modal (now accordion) event listeners after UI update
  initInfoModals();
  
  // Listen for language changes
  langSelect.addEventListener("change", async function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    const mod = await loadLanguageModule(currentLang);
    console.log("Loaded index language module on change:", mod);
    const indexTranslations = mod?.indexTranslations || mod?.default?.indexTranslations;
    if (!indexTranslations) {
      console.error("Index translations not found for language:", currentLang);
      return;
    }
    updateIndexUI(indexTranslations);
    initInfoModals();
  });
}

// Update the index page elements with the translations
function updateIndexUI(trans) {
  document.getElementById("page-title").textContent = trans.pageTitle;
  document.getElementById("header-title").textContent = trans.headerTitle;
  document.getElementById("header-subtitle").textContent = trans.headerSubtitle;
  document.getElementById("start-text").textContent = trans.startText;

  // Provider columns (optional; exists after the 2-column layout change)
  const gdprTitleEl = document.getElementById("gdpr-column-title");
  if (gdprTitleEl) gdprTitleEl.textContent = trans.gdprColumnTitle ?? gdprTitleEl.textContent;
  const gdprFootEl = document.getElementById("gdpr-column-footnote");
  if (gdprFootEl) gdprFootEl.textContent = trans.gdprColumnFootnote ?? gdprFootEl.textContent;
  const nonGdprTitleEl = document.getElementById("nongdpr-column-title");
  if (nonGdprTitleEl) nonGdprTitleEl.textContent = trans.nonGdprColumnTitle ?? nonGdprTitleEl.textContent;
  const nonGdprFootEl = document.getElementById("nongdpr-column-footnote");
  if (nonGdprFootEl) nonGdprFootEl.textContent = trans.nonGdprColumnFootnote ?? nonGdprFootEl.textContent;

  // Optional helper text blocks (may be absent or untranslated in some language packs)
  const promptProfileHintEl = document.getElementById("prompt-profile-hint");
  if (promptProfileHintEl && trans.promptProfileHint) {
    promptProfileHintEl.textContent = trans.promptProfileHint;
  }
  const keysIoHintEl = document.getElementById("keysIoHint");
  if (keysIoHintEl && trans.keysIoHint) {
    keysIoHintEl.textContent = trans.keysIoHint;
  }

  document.getElementById("apiKeyInput").placeholder = trans.apiPlaceholder;
  document.getElementById("enterTranscriptionBtn").textContent = trans.enterButton;
  const guideBtn = document.getElementById("openGuideButton");
  if (guideBtn) guideBtn.textContent = trans.guideButton;
  const securityBtn = document.getElementById("openSecurityButton");
  if (securityBtn) securityBtn.textContent = trans.securityButton;
  const aboutBtn = document.getElementById("openAboutButton");
  if (aboutBtn) aboutBtn.textContent = trans.aboutButton;
  document.getElementById("ad-revenue-message").textContent = trans.adRevenueMessage;
  const offerElem = document.getElementById("offerText");
  if (offerElem && trans.offerText) {
    offerElem.innerHTML = trans.offerText;
  }

  // New: AI-models accordion content
  const modelsContent = document.getElementById("modelsModalText");
  if (modelsContent && trans.modelsModalText != null) {
    modelsContent.innerHTML = trans.modelsModalText;
    modelsContent.querySelectorAll("a").forEach(anchor => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  }

  const guideContent = document.getElementById("guide-p1");
  if (guideContent) {
    guideContent.innerHTML = trans.guideModalText;
    guideContent.querySelectorAll("a").forEach(anchor => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  }

  const priceContent = document.getElementById("priceModalText");
  if (priceContent) {
    priceContent.innerHTML = trans.priceModalText;
  }
  const securityContent = document.getElementById("securityModalText");
  if (securityContent) {
    securityContent.innerHTML = trans.securityModalText;
  }
  const aboutContent = document.getElementById("aboutModalText");
  if (aboutContent) {
    aboutContent.innerHTML = trans.aboutModalText;
  }
 const accordionHeaders = document.querySelectorAll('.accordion .accordion-header');
  // Support both old (4 tabs) and new (5 tabs) index.html layouts
  if (accordionHeaders.length >= 5) {
    accordionHeaders[0].textContent = trans.modelsModalHeading ?? accordionHeaders[0].textContent;
    accordionHeaders[1].textContent = trans.guideModalHeading ?? accordionHeaders[1].textContent;
    accordionHeaders[2].textContent = trans.priceModalHeading ?? accordionHeaders[2].textContent;
    accordionHeaders[3].textContent = trans.securityModalHeading ?? accordionHeaders[3].textContent;
    accordionHeaders[4].textContent = trans.aboutModalHeading ?? accordionHeaders[4].textContent;
  } else if (accordionHeaders.length >= 4) {
    accordionHeaders[0].textContent = trans.guideModalHeading ?? accordionHeaders[0].textContent;
    accordionHeaders[1].textContent = trans.priceModalHeading ?? accordionHeaders[1].textContent;
    accordionHeaders[2].textContent = trans.securityModalHeading ?? accordionHeaders[2].textContent;
    accordionHeaders[3].textContent = trans.aboutModalHeading ?? accordionHeaders[3].textContent;
  }
  const activeHeader = document.querySelector('.accordion-header.active');
  if (activeHeader) {
    const contentId = activeHeader.getAttribute('data-content-id');
    const hiddenContent = document.getElementById(contentId);
    const contentContainer = document.querySelector('.accordion-content-container');
    if (hiddenContent && contentContainer) {
      contentContainer.innerHTML = hiddenContent.innerHTML;
    }
  }
}

// For the transcribe page
export async function initTranscribeLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select-transcribe");
  if (!langSelect) return;
  langSelect.value = currentLang;
  
  // Load and update UI for the current language
  const mod = await loadLanguageModule(currentLang);
  console.log("Loaded transcribe language module:", mod);
  const transcribeTranslations = mod?.transcribeTranslations || mod?.default?.transcribeTranslations;
  if (!transcribeTranslations) {
    console.error("Transcribe translations not found for language:", currentLang);
    return;
  }
  updateTranscribeUI(transcribeTranslations);
  
  // Listen for language changes using the "change" event
  langSelect.addEventListener("change", async function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    const mod = await loadLanguageModule(currentLang);
    console.log("Loaded transcribe language module on change:", mod);
    const transcribeTranslations = mod?.transcribeTranslations || mod?.default?.transcribeTranslations;
    if (!transcribeTranslations) {
      console.error("Transcribe translations not found for language:", currentLang);
      return;
    }
    updateTranscribeUI(transcribeTranslations);
  });
  
  // Also listen for "click" events to force an update even if the same language is re-selected
  langSelect.addEventListener("click", async function() {
    const mod = await loadLanguageModule(this.value);
    console.log("Loaded transcribe language module on click:", mod);
    const transcribeTranslations = mod?.transcribeTranslations || mod?.default?.transcribeTranslations;
    if (!transcribeTranslations) {
      console.error("Transcribe translations not found for language:", this.value);
      return;
    }
    updateTranscribeUI(transcribeTranslations);
  });
}

function updateTranscribeUI(trans) {
  document.getElementById("page-title-transcribe").textContent = trans.pageTitle;
  const usageEl = document.getElementById("openaiUsageLink");
  if (usageEl) usageEl.textContent = trans.openaiUsageLinkText;
  const walletEl = document.getElementById("openaiWalletLink");
  if (walletEl) walletEl.textContent = trans.openaiWalletLinkText;
  document.getElementById("btnGuide").textContent = trans.btnGuide;
  document.getElementById("backToHomeButton").textContent = trans.backToHome;
  document.getElementById("recordingAreaTitle").textContent = trans.recordingAreaTitle;
  const readFirstElem = document.getElementById("read-first-text");
  if (readFirstElem && trans.readFirstText) {
    readFirstElem.textContent = trans.readFirstText;
  }
  document.getElementById("recordTimer").textContent = trans.recordTimer;
  document.getElementById("transcribeTimer").textContent = trans.transcribeTimer;
  document.getElementById("transcription").placeholder = trans.transcriptionPlaceholder;

  const supplementaryInfoEl = document.getElementById("supplementaryInfo");
  if (supplementaryInfoEl) {
    supplementaryInfoEl.placeholder =
      trans.supplementaryInfoPlaceholder ?? "Supplementary information (optional)";
  }

  const promptExportBtnEl = document.getElementById("promptExportBtn");
  if (promptExportBtnEl) {
    promptExportBtnEl.textContent = trans.promptExportButton ?? "Export";
  }
  const promptImportBtnEl = document.getElementById("promptImportBtn");
  if (promptImportBtnEl) {
    promptImportBtnEl.textContent = trans.promptImportButton ?? "Import";
  }

  document.getElementById("startButton").textContent = trans.startButton;
  document.getElementById("stopButton").textContent = trans.stopButton;
  document.getElementById("pauseResumeButton").textContent = trans.pauseButton;
  document.getElementById("statusMessage").textContent = trans.statusMessage;
  document.getElementById("noteGenerationTitle").textContent = trans.noteGenerationTitle;
  document.getElementById("generateNoteButton").textContent = trans.generateNoteButton;
  document.getElementById("noteTimer").textContent = trans.noteTimer;
  document.getElementById("generatedNote").placeholder = trans.generatedNotePlaceholder;
  document.getElementById("customPromptTitle").textContent = trans.customPromptTitle;
  document.getElementById("promptSlotLabel").textContent = trans.promptSlotLabel;
  document.getElementById("customPrompt").placeholder = trans.customPromptPlaceholder;
  // Removed this line because the "adUnit" element no longer exists:
  // document.getElementById("adUnit").textContent = trans.adUnitText;
  document.getElementById("guideHeading").textContent = trans.guideHeading;
  document.getElementById("guideText").innerHTML = trans.guideText;
  // Guard timers against provider modules overwriting localized labels/units
  // when recording/note-generation starts ticking.
  installTimerI18nGuards(trans);
}
function installTimerI18nGuards(trans) {
  const templates = {
    recordTimer: trans.recordTimer,
    transcribeTimer: trans.transcribeTimer,
    noteTimer: trans.noteTimer,
  };

  // Reinstall on every language change (disconnect old observers).
  window.__timerI18nState = window.__timerI18nState || {};
  const state = window.__timerI18nState;
  if (Array.isArray(state.observers)) {
    state.observers.forEach((o) => {
      try { o.disconnect(); } catch {}
    });
  }
  state.observers = [];

  Object.entries(templates).forEach(([id, template]) => {
    const el = document.getElementById(id);
    if (!el || typeof template !== "string") return;

    const tpl = parseTimerTemplate(template);

    // Normalize immediately (covers the “just clicked start and it flashed English” case)
    normalizeTimerText(el, tpl);

    const obs = new MutationObserver(() => normalizeTimerText(el, tpl));
    obs.observe(el, { childList: true, characterData: true, subtree: true });
    state.observers.push(obs);
  });
}

function parseTimerTemplate(template) {
  // Example templates:
  // "Completion Timer: 0 sec"
  // "Fullføringstimer: 0 sek"
  const m = template.match(/^(.*?:\s*)0\s+(\S+)\s*$/);
  return {
    prefix: m ? m[1] : (template.replace(/\d.*$/, "") || ""),
    secUnit: m ? m[2] : "sec",
    minUnit: "min",
  };
}

function parseElapsedSecondsFromTimerText(text) {
  // Pull the part after the first colon (works with "Timer: 3 sec" style strings)
  const timePart = (text.match(/:\s*(.*)$/)?.[1] || text || "").trim();
  if (!timePart) return null;

  const minMatch = timePart.match(/(\d+)\s*min\b/i);
  // Accept common second units (sec/sek). If a provider uses something else,
  // we still fall back to "first number".
  const secMatch = timePart.match(/(\d+)\s*(sec|sek)\b/i);

  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  const seconds = secMatch
    ? parseInt(secMatch[1], 10)
    : (() => {
        const n = timePart.match(/(\d+)/);
        return n ? parseInt(n[1], 10) : null;
      })();

  if (seconds == null && !minMatch) return null;
  return minutes * 60 + (seconds || 0);
}

function formatSecondsLocalized(totalSec, units) {
  if (totalSec < 60) return `${totalSec} ${units.secUnit}`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s > 0 ? `${m} ${units.minUnit} ${s} ${units.secUnit}` : `${m} ${units.minUnit}`;
}

function normalizeTimerText(el, tpl) {
  const current = (el.textContent || "").trim();
  const totalSec = parseElapsedSecondsFromTimerText(current);
  if (totalSec == null) return; // e.g. "", or "Text generation completed!"

  const desired = `${tpl.prefix}${formatSecondsLocalized(totalSec, tpl)}`;
  if (current !== desired) el.textContent = desired;
}

export default { initIndexLanguage, initTranscribeLanguage };
