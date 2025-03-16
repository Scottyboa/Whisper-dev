const indexTranslations = {
  en: {
    pageTitle: "Whisper Clinical Transcription",
    headerTitle: "Whisper Clinical Transcription",
    headerSubtitle: "Advanced AI-Powered Speech-to-Text and Note Generation for Healthcare Consultations",
    startText: "To get started, please enter your OpenAI API key:",
    apiPlaceholder: "Enter API Key here",
    enterButton: "Enter Transcription Tool",
    guideButton: "API guide - How to use",
    securityButton: "Security",
    aboutButton: "About",
    adRevenueMessage: "As this website is free to use and relies solely on ad revenue, please consent to personalized ads to help support the service.",
    securityModalHeading: "Security Information",
    securityModalText: `Your privacy and the security of patient information are the highest priorities. To ensure that data remains confidential:<br><br>
- <strong>Data Encryption:</strong> All data processed by the system is secured using industry-standard encryption methods. Transcripts and notes are linked exclusively to your encrypted personal API key and the device used for access, ensuring that only you have access to the generated content.<br><br>
- <strong>Automatic Deletion:</strong> Once a transcript or note is generated and displayed on your screen, it is automatically and irreversibly deleted from the servers within 2 minutes.<br><br>
- <strong>Unauthorized Access Protection:</strong> Even if unauthorized access to your API key were to occur, the data remains encrypted and secured by device-specific markers, rendering the information inaccessible.<br><br>
- <strong>GDPR-Compliant Hosting:</strong> All backend processes run on dedicated Microsoft Azure servers located within the EU, fully compliant with GDPR regulations.<br><br>
Rest assured, stringent security measures ensure that all patient-related data remains safe, confidential, and entirely under your control.`,
    aboutModalHeading: "About This Project",
    aboutModalText: `I’m a Norwegian family doctor with a strong interest in technology and AI developments in healthcare. I developed this solution to significantly reduce transcription costs and provide an affordable, direct-to-OpenAI service. You pay only for the actual OpenAI usage fee without any monthly subscription.`,
    guideModalHeading: "How to Set Up Your OpenAI API for Whisper Clinical Transcription",
    guideModalText: `To use this webapp, you must first create an OpenAI API profile, generate an API key, and fund your OpenAI wallet. Your API key is then copied and pasted into the provided API key field. Once you press Enter, the webapp saves the API key temporarily for your session—this key links you to the OpenAI servers so that speech-to-text transcription and note generation can work. Please note, you are charged immediately per task performed. For more info on cost, please review the "Cost" section on the front page.
<br><br>
<strong>1. Create Your OpenAI API Profile</strong><br>
To begin, you need to create a profile on the OpenAI API platform. This profile serves as your account for managing API keys and billing. To get started, visit the <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> page. Follow the instructions to sign up by providing your email address, setting a password, and verifying your account. Once registered, you'll have access to your dashboard.
<br><br>
<strong>2. Generate an API Key</strong><br>
After creating your profile, generate an API key by navigating to the <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> page. Click the button to create a new API key. Important: You will only see your API key once. Copy it immediately and store it securely (e.g., in a text file) for future use. If you lose the key or suspect it has been compromised, delete it from your account and create a new one.
<br><br>
<strong>3. Fund Your OpenAI Wallet</strong><br>
For the webapp to function, your OpenAI wallet must have sufficient funds. Visit the <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> page to add funds. You can transfer any amount at any time. As long as funds are available, you'll be able to use the site—each task is charged immediately. For more info on costs, please see the "Cost" section on the front page.
<br><br>
<strong>Session Security Reminder</strong><br>
When you log in by entering your API key, it is stored only temporarily in your browser session. This means if you exit the website, close your browser, or turn off your computer, the API key will not be saved. You will need to re-enter your API key the next time you use the webapp, ensuring your key remains secure.`,
    priceButton: "Price",
    priceModalHeading: "Cost Information",
    priceModalText: `# Cost Information

## Speech-to-Text Pricing  
   - **Cost:** $0.006 per minute.  
     *Example:* A 15-minute consultation will cost 15 × $0.006 = **$0.09** per consultation.

## Note Generation Pricing  
   - **Token-Based Pricing:**  
     - **Input (transcription + prompt):** $10 per 1,000,000 tokens (i.e. $0.00001 per token).  
     - **Output (generated note):** $30 per 1,000,000 tokens (i.e. $0.00003 per token).

       #### Example Consultation Calculation (Note Generation Only)
       1. **Input Calculation:**  
          - Assume the consultation transcription is about **700 words** and you add a **30-word prompt**.  
          - Total words = 700 + 30 = **730 words**.  
          - Estimated tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Input cost = 547.5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Output Calculation:**  
          - Assume the generated note is around **250 words**.  
          - Estimated tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Output cost = 187.5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total Note Generation Cost:**  
          - Combined cost ≈ $0.0055 + $0.0056 = **$0.0111** per consultation.

## Approximate Combined Cost Per Consultation  
(for a 15 min consultation/recording, using both functions)  
   - **Speech-to-Text:** **$0.09**  
   - **Note Generation:** **$0.0111**  
   - **Total:** Approximately **$0.101** per consultation.

## Monthly Cost Estimates  
Assuming you conduct 20 consultations per day, 4 days per week, over 4 weeks per month (20 × 4 × 4 = **320 consultations** per month):

   1. **Using Only Speech-to-Text** (with note generation via your own ChatGPT account, which is essentially free):  
      - Monthly cost = 320 × $0.09 = **$28.80**.
   2. **Using Both Speech-to-Text and Note Generation:**  
      - Monthly cost = 320 × $0.101 ≈ **$32.32**.

## Alternative Note Generation Option  
   If you already have an OpenAI account, you can use note generation via ChatGPT on your own profile—which is essentially free. In that case, you only incur the speech-to-text cost when using this webapp.

## Usage Flexibility  
   Unlike providers that require a monthly subscription, you only pay per usage. If you take a day off, go on vacation, or have a period of no activity, your costs will be zero. Even if you use the service every day for all your patient consultations, the per-use cost remains significantly lower compared to other providers.

---

**Direct Connection Advantage**  
Our webapp connects you directly with the OpenAI API—no intermediary, no extra fees. This direct link means you only pay for the actual AI processing cost, making our service one of the most affordable speech-to-text and note generation solutions available today.`,
  },
  no: {
    pageTitle: "Whisper Klinisk Transkripsjon",
    headerTitle: "Whisper Klinisk Transkripsjon",
    headerSubtitle: "Avansert AI-drevet tale-til-tekst og notatgenerering for helsekonsultasjoner",
    startText: "For å komme i gang, vennligst skriv inn din OpenAI API-nøkkel:",
    apiPlaceholder: "Skriv inn API-nøkkel her",
    enterButton: "Gå til transkripsjonsverktøy",
    guideButton: "API-veiledning – Slik bruker du",
    securityButton: "Sikkerhet",
    aboutButton: "Om",
    adRevenueMessage: "Siden denne nettsiden er gratis å bruke og kun støttes av annonseinntekter, vennligst gi ditt samtykke til personaliserte annonser for å støtte tjenesten.",
    securityModalHeading: "Sikkerhetsinformasjon",
    securityModalText: `Personvernet og sikkerheten til pasientinformasjon er av høyeste prioritet. For å sikre at data forblir konfidensielle:<br><br>
- <strong>Datakryptering:</strong> All data behandlet av systemet sikres med industristandard kryptering.<br><br>
- <strong>Automatisk sletting:</strong> Transkripsjoner og notater slettes automatisk innen 2 minutter.<br><br>
- <strong>Uautorisert tilgangsbeskyttelse:</strong> Data er beskyttet med enhetsspesifikke markører.<br><br>
- <strong>GDPR-kompatibel hosting:</strong> Alle prosesser kjøres på Azure-servere i EU.`,
    aboutModalHeading: "Om dette prosjektet",
    aboutModalText: `Jeg er en norsk allmennlege med stor interesse for teknologi og AI i helsevesenet. Dette verktøyet er utviklet for å redusere transkripsjonskostnadene og tilby en direkte løsning til OpenAI uten ekstra abonnement.`,
    guideModalHeading: "Slik setter du opp din OpenAI API for Whisper Klinisk Transkripsjon",
    guideModalText: `For å bruke dette verktøyet må du først opprette en profil på OpenAI API, generere en API-nøkkel og fylle opp lommeboken din. API-nøkkelen kopieres og limes inn i feltet. Når du trykker Enter lagres nøkkelen midlertidig – den kobler deg til OpenAI slik at transkripsjon og notatgenerering fungerer. Du belastes umiddelbart per oppgave. For mer info om kostnader, se "Kostnader" på forsiden.
<br><br>
<strong>1. Opprett din OpenAI API-profil</strong><br>
Besøk <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> for å registrere deg. Følg instruksjonene med e-post, passord og verifisering.
<br><br>
<strong>2. Generer en API-nøkkel</strong><br>
Gå til <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> for å opprette en ny API-nøkkel. Kopier nøkkelen umiddelbart.
<br><br>
<strong>3. Fyll opp din OpenAI-lommebok</strong><br>
Besøk <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> for å legge til midler. Hver oppgave trekkes direkte fra lommeboken.
<br><br>
<strong>Sikkerhetspåminnelse</strong><br>
API-nøkkelen lagres kun midlertidig i nettlesersesjonen. Du må taste den inn på nytt ved neste besøk.`,
    priceButton: "Pris",
    priceModalHeading: "Kostnadsinformasjon for Whisper Klinisk Transkripsjon",
    priceModalText: `# Kostnadsinformasjon for Whisper Klinisk Transkripsjon

## Tale-til-tekst Prising  
   - **Kostnad:** $0.006 per minutt.  
     *Eksempel:* En 15-minutters konsultasjon vil koste 15 × $0.006 = **$0.09** per konsultasjon.

## Notatgenererings Prising  
   - **Token-basert Prising:**  
     - **Input (transkripsjon + prompt):** $10 per 1,000,000 tokens (dvs. $0.00001 per token).  
     - **Output (generert notat):** $30 per 1,000,000 tokens (dvs. $0.00003 per token).

       #### Eksempelberegning (Kun Notatgenerering)
       1. **Inputberegning:**  
          - Anta at konsultasjonens transkripsjon er cirka **700 ord** og du legger til en **30-ords prompt**.  
          - Totalt = 700 + 30 = **730 ord**.  
          - Estimerte tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Input-kostnad = 547.5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Outputberegning:**  
          - Anta at det genererte notatet er rundt **250 ord**.  
          - Estimerte tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Output-kostnad = 187.5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total kostnad for notatgenerering:**  
          - Samlet kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultasjon.

## Ungefähre Gesamtkosten pro Konsultasjon  
(før en 15-minutters konsultasjon/innspilling med begge funksjonene)  
   - **Tal-til-tekst:** **$0.09**  
   - **Notatgenerering:** **$0.0111**  
   - **Gesamt:** Ungefähr **$0.101** per konsultasjon.

## Månatlige kostnadsuppskattninger  
Om du gjennomfører 20 konsultasjoner per dag, 4 dager i uken, over 4 uker (20 × 4 × 4 = **320 konsultasjoner** per måned):

   1. **Enda kun Tale-til-tekst:**  
      - Kostnad = 320 × $0.09 = **$28.80**.
   2. **Med begge funksjonene:**  
      - Kostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativ for notatgenerering  
   Hvis du allerede har et OpenAI-konto, kan du bruke notatgenerering via ChatGPT – som i realiteten er gratis. Da betaler du kun for Tale-til-tekst når du bruker denne webappen.

## Ungefähre Gesamtkosten  
   (for en 15-minutters konsultasjon/inspilling med begge funksjonene)  
   - **Totalt:** Omtrent **$0.101** per konsultasjon.

---  

**Vorteil der direkten Verbindung**  
Unsere Web-App verbindet Sie direkt mit der OpenAI API – keine Zwischenhändler, keine zusätzlichen Gebühren. Diese direkte Verbindung bedeutet, dass Sie nur für die tatsächlichen KI-Verarbeitungskosten zahlen, was unseren Dienst zu einer der kostengünstigsten Lösungen für Sprache-zu-Text und Notizenerstellung macht, die heute verfügbar sind.`,
  },
  fr: {
    pageTitle: "Whisper Transcription Clinique - Outil de Transcription",
    openaiUsageLinkText: "Vue d'ensemble de l'utilisation d'OpenAI",
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
    guideText: `Bienvenue dans l'outil de transcription Whisper. Cette application permet d'enregistrer, de transcrire et de générer des notes professionnelles grâce à l'IA.<br><br>
<strong>Comment utiliser les fonctions :</strong>
<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l'enregistrement" pour commencer à capturer l'audio.</li>
  <li><strong>Finalisation :</strong> Cliquez sur "Arrêter/Terminer" pour arrêter l'enregistrement.</li>
  <li><strong>Génération de notes :</strong> Cliquez sur "Générer une note" après la transcription.</li>
  <li><strong>Invite personnalisée :</strong> Sélectionnez un emplacement (1–10) et saisissez votre invite.</li>
  <li><strong>Guide :</strong> Utilisez les boutons "Fonctions" et "Guide" pour alterner.</li>
</ul>
Veuillez cliquer sur "Fonctions" pour revenir à l'interface principale.`,
    priceButton: "Prix",
    priceModalHeading: "Informations de coût pour Whisper Transcription Clinique",
    priceModalText: `# Informations sur les coûts

## Tarification de la conversion de la parole en texte (Speech-to-Text)  
   - **Coût :** $0.006 par minute.  
     *Exemple :* Une consultation de 15 minutes coûtera 15 × $0.006 = **$0.09** par consultation.  

## Tarification de la génération de notes  
   - **Tarification basée sur les tokens :**  
     - **Entrée (transcription + prompt) :** $10 pour 1 000 000 de tokens (soit $0.00001 par token).  
     - **Sortie (note générée) :** $30 pour 1 000 000 de tokens (soit $0.00003 par token).  

       #### Exemple de calcul pour une consultation (uniquement pour la génération de notes)  
       1. **Calcul de l’entrée :**  
          - Supposons que la transcription de la consultation contienne **700 mots** et que vous ajoutiez un **prompt de 30 mots**.  
          - Nombre total de mots = 700 + 30 = **730 mots**.  
          - Estimation des tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Coût de l’entrée = 547.5 tokens × $0.00001 ≈ **$0.0055**.  
       2. **Calcul de la sortie :**  
          - Supposons que la note générée fasse environ **250 mots**.  
          - Estimation des tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Coût de la sortie = 187.5 tokens × $0.00003 ≈ **$0.0056**.  
       3. **Coût total de la génération de notes :**  
          - Coût combiné ≈ $0.0055 + $0.0056 = **$0.0111** par consultation.  

## Coût total approximatif par consultation  
(pour un enregistrement/une consultation de 15 minutes utilisant les deux fonctions)  
   - **Parole en texte :** **$0.09**  
   - **Génération de notes :** **$0.0111**  
   - **Total :** Environ **$0.101** par consultation.  

## Estimations des coûts mensuels  
Si vous effectuez 20 consultations par jour, 4 jours par semaine, sur 4 semaines par mois (20 × 4 × 4 = **320 consultations** par mois) :  

   1. **Utilisation uniquement de la conversion parole en texte** (avec génération de notes via votre propre compte ChatGPT, ce qui est pratiquement gratuit) :  
      - Coût mensuel = 320 × $0.09 = **$28.80**.  
   2. **Utilisation de la conversion parole en texte et de la génération de notes :**  
      - Coût mensuel = 320 × $0.101 ≈ **$32.32**.  

## Option alternative pour la génération de notes  
   Si vous possédez déjà un compte OpenAI, vous pouvez utiliser la génération de notes via ChatGPT sur votre propre profil, ce qui est pratiquement gratuit. Dans ce cas, le seul coût sera celui de la conversion parole en texte lorsque vous utilisez cette application web.  

## Flexibilité d’utilisation  
   Contrairement aux fournisseurs qui imposent un abonnement mensuel, vous ne payez que selon votre utilisation. Si vous prenez un jour de congé, partez en vacances ou traversez une période d’inactivité, vos coûts seront nuls. Même si vous utilisez le service quotidiennement pour toutes vos consultations, le coût par utilisation reste nettement inférieur à celui des autres fournisseurs.

---  

**Avantage de la connexion directe**  
Notre application web se connecte directement à l’API OpenAI – sans intermédiaire ni frais supplémentaires. Cette connexion directe signifie que vous ne payez que pour le coût réel du traitement de l’IA, faisant de notre service l’une des solutions les plus abordables pour la conversion parole en texte et la génération de notes disponibles aujourd’hui.`
  },
  it: {
    pageTitle: "Whisper Trascrizione Clinica - Strumento di Trascrizione",
    openaiUsageLinkText: "Panoramica dell'utilizzo di OpenAI",
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
    guideText: `Benvenuto nello strumento di trascrizione Whisper. Questa applicazione permette di registrare, trascrivere e generare note professionali grazie all'IA.<br><br>
<strong>Come utilizzare le funzioni:</strong>
<ul>
  <li><strong>Registrazione:</strong> Clicca su "Avvia registrazione" per iniziare.</li>
  <li><strong>Completamento:</strong> Clicca su "Ferma/Completa" per terminare la registrazione.</li>
  <li><strong>Generazione di note:</strong> Clicca su "Genera nota" dopo la trascrizione.</li>
  <li><strong>Prompt personalizzato:</strong> Seleziona uno slot e inserisci il tuo prompt.</li>
  <li><strong>Guida:</strong> Utilizza i pulsanti "Funzioni" e "Guida" per passare dall'interfaccia alla guida.</li>
</ul>
Clicca su "Funzioni" per tornare all'interfaccia principale.`,
    priceButton: "Prezzo",
    priceModalHeading: "Informazioni sui costi",
    priceModalText: `# Informazioni sui costi

## Prezzi per il riconoscimento vocale (Speech-to-Text)  
   - **Costo:** $0.006 al minuto.  
     *Esempio:* Una consulenza di 15 minuti costerà 15 × $0.006 = **$0.09** per consulenza.  

## Prezzi per la generazione di note  
   - **Prezzi basati sui token:**  
     - **Input (trascrizione + prompt):** $10 per 1.000.000 di token (ovvero $0.00001 per token).  
     - **Output (nota generata):** $30 per 1.000.000 di token (ovvero $0.00003 per token).  

       #### Esempio di calcolo per una consulenza (solo generazione di note)  
       1. **Calcolo dell'input:**  
          - Supponiamo che la trascrizione della consulenza sia di circa **700 parole** e che tu aggiunga un **prompt di 30 parole**.  
          - Totale parole = 700 + 30 = **730 parole**.  
          - Token stimati = 730 × 0.75 ≈ **547.5 token**.  
          - Costo dell'input = 547.5 token × $0.00001 ≈ **$0.0055**.  
       2. **Calcolo dell'output:**  
          - Supponiamo che la nota generata sia di circa **250 parole**.  
          - Token stimati = 250 × 0.75 ≈ **187.5 token**.  
          - Costo dell'output = 187.5 token × $0.00003 ≈ **$0.0056**.  
       3. **Costo totale della generazione della nota:**  
          - Costo combinato ≈ $0.0055 + $0.0056 = **$0.0111** per consulenza.  

## Costo totale approssimativo per consulenza  
(per una registrazione/consulenza di 15 minuti utilizzando entrambe le funzioni)  
   - **Riconoscimento vocale:** **$0.09**  
   - **Generazione della nota:** **$0.0111**  
   - **Totale:** Circa **$0.101** per consulenza.  

## Stima dei costi mensili  
Se effettui 20 consulenze al giorno, 4 giorni a settimana, per 4 settimane al mese (20 × 4 × 4 = **320 consulenze** al mese):  

   1. **Solo riconoscimento vocale** (generazione di note tramite il tuo account ChatGPT, che è praticamente gratuito):  
      - Costo mensile = 320 × $0.09 = **$28.80**.  
   2. **Utilizzo sia del riconoscimento vocale che della generazione di note:**  
      - Costo mensile = 320 × $0.101 ≈ **$32.32**.  

## Opzione alternativa per la generazione di note  
   Se possiedi già un account OpenAI, puoi generare note tramite ChatGPT sul tuo profilo personale, il che è praticamente gratuito. In questo caso, l'unico costo sarà quello per il riconoscimento vocale quando utilizzi questa webapp.  

## Flessibilità d’uso  
   A differenza di altri fornitori che richiedono un abbonamento mensile, qui paghi solo per l’effettivo utilizzo. Se prendi un giorno di pausa, vai in vacanza o hai un periodo di inattività, il costo sarà pari a zero. Anche utilizzando il servizio quotidianamente per tutte le consulenze, il costo per utilizzo rimane significativamente inferiore rispetto ad altri fornitori.

---  

**Vantaggio della connessione diretta**  
La nostra webapp si collega direttamente all’API di OpenAI, senza intermediari né costi aggiuntivi. Questa connessione diretta significa che paghi solo per il costo effettivo dell’elaborazione AI, rendendo il nostro servizio una delle soluzioni più economiche per il riconoscimento vocale e la generazione di note disponibili oggi.`
  }
};

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
    guideText: `Welcome to the Whisper Transcription tool. This application allows medical professionals, therapists, and other practitioners to record and transcribe consultations, as well as generate professional notes using an AI-powered note generator.<br><br>
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
    pageTitle: "Whisper Klinisk Transkripsjon - Transkripsjonsverktøy",
    openaiUsageLinkText: "Vis OpenAI-bruk",
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
    guideText: `Velkommen til Whisper Transkripsjonsverktøy. Denne applikasjonen lar deg ta opp og transkribere konsultasjoner, samt generere profesjonelle notater med AI.<br><br>
