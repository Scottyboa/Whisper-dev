// js/languages/language-it.js

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
  adRevenueMessage: "Poiché questo sito è gratuito e si finanzia esclusivamente tramite la pubblicità, acconsenti agli annunci personalizzati per sostenere il servizio.",
  
  securityModalHeading: "Informazioni di Sicurezza",
  securityModalText: `La tua privacy e la sicurezza delle informazioni dei pazienti sono la nostra massima priorità. Per garantire la riservatezza dei dati:
<div style="margin-left:20px;">
  <ul>
    <li><strong>Crittografia dei dati:</strong> Tutti i dati elaborati dal sistema sono protetti con metodi di crittografia standard del settore. Le trascrizioni e le note sono legate esclusivamente alla tua chiave API personale crittografata e al dispositivo utilizzato, garantendo che solo tu possa accedere ai contenuti generati.</li>
    <li><strong>Cancellazione automatica:</strong> Non appena una trascrizione o una nota viene generata e visualizzata sul tuo schermo, essa viene cancellata automaticamente e in modo irreversibile dai server entro 2 minuti.</li>
    <li><strong>Protezione contro accessi non autorizzati:</strong> Anche in caso di accesso non autorizzato alla tua chiave API, i dati rimangono crittografati e protetti da marcatori specifici del dispositivo, rendendo le informazioni inaccessibili.</li>
    <li><strong>Hosting conforme al GDPR:</strong> Tutti i processi backend sono eseguiti su server dedicati Microsoft Azure situati all’interno dell’UE, conformi alle normative GDPR.</li>
  </ul>
</div>
Puoi essere certo che misure di sicurezza rigorose assicurano che tutte le informazioni dei pazienti rimangano sicure, riservate e completamente sotto il tuo controllo.`,
  
  aboutModalHeading: "Informazioni su questo Progetto",
  aboutModalText: `Sono un medico di famiglia norvegese con un forte interesse per la tecnologia e lo sviluppo dell'IA in sanità. Ho sviluppato questa soluzione per ridurre significativamente i costi di trascrizione e offrire un servizio diretto e conveniente di accesso a OpenAI – paghi solo per l'effettivo utilizzo di OpenAI.`,
  
  guideModalHeading: "API guide – Come usarlo",
  guideModalText: `Per utilizzare questa webapp, devi prima creare un profilo API su OpenAI, generare una chiave API e finanziare il tuo portafoglio OpenAI. La tua chiave API viene quindi copiata e incollata nel campo apposito. Una volta premuto Invio, la webapp salva temporaneamente la chiave API per la tua sessione: questo collegamento ti connette direttamente ai server di OpenAI, permettendo il funzionamento della trascrizione da voce a testo e della generazione di note. Nota che verrai addebitato immediatamente per ogni operazione eseguita. Per ulteriori informazioni sui costi, consulta la sezione "Informazioni sui costi" nella pagina principale.
<br><br>
<strong>1. Crea il tuo profilo API su OpenAI</strong><br>
Per iniziare, è necessario creare un profilo sulla piattaforma OpenAI API. Questo profilo funge da account per la gestione delle chiavi API e la fatturazione. Visita la pagina <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> e segui le istruzioni inserendo il tuo indirizzo email, creando una password e verificando il tuo account. Una volta registrato, avrai accesso al tuo dashboard.
<br><br>
<strong>2. Genera una chiave API</strong><br>
Dopo aver creato il profilo, genera una chiave API navigando alla pagina di <a href="https://platform.openai.com/account/api-keys" style="color:blue;">gestione delle chiavi API</a>. Clicca sul pulsante per creare una nuova chiave API. Importante: vedrai la chiave solo una volta. Copiala immediatamente e conservala in modo sicuro (ad esempio, in un file di testo). Se la perdi o sospetti che sia stata compromessa, eliminala dal tuo account e creane una nuova.
<br><br>
<strong>3. Finanzia il tuo portafoglio OpenAI</strong><br>
Affinché la webapp funzioni, il tuo portafoglio OpenAI deve disporre di fondi sufficienti. Visita la pagina <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fatturazione & Pagamenti</a> per aggiungere fondi. Puoi trasferire qualsiasi importo in qualsiasi momento. Finché sono disponibili fondi, potrai utilizzare il sito – ogni operazione viene addebitata immediatamente.
<br><br>
<strong>Promemoria sulla sicurezza della sessione</strong><br>
Quando accedi inserendo la tua chiave API, questa viene salvata solo temporaneamente nella sessione del tuo browser. Ciò significa che se lasci il sito, chiudi il browser o spegni il computer, la chiave non verrà memorizzata permanentemente. Dovrai reinserirla alla prossima visita, garantendo così la sicurezza del tuo account.`,
  
  priceButton: "Ecco una traduzione di alta qualità del tuo testo:",
  priceModalHeading: "Informazioni sui costi",
  priceModalText: `<h2>Prezzi per il riconoscimento vocale (Speech-to-Text)</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Costo:</strong> $0.006 al minuto.</li>
    <li><em>Esempio:</em> Una consulenza di 15 minuti costerà 15 × $0.006 = <strong>$0.09</strong> per consulenza.</li>
  </ul>
</div>
<h2>Prezzi per la generazione di note</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Prezzi basati sui token:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li><strong>Input (trascrizione + prompt):</strong> $10 per 1.000.000 di token (ovvero $0.00001 per token).</li>
          <li><strong>Output (nota generata):</strong> $30 per 1.000.000 di token (ovvero $0.00003 per token).</li>
        </ul>
      </div>
    </li>
  </ul>
</div>
<h4>Esempio di calcolo per una consulenza (solo generazione di note)</h4>
<div style="margin-left:20px;">
  <ol>
    <li>
      <strong>Calcolo dell'input:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Supponiamo che la trascrizione della consulenza sia di circa <strong>700 parole</strong> e che venga aggiunto un <strong>prompt di 30 parole</strong>.</li>
          <li>Totale parole = 700 + 30 = <strong>730 parole</strong>.</li>
          <li>Token stimati = 730 × 0.75 ≈ <strong>547.5 token</strong>.</li>
          <li>Costo dell'input = 547.5 token × $0.00001 ≈ <strong>$0.0055</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Calcolo dell'output:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Supponiamo che la nota generata sia di circa <strong>250 parole</strong>.</li>
          <li>Token stimati = 250 × 0.75 ≈ <strong>187.5 token</strong>.</li>
          <li>Costo dell'output = 187.5 token × $0.00003 ≈ <strong>$0.0056</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Costo totale della generazione della nota:</strong>
      <div style="margin-left:20px;">
        Costo combinato ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per consulenza.
      </div>
    </li>
  </ol>
</div>
<h2>Costo totale approssimativo per consulenza</h2>
<div style="margin-left:20px;">
  (per una consulenza/registrazione di 15 minuti che utilizza entrambe le funzioni)
  <ul>
    <li><strong>Riconoscimento vocale:</strong> <strong>$0.09</strong></li>
    <li><strong>Generazione della nota:</strong> <strong>$0.0111</strong></li>
    <li><strong>Totale:</strong> Circa <strong>$0.101</strong> per consulenza.</li>
  </ul>
</div>
<h2>Stima dei costi mensili</h2>
<div style="margin-left:20px;">
  Se effettui 20 consulenze al giorno, 4 giorni a settimana, per 4 settimane al mese (20 × 4 × 4 = <strong>320 consulenze</strong> al mese):
  <ol>
    <li>
      <strong>Solo riconoscimento vocale</strong> (con generazione di note tramite il tuo account ChatGPT, praticamente gratuito):
      <div style="margin-left:20px;">Costo mensile = 320 × $0.09 = <strong>$28.80</strong>.</div>
    </li>
    <li>
      <strong>Utilizzo sia del riconoscimento vocale che della generazione di note:</strong>
      <div style="margin-left:20px;">Costo mensile = 320 × $0.101 ≈ <strong>$32.32</strong>.</div>
    </li>
  </ol>
</div>
<h2>Opzione alternativa per la generazione di note</h2>
<div style="margin-left:20px;">
  Se possiedi già un account OpenAI, puoi generare note tramite ChatGPT sul tuo profilo personale, il che è praticamente gratuito. In questo caso, l'unico costo sarà quello per il riconoscimento vocale quando utilizzi questa webapp.
</div>
<h2>Flessibilità d'uso</h2>
<div style="margin-left:20px;">
  A differenza di altri fornitori che richiedono un abbonamento mensile, paghi solo per l'effettivo utilizzo. Se prendi un giorno di pausa, vai in vacanza o hai un periodo di inattività, il costo sarà zero. Anche se utilizzi il servizio quotidianamente per tutte le consulenze, il costo per utilizzo rimane significativamente inferiore rispetto ad altri fornitori.
</div>
<hr>
<h2>Vantaggio della connessione diretta</h2>
<div style="margin-left:20px;">
  La nostra webapp si collega direttamente all'API di OpenAI, senza intermediari né costi aggiuntivi. Questa connessione diretta significa che paghi solo per il costo effettivo dell'elaborazione AI, rendendo il nostro servizio una delle soluzioni più economiche per il riconoscimento vocale e la generazione di note disponibili oggi.
</div>`,
};

