// translations.js
window.translations = {
  indexTranslations: {
    en: {
      pageTitle: "Whisper Transcription",
      headerTitle: "Whisper Transcription",
      headerSubtitle: "Convert speech to text for professional consultations",
      startText: "To get started, please enter your OpenAI API key:",
      apiPlaceholder: "Enter API Key here",
      enterButton: "Enter Transcription Tool",
      guideButton: "Guide for setting up API key",
      adRevenueMessage: "As we do not charge for the use of this website and rely solely on ad revenue, we kindly ask you to consent to personalized ads to help support our service.",
      consentText: "This website is free to use because we rely solely on ad revenue. We use cookies to personalize ads and improve your experience. By clicking 'Accept', you consent to the use of cookies."
    },
    no: {
      pageTitle: "Whisper Transkripsjon",
      headerTitle: "Whisper Transkripsjon",
      headerSubtitle: "Konverter tale til tekst for profesjonelle konsultasjoner",
      startText: "For å komme i gang, vennligst skriv inn din OpenAI API-nøkkel:",
      apiPlaceholder: "Skriv inn API-nøkkel her",
      enterButton: "Gå til transkripsjonsverktøy",
      guideButton: "Veiledning for oppsett av API-nøkkel",
      adRevenueMessage: "Siden vi ikke tar betalt for bruk av denne nettsiden og utelukkende er avhengige av annonseinntekter, ber vi deg samtykke til personaliserte annonser for å støtte tjenesten vår.",
      consentText: "Denne nettsiden er gratis å bruke fordi vi utelukkende er avhengige av annonseinntekter. Vi bruker informasjonskapsler for å tilpasse annonser og forbedre opplevelsen din. Ved å klikke 'Godta', samtykker du til bruken av informasjonskapsler."
    },
    sv: {
      pageTitle: "Whisper Transkription",
      headerTitle: "Whisper Transkription",
      headerSubtitle: "Omvandla tal till text för professionella konsultationer",
      startText: "För att komma igång, ange din OpenAI API-nyckel:",
      apiPlaceholder: "Ange API-nyckel här",
      enterButton: "Gå till transkriptionsverktyget",
      guideButton: "Guide för att ställa in API-nyckeln",
      adRevenueMessage: "Eftersom vi inte tar betalt för denna webbplats och endast är beroende av annonsintäkter, ber vi dig acceptera personliga annonser för att stödja vår tjänst.",
      consentText: "Denna webbplats är gratis att använda eftersom vi enbart förlitar oss på annonsintäkter. Vi använder cookies för att anpassa annonser och förbättra din upplevelse. Genom att klicka på 'Acceptera' samtycker du till användningen av cookies."
    },
    zh: {
      pageTitle: "Whisper 转录",
      headerTitle: "Whisper 转录",
      headerSubtitle: "将语音转换为专业咨询的文本",
      startText: "开始使用，请输入您的 OpenAI API 密钥：",
      apiPlaceholder: "在此输入 API 密钥",
      enterButton: "进入转录工具",
      guideButton: "设置 API 密钥指南",
      adRevenueMessage: "由于本网站免费且仅依赖广告收入，我们请求您同意个性化广告以支持我们的服务。",
      consentText: "本网站免费使用，因为我们完全依赖广告收入。我们使用 cookies 来个性化广告并改善您的体验。点击“接受”即表示您同意使用 cookies。"
    },
    de: {
      pageTitle: "Whisper Transkription",
      headerTitle: "Whisper Transkription",
      headerSubtitle: "Sprache in Text für professionelle Konsultationen umwandeln",
      startText: "Um zu beginnen, geben Sie bitte Ihren OpenAI API-Schlüssel ein:",
      apiPlaceholder: "API-Schlüssel hier eingeben",
      enterButton: "Zum Transkriptionswerkzeug",
      guideButton: "Anleitung zum Einrichten des API-Schlüssels",
      adRevenueMessage: "Da diese Website kostenlos ist und ausschließlich auf Werbeeinnahmen angewiesen ist, bitten wir Sie, personalisierte Anzeigen zu akzeptieren, um unseren Dienst zu unterstützen.",
      consentText: "Diese Website ist kostenlos, da wir ausschließlich auf Werbeeinnahmen angewiesen sind. Wir verwenden Cookies, um Anzeigen zu personalisieren und Ihr Erlebnis zu verbessern. Mit einem Klick auf 'Akzeptieren' stimmen Sie der Verwendung von Cookies zu."
    },
    fr: {
      pageTitle: "Transcription Whisper",
      headerTitle: "Transcription Whisper",
      headerSubtitle: "Convertir la parole en texte pour des consultations professionnelles",
      startText: "Pour commencer, veuillez entrer votre clé API OpenAI :",
      apiPlaceholder: "Entrez la clé API ici",
      enterButton: "Accéder à l'outil de transcription",
      guideButton: "Guide pour configurer la clé API",
      adRevenueMessage: "Comme ce site est gratuit et dépend uniquement des revenus publicitaires, nous vous demandons d'accepter les publicités personnalisées pour soutenir notre service.",
      consentText: "Ce site est gratuit car nous dépendons uniquement des revenus publicitaires. Nous utilisons des cookies pour personnaliser les annonces et améliorer votre expérience. En cliquant sur 'Accepter', vous consentez à l'utilisation des cookies."
    }
  },
  transcribeTranslations: {
    en: {
      pageTitle: "Transcription Tool with Ads and Guide Overlay",
      openaiUsageLinkText: "Cost usage overview",
      btnFunctions: "Functions",
      btnGuide: "Guide",
      recordingAreaTitle: "Recording Area",
      recordTimer: "Recording Timer: 0 sec",
      uploadTimer: "Upload Timer: 0 sec",
      transcribeTimer: "Transcription Timer: 0 sec",
      transcriptionPlaceholder: "Transcription result will appear here...",
      startButton: "Start Recording",
      stopButton: "Stop Recording",
      pauseButton: "Pause Recording",
      transcribeButton: "Transcribe",
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
  <li><strong>Recording:</strong> Click "Start Recording" to begin capturing audio. Use "Stop Recording" to end and upload your recording.</li>
  <li><strong>Transcription:</strong> Once your audio is uploaded, click "Transcribe" to convert speech to text. The transcription will appear in the top area.</li>
  <li><strong>Note Generation:</strong> After transcription, click "Generate Note" to produce a note based on your transcription and custom prompt. A timer shows the duration of note generation, and the generated note appears below.</li>
  <li><strong>Custom Prompt:</strong> On the right, select a prompt slot (1–10) and enter your custom prompt. Your prompt is saved automatically and linked to your API key.</li>
  <li><strong>Guide Toggle:</strong> Use the "Functions" and "Guide" buttons to switch between the functional view and this guide. The guide appears as an overlay and does not disturb the underlying layout.</li>
</ul>
Please click "Functions" to return to the main interface.`,
      consentText: "This website is free to use because we rely solely on ad revenue. We use cookies to personalize ads and improve your experience. By clicking 'Accept', you consent to the use of cookies."
    },
    no: {
      pageTitle: "Transkripsjonsverktøy med annonser og veiledningsoverlegg",
      openaiUsageLinkText: "Vis OpenAI bruk",
      btnFunctions: "Funksjoner",
      btnGuide: "Veiledning",
      recordingAreaTitle: "Opptaksområde",
      recordTimer: "Opptakstimer: 0 sek",
      uploadTimer: "Opplastningstimer: 0 sek",
      transcribeTimer: "Transkripsjonstimer: 0 sek",
      transcriptionPlaceholder: "Transkripsjonsresultatet vises her...",
      startButton: "Start opptak",
      stopButton: "Stopp opptak",
      pauseButton: "Pause opptak",
      transcribeButton: "Transkriber",
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
  <li><strong>Opptak:</strong> Klikk på "Start opptak" for å starte opptaket. Klikk på "Stopp opptak" for å avslutte og laste opp opptaket.</li>
  <li><strong>Transkripsjon:</strong> Når opptaket er lastet opp, klikk "Transkriber" for å omforme tale til tekst. Transkripsjonen vises øverst.</li>
  <li><strong>Notatgenerering:</strong> Etter transkripsjonen, klikk "Generer notat" for å lage et notat basert på transkripsjonen og din tilpassede melding. En timer viser varigheten av notatgenereringen, og det genererte notatet vises nedenfor.</li>
  <li><strong>Tilpasset melding:</strong> Velg et meldingsfelt (1–10) og skriv inn din tilpassede melding. Dette lagres automatisk og knyttes til din API-nøkkel.</li>
  <li><strong>Guide:</strong> Klikk på "Funksjoner" for å gå tilbake til hovedskjermen.</li>
</ul>
Klikk på "Funksjoner" for å gå tilbake til hovedskjermen.`,
      consentText: "Denne nettsiden er gratis å bruke fordi vi utelukkende er avhengige av annonseinntekter. Vi bruker informasjonskapsler for å tilpasse annonser og forbedre opplevelsen din. Ved å klikke 'Godta', samtykker du til bruken av informasjonskapsler."
    },
    sv: {
      pageTitle: "Transkriptionsverktyg med annonser och guideöverlägg",
      openaiUsageLinkText: "Visa OpenAI användning",
      btnFunctions: "Funktioner",
      btnGuide: "Guide",
      recordingAreaTitle: "Inspelningsområde",
      recordTimer: "Inspelningstimer: 0 sek",
      uploadTimer: "Uppladdningstimer: 0 sek",
      transcribeTimer: "Transkriptionstimer: 0 sek",
      transcriptionPlaceholder: "Transkriptet visas här...",
      startButton: "Starta inspelning",
      stopButton: "Stoppa inspelning",
      pauseButton: "Pausa inspelning",
      transcribeButton: "Transkribera",
      statusMessage: "Välkommen! Klicka på 'Starta inspelning' för att börja.",
      noteGenerationTitle: "Notatgenerering",
      generateNoteButton: "Generera notat",
      noteTimer: "Notatgenereringstimer: 0 sek",
      generatedNotePlaceholder: "Genererat notat visas här...",
      customPromptTitle: "Anpassat meddelande",
      promptSlotLabel: "Meddelandefält:",
      customPromptPlaceholder: "Ange ditt anpassade meddelande här",
      adUnitText: "Din annons här",
      guideHeading: "Guide & Instruktioner",
      guideText: `Välkommen till Whisper Transkriptionsverktyget. Detta verktyg låter medicinska experter, terapeuter och andra utövare spela in och transkribera konsultationer samt generera professionella noteringar med hjälp av en AI-driven notatgenerator.
<br><br>
<strong>Så här använder du verktyget:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka på "Starta inspelning" för att börja spela in. Klicka sedan på "Stoppa inspelning" för att avsluta och ladda upp inspelningen.</li>
  <li><strong>Transkription:</strong> När inspelningen har laddats upp, klicka på "Transkribera" för att omvandla tal till text. Transkriptionen visas högst upp.</li>
  <li><strong>Notatgenerering:</strong> Efter inspelningen, klicka på "Generera notat" för att skapa ett notat baserat på inspelningen och ditt anpassade meddelande. En timer visar hur lång tid notatgenereringen tar, och det genererade notatet visas nedan.</li>
  <li><strong>Anpassat meddelande:</strong> Välj ett meddelandefält (1–10) och skriv in ditt anpassade meddelande. Detta sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guide:</strong> Klicka på "Funktioner" för att återgå till huvudsidan.</li>
</ul>
Klicka på "Funktioner" för att återgå till huvudsidan.`,
      consentText: "Denna webbplats är gratis att använda eftersom vi enbart förlitar oss på annonsintäkter. Vi använder cookies för att anpassa annonser och förbättra din upplevelse. Genom att klicka på 'Acceptera' samtycker du till användningen av cookies."
    },
    zh: {
      pageTitle: "Whisper 转录",
      openaiUsageLinkText: "查看 OpenAI 使用情况",
      btnFunctions: "功能",
      btnGuide: "指南",
      recordingAreaTitle: "录音区域",
      recordTimer: "录音计时器: 0 秒",
      uploadTimer: "上传计时器: 0 秒",
      transcribeTimer: "转录计时器: 0 秒",
      transcriptionPlaceholder: "转录结果将在此显示……",
      startButton: "开始录音",
      stopButton: "停止录音",
      pauseButton: "暂停录音",
      transcribeButton: "转录",
      statusMessage: "欢迎！点击“开始录音”开始录音。",
      noteGenerationTitle: "笔记生成",
      generateNoteButton: "生成笔记",
      noteTimer: "笔记生成计时器: 0 秒",
      generatedNotePlaceholder: "生成的笔记将在此显示……",
      customPromptTitle: "自定义提示",
      promptSlotLabel: "提示槽：",
      customPromptPlaceholder: "在此输入自定义提示",
      adUnitText: "您的广告在此",
      guideHeading: "指南与说明",
      guideText: `欢迎使用 Whisper 转录工具。本工具允许医疗专业人员、治疗师及其他从业者录制并转录咨询内容，同时利用 AI 驱动的笔记生成器生成专业笔记。
<br><br>
<strong>如何使用此工具：</strong>
<ul>
  <li><strong>录音：</strong>点击“开始录音”开始录音，点击“停止录音”结束并上传录音。</li>
  <li><strong>转录：</strong>录音上传后，点击“转录”将语音转换为文本，转录结果将在上方显示。</li>
  <li><strong>笔记生成：</strong>转录完成后，点击“生成笔记”以根据转录内容和自定义提示生成笔记。计时器显示生成笔记所需时间，生成的笔记将在下方显示。</li>
  <li><strong>自定义提示：</strong>在右侧选择提示槽（1–10）并输入您的自定义提示，该提示会自动保存并与您的 API 密钥关联。</li>
  <li><strong>指南：</strong>使用“功能”和“指南”按钮在工具界面和本指南之间切换。</li>
</ul>
点击“功能”返回主界面。`,
      consentText: "本网站免费使用，因为我们完全依赖广告收入。我们使用 cookies 来个性化广告并改善您的体验。点击“接受”即表示您同意使用 cookies。"
    },
    de: {
      pageTitle: "Whisper Transkription",
      openaiUsageLinkText: "OpenAI-Nutzung anzeigen",
      btnFunctions: "Funktionen",
      btnGuide: "Guide",
      recordingAreaTitle: "Aufnahmebereich",
      recordTimer: "Aufnahmetimer: 0 Sek",
      uploadTimer: "Upload-Timer: 0 Sek",
      transcribeTimer: "Transkriptionstimer: 0 Sek",
      transcriptionPlaceholder: "Das Transkript erscheint hier...",
      startButton: "Aufnahme starten",
      stopButton: "Aufnahme stoppen",
      pauseButton: "Aufnahme pausieren",
      transcribeButton: "Transkribieren",
      statusMessage: "Willkommen! Klicken Sie auf 'Aufnahme starten', um zu beginnen.",
      noteGenerationTitle: "Notizgenerierung",
      generateNoteButton: "Notiz generieren",
      noteTimer: "Notizgenerierungstimer: 0 Sek",
      generatedNotePlaceholder: "Die generierte Notiz erscheint hier...",
      customPromptTitle: "Benutzerdefinierte Eingabe",
      promptSlotLabel: "Eingabefeld:",
      customPromptPlaceholder: "Geben Sie hier Ihre benutzerdefinierte Eingabe ein",
      adUnitText: "Ihre Anzeige hier",
      guideHeading: "Guide & Anleitungen",
      guideText: `Willkommen beim Whisper Transkriptionswerkzeug. Diese Anwendung ermöglicht es medizinischen Fachkräften, Therapeuten und anderen Anwendern, Beratungsgespräche aufzunehmen und zu transkribieren sowie professionelle Notizen mit Hilfe eines KI-gestützten Notizgenerators zu erstellen.
<br><br>
<strong>So verwenden Sie das Tool:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf "Aufnahme starten", um die Aufnahme zu beginnen. Klicken Sie auf "Aufnahme stoppen", um sie zu beenden und hochzuladen.</li>
  <li><strong>Transkription:</strong> Sobald die Aufnahme hochgeladen ist, klicken Sie auf "Transkribieren", um Sprache in Text umzuwandeln. Das Transkript erscheint im oberen Bereich.</li>
  <li><strong>Notizgenerierung:</strong> Nach der Transkription klicken Sie auf "Notiz generieren", um basierend auf dem Transkript und Ihrer benutzerdefinierten Eingabe eine Notiz zu erstellen. Ein Timer zeigt die Dauer der Notizgenerierung, und die generierte Notiz erscheint unten.</li>
  <li><strong>Benutzerdefinierte Eingabe:</strong> Wählen Sie rechts ein Eingabefeld (1–10) aus und geben Sie Ihre benutzerdefinierte Eingabe ein. Diese wird automatisch gespeichert und mit Ihrem API-Schlüssel verknüpft.</li>
  <li><strong>Guide:</strong> Klicken Sie auf "Funktionen", um zur Hauptansicht zurückzukehren.</li>
</ul>
Klicken Sie auf "Funktionen", um zur Hauptansicht zurückzukehren.`,
      consentText: "Diese Website ist kostenlos, da wir ausschließlich auf Werbeeinnahmen angewiesen sind. Wir verwenden Cookies, um Anzeigen zu personalisieren und Ihr Erlebnis zu verbessern. Mit einem Klick auf 'Akzeptieren' stimmen Sie der Verwendung von Cookies zu."
    },
    fr: {
      pageTitle: "Transcription Whisper",
      openaiUsageLinkText: "Voir l'utilisation OpenAI",
      btnFunctions: "Fonctions",
      btnGuide: "Guide",
      recordingAreaTitle: "Zone d'enregistrement",
      recordTimer: "Minuterie d'enregistrement : 0 sec",
      uploadTimer: "Minuterie de chargement : 0 sec",
      transcribeTimer: "Minuterie de transcription : 0 sec",
      transcriptionPlaceholder: "Le résultat de la transcription s'affichera ici…",
      startButton: "Démarrer l'enregistrement",
      stopButton: "Arrêter l'enregistrement",
      pauseButton: "Mettre en pause",
      transcribeButton: "Transcrire",
      statusMessage: "Bienvenue ! Cliquez sur \"Démarrer l'enregistrement\" pour commencer.",
      noteGenerationTitle: "Génération de notes",
      generateNoteButton: "Générer une note",
      noteTimer: "Minuterie de génération de notes : 0 sec",
      generatedNotePlaceholder: "La note générée s'affichera ici…",
      customPromptTitle: "Message personnalisé",
      promptSlotLabel: "Emplacement du message :",
      customPromptPlaceholder: "Entrez votre message personnalisé ici",
      adUnitText: "Votre annonce ici",
      guideHeading: "Guide & Instructions",
      guideText: `Bienvenue sur l'outil de transcription Whisper. Cette application permet aux professionnels de la santé, aux thérapeutes et à d'autres praticiens d'enregistrer et de transcrire des consultations, ainsi que de générer des notes professionnelles à l'aide d'un générateur de notes propulsé par l'IA.
<br><br>
<strong>Comment utiliser l'outil :</strong>
<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l'enregistrement" pour commencer à enregistrer. Cliquez sur "Arrêter l'enregistrement" pour terminer et télécharger l'enregistrement.</li>
  <li><strong>Transcription :</strong> Une fois l'enregistrement téléchargé, cliquez sur "Transcrire" pour convertir la parole en texte. La transcription s'affichera dans la partie supérieure.</li>
  <li><strong>Génération de notes :</strong> Après la transcription, cliquez sur "Générer une note" pour produire une note basée sur la transcription et votre message personnalisé. Une minuterie indiquera la durée de génération, et la note générée s'affichera ci-dessous.</li>
  <li><strong>Message personnalisé :</strong> Sur la droite, sélectionnez un emplacement de message (1–10) et saisissez votre message personnalisé. Ce message sera sauvegardé automatiquement et associé à votre clé API.</li>
  <li><strong>Guide :</strong> Utilisez les boutons "Fonctions" et "Guide" pour alterner entre l'interface fonctionnelle et ce guide.</li>
</ul>
Cliquez sur "Fonctions" pour revenir à l'interface principale.`,
      consentText: "Ce site est gratuit car nous dépendons uniquement des revenus publicitaires. Nous utilisons des cookies pour personnaliser les annonces et améliorer votre expérience. En cliquant sur 'Accepter', vous consentez à l'utilisation des cookies."
    }
  }
};
