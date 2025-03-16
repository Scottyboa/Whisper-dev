// js/languages/language-no.js

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
  aboutModalText: `Jeg er en norsk fastlege med stor interesse for teknologi og AI-utvikling innen helsesektoren. Jeg utviklet denne løsningen for å redusere transkripsjonskostnadene betydelig og tilby en rimelig, direkte tilkobling til OpenAI – du betaler kun for faktisk OpenAI-bruk.`,
  
  guideModalHeading: "API guide – Hvordan bruke",
  guideModalText: `For å bruke denne webappen må du først opprette en API-profil hos OpenAI, generere en API-nøkkel og fylle på med midler i din OpenAI-lommebok. API-nøkkelen kopieres og limes inn i det angitte feltet. Når du trykker Enter, lagres API-nøkkelen midlertidig for din økt – denne nøkkelen kobler deg til OpenAI-serverne slik at tale-til-tekst-transkripsjon og notatgenerering fungerer. Vær oppmerksom på at du blir belastet umiddelbart for hver operasjon. For mer informasjon om kostnader, se seksjonen "Kostnadsinformasjon" på startsiden.
<br><br>
<strong>1. Opprett din OpenAI API-profil</strong><br>
For å komme i gang må du opprette en profil på OpenAI API-plattformen. Denne profilen fungerer som din konto for administrasjon av API-nøkler og fakturering. Besøk siden <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> og følg instruksjonene ved å oppgi e-postadresse, opprette et passord og verifisere kontoen. Når du er registrert, får du tilgang til dashbordet ditt.
<br><br>
<strong>2. Generer en API-nøkkel</strong><br>
Etter at du har opprettet profilen, generer en API-nøkkel ved å gå til <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nøkkeladministrasjonen</a>. Klikk på knappen for å opprette en ny API-nøkkel. Viktig: Du vil kun se nøkkelen én gang, så kopier den umiddelbart og oppbevar den trygt (for eksempel i en tekstfil). Hvis du mister nøkkelen eller mistenker at den er kompromittert, slett den fra kontoen og generer en ny.
<br><br>
<strong>3. Fyll på din OpenAI-lommebok</strong><br>
For at webappen skal fungere, må lommeboken din ha tilstrekkelige midler. Besøk siden <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturering & Betaling</a> for å fylle på med midler. Du kan overføre et hvilket som helst beløp når som helst. Så lenge midlene er tilgjengelige, kan du bruke tjenesten – hver operasjon blir belastet umiddelbart.
<br><br>
<strong>Sikkerhet ved økten</strong><br>
Når du logger inn med din API-nøkkel, lagres den kun midlertidig i nettleserøkten. Dette betyr at hvis du forlater nettsiden, lukker nettleseren eller slår av datamaskinen, blir nøkkelen ikke lagret permanent. Du må skrive den inn på nytt neste gang du bruker webappen, noe som sikrer at nøkkelen din forblir sikker.`,
  
  priceButton: "Her er en høy kvalitet norsk oversettelse av din tekst:",
  priceModalHeading: "Kostnadsinformasjon",
  priceModalText: `<h2>Tale-til-tekst-priser</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Kostnad:</strong> $0.006 per minutt.</li>
    <li><em>Eksempel:</em> En 15-minutters konsultasjon koster 15 × $0.006 = <strong>$0.09</strong> per konsultasjon.</li>
  </ul>
</div>
<h2>Notatgenereringspriser</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Token-basert prising:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li><strong>Input (transkripsjon + prompt):</strong> $10 per 1 000 000 tokens (dvs. $0.00001 per token).</li>
          <li><strong>Output (generert notat):</strong> $30 per 1 000 000 tokens (dvs. $0.00003 per token).</li>
        </ul>
      </div>
    </li>
  </ul>
</div>
<h4>Eksempel på konsultasjonsberegning (kun notatgenerering)</h4>
<div style="margin-left:20px;">
  <ol>
    <li>
      <strong>Beregning av input:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Anta at transkripsjonen av konsultasjonen er omtrent <strong>700 ord</strong>, og at du legger til en <strong>30-ords prompt</strong>.</li>
          <li>Totalt antall ord = 700 + 30 = <strong>730 ord</strong>.</li>
          <li>Estimerte tokens = 730 × 0.75 ≈ <strong>547.5 tokens</strong>.</li>
          <li>Input-kostnad = 547.5 tokens × $0.00001 ≈ <strong>$0.0055</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Beregning av output:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Anta at det genererte notatet er rundt <strong>250 ord</strong>.</li>
          <li>Estimerte tokens = 250 × 0.75 ≈ <strong>187.5 tokens</strong>.</li>
          <li>Output-kostnad = 187.5 tokens × $0.00003 ≈ <strong>$0.0056</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Total kostnad for notatgenerering:</strong>
      <div style="margin-left:20px;">
        Samlet kostnad ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per konsultasjon.
      </div>
    </li>
  </ol>
</div>
<h2>Omtrentlig total kostnad per konsultasjon</h2>
<div style="margin-left:20px;">
  (for en 15-minutters konsultasjon/opptak med begge funksjoner)
  <ul>
    <li><strong>Tale-til-tekst:</strong> <strong>$0.09</strong></li>
    <li><strong>Notatgenerering:</strong> <strong>$0.0111</strong></li>
    <li><strong>Totalt:</strong> Omtrent <strong>$0.101</strong> per konsultasjon.</li>
  </ul>
</div>
<h2>Månedlige kostnadsestimater</h2>
<div style="margin-left:20px;">
  Forutsatt at du gjennomfører 20 konsultasjoner per dag, 4 dager per uke, over 4 uker per måned (20 × 4 × 4 = <strong>320 konsultasjoner</strong> per måned):
  <ol>
    <li>
      <strong>Kun tale-til-tekst</strong> (med notatgenerering via din egen ChatGPT-konto, som i praksis er gratis):
      <div style="margin-left:20px;">Månedlig kostnad = 320 × $0.09 = <strong>$28.80</strong>.</div>
    </li>
    <li>
      <strong>Bruk av både tale-til-tekst og notatgenerering:</strong>
      <div style="margin-left:20px;">Månedlig kostnad = 320 × $0.101 ≈ <strong>$32.32</strong>.</div>
    </li>
  </ol>
</div>
<h2>Alternativ for notatgenerering</h2>
<div style="margin-left:20px;">
  Hvis du allerede har en OpenAI-konto, kan du bruke notatgenerering via ChatGPT på din egen profil – dette er i praksis gratis. I så fall påløper kun kostnaden for tale-til-tekst ved bruk av denne webappen.
</div>
<h2>Fleksibilitet i bruk</h2>
<div style="margin-left:20px;">
  I motsetning til leverandører som krever et månedlig abonnement, betaler du kun for faktisk bruk. Hvis du tar en fridag, drar på ferie eller har en periode uten aktivitet, blir kostnadene dine null. Selv om du bruker tjenesten daglig for alle pasientkonsultasjoner, forblir stykkprisen betydelig lavere enn hos andre leverandører.
</div>
<hr>
<h2>Fordel med direkte tilkobling</h2>
<div style="margin-left:20px;">
  Vår webapp kobler deg direkte til OpenAI API – ingen mellomledd, ingen ekstra avgifter. Denne direkte tilkoblingen betyr at du kun betaler for den faktiske AI-behandlingskostnaden, noe som gjør vår tjeneste til en av de rimeligste løsningene for tale-til-tekst og notatgenerering som er tilgjengelig i dag.
</div>`,
};

