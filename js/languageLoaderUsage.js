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
  
  // Update API Guide Modal content
  const guideHeading = document.getElementById("guide-heading");
  if (guideHeading) {
    guideHeading.textContent = trans.guideModalHeading;
  }
  const guideContent = document.getElementById("guide-p1");
  if (guideContent) {
    guideContent.innerHTML = trans.guideModalText;
  }
  
  // Update Price Modal content
  const priceModalHeading = document.getElementById("priceModalHeading");
  if (priceModalHeading) {
    priceModalHeading.textContent = trans.priceModalHeading;
  }
  const priceModalText = document.getElementById("priceModalText");
  if (priceModalText) {
    priceModalText.innerHTML = trans.priceModalText;
  }
  
  // Update Security Modal content
  const securityModalHeading = document.getElementById("securityModalHeading");
  if (securityModalHeading) {
    securityModalHeading.textContent = trans.securityModalHeading;
  }
  const securityModalText = document.getElementById("securityModalText");
  if (securityModalText) {
    securityModalText.innerHTML = trans.securityModalText;
  }
  
  // Update About Modal content
  const aboutModalHeading = document.getElementById("aboutModalHeading");
  if (aboutModalHeading) {
    aboutModalHeading.textContent = trans.aboutModalHeading;
  }
  const aboutModalText = document.getElementById("aboutModalText");
  if (aboutModalText) {
    aboutModalText.innerHTML = trans.aboutModalText;
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