<strong>Slik bruker du funksjonene:</strong>
<ul>
  <li><strong>Opptak:</strong> Klikk "Start opptak" for å starte lydopptaket.</li>
  <li><strong>Fullføring:</strong> Klikk "Stopp/Fullfør" for å avslutte opptaket. En 2-sekunders periode samler opp eventuell gjenværende lyd.</li>
  <li><strong>Notatgenerering:</strong> Klikk "Generer notat" etter transkripsjonen.</li>
  <li><strong>Tilpasset melding:</strong> Velg et meldingsfelt (1–10) og skriv inn din melding. Meldingen lagres automatisk.</li>
  <li><strong>Veiledning:</strong> Bruk "Funksjoner" og "Veiledning" for å bytte visning.</li>
</ul>
Klikk "Funksjoner" for å gå tilbake til hovedskjermen.`
  },
  sv: {
    pageTitle: "Whisper Klinisk Transkription",
    headerTitle: "Whisper Klinisk Transkription",
    headerSubtitle: "Avancerad AI-driven tal-till-text och notisgenerering för vårdkonsultationer",
    startText: "För att komma igång, ange din OpenAI API-nyckel:",
    apiPlaceholder: "Ange API-nyckel här",
    enterButton: "Gå till transkriberingsverktyget",
    guideButton: "API-guide – Hur du använder",
    securityButton: "Säkerhet",
    aboutButton: "Om",
    adRevenueMessage: "Eftersom denna webbplats är gratis och enbart förlitar sig på annonsintäkter, vänligen godkänn personliga annonser för att stödja tjänsten.",
    securityModalHeading: "Säkerhetsinformation",
    securityModalText: `Ditt privatliv och säkerheten för patientdata är prioriterade. All data krypteras och transkriptioner raderas automatiskt inom 2 minuter.`,
    aboutModalHeading: "Om detta projekt",
    aboutModalText: `Jag är en svensk läkare med intresse för AI. Detta verktyg utvecklades för att minska transkriptionskostnader och ge en direktanslutning till OpenAI utan extra avgifter.`,
    guideModalHeading: "Så ställer du in din OpenAI API för Whisper Klinisk Transkription",
    guideModalText: `För att använda denna webapp måste du skapa en OpenAI API-profil, generera en API-nyckel och fylla på din plånbok. API-nyckeln kopieras och klistras in i fältet. När du trycker Enter sparas nyckeln temporärt – den kopplar dig till OpenAI för att möjliggöra transkription och notisgenerering. Du debiteras direkt per uppgift. Se "Kostnader" på startsidan för mer information.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
