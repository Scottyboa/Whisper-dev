// language.js

// Translations for the Index Page
const indexTranslations = {
  en: {
    pageTitle: "Whisper Transcription",
    headerTitle: "Whisper Transcription",
    headerSubtitle: "Convert speech to text for professional consultations",
    startText: "To get started, please enter your OpenAI API key:",
    apiPlaceholder: "Enter API Key here",
    enterButton: "Enter Transcription Tool",
    guideButton: "Guide for setting up API key",
    adRevenueMessage: "As we do not charge for the use of this website and rely solely on ad revenue, we kindly ask you to consent to personalized ads to help support our service."
  },
  no: {
    pageTitle: "Whisper Transkripsjon",
    headerTitle: "Whisper Transkripsjon",
    headerSubtitle: "Konverter tale til tekst for profesjonelle konsultasjoner",
    startText: "For å komme i gang, vennligst skriv inn din OpenAI API-nøkkel:",
    apiPlaceholder: "Skriv inn API-nøkkel her",
    enterButton: "Gå til transkripsjonsverktøy",
    guideButton: "Veiledning for oppsett av API-nøkkel",
    adRevenueMessage: "Siden vi ikke tar betalt for bruk av denne nettsiden og utelukkende er avhengige av annonseinntekter, ber vi deg vennligst om å samtykke til personaliserte annonser for å støtte tjenesten vår."
  },
  sv: {
    pageTitle: "Whisper Transkription",
    headerTitle: "Whisper Transkription",
    headerSubtitle: "Omvandla tal till text för professionella konsultationer",
    startText: "För att komma igång, vänligen ange din OpenAI API-nyckel:",
    apiPlaceholder: "Ange API-nyckel här",
    enterButton: "Gå till transkriptionverktyget",
    guideButton: "Guide för att ställa in API-nyckel",
    adRevenueMessage: "Eftersom vi inte tar betalt för användningen av denna webbplats och enbart är beroende av annonsintäkter, ber vi dig vänligen att ge ditt samtycke till personliga annonser för att stödja vår tjänst."
  },
  de: {
    pageTitle: "Whisper Transkription",
    headerTitle: "Whisper Transkription",
    headerSubtitle: "Sprache in Text umwandeln für professionelle Beratungen",
    startText: "Um zu beginnen, geben Sie bitte Ihren OpenAI API-Schlüssel ein:",
    apiPlaceholder: "API-Schlüssel hier eingeben",
    enterButton: "Transkriptionswerkzeug öffnen",
    guideButton: "Anleitung zum Einrichten des API-Schlüssels",
    adRevenueMessage: "Da wir diese Website kostenlos anbieten und ausschließlich auf Werbeeinnahmen angewiesen sind, bitten wir Sie, personalisierte Werbung zuzulassen, um unseren Service zu unterstützen."
  },
  fr: {
    pageTitle: "Transcription Whisper",
    headerTitle: "Transcription Whisper",
    headerSubtitle: "Convertir la parole en texte pour des consultations professionnelles",
    startText: "Pour commencer, veuillez entrer votre clé API OpenAI :",
    apiPlaceholder: "Entrez la clé API ici",
    enterButton: "Accéder à l'outil de transcription",
    guideButton: "Guide pour configurer la clé API",
    adRevenueMessage: "Comme nous ne facturons pas l'utilisation de ce site et dépendons uniquement des revenus publicitaires, nous vous demandons de bien vouloir accepter les publicités personnalisées pour soutenir notre service."
  },
  it: {
    pageTitle: "Trascrizione Whisper",
    headerTitle: "Trascrizione Whisper",
    headerSubtitle: "Convertire il parlato in testo per consulenze professionali",
    startText: "Per iniziare, inserisci la tua chiave API OpenAI:",
    apiPlaceholder: "Inserisci qui la chiave API",
    enterButton: "Accedi allo strumento di trascrizione",
    guideButton: "Guida per configurare la chiave API",
    adRevenueMessage: "Poiché non addebitiamo l'uso di questo sito e ci affidiamo esclusivamente alle entrate pubblicitarie, ti chiediamo cortesemente di acconsentire agli annunci personalizzati per supportare il nostro servizio."
  }
};

