// js/language-no.js

export const indexTranslations = {
  pageTitle: "Whisper Klinisk Transkribering",
  headerTitle: "Whisper Klinisk Transkribering",
  headerSubtitle: "Avansert AI-drevet tale-til-tekst og notatgenerering for helsekonsultasjoner",
  startText: "For å komme i gang, vennligst skriv inn din OpenAI API-nøkkel:",
  apiPlaceholder: "Skriv inn API-nøkkel her",
  enterButton: "Gå til transkripsjonsverktøyet",
  guideButton: "API guide – Hvordan bruke",
  securityButton: "Sikkerhet",
  aboutButton: "Om",
  adRevenueMessage: "Siden denne nettsiden er gratis og kun finansieres via annonseinntekter, vennligst godkjenn personaliserte annonser for å støtte tjenesten.",
  
  securityModalHeading: "Sikkerhetsinformasjon",
  securityModalText: `Ditt personvern og sikkerheten til pasientinformasjonen er vår høyeste prioritet. For å sikre at dataene forblir konfidensielle:
<div style="margin-left:20px;">
  <ul>
    <li><strong>Datakryptering:</strong> All data behandlet av systemet er beskyttet med industristandard krypteringsmetoder. Transkripsjoner og notater er koblet eksklusivt til din krypterte personlige API-nøkkel og den enheten du bruker, noe som sikrer at bare du har tilgang til de genererte innholdene.</li>
    <li><strong>Automatisk sletting:</strong> Så snart en transkripsjon eller et notat er generert og vist på skjermen, slettes den automatisk og permanent fra serverne innen 2 minutter.</li>
    <li><strong>Beskyttelse mot uautorisert tilgang:</strong> Selv om uautorisert tilgang til din API-nøkkel skulle inntreffe, forblir dataene kryptert og beskyttet av enhetsspesifikke markører, slik at informasjonen ikke er tilgjengelig.</li>
    <li><strong>GDPR-kompatibel hosting:</strong> Alle backend-prosesser kjøres på dedikerte Microsoft Azure-servere innenfor EU, som er fullstendig i samsvar med GDPR.</li>
  </ul>
</div>
Vær trygg på at strenge sikkerhetstiltak sørger for at alle pasientrelaterte data forblir sikre, konfidensielle og helt under din kontroll.`,
  
  aboutModalHeading: "Om dette prosjektet",
  aboutModalText: `Jeg er en norsk fastlege med en langvarig interesse for teknologiske fremskritt, særlig innen kunstig intelligens, og jeg har fulgt AI-utviklingen i helsesektoren nøye.<br><br>
Da jeg først hørte om selskaper som tilbyr tale-til-tekst-tjenester for medisinske konsultasjoner i Norge, var jeg begeistret. Kollegaer og online anmeldelser roste disse tjenestene og påpekte betydelige forbedringer i effektivitet og arbeidsflyt. Men etter å ha gjort nærmere undersøkelser, ble jeg overrasket over hvor mye disse selskapene tok betalt for sine tjenester – spesielt med tanke på at den faktiske kostnaden for teknologien kun utgjør en brøkdel av deres priser.<br><br>
Motivert av denne innsikten utviklet jeg min egen tale-til-tekst-løsning, først for personlig bruk. Da jeg så hvor effektiv og kostnadseffektiv løsningen var, bestemte jeg meg for å gjøre den tilgjengelig på nettet, og tilby samme hastighet, nøyaktighet og kvalitet som finnes i premiumtjenester, men uten de høye avgiftene.<br><br>
I motsetning til kommersielle leverandører legger ikke denne plattformen på ekstra kostnader eller pålegger unødvendige gebyrer.<br>
• I stedet betaler du direkte til OpenAI – det vil si at du går rett til kilden for teknologien, uten at mellomledd tar en ekstra andel.<br>
• På grunn av dette er dette den billigste løsningen som samtidig opprettholder førsteklasses kvalitet.<br><br>
Jeg mener at tjenestene som tilbys av noen av disse selskapene, selv om de er nyttige, er overpriset i forhold til hva de faktisk leverer. Mange av mine kollegaer – som jobber hardt hver dag med pasientbehandling – ender opp med å betale betydelig mer enn nødvendig bare for å få tilgang til et verktøy som burde være rimelig for alle.<br><br>
Denne nettsiden er helt gratis å bruke – den eneste kostnaden du pådrar deg er den direkte bruksavgiften til OpenAI for transkripsjoner.<br>
• Ingen månedlige avgifter, ingen abonnementer, ingen forpliktelser – du betaler kun for de oppgavene du utfører.<br>
• Du bestemmer selv hvor mye du skal bruke ved å avgjøre hvor mye du overfører til din OpenAI-lommebok.<br><br>
Det eneste jeg ber om, er at du godtar annonser, som bidrar til å dekke kostnadene for backend-servere.<br>
Etter hvert som flere bruker nettsiden, vil utgiftene til hosting og drift øke, og annonseinntektene sikrer at jeg kan holde tjenesten gratis og i drift uten å belaste brukerne.`,
  priceButton: "Price",
  priceModalHeading: "Kostnadsinformasjon",
  priceModalText: `<h1>Kostnadsinformasjon</h1>
<h2>Tale-til-tekst-prising</h2>
<ul>
  <li><strong>Kostnad:</strong> $0.006 per minutt.<br>
      <em>Eksempel:</em> En 15-minutters konsultasjon vil koste 15 × $0.006 = <strong>$0.09</strong> per konsultasjon.
  </li>
</ul>
<h2>Notisgenereringsprising</h2>
<ul>
  <li><strong>Token-basert prising:</strong>
    <ul>
      <li><strong>Input (transkripsjon + prompt):</strong> $10 per 1,000,000 tokens (dvs. $0.00001 per token).</li>
      <li><strong>Output (generert notis):</strong> $30 per 1,000,000 tokens (dvs. $0.00003 per token).</li>
    </ul>
  </li>
</ul>
<h4>Eksempelberegning (kun notisgenerering)</h4>
<ol>
  <li>
    <strong>Beregn input:</strong>
    <ul>
      <li>Anta at transkripsjonen av konsultasjonen er cirka <strong>700 ord</strong> og at du legger til en <strong>30-ords prompt</strong>.</li>
      <li>Totalt antall ord = 700 + 30 = <strong>730 ord</strong>.</li>
      <li>Estimert antall tokens = 730 × 0.75 ≈ <strong>547.5 tokens</strong>.</li>
      <li>Input-kostnad = 547.5 tokens × $0.00001 ≈ <strong>$0.0055</strong>.</li>
    </ul>
  </li>
  <li>
    <strong>Beregn output:</strong>
    <ul>
      <li>Anta at den genererte notisen er omkring <strong>250 ord</strong>.</li>
      <li>Estimert antall tokens = 250 × 0.75 ≈ <strong>187.5 tokens</strong>.</li>
      <li>Output-kostnad = 187.5 tokens × $0.00003 ≈ <strong>$0.0056</strong>.</li>
    </ul>
  </li>
  <li>
    <strong>Total kostnad for notisgenerering:</strong><br>
    Kombinert kostnad ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per konsultasjon.
  </li>
</ol>
<h2>Omtrentlig total kostnad per konsultasjon</h2>
<p>(For en 15-minutters konsultasjon/innspilling med begge funksjoner)</p>
<ul>
  <li><strong>Tale-til-tekst:</strong> <strong>$0.09</strong></li>
  <li><strong>Notisgenerering:</strong> <strong>$0.0111</strong></li>
  <li><strong>Totalt:</strong> Omtrent <strong>$0.101</strong> per konsultasjon.</li>
</ul>
<h2>Månedlige kostnadsestimater</h2>
<p>Forutsatt at du gjennomfører 20 konsultasjoner per dag, 4 dager per uke, over 4 uker per måned (20 × 4 × 4 = <strong>320 konsultasjoner</strong> per måned):</p>
<ol>
  <li>
    <strong>Kun tale-til-tekst:</strong><br>
    Månedlig kostnad = 320 × $0.09 = <strong>$28.80</strong>.
  </li>
  <li>
    <strong>Bruk av både tale-til-tekst og notisgenerering:</strong><br>
    Månedlig kostnad = 320 × $0.101 ≈ <strong>$32.32</strong>.
  </li>
</ol>
<h2>Alternativ for notisgenerering</h2>
<p>Hvis du allerede har en OpenAI-konto, kan du bruke notisgenerering via ChatGPT på ditt eget profil – i praksis gratis. I så fall påløper kun kostnaden for tale-til-tekst når du bruker denne webappen.</p>
<h2>Brukervennlighet</h2>
<p>I motsetning til leverandører som krever et månedlig abonnement, betaler du kun for faktisk bruk. Hvis du tar en fridag, drar på ferie eller har en periode uten aktivitet, vil kostnadene dine være null. Selv om du bruker tjenesten daglig for alle dine pasientkonsultasjoner, forblir kostnaden per konsultasjon betydelig lavere enn hos andre leverandører.</p>
<hr>
<p><strong>Direkte Tilkoblingsfordel</strong><br>
Vår webapp kobler deg direkte til OpenAI API – ingen mellomledd, ingen ekstra avgifter. Denne direkte koblingen betyr at du kun betaler for den faktiske AI-behandlingskostnaden, noe som gjør vår tjeneste til en av de mest prisgunstige løsningene for tale-til-tekst og notisgenerering som er tilgjengelig i dag.</p>`,
};