Besök <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> för att registrera dig med e-post och lösenord.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Gå till <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> för att skapa en ny nyckel. Kopiera den direkt.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
Besök <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> för att lägga till medel. Varje uppgift debiteras direkt.
<br><br>
<strong>Sessionens säkerhet</strong><br>
API-nyckeln lagras endast temporärt i webbläsaren.`,
    priceButton: "Pris",
    priceModalHeading: "Kostnadsinformation",
    priceModalText: `Here is a high-quality Swedish translation of your text:  

---

# Kostnadsinformation  

## Priser för tal-till-text  
   - **Kostnad:** $0.006 per minut.  
     *Exempel:* En 15-minuters konsultation kostar 15 × $0.006 = **$0.09** per konsultation.  

## Priser för anteckningsgenerering  
   - **Token-baserad prissättning:**  
     - **Input (transkribering + prompt):** $10 per 1 000 000 tokens (dvs. $0.00001 per token).  
     - **Output (genererad anteckning):** $30 per 1 000 000 tokens (dvs. $0.00003 per token).  

       #### Exempelberäkning för en konsultation (endast anteckningsgenerering)  
       1. **Beräkning av input:**  
          - Antag att konsultationens transkribering är cirka **700 ord**, och att du lägger till en **30-ords prompt**.  
          - Totalt antal ord = 700 + 30 = **730 ord**.  
          - Uppskattat antal tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Costo dell'input = 547.5 tokens × $0.00001 ≈ **$0.0055**.  
       2. **Beräkning av output:**  
          - Antag att den genererade anteckningen är cirka **250 ord**.  
          - Uppskattat antal tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Costo dell'output = 187.5 tokens × $0.00003 ≈ **$0.0056**.  
       3. **Costo totale della generazione della nota:**  
          - Costo combinato ≈ $0.0055 + $0.0056 = **$0.0111** per konsultation.  