export const transcribeTranslations = {
  pageTitle: "Strumento di trascrizione con annunci e guida",
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
  statusMessage: "Benvenuto! Clicca su 'Avvia registrazione' per iniziare.",
  noteGenerationTitle: "Generazione di note",
  generateNoteButton: "Genera nota",
  noteTimer: "Timer di generazione nota: 0 sec",
  generatedNotePlaceholder: "La nota generata apparirà qui...",
  customPromptTitle: "Prompt personalizzato",
  promptSlotLabel: "Slot per il prompt:",
  customPromptPlaceholder: "Inserisci qui il tuo prompt personalizzato",
  adUnitText: "Il tuo annuncio qui",
  guideHeading: "Guida e Istruzioni",
  guideText: `Benvenuto nello strumento di trascrizione Whisper. Questa applicazione consente ai professionisti medici, ai terapisti e ad altri di registrare e trascrivere consulenze, nonché di generare note professionali utilizzando un generatore di note basato su AI.<br><br>
<strong>Come utilizzare le funzioni:</strong>
<ul>
  <li><strong>Registrazione:</strong> Clicca su "Avvia registrazione" per iniziare a registrare l'audio. L'audio viene acquisito tramite il MediaStreamTrackProcessor (utilizzando WebCodecs) e raccolto per un massimo di 40 secondi prima di essere confezionato in un file WAV autonomo.</li>
  <li><strong>Completamento:</strong> Dopo aver cliccato su "Ferma/Completa", la registrazione termina. Un periodo finale di 2 secondi raccoglie l'audio residuo prima che l'ultimo blocco venga elaborato. Il timer di completamento prosegue fino a quando la trascrizione completa non viene ricevuta.</li>
  <li><strong>Generazione di note:</strong> Dopo la trascrizione, clicca su "Genera nota" per creare una nota basata sulla tua trascrizione e sul prompt personalizzato.</li>
  <li><strong>Prompt personalizzato:</strong> Scegli uno slot (da 1 a 10) e inserisci il tuo prompt personalizzato. Il prompt verrà salvato automaticamente e associato alla tua chiave API.</li>
  <li><strong>Guida:</strong> Utilizza i pulsanti "Funzioni" e "Guida" per passare dalla modalità funzionale a questa guida.</li>
</ul>
Clicca su "Funzioni" per tornare all'interfaccia principale.`,
};
