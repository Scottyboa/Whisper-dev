// ui.js

// === Consent Banner Functions ===

// Sets a cookie with the given name, value, and expiration in days.
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Retrieves the value of a cookie with the specified name.
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

// Dynamically loads the AdSense script.
function loadAdSense() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  script.onload = function() {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  };
  document.head.appendChild(script);
}

// Initializes the consent banner: attaches event listeners and checks cookie status.
function initConsentBanner() {
  const cmpAccept = document.getElementById("cmp-accept");
  const cmpManage = document.getElementById("cmp-manage");
  const cmpBanner = document.getElementById("cmp-banner");

  if (cmpAccept) {
    cmpAccept.addEventListener("click", () => {
      setCookie("user_consent", "accepted", 365);
      if (cmpBanner) cmpBanner.style.display = "none";
      loadAdSense();
      // Optionally hide any ad revenue messages if present.
      const adRevenueMessage = document.getElementById("ad-revenue-message");
      if (adRevenueMessage) {
        adRevenueMessage.style.display = "none";
      }
    });
  }

  if (cmpManage) {
    cmpManage.addEventListener("click", () => {
      alert("Here you can manage your cookie and ad preferences.");
    });
  }

  // On page load, if the user already consented, hide the banner and load ads.
  if (getCookie("user_consent") === "accepted") {
    if (cmpBanner) cmpBanner.style.display = "none";
    loadAdSense();
    const adRevenueMessage = document.getElementById("ad-revenue-message");
    if (adRevenueMessage) {
      adRevenueMessage.style.display = "none";
    }
  }
}

// === Guide Overlay (Index Page) ===

// Initializes the API key guide overlay on the index page.
function initGuideOverlay() {
  const overlay = document.getElementById("apiKeyGuideOverlay");
  const closeGuide = document.getElementById("closeGuideBtn");
  const openGuideButton = document.getElementById("openGuideButton");
  const enterTranscriptionBtn = document.getElementById("enterTranscriptionBtn");
  const apiKeyInput = document.getElementById("apiKeyInput");

  if (openGuideButton && overlay) {
    openGuideButton.addEventListener("click", () => {
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
    });
  }

  if (closeGuide && overlay) {
    closeGuide.addEventListener("click", () => {
      overlay.style.display = "none";
    });
  }

  if (enterTranscriptionBtn && apiKeyInput) {
    enterTranscriptionBtn.addEventListener("click", () => {
      const apiKey = apiKeyInput.value.trim();
      if (apiKey) {
        sessionStorage.setItem("openai_api_key", apiKey);
        window.location.href = "transcribe.html";
      } else {
        alert("Please enter a valid API key.");
      }
    });
  }
}

export { initConsentBanner, initGuideOverlay };