## Ungefärlig total kostnad per konsultation  
(för en 15-minuters konsultation/inspelning där båda funktionerna används)  
   - **Tal-till-text:** **$0.09**  
   - **Anteckningsgenerering:** **$0.0111**  
   - **Totalt:** Cirka **$0.101** per konsultation.  

## Månatliga kostnadsuppskattningar  
Om du genomför 20 konsultationer per dag, 4 dagar per vecka, under 4 veckor per månad (20 × 4 × 4 = **320 konsultationer** per månad):  

   1. **Endast tal-till-text** (med anteckningsgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):  
      - Månadskostnad = 320 × $0.09 = **$28.80**.  
   2. **Användning av både tal-till-text och anteckningsgenerering:**  
      - Månadskostnad = 320 × $0.101 ≈ **$32.32**.  

## Alternativ för anteckningsgenerering  
   Om du redan har ett OpenAI-konto kan du använda anteckningsgenerering via ChatGPT på din egen profil – vilket i princip är gratis. I så fall betalar du endast för tal-till-text när du använder denna webbapp.  

## Flexibilitet i användning  
   Till skillnad från leverantörer som kräver ett månatligt abonnemang betalar du endast för faktisk användning. Om du tar en ledig dag, åker på semester eller har en period utan aktivitet blir dina kostnader noll. Även om du använder tjänsten dagligen för alla konsultationer förblir kostnaden per användning avsevärt lägre jämfört med andra leverantörer.