export const transcribeTranslations = {
  pageTitle: "Transkripsjonsverktøy.",
  openaiUsageLinkText: "OpenAI - Kostnadsoversikt",
  btnFunctions: "Functions",
  btnGuide: "Guide",
  recordingAreaTitle: "Opptaksområde",
  recordTimer: "Opptak Timer: 0 sec",
  transcribeTimer: "Fullføring Timer: 0 sec",
  transcriptionPlaceholder: "Diktat vil oppstå her...",
  startButton: "Start Opptak",
  stopButton: "Stopp/Fullfør",
  pauseButton: "Pause Opptak",
  statusMessage: "Velkommen! Klikk \"Start Opptak\" for å begynne.",
  noteGenerationTitle: "Notatgenerering",
  generateNoteButton: "Generer notat",
  noteTimer: "Notat fullføringstid: 0 sec",
  generatedNotePlaceholder: "Generert notat vil oppstå her...",
  customPromptTitle: "Skreddersydd Prompt",
  promptSlotLabel: "Prompt Slot:",
  customPromptPlaceholder: "Skriv din prompt her",
  adUnitText: "Your Ad Here",
  guideHeading: "Guide & Instruksjoner",
  guideText: `WVelkommen til Whisper Transkripsjon. Denne applikasjonen lar medisinske fagpersoner, terapeuter og andre behandlere ta opp og transkribere konsultasjoner, samt generere profesjonelle notater ved hjelp av en AI-drevet notatgenerator.<br><br>
<strong>How to Use the Functions:</strong>
<ul>
  <li><strong>Recording:</strong> Click "Start Recording" to begin capturing audio. Klikk "Start Opptak" for å begynne opptak og transkripsjon.</li>
  <li><strong>Completion:</strong> After clicking "Stop/Complete", the recording stops. Når du klikker "Stopp Opptak" så vil opptaket stoppe. Fullføringss-timeren vil så "tikke" til transkriptsjonen er fullført. Dette tar vanligvis mellom 5-10 sec.</li>
  <li><strong>Note Generation:</strong> Etter at transkripsjonen er fullført så kan du klikke på "Generer notat", som da vil generere et notat basert på din egen prompt.</li>
  <li><strong>Custom Prompt:</strong> Til høyre, velg en prompt "slot"(1-10), og lag din egen skreddersydde "prompt". Disse vil lagres lokalt på din enhet og kobles til din API-nøkkel, slik at de vil være der igjen når du går inn i webappen på et senere tidspunkt.</li>
  <li><strong>Guide Toggle:</strong> Bruk "Funksjoner" og "Guide" knappene til å bytte mellom funksjonsvinduet og guidevinduet.</li>
</ul>
Vennligst klikk "Funksjoner" for å returnere til funksjonsvinduet.`,
};