// Updates the index page elements based on the current language
function updateLanguageIndex(lang) {
  document.getElementById("page-title").textContent = indexTranslations[lang].pageTitle;
  document.getElementById("header-title").textContent = indexTranslations[lang].headerTitle;
  document.getElementById("header-subtitle").textContent = indexTranslations[lang].headerSubtitle;
  document.getElementById("start-text").textContent = indexTranslations[lang].startText;
  document.getElementById("apiKeyInput").setAttribute("placeholder", indexTranslations[lang].apiPlaceholder);
  document.getElementById("enterTranscriptionBtn").textContent = indexTranslations[lang].enterButton;
  document.getElementById("openGuideButton").textContent = indexTranslations[lang].guideButton;
  document.getElementById("ad-revenue-message").textContent = indexTranslations[lang].adRevenueMessage;
}

// Initializes the language selection for the index page
function initIndexLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select");
  if (!langSelect) return;
  langSelect.value = currentLang;
  updateLanguageIndex(currentLang);
  langSelect.addEventListener("change", function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    updateLanguageIndex(currentLang);
  });
}

// Translations for the Transcribe Page
const transcribeTranslations = {
  en: {
    pageTitle: "Transcription Tool with Ads and Guide Overlay",
    openaiUsageLinkText: "Cost usage overview",
    btnFunctions: "Functions",
    btnGuide: "Guide",
    recordingAreaTitle: "Recording Area",
    recordTimer: "Recording Timer: 0 sec",
    transcribeTimer: "Completion Timer: 0 sec",
    transcriptionPlaceholder: "Transcription result will appear here...",
    startButton: "Start Recording",
    stopButton: "Stop/Complete",
    pauseButton: "Pause Recording",
    statusMessage: "Welcome! Click \"Start Recording\" to begin.",
    noteGenerationTitle: "Note Generation",
    generateNoteButton: "Generate Note",
    noteTimer: "Note Generation Timer: 0 sec",
    generatedNotePlaceholder: "Generated note will appear here...",
    customPromptTitle: "Custom Prompt",
    promptSlotLabel: "Prompt Slot:",
    customPromptPlaceholder: "Enter custom prompt here",
    adUnitText: "Your Ad Here",
    guideHeading: "Guide & Instructions",
    guideText: `Welcome to the Whisper Transcription tool. This application allows medical professionals, therapists, and other practitioners to record and transcribe consultations, as well as generate professional notes using an AI-powered note generator.
<br><br>
<strong>How to Use the Functions:</strong>
<ul>
  <li><strong>Recording:</strong> Click "Start Recording" to begin capturing audio. Audio is captured via MediaStreamTrackProcessor (using WebCodecs) and accumulated for up to 40 seconds before being packaged as a self-contained WAV file.</li>
  <li><strong>Completion:</strong> After clicking "Stop/Complete", the recording stops. A 2-second final capture period collects any remaining audio before processing the final chunk. The Completion Timer then ticks until the full transcript is received.</li>
  <li><strong>Note Generation:</strong> After transcription, click "Generate Note" to produce a note based on your transcript and custom prompt.</li>
  <li><strong>Custom Prompt:</strong> On the right, select a prompt slot (1–10) and enter your custom prompt. Your prompt is saved automatically and linked to your API key.</li>
  <li><strong>Guide Toggle:</strong> Use the "Functions" and "Guide" buttons to switch between the functional view and this guide.</li>
</ul>
Please click "Functions" to return to the main interface.`
  },
  no: {
    pageTitle: "Transkripsjonsverktøy med annonser og veiledningsoverlegg",
    openaiUsageLinkText: "Vis OpenAI bruk",
    btnFunctions: "Funksjoner",
    btnGuide: "Veiledning",
    recordingAreaTitle: "Opptaksområde",
    recordTimer: "Opptakstimer: 0 sek",
    transcribeTimer: "Fullføringstimer: 0 sek",
    transcriptionPlaceholder: "Transkripsjonsresultatet vises her...",
    startButton: "Start opptak",
    stopButton: "Stopp/Fullfør",
    pauseButton: "Pause opptak",
    statusMessage: "Velkommen! Klikk 'Start opptak' for å begynne.",
    noteGenerationTitle: "Notatgenerering",
    generateNoteButton: "Generer notat",
    noteTimer: "Notatgenereringstimer: 0 sek",
    generatedNotePlaceholder: "Generert notat vises her...",
    customPromptTitle: "Tilpasset melding",
    promptSlotLabel: "Meldingsplass:",
    customPromptPlaceholder: "Skriv inn tilpasset melding her",
    adUnitText: "Din annonse her",
    guideHeading: "Veiledning og Instruksjoner",
    guideText: `Velkommen til Whisper Transkripsjonsverktøy. Denne applikasjonen lar medisinske fagpersoner, terapeuter og andre utøvere ta opp og transkribere konsultasjoner, samt generere profesjonelle notater ved hjelp av en AI-drevet notatgenerator.
<br><br>
<strong>Slik bruker du verktøyet:</strong>
<ul>
  <li><strong>Opptak:</strong> Klikk på "Start opptak" for å starte opptaket. Lydopptak fanges via MediaStreamTrackProcessor (med WebCodecs) og akkumuleres i opptil 40 sekunders biter før de pakkes som gyldige WAV-filer.</li>
  <li><strong>Fullføring:</strong> Etter at du klikker "Stopp/Fullfør", avsluttes opptaket. En 2-sekunders sluttfase fanger opp resterende lyd, og deretter tickes fullføringstimeren til transkripsjonen er ferdig.</li>
  <li><strong>Notatgenerering:</strong> Etter transkripsjonen, klikk "Generer notat" for å lage et notat basert på transkripsjonen og din tilpassede melding.</li>
  <li><strong>Tilpasset melding:</strong> Velg et meldingsfelt (1–10) og skriv inn din tilpassede melding. Meldingen lagres automatisk og knyttes til din API-nøkkel.</li>
  <li><strong>Veiledning:</strong> Bruk knappene "Funksjoner" og "Veiledning" for å bytte mellom verktøysgrensesnittet og denne veiledningen.</li>
</ul>
Klikk "Funksjoner" for å gå tilbake til hovedskjermen.`
  },
  sv: {
    pageTitle: "Transkriberingsverktyg med annonser och guideöverlägg",
    openaiUsageLinkText: "Översikt över kostnader",
    btnFunctions: "Funktioner",
    btnGuide: "Guide",
    recordingAreaTitle: "Inspelningsområde",
    recordTimer: "Inspelningstimer: 0 sek",
    transcribeTimer: "Avslutningstimer: 0 sek",
    transcriptionPlaceholder: "Transkriptet kommer att visas här...",
    startButton: "Starta inspelning",
    stopButton: "Stoppa/Avsluta",
    pauseButton: "Pausa inspelning",
    statusMessage: "Välkommen! Klicka på \"Starta inspelning\" för att börja.",
    noteGenerationTitle: "Noteringsgenerering",
    generateNoteButton: "Generera anteckning",
    noteTimer: "Noteringstimer: 0 sek",
    generatedNotePlaceholder: "Genererad anteckning kommer att visas här...",
    customPromptTitle: "Anpassad uppmaning",
    promptSlotLabel: "Uppmaningsplats:",
    customPromptPlaceholder: "Ange anpassad uppmaning här",
    adUnitText: "Din annons här",
    guideHeading: "Guide & Instruktioner",
    guideText: `Välkommen till Whisper Transkriberingsverktyget. Denna applikation låter medicinska proffs, terapeuter och andra praktiker spela in och transkribera konsultationer, samt generera professionella anteckningar med hjälp av en AI-driven anteckningsgenerator.
<br><br>
<strong>Hur du använder funktionerna:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka på "Starta inspelning" för att börja spela in. Ljud fångas med MediaStreamTrackProcessor (via WebCodecs) och ackumuleras i upp till 40 sekunder innan de paketeras som en komplett WAV-fil.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" stoppas inspelningen. En sista 2-sekunders period samlar upp eventuellt kvarvarande ljud innan den slutgiltiga delen behandlas. Avslutningstimern tickar tills hela transkriptet är mottaget.</li>
  <li><strong>Noteringsgenerering:</strong> Efter transkriberingen, klicka på "Generera anteckning" för att skapa en anteckning baserad på ditt transkript och din anpassade uppmaning.</li>
  <li><strong>Anpassad uppmaning:</strong> Välj en uppmaningsplats (1–10) och ange din anpassade uppmaning. Uppmaningen sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guide:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan huvudgränssnittet och denna guide.</li>
</ul>
Klicka på "Funktioner" för att återgå till huvudgränssnittet.`
  },
  de: {
    pageTitle: "Transkriptionswerkzeug mit Werbung und Anleitungsoverlay",
    openaiUsageLinkText: "Kostenübersicht",
    btnFunctions: "Funktionen",
    btnGuide: "Anleitung",
    recordingAreaTitle: "Aufnahmebereich",
    recordTimer: "Aufnahmetimer: 0 Sek",
    transcribeTimer: "Abschlusstimer: 0 Sek",
    transcriptionPlaceholder: "Das Transkript erscheint hier...",
    startButton: "Aufnahme starten",
    stopButton: "Stoppen/Abschließen",
    pauseButton: "Aufnahme pausieren",
    statusMessage: "Willkommen! Klicken Sie auf \"Aufnahme starten\", um zu beginnen.",
    noteGenerationTitle: "Notizenerstellung",
    generateNoteButton: "Notiz generieren",
    noteTimer: "Notiz-Timer: 0 Sek",
    generatedNotePlaceholder: "Die generierte Notiz erscheint hier...",
    customPromptTitle: "Benutzerdefinierte Aufforderung",
    promptSlotLabel: "Aufforderungsplatz:",
    customPromptPlaceholder: "Benutzerdefinierte Aufforderung hier eingeben",
    adUnitText: "Ihre Anzeige hier",
    guideHeading: "Anleitung & Hinweise",
    guideText: `Willkommen beim Whisper Transkriptionswerkzeug. Diese Anwendung ermöglicht es medizinischen Fachkräften, Therapeuten und anderen Praktikern, Konsultationen aufzunehmen und zu transkribieren sowie professionelle Notizen mit einem KI-basierten Notizgenerator zu erstellen.
<br><br>
<strong>So nutzen Sie die Funktionen:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf "Aufnahme starten", um mit der Tonaufnahme zu beginnen. Audio wird über MediaStreamTrackProcessor (mit WebCodecs) erfasst und bis zu 40 Sekunden lang akkumuliert, bevor es als eigenständige WAV-Datei verpackt wird.</li>
  <li><strong>Abschluss:</strong> Nach dem Klicken auf "Stoppen/Abschließen" wird die Aufnahme gestoppt. Eine letzte 2-Sekunden-Aufnahme sammelt verbleibende Töne, bevor der endgültige Teil verarbeitet wird. Der Abschlusstimer zählt, bis das vollständige Transkript vorliegt.</li>
  <li><strong>Notizenerstellung:</strong> Nach der Transkription klicken Sie auf "Notiz generieren", um eine Notiz basierend auf Ihrem Transkript und der benutzerdefinierten Aufforderung zu erstellen.</li>
  <li><strong>Benutzerdefinierte Aufforderung:</strong> Wählen Sie einen Aufforderungsplatz (1–10) und geben Sie Ihre benutzerdefinierte Aufforderung ein. Diese wird automatisch gespeichert und mit Ihrem API-Schlüssel verknüpft.</li>
  <li><strong>Anleitung:</strong> Verwenden Sie die Schaltflächen "Funktionen" und "Anleitung", um zwischen der Hauptansicht und dieser Anleitung zu wechseln.</li>
</ul>
Bitte klicken Sie auf "Funktionen", um zur Hauptoberfläche zurückzukehren.`
  },
  fr: {
    pageTitle: "Outil de transcription avec publicités et superposition de guide",
    openaiUsageLinkText: "Vue d'ensemble des coûts",
    btnFunctions: "Fonctions",
    btnGuide: "Guide",
    recordingAreaTitle: "Zone d'enregistrement",
    recordTimer: "Minuteur d'enregistrement : 0 sec",
    transcribeTimer: "Minuteur de finalisation : 0 sec",
    transcriptionPlaceholder: "Le résultat de la transcription apparaîtra ici...",
    startButton: "Démarrer l'enregistrement",
    stopButton: "Arrêter/Terminer",
    pauseButton: "Suspendre l'enregistrement",
    statusMessage: "Bienvenue ! Cliquez sur \"Démarrer l'enregistrement\" pour commencer.",
    noteGenerationTitle: "Génération de notes",
    generateNoteButton: "Générer une note",
    noteTimer: "Minuteur de génération de note : 0 sec",
    generatedNotePlaceholder: "La note générée apparaîtra ici...",
    customPromptTitle: "Invite personnalisée",
    promptSlotLabel: "Emplacement de l'invite :",
    customPromptPlaceholder: "Entrez l'invite personnalisée ici",
    adUnitText: "Votre annonce ici",
    guideHeading: "Guide et instructions",
    guideText: `Bienvenue dans l'outil de transcription Whisper. Cette application permet aux professionnels de la santé, aux thérapeutes et à d'autres praticiens d'enregistrer et de transcrire des consultations, ainsi que de générer des notes professionnelles à l'aide d'un générateur de notes alimenté par l'IA.
<br><br>
<strong>Comment utiliser les fonctions :</strong>
<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l'enregistrement" pour commencer à capturer l'audio. L'audio est capturé via MediaStreamTrackProcessor (avec WebCodecs) et accumulé pendant jusqu'à 40 secondes avant d'être emballé en un fichier WAV autonome.</li>
  <li><strong>Finalisation :</strong> Après avoir cliqué sur "Arrêter/Terminer", l'enregistrement s'arrête. Une période finale de 2 secondes collecte tout audio restant avant que le dernier segment soit traité. Le minuteur de finalisation démarre jusqu'à ce que la transcription complète soit reçue.</li>
  <li><strong>Génération de notes :</strong> Après la transcription, cliquez sur "Générer une note" pour produire une note basée sur votre transcription et votre invite personnalisée.</li>
  <li><strong>Invite personnalisée :</strong> Sur la droite, sélectionnez un emplacement d'invite (1–10) et saisissez votre invite personnalisée. Celle-ci est enregistrée automatiquement et liée à votre clé API.</li>
  <li><strong>Guide :</strong> Utilisez les boutons "Fonctions" et "Guide" pour basculer entre l'interface principale et ce guide.</li>
</ul>
Veuillez cliquer sur "Fonctions" pour revenir à l'interface principale.`
  },
  it: {
    pageTitle: "Strumento di trascrizione con annunci e sovrapposizione guida",
    openaiUsageLinkText: "Panoramica dei costi",
    btnFunctions: "Funzioni",
    btnGuide: "Guida",
    recordingAreaTitle: "Area di registrazione",
    recordTimer: "Timer di registrazione: 0 sec",
    transcribeTimer: "Timer di completamento: 0 sec",
    transcriptionPlaceholder: "Il risultato della trascrizione apparirà qui...",
    startButton: "Avvia registrazione",
    stopButton: "Ferma/Completa",
    pauseButton: "Pausa registrazione",
    statusMessage: "Benvenuto! Clicca su \"Avvia registrazione\" per iniziare.",
    noteGenerationTitle: "Generazione di note",
    generateNoteButton: "Genera nota",
    noteTimer: "Timer generazione note: 0 sec",
    generatedNotePlaceholder: "La nota generata apparirà qui...",
    customPromptTitle: "Prompt personalizzato",
    promptSlotLabel: "Slot per il prompt:",
    customPromptPlaceholder: "Inserisci il prompt personalizzato qui",
    adUnitText: "Il tuo annuncio qui",
    guideHeading: "Guida e istruzioni",
    guideText: `Benvenuto nello strumento di trascrizione Whisper. Questa applicazione consente ai professionisti del settore medico, ai terapeuti e ad altri operatori di registrare e trascrivere le consultazioni, nonché di generare note professionali utilizzando un generatore di note basato sull'IA.
<br><br>
<strong>Come utilizzare le funzioni:</strong>
<ul>
  <li><strong>Registrazione:</strong> Clicca su "Avvia registrazione" per iniziare a catturare l'audio. L'audio viene catturato tramite MediaStreamTrackProcessor (con WebCodecs) e accumulato per fino a 40 secondi prima di essere confezionato in un file WAV autonomo.</li>
  <li><strong>Completamento:</strong> Dopo aver cliccato su "Ferma/Completa", la registrazione si ferma. Un periodo finale di 2 secondi raccoglie eventuali tracce audio residue prima dell'elaborazione finale. Il timer di completamento continua fino a quando la trascrizione completa non viene ricevuta.</li>
  <li><strong>Generazione di note:</strong> Dopo la trascrizione, clicca su "Genera nota" per creare una nota basata sulla tua trascrizione e sul prompt personalizzato.</li>
  <li><strong>Prompt personalizzato:</strong> A destra, seleziona uno slot (1–10) e inserisci il tuo prompt personalizzato. Il prompt verrà salvato automaticamente e collegato alla tua chiave API.</li>
  <li><strong>Guida:</strong> Utilizza i pulsanti "Funzioni" e "Guida" per passare dalla visualizzazione funzionale a questa guida.</li>
</ul>
Clicca su "Funzioni" per tornare all'interfaccia principale.`
  }
};