---  

**Avantage de la connexion directe**  
Notre application web se connecte directement à l’API OpenAI – sans intermédiaire ni frais supplémentaires. Cette connexion directe signifie que vous ne payez que pour le coût réel du traitement de l’IA, faisant de notre service l’une des solutions les plus abordables pour la conversion de la parole en texte et la génération de notes disponibles aujourd’hui.`
  },
  it: {
    pageTitle: "Whisper Trascrizione Clinica - Strumento di Trascrizione",
    openaiUsageLinkText: "Panoramica dell'utilizzo di OpenAI",
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
    guideText: `Benvenuto nello strumento di trascrizione Whisper. Questa applicazione permette di registrare, trascrivere e generare note professionali grazie all'IA.<br><br>
<strong>Come utilizzare le funzioni:</strong>
<ul>
  <li><strong>Registrazione:</strong> Clicca su "Avvia registrazione" per iniziare.</li>
  <li><strong>Completamento:</strong> Clicca su "Ferma/Completa" per terminare la registrazione.</li>
  <li><strong>Generazione di note:</strong> Clicca su "Genera nota" dopo la trascrizione.</li>
  <li><strong>Prompt personalizzato:</strong> Seleziona uno slot e inserisci il tuo prompt.</li>
  <li><strong>Guida:</strong> Utilizza i pulsanti "Funzioni" e "Guida" per passare dall'interfaccia alla guida.</li>
