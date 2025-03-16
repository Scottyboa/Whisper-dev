// js/language-it.js

export const indexTranslations = {
  pageTitle: "Whisper Trascrizione Clinica",
  headerTitle: "Whisper Trascrizione Clinica",
  headerSubtitle: "Riconoscimento vocale e generazione di note basati su AI per consulenze mediche",
  startText: "Per iniziare, inserisci la tua chiave API OpenAI:",
  apiPlaceholder: "Inserisci qui la chiave API",
  enterButton: "Entra nello strumento di trascrizione",
  guideButton: "API guide – Come usarlo",
  securityButton: "Sicurezza",
  aboutButton: "Informazioni",
  adRevenueMessage: "Poiché questo sito è gratuito e si finanzia esclusivamente tramite la pubblicità, accetta gli annunci personalizzati per sostenere il servizio.",
  
  securityModalHeading: "Informazioni di Sicurezza",
  securityModalText: `La tua privacy e la sicurezza dei dati dei pazienti sono la nostra massima priorità. Per garantire che i dati rimangano riservati:<br><br>
- <strong>Crittografia dei Dati:</strong> Tutti i dati elaborati dal sistema sono protetti mediante metodi di crittografia riconosciuti a livello industriale. Le trascrizioni e le note sono collegate esclusivamente alla tua chiave API personale crittografata e al dispositivo utilizzato, garantendo che solo tu possa accedere ai contenuti generati.<br><br>
- <strong>Cancellazione Automatica:</strong> Una volta che una trascrizione o una nota viene generata e visualizzata, essa viene cancellata automaticamente e in modo irreversibile dai server entro 2 minuti.<br><br>
- <strong>Protezione da Accessi Non Autorizzati:</strong> Anche in caso di accesso non autorizzato alla tua chiave API, i dati rimangono crittografati e protetti da marcatori specifici del dispositivo, rendendo le informazioni inaccessibili.<br><br>
- <strong>Hosting Conforme al GDPR:</strong> Tutti i processi backend operano su server dedicati Microsoft Azure all’interno dell’UE, in piena conformità con il GDPR.<br><br>
Sii certo che rigorose misure di sicurezza assicurano che tutti i dati relativi ai pazienti rimangano sicuri, riservati e interamente sotto il tuo controllo.`,
  
  aboutModalHeading: "Informazioni su questo progetto",
  aboutModalText: `Sono un medico di famiglia norvegese, sempre interessato alle innovazioni tecnologiche, in particolare all'intelligenza artificiale, e ho seguito da vicino lo sviluppo dell'IA nel settore sanitario.<br><br>
Quando ho sentito per la prima volta parlare di aziende che offrono servizi di conversione da voce a testo per consultazioni mediche in Norvegia, ne sono stato entusiasta. Colleghi e recensioni online hanno elogiato questi servizi, sottolineando miglioramenti significativi in termini di efficienza e flusso di lavoro. Tuttavia, approfondendo la questione, sono rimasto sorpreso dai costi elevati richiesti da queste aziende, soprattutto considerando che il costo reale della tecnologia rappresenta solo una frazione dei loro prezzi.<br><br>
Spinto da questa consapevolezza, ho sviluppato la mia soluzione di conversione da voce a testo, inizialmente per uso personale. Vedendo quanto fosse efficace ed economica, ho deciso di renderla disponibile online, offrendo la stessa velocità, precisione e qualità tipiche dei servizi premium, ma senza le tariffe elevate.<br><br>
A differenza dei fornitori commerciali, questa piattaforma non applica maggiorazioni o commissioni inutili.<br>
• Invece, paghi direttamente OpenAI — ciò significa che accedi direttamente alla fonte della tecnologia, senza che intermediari trattengano una quota extra.<br>
• Per questo motivo, è l'opzione più economica disponibile, pur mantenendo una qualità di altissimo livello.<br><br>
Ritengo che i servizi offerti da alcune di queste aziende, pur essendo utili, siano sopravvalutati rispetto a ciò che effettivamente forniscono. Molti dei miei colleghi, che lavorano duramente ogni giorno nella cura dei pazienti, finiscono per pagare molto più del necessario solo per avere accesso a uno strumento che dovrebbe essere accessibile a tutti.<br><br>
Questo sito web è completamente gratuito da usare — l'unico costo che sostieni è la tariffa diretta di utilizzo di OpenAI per le trascrizioni.<br>
• Nessun costo mensile, nessun abbonamento, nessun impegno — paghi solo per le operazioni che esegui.<br>
• Decidi tu quanto spendere, stabilendo l'importo da trasferire nel tuo portafoglio OpenAI.<br><br>
L'unica cosa che chiedo è che tu accetti le pubblicità, che aiutano a coprire i costi dei server backend.<br>
Con l'aumentare degli utenti, i costi di hosting e operativi cresceranno, e i ricavi pubblicitari garantiranno che io possa mantenere il servizio gratuito e in funzione senza addebitare costi agli utenti.`,
  
  guideModalHeading: "API guide – Come usarlo",
  guideModalText: `Per utilizzare questa webapp, devi prima creare un profilo API su OpenAI, generare una chiave API e finanziare il tuo portafoglio OpenAI. La tua chiave API viene quindi copiata e incollata nel campo apposito. Una volta premuto Invio, la webapp salva temporaneamente la chiave per la sessione, collegandoti direttamente ai server di OpenAI affinché la conversione da voce a testo e la generazione di note funzionino. Nota che verrai addebitato immediatamente per ogni operazione eseguita. Per ulteriori informazioni sui costi, consulta la sezione "Costi" sulla pagina principale.<br><br>
<strong>1. Crea il tuo profilo API su OpenAI</strong><br>
Per iniziare, devi creare un profilo sulla piattaforma API di OpenAI. Questo profilo fungerà da account per la gestione delle chiavi API e della fatturazione. Visita la pagina <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> e segui le istruzioni, inserendo il tuo indirizzo e-mail, creando una password e verificando il tuo account. Una volta registrato, avrai accesso alla tua dashboard.<br><br>
<strong>2. Genera una chiave API</strong><br>
Dopo aver creato il profilo, genera una chiave API accedendo alla pagina di gestione delle chiavi (<a href="https://platform.openai.com/account/api-keys" style="color:blue;">Gestione chiavi API</a>). Clicca sul pulsante per creare una nuova chiave. Importante: vedrai la chiave solo una volta, quindi copiala subito e conservala in modo sicuro (ad esempio in un file di testo). Se la perdi o sospetti che sia stata compromessa, eliminala e creane una nuova.<br><br>
<strong>3. Finanzia il tuo portafoglio OpenAI</strong><br>
Per il corretto funzionamento della webapp, il tuo portafoglio OpenAI deve essere sufficientemente finanziato. Visita la pagina <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fatturazione & Pagamenti</a> per aggiungere fondi. Puoi trasferire l’importo che preferisci in qualsiasi momento. Finché i fondi sono disponibili, potrai utilizzare il servizio — ogni operazione viene addebitata immediatamente.<br><br>
<strong>Promemoria sulla sicurezza della sessione</strong><br>
Quando accedi inserendo la tua chiave API, questa viene salvata temporaneamente nella sessione del tuo browser. Ciò significa che se lasci il sito, chiudi il browser o spegni il computer, la chiave non verrà memorizzata in modo permanente. Dovrai reinserirla alla prossima visita, garantendo così la sicurezza della tua chiave.`,
  
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
};

export const transcribeTranslations = {
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
Please click "Functions" to return to the main interface.`,
};
