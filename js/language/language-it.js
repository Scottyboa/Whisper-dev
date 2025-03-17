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
Quando ho sentito per la prima volta parlare di aziende che offrono servizi di conversione da voce a testo per consulenze mediche in Norvegia, ne sono stato entusiasta. Colleghi e recensioni online hanno elogiato questi servizi, sottolineando miglioramenti significativi in termini di efficienza e flusso di lavoro. Tuttavia, approfondendo la questione, sono rimasto sorpreso dai costi elevati richiesti da queste aziende, soprattutto considerando che il costo reale della tecnologia rappresenta solo una frazione dei loro prezzi.<br><br>
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
  guideModalText: `Per utilizzare questa webapp, devi prima creare un profilo API su OpenAI, generare una chiave API e finanziare il tuo portafoglio OpenAI. La tua chiave API viene quindi copiata e incollata nel campo apposito. Una volta premuto Invio, la webapp salva temporaneamente la chiave per la sessione, collegandoti direttamente ai server di OpenAI affinché la conversione da voce a testo e la generazione di note funzionino. Nota che verrai addebitato immediatamente per ogni operazione eseguita. Per ulteriori informazioni sui costi, consulta la sezione "Cost" sulla pagina principale.<br><br>
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
  priceModalText: `<h1 style="font-size:24px;">Informazioni sui Costi</h1>

<h2 style="font-size:20px;">Tariffa per la Conversione da Voce a Testo</h2>
<p style="font-size:16px;">
   <strong>Costo:</strong> $0,006 al minuto.<br>
   <em>Esempio:</em> Una consulenza di 15 minuti costerà 15 × $0,006 = <strong>$0,09</strong> per consulenza.
</p>

<h2 style="font-size:20px;">Tariffa per la Generazione delle Note</h2>
<p style="font-size:16px;">
   <strong>Tariffa basata sui token:</strong><br>
   - <strong>Input (trascrizione + prompt):</strong> $10 per 1.000.000 di token (ovvero $0,00001 per token).<br>
   - <strong>Output (nota generata):</strong> $30 per 1.000.000 di token (ovvero $0,00003 per token).
</p>

<h4 style="font-size:18px;">Calcolo Esemplificativo per una Consulenza (solo Generazione delle Note)</h4>
<p style="font-size:16px;">
   1. <strong>Calcolo dell'Input:</strong><br>
      - Si assume che la trascrizione della consulenza contenga circa <strong>700 parole</strong> e che venga aggiunto un prompt di <strong>30 parole</strong>.<br>
      - Totale parole = 700 + 30 = <strong>730 parole</strong>.<br>
      - Token stimati = 730 × 0,75 ≈ <strong>547,5 token</strong>.<br>
      - Costo dell'input = 547,5 token × $0,00001 ≈ <strong>$0,0055</strong>.
</p>
<p style="font-size:16px;">
   2. <strong>Calcolo dell'Output:</strong><br>
      - Si assume che la nota generata contenga circa <strong>250 parole</strong>.<br>
      - Token stimati = 250 × 0,75 ≈ <strong>187,5 token</strong>.<br>
      - Costo dell'output = 187,5 token × $0,00003 ≈ <strong>$0,0056</strong>.
</p>
<p style="font-size:16px;">
   3. <strong>Costo Totale per la Generazione delle Note:</strong><br>
      - Costo combinato ≈ $0,0055 + $0,0056 = <strong>$0,0111</strong> per consulenza.
</p>

<h2 style="font-size:20px;">Costo Combinato Approssimativo per Consulenza</h2>
<p style="font-size:16px;">
   (per una consulenza/registrazione di 15 minuti, utilizzando entrambe le funzioni)<br>
   - <strong>Conversione da Voce a Testo:</strong> <strong>$0,09</strong><br>
   - <strong>Generazione delle Note:</strong> <strong>$0,0111</strong><br>
   - <strong>Totale:</strong> Circa <strong>$0,101</strong> per consulenza.
</p>

<h2 style="font-size:20px;">Stime Mensili dei Costi</h2>
<p style="font-size:16px;">
   Supponendo di effettuare 20 consulenze al giorno, 4 giorni alla settimana, per 4 settimane al mese (20 × 4 × 4 = <strong>320 consulenze</strong> al mese):<br><br>
   1. <strong>Utilizzando solo la Conversione da Voce a Testo</strong> (con generazione delle note tramite il tuo account ChatGPT, che è essenzialmente gratuito):<br>
      - Costo mensile = 320 × $0,09 = <strong>$28,80</strong>.<br><br>
   2. <strong>Utilizzando sia la Conversione da Voce a Testo che la Generazione delle Note:</strong><br>
      - Costo mensile = 320 × $0,101 ≈ <strong>$32,32</strong>.
</p>

<h2 style="font-size:20px;">Opzione Alternativa per la Generazione delle Note</h2>
<p style="font-size:16px;">
   Se possiedi già un account OpenAI, puoi utilizzare la generazione delle note tramite ChatGPT sul tuo profilo, che è essenzialmente gratuita. In tal caso, sostieni solo il costo della Conversione da Voce a Testo quando utilizzi questa webapp.
</p>

<h2 style="font-size:20px;">Flessibilità d'Uso</h2>
<p style="font-size:16px;">
   A differenza dei fornitori che richiedono un abbonamento mensile, paghi solo per l'utilizzo effettivo. Se prendi un giorno libero, vai in vacanza o hai un periodo di inattività, i tuoi costi saranno zero. Anche se utilizzi il servizio quotidianamente per tutte le tue consulenze, il costo per utilizzo rimane significativamente inferiore rispetto ad altri fornitori.
</p>

<hr>

<p style="font-size:16px;">
   <strong>Vantaggio della Connessione Diretta</strong><br>
   La nostra webapp ti collega direttamente all'API di OpenAI — senza intermediari, senza costi aggiuntivi. Questo collegamento diretto significa che paghi solo per il costo effettivo dell'elaborazione dell'IA, rendendo il nostro servizio una delle soluzioni più economiche disponibili per la conversione da voce a testo e la generazione delle note.
</p>`,
  
  transcribeTranslations: {
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
  }
};