</ul>
Clicca su "Funzioni" per tornare all'interfaccia principale.`,
    priceButton: "Prezzo",
    priceModalHeading: "Informazioni sui costi",
    priceModalText: `# Informazioni sui costi

## Prezzi per il riconoscimento vocale (Speech-to-Text)  
   - **Costo:** $0.006 al minuto.  
     *Esempio:* Una consulenza di 15 minuti costerà 15 × $0.006 = **$0.09** per consulenza.  

## Prezzi per la generazione di note  
   - **Prezzi basati sui token:**  
     - **Input (trascrizione + prompt):** $10 per 1.000.000 di token (ovvero $0.00001 per token).  
     - **Output (nota generata):** $30 per 1.000.000 di token (ovvero $0.00003 per token).  

       #### Esempio di calcolo per una consulenza (solo generazione di note)  
       1. **Calcolo dell'input:**  
          - Supponiamo che la trascrizione della consulenza sia di circa **700 parole** e che tu aggiunga un **prompt di 30 parole**.  
          - Totale parole = 700 + 30 = **730 parole**.  
          - Token stimati = 730 × 0.75 ≈ **547.5 token**.  
          - Costo dell'input = 547.5 token × $0.00001 ≈ **$0.0055**.  
       2. **Calcolo dell'output:**  
          - Supponiamo che la nota generata sia di circa **250 parole**.  
          - Token stimati = 250 × 0.75 ≈ **187.5 token**.  
          - Costo dell'output = 187.5 token × $0.00003 ≈ **$0.0056**.  
       3. **Costo totale della generazione della nota:**  
          - Costo combinato ≈ $0.0055 + $0.0056 = **$0.0111** per consulenza.  

## Costo totale approssimativo per consulenza  
(per una registrazione/consulenza di 15 minuti utilizzando entrambe le funzioni)  
   - **Riconoscimento vocale:** **$0.09**  
   - **Generazione della nota:** **$0.0111**  
   - **Totale:** Circa **$0.101** per consulenza.  

## Stima dei costi mensili  
Se effettui 20 consulenze al giorno, 4 giorni a settimana, per 4 settimane al mese (20 × 4 × 4 = **320 consulenze** al mese):  

   1. **Solo riconoscimento vocale** (generazione di note tramite il tuo account ChatGPT, che è praticamente gratuito):  
      - Costo mensile = 320 × $0.09 = **$28.80**.  
   2. **Utilizzo sia del riconoscimento vocale che della generazione di note:**  
      - Costo mensile = 320 × $0.101 ≈ **$32.32**.  

## Opzione alternativa per la generazione di note  
   Se possiedi già un account OpenAI, puoi generare note tramite ChatGPT sul tuo profilo personale, il che è praticamente gratuito. In questo caso, l'unico costo sarà quello per il riconoscimento vocale quando utilizzi questa webapp.  

## Flessibilità d’uso  
   A differenza di altri fornitori che richiedono un abbonamento mensile, qui paghi solo per l’effettivo utilizzo. Se prendi un giorno di pausa, vai in vacanza o hai un periodo di inattività, il costo sarà pari a zero. Anche utilizzando il servizio quotidianamente per tutte le consulenze, il costo per utilizzo rimane significativamente inferiore rispetto ad altri fornitori.

---  

**Vantaggio della connessione diretta**  
La nostra webapp si collega direttamente all’API di OpenAI, senza intermediari né costi aggiuntivi. Questa connessione diretta significa che paghi solo per il costo effettivo dell’elaborazione AI, rendendo il nostro servizio una delle soluzioni più economiche per il riconoscimento vocale e la generazione di note disponibili oggi.`
  },
  de: {
    pageTitle: "Whisper Klinische Transkription - Transkriptionswerkzeug",
    openaiUsageLinkText: "Übersicht über OpenAI-Nutzung",
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
    guideText: `Willkommen beim Whisper Transkriptionswerkzeug. Dieses Tool ermöglicht es, Konsultationen aufzunehmen, zu transkribieren und Notizen zu generieren.<br><br>
<strong>So nutzen Sie die Funktionen:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf "Aufnahme starten" um zu beginnen.</li>
  <li><strong>Abschluss:</strong> Klicken Sie auf "Stoppen/Abschließen" um die Aufnahme zu beenden.</li>
  <li><strong>Notizenerstellung:</strong> Klicken Sie nach der Transkription auf "Notiz generieren".</li>
  <li><strong>Benutzerdefinierte Aufforderung:</strong> Wählen Sie einen Platz (1–10) und geben Sie Ihre Aufforderung ein.</li>
  <li><strong>Anleitung:</strong> Verwenden Sie "Funktionen" und "Anleitung" um zu wechseln.</li>
</ul>
Bitte klicken Sie auf "Funktionen", um zur Hauptoberfläche zurückzukehren.`,
    priceButton: "Preis",
    priceModalHeading: "Kosteninformationen",
    priceModalText: `Here is a high-quality German translation of your text:  

---

# Kosteninformationen  

## Preise für Sprache-zu-Text  
   - **Kosten:** $0.006 pro Minute.  
     *Beispiel:* Eine 15-minütige Konsultation kostet 15 × $0.006 = **$0.09** pro Konsultation.  

## Preise für Notizenerstellung  
   - **Token-basierte Preisgestaltung:**  
     - **Eingabe (Transkription + Eingabeaufforderung):** $10 pro 1.000.000 Tokens (d. h. $0.00001 pro Token).  
     - **Ausgabe (generierte Notiz):** $30 pro 1.000.000 Tokens (d. h. $0.00003 pro Token).  

       #### Beispielkalkulation für eine Konsultation (nur Notizenerstellung)  
       1. **Berechnung der Eingabe:**  
          - Angenommen, die Transkription der Konsultation umfasst **700 Wörter**, und Sie fügen eine **30-Wörter-Eingabeaufforderung** hinzu.  
          - Gesamtanzahl der Wörter = 700 + 30 = **730 Wörter**.  
          - Geschätzte Tokens = 730 × 0.75 ≈ **547.5 Tokens**.  
          - Kosten für die Eingabe = 547.5 Tokens × $0.00001 ≈ **$0.0055**.  
       2. **Berechnung der Ausgabe:**  
          - Angenommen, die generierte Notiz umfasst **250 Wörter**.  
          - Geschätzte Tokens = 250 × 0.75 ≈ **187.5 Tokens**.  
          - Kosten für die Ausgabe = 187.5 Tokens × $0.00003 ≈ **$0.0056**.  
       3. **Gesamtkosten für die Notizenerstellung:**  
          - Gesamtkosten ≈ $0.0055 + $0.0056 = **$0.0111** pro Konsultation.  

## Ungefähre Gesamtkosten pro Konsultation  
(für eine 15-minütige Konsultation/Aufzeichnung mit beiden Funktionen)  
   - **Sprache-zu-Text:** **$0.09**  
   - **Notizenerstellung:** **$0.0111**  
   - **Gesamt:** Ungefähr **$0.101** pro Konsultation.  

## Monatliche Kostenschätzungen  
Angenommen, Sie führen 20 Konsultationen pro Tag durch, 4 Tage pro Woche, über 4 Wochen pro Monat (20 × 4 × 4 = **320 Konsultationen** pro Monat):  

   1. **Nur Sprache-zu-Text** (mit Notizenerstellung über Ihr eigenes ChatGPT-Konto, das praktisch kostenlos ist):  
      - Monatliche Kosten = 320 × $0.09 = **$28.80**.  
   2. **Verwendung sowohl von Sprache-zu-Text als auch von Notizenerstellung:**  
      - Monatliche Kosten = 320 × $0.101 ≈ **$32.32**.  

## Alternative Option für die Notizenerstellung  
   Wenn Sie bereits über ein OpenAI-Konto verfügen, können Sie die Notizenerstellung über ChatGPT in Ihrem eigenen Profil nutzen – dies ist praktisch kostenlos. In diesem Fall fallen für die Nutzung dieser Web-App nur die Kosten für Sprache-zu-Text an.  

## Nutzungsmöglichkeiten und Flexibilität  
   Im Gegensatz zu Anbietern, die ein monatliches Abonnement erfordern, zahlen Sie nur für die tatsächliche Nutzung. Wenn Sie einen freien Tag nehmen, in den Urlaub fahren oder eine Phase ohne Aktivitäten haben, sind Ihre Kosten gleich null. Selbst wenn Sie den Dienst täglich für alle Patientenkonsultationen nutzen, bleibt die Nutzungskosten pro Konsultation deutlich niedriger als bei anderen Anbietern.  

---  

**Vorteil der direkten Verbindung**  
Unsere Web-App verbindet Sie direkt mit der OpenAI API – keine Zwischenhändler, keine zusätzlichen Gebühren. Diese direkte Verbindung bedeutet, dass Sie nur für die tatsächlichen KI-Verarbeitungskosten zahlen, was unseren Dienst zu einer der kostengünstigsten Lösungen für Sprache-zu-Text und Notizenerstellung macht, die heute verfügbar sind.`
  }
};