export const transcribeTranslations = {
  pageTitle: "Transkripsjonsverktøy med annonser og guideoversikt",
  openaiUsageLinkText: "Oversikt over OpenAI-bruk",
  btnFunctions: "Funksjoner",
  btnGuide: "Guide",
  recordingAreaTitle: "Opptaksområde",
  recordTimer: "Opptakstimer: 0 sek",
  transcribeTimer: "Avslutningstimer: 0 sek",
  transcriptionPlaceholder: "Transkripsjonsresultatet vises her...",
  startButton: "Start opptak",
  stopButton: "Stopp/Avslutt",
  pauseButton: "Paus opptak",
  statusMessage: "Velkommen! Klikk på 'Start opptak' for å begynne.",
  noteGenerationTitle: "Notatgenerering",
  generateNoteButton: "Generer notat",
  noteTimer: "Notattimer: 0 sek",
  generatedNotePlaceholder: "Det genererte notatet vises her...",
  customPromptTitle: "Tilpasset prompt",
  promptSlotLabel: "Prompt-plass:",
  customPromptPlaceholder: "Skriv inn din tilpassede prompt her",
  adUnitText: "Din annonse her",
  guideHeading: "Guide & Instruksjoner",
  guideText: `Velkommen til Whisper transkripsjonsverktøy. Denne applikasjonen lar medisinske fagpersoner, terapeuter og andre ta opp og transkribere konsultasjoner, samt generere profesjonelle notater med hjelp av en AI-basert notatgenerator.<br><br>
<strong>Hvordan bruke funksjonene:</strong>
<ul>
  <li><strong>Opptak:</strong> Klikk på "Start opptak" for å begynne å ta opp lyd. Lyd fanges opp via MediaStreamTrackProcessor (ved hjelp av WebCodecs) og samles i opptil 40 sekunder før den pakkes som en selvstendig WAV-fil.</li>
  <li><strong>Avslutning:</strong> Etter at du har klikket på "Stopp/Avslutt", avsluttes opptaket. En siste opptaksperiode på 2 sekunder samler opp eventuell gjenværende lyd før den siste delen blir behandlet. Avslutningstimeren fortsetter til hele transkripsjonen er mottatt.</li>
  <li><strong>Notatgenerering:</strong> Etter transkripsjonen, klikk på "Generer notat" for å lage et notat basert på transkripsjonen og den tilpassede prompten.</li>
  <li><strong>Tilpasset prompt:</strong> Velg en prompt-plass (1–10) og skriv inn din tilpassede prompt. Prompten lagres automatisk og knyttes til din API-nøkkel.</li>
  <li><strong>Guide:</strong> Bruk knappene "Funksjoner" og "Guide" for å veksle mellom funksjonsvisningen og denne veiledningen.</li>
</ul>
Klikk på "Funksjoner" for å gå tilbake til hovedgrensesnittet.`,
};
