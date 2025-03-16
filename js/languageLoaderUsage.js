// js/languageLoaderUsage.js

import { loadLanguageModule } from './languageLoader.js';

// For the index page
export async function initIndexLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select");
  if (!langSelect) return;
  langSelect.value = currentLang;
  
  // Load the language module and update the index page UI
  const { indexTranslations } = await loadLanguageModule(currentLang);
  updateIndexUI(indexTranslations);
  
  // Listen for language changes
  langSelect.addEventListener("change", async function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    const { indexTranslations } = await loadLanguageModule(currentLang);
    updateIndexUI(indexTranslations);
  });
}

// Update the index page elements with the translations
function updateIndexUI(trans) {
  document.getElementById("page-title").textContent = trans.pageTitle;
  document.getElementById("header-title").textContent = trans.headerTitle;
  document.getElementById("header-subtitle").textContent = trans.headerSubtitle;
  document.getElementById("start-text").textContent = trans.startText;
  document.getElementById("apiKeyInput").placeholder = trans.apiPlaceholder;
  document.getElementById("enterTranscriptionBtn").textContent = trans.enterButton;
  document.getElementById("openGuideButton").textContent = trans.guideButton;
  document.getElementById("openSecurityButton").textContent = trans.securityButton;
  document.getElementById("openAboutButton").textContent = trans.aboutButton;
  document.getElementById("ad-revenue-message").textContent = trans.adRevenueMessage;
  
  // Update Security Modal
  const secHeading = document.getElementById("securityModalHeading");
  const secText = document.getElementById("securityModalText");
  if (secHeading) secHeading.textContent = trans.securityModalHeading;
  if (secText) secText.innerHTML = trans.securityModalText;

  // Update About Modal
  const aboutHeading = document.getElementById("aboutModalHeading");
  const aboutText = document.getElementById("aboutModalText");
  if (aboutHeading) aboutHeading.textContent = trans.aboutModalHeading;
  if (aboutText) aboutText.innerHTML = trans.aboutModalText;

  // Update API Guide Modal (assuming these IDs are used in your index page)
  const guideHeading = document.getElementById("guide-heading");
  const guideText = document.getElementById("guide-p1");
  if (guideHeading) guideHeading.textContent = trans.guideModalHeading;
  if (guideText) guideText.innerHTML = trans.guideModalText;
  
  // Update Price Button and Price Modal
  const priceBtn = document.getElementById("openPriceButton");
  if (priceBtn) {
    priceBtn.textContent = trans.priceButton;
  }
  const priceModalHeading = document.getElementById("priceModalHeading");
  const priceModalText = document.getElementById("priceModalText");
  if (priceModalHeading) {
    priceModalHeading.textContent = trans.priceModalHeading;
  }
  if (priceModalText) {
    priceModalText.innerHTML = trans.priceModalText;
  }
}

// For the transcribe page
export async function initTranscribeLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select-transcribe");
  if (!langSelect) return;
  langSelect.value = currentLang;
  
  const { transcribeTranslations } = await loadLanguageModule(currentLang);
  updateTranscribeUI(transcribeTranslations);
  
  // Listen for language changes
  langSelect.addEventListener("change", async function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    const { transcribeTranslations } = await loadLanguageModule(currentLang);
    updateTranscribeUI(transcribeTranslations);
  });
}

// Update the transcribe page elements with the translations
function updateTranscribeUI(trans) {
  document.getElementById("page-title-transcribe").textContent = trans.pageTitle;
  document.getElementById("openaiUsageLink").textContent = trans.openaiUsageLinkText;
  document.getElementById("btnFunctions").textContent = trans.btnFunctions;
  document.getElementById("btnGuide").textContent = trans.btnGuide;
  document.getElementById("recordingAreaTitle").textContent = trans.recordingAreaTitle;
  document.getElementById("recordTimer").textContent = trans.recordTimer;
  document.getElementById("transcribeTimer").textContent = trans.transcribeTimer;
  document.getElementById("transcription").placeholder = trans.transcriptionPlaceholder;
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
  document.getElementById("adUnit").textContent = trans.adUnitText;
  document.getElementById("guideHeading").textContent = trans.guideHeading;
  document.getElementById("guideText").innerHTML = trans.guideText;
}