function updateLanguageIndex(lang) {
  const trans = indexTranslations[lang] || indexTranslations["en"];
  document.getElementById("page-title").textContent = trans.pageTitle;
  document.getElementById("header-title").textContent = trans.headerTitle;
  document.getElementById("header-subtitle").textContent = trans.headerSubtitle;
  document.getElementById("start-text").textContent = trans.startText;
  document.getElementById("apiKeyInput").setAttribute("placeholder", trans.apiPlaceholder);
  document.getElementById("enterTranscriptionBtn").textContent = trans.enterButton;
  document.getElementById("openGuideButton").textContent = trans.guideButton;
  document.getElementById("openSecurityButton").textContent = trans.securityButton;
  document.getElementById("openAboutButton").textContent = trans.aboutButton;
  document.getElementById("ad-revenue-message").textContent = trans.adRevenueMessage;
  document.getElementById("securityModalHeading").textContent = trans.securityModalHeading;
  document.getElementById("securityModalText").innerHTML = trans.securityModalText;
  document.getElementById("aboutModalHeading").textContent = trans.aboutModalHeading;
  document.getElementById("aboutModalText").innerHTML = trans.aboutModalText;
  // Update API guide modal content if present
  if (document.getElementById("guide-heading")) {
    document.getElementById("guide-heading").textContent = trans.guideModalHeading;
  }
  if (document.getElementById("guide-p1")) {
    document.getElementById("guide-p1").innerHTML = trans.guideModalText;
  }
  // Update Price button and modal content if present
  if (document.getElementById("openPriceButton")) {
    document.getElementById("openPriceButton").textContent = trans.priceButton;
  }
  if (document.getElementById("priceModalHeading")) {
    document.getElementById("priceModalHeading").textContent = trans.priceModalHeading;
  }
  if (document.getElementById("priceModalText")) {
    document.getElementById("priceModalText").innerHTML = trans.priceModalText;
  }
}

