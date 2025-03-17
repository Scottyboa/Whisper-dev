// js/language-sv.js

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
  
  priceButton: "Pris",
  priceModalHeading: "Kostnadsinformasjon",
  priceModalText: `<div class="price-info">
  <h1>Kostnadsinformasjon</h1>
  <h2>Tal-till-text-prissättning</h2>
  <p><strong>Kostnad:</strong> $0.006 per minut.<br>
  <em>Exempel:</em> En 15-minuters konsultation kostar 15 &times; $0.006 = <strong>$0.09</strong> per konsultation.</p>
  <h2>Prissättning för anteckningsgenerering</h2>
  <p><strong>Token-baserad prissättning:</strong></p>
  <ul>
    <li><strong>Input (transkription + prompt):</strong> $10 per 1,000,000 tokens (d.v.s. $0.00001 per token).</li>
    <li><strong>Output (genererad anteckning):</strong> $30 per 1,000,000 tokens (d.v.s. $0.00003 per token).</li>
  </ul>
  <h3>Exempelberäkning för konsultation (endast anteckningsgenerering)</h3>
  <ol>
    <li>
      <strong>Beräkning av input:</strong>
      <ul>
        <li>Anta att konsultationens transkription är cirka <strong>700 ord</strong> och att du lägger till en <strong>30-ords prompt</strong>.</li>
        <li>Totalt antal ord = 700 + 30 = <strong>730 ord</strong>.</li>
        <li>Uppskattat antal tokens = 730 &times; 0.75 ≈ <strong>547.5 tokens</strong>.</li>
        <li>Input-kostnad = 547.5 tokens &times; $0.00001 ≈ <strong>$0.0055</strong>.</li>
      </ul>
    </li>
    <li>
      <strong>Beräkning av output:</strong>
      <ul>
        <li>Anta att den genererade anteckningen är cirka <strong>250 ord</strong>.</li>
        <li>Uppskattat antal tokens = 250 &times; 0.75 ≈ <strong>187.5 tokens</strong>.</li>
        <li>Output-kostnad = 187.5 tokens &times; $0.00003 ≈ <strong>$0.0056</strong>.</li>
      </ul>
    </li>
    <li>
      <strong>Total kostnad för anteckningsgenerering:</strong> Sammanlagd kostnad ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per konsultation.
    </li>
  </ol>
  <h2>Ungefärlig total kostnad per konsultation</h2>
  <p>(för en 15 minuters konsultation/inspelning med båda funktionerna)</p>
  <ul>
    <li><strong>Tal-till-text:</strong> <strong>$0.09</strong></li>
    <li><strong>Anteckningsgenerering:</strong> <strong>$0.0111</strong></li>
    <li><strong>Totalt:</strong> Ungefär <strong>$0.101</strong> per konsultation.</li>
  </ul>
  <h2>Månadskostnadsberäkningar</h2>
  <p>Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 &times; 4 &times; 4 = <strong>320 konsultationer</strong> per månad):</p>
  <ol>
    <li><strong>Endast tal-till-text</strong> (med anteckningsgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):<br>
      Månadskostnad = 320 &times; $0.09 = <strong>$28.80</strong>.
    </li>
    <li><strong>Både tal-till-text och anteckningsgenerering:</strong><br>
      Månadskostnad = 320 &times; $0.101 ≈ <strong>$32.32</strong>.
    </li>
  </ol>
  <h2>Alternativ för anteckningsgenerering</h2>
  <p>Om du redan har ett OpenAI-konto kan du använda anteckningsgenereringen via ChatGPT på ditt eget konto — vilket i princip är gratis. I så fall debiteras du endast för tal-till-text-kostnaden när du använder denna webbapplikation.</p>
  <h2>Flexibilitet i användningen</h2>
  <p>Till skillnad från leverantörer som kräver en månadsprenumeration betalar du bara per användning. Om du tar en ledig dag, är på semester eller har en period utan aktivitet, blir dina kostnader noll. Även om du använder tjänsten varje dag för alla dina patientkonsultationer, förblir kostnaden per användning avsevärt lägre jämfört med andra leverantörer.</p>
  <hr>
  <p><strong>Direktanslutningsfördel:</strong><br>
  Vår webbapplikation kopplar dig direkt till OpenAI API – utan mellanhänder och extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-behandlingskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och anteckningsgenerering som finns tillgängliga idag.</p>
</div>`,
  
  transcribeTranslations: {
    pageTitle: "Transkriptionstjänst med annonser och guideöverlägg",
    openaiUsageLinkText: "Översikt över kostnadsanvändning",
    btnFunctions: "Funktioner",
    btnGuide: "Guide",
    recordingAreaTitle: "Inspelningsområde",
    recordTimer: "Inspelningstimer: 0 sek",
    transcribeTimer: "Färdigställandetimer: 0 sek",
    transcriptionPlaceholder: "Transkriptionsresultatet visas här...",
    startButton: "Starta inspelning",
    stopButton: "Stoppa/Avsluta",
    pauseButton: "Pausa inspelning",
    statusMessage: "Välkommen! Klicka på \"Starta inspelning\" för att börja.",
    noteGenerationTitle: "Anteckningsgenerering",
    generateNoteButton: "Generera anteckning",
    noteTimer: "Anteckningsgenereringstimer: 0 sek",
    generatedNotePlaceholder: "Den genererade anteckningen visas här...",
    customPromptTitle: "Anpassad prompt",
    promptSlotLabel: "Promptplats:",
    customPromptPlaceholder: "Ange anpassad prompt här",
    adUnitText: "Din annons här",
    guideHeading: "Guide & Instruktioner",
    guideText: `Välkommen till Whisper Transkriptionstool. Denna applikation gör det möjligt för medicinska yrkesverksamma, terapeuter och andra utövare att spela in och transkribera konsultationer, samt generera professionella anteckningar med hjälp av en AI-driven anteckningsgenerator.<br><br>
<strong>Så här använder du funktionerna:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka på "Starta inspelning" för att börja fånga upp ljud. Var 40:e sekund skickas en ljudbit automatiskt för transkription till OpenAI-servrarna. Transkriptionerna visas en efter en i fältet för transkriptionstext.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" stoppas inspelningen. Färdigställandetimern börjar sedan ticka tills hela transkriptionen mottagits. Detta tar vanligtvis mellan 5 och 10 sekunder.</li>
  <li><strong>Anteckningsgenerering:</strong> Efter transkriptionen, klicka på "Generera anteckning" för att skapa en anteckning baserad på ditt transkript och din anpassade prompt.</li>
  <li><strong>Anpassad prompt:</strong> Till höger, välj en promptplats (1–10) och ange din anpassade prompt. Din prompt sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guideväxling:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Vänligen klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
  },
};