// Updates the transcribe page elements based on the current language
function updateLanguageTranscribe(lang) {
  document.getElementById("page-title-transcribe").textContent = transcribeTranslations[lang].pageTitle;
  document.getElementById("openaiUsageLink").textContent = transcribeTranslations[lang].openaiUsageLinkText;
  document.getElementById("btnFunctions").textContent = transcribeTranslations[lang].btnFunctions;
  document.getElementById("btnGuide").textContent = transcribeTranslations[lang].btnGuide;
  document.getElementById("recordingAreaTitle").textContent = transcribeTranslations[lang].recordingAreaTitle;
  document.getElementById("recordTimer").textContent = transcribeTranslations[lang].recordTimer;
  document.getElementById("transcribeTimer").textContent = transcribeTranslations[lang].transcribeTimer;
  document.getElementById("transcription").setAttribute("placeholder", transcribeTranslations[lang].transcriptionPlaceholder);
  document.getElementById("startButton").textContent = transcribeTranslations[lang].startButton;
  document.getElementById("stopButton").textContent = transcribeTranslations[lang].stopButton;
  document.getElementById("pauseResumeButton").textContent = transcribeTranslations[lang].pauseButton;
  document.getElementById("statusMessage").textContent = transcribeTranslations[lang].statusMessage;
  document.getElementById("noteGenerationTitle").textContent = transcribeTranslations[lang].noteGenerationTitle;
  document.getElementById("generateNoteButton").textContent = transcribeTranslations[lang].generateNoteButton;
  document.getElementById("noteTimer").textContent = transcribeTranslations[lang].noteTimer;
  document.getElementById("generatedNote").setAttribute("placeholder", transcribeTranslations[lang].generatedNotePlaceholder);
  document.getElementById("customPromptTitle").textContent = transcribeTranslations[lang].customPromptTitle;
  document.getElementById("promptSlotLabel").textContent = transcribeTranslations[lang].promptSlotLabel;
  document.getElementById("customPrompt").setAttribute("placeholder", transcribeTranslations[lang].customPromptPlaceholder);
  document.getElementById("adUnit").textContent = transcribeTranslations[lang].adUnitText;
  document.getElementById("guideHeading").textContent = transcribeTranslations[lang].guideHeading;
  document.getElementById("guideText").innerHTML = transcribeTranslations[lang].guideText;
}

// Initializes the language selection for the transcribe page
function initTranscribeLanguage() {
  let currentLangTranscribe = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select-transcribe");
  if (!langSelect) return;
  langSelect.value = currentLangTranscribe;
  updateLanguageTranscribe(currentLangTranscribe);
  langSelect.addEventListener("change", function() {
    currentLangTranscribe = this.value;
    localStorage.setItem("siteLanguage", currentLangTranscribe);
    updateLanguageTranscribe(currentLangTranscribe);
  });
}

export { initIndexLanguage, initTranscribeLanguage };