function updateLanguageTranscribe(lang) {
  const trans = transcribeTranslations[lang] || transcribeTranslations["en"];
  document.getElementById("page-title-transcribe").textContent = trans.pageTitle;
  document.getElementById("openaiUsageLink").textContent = trans.openaiUsageLinkText;
  document.getElementById("btnFunctions").textContent = trans.btnFunctions;
  document.getElementById("btnGuide").textContent = trans.btnGuide;
  document.getElementById("recordingAreaTitle").textContent = trans.recordingAreaTitle;
  document.getElementById("recordTimer").textContent = trans.recordTimer;
  document.getElementById("transcribeTimer").textContent = trans.transcribeTimer;
  document.getElementById("transcription").setAttribute("placeholder", trans.transcriptionPlaceholder);
  document.getElementById("startButton").textContent = trans.startButton;
  document.getElementById("stopButton").textContent = trans.stopButton;
  document.getElementById("pauseResumeButton").textContent = trans.pauseButton;
  document.getElementById("statusMessage").textContent = trans.statusMessage;
  document.getElementById("noteGenerationTitle").textContent = trans.noteGenerationTitle;
  document.getElementById("generateNoteButton").textContent = trans.generateNoteButton;
  document.getElementById("noteTimer").textContent = trans.noteTimer;
  document.getElementById("generatedNote").setAttribute("placeholder", trans.generatedNotePlaceholder);
  document.getElementById("customPromptTitle").textContent = trans.customPromptTitle;
  document.getElementById("promptSlotLabel").textContent = trans.promptSlotLabel;
  document.getElementById("customPrompt").setAttribute("placeholder", trans.customPromptPlaceholder);
  document.getElementById("adUnit").textContent = trans.adUnitText;
  document.getElementById("guideHeading").textContent = trans.guideHeading;
  document.getElementById("guideText").innerHTML = trans.guideText;
}

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
