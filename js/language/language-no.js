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
  priceModalText: `# Kostnadsinformasjon

## Tal-till-tekst-prising  
   - **Kostnad:** $0.006 per minutt.  
     *Eksempel:* En 15-minutters konsultasjon vil koste 15 × $0.006 = **$0.09** per konsultasjon.

## Notisgenereringsprissättning  
   - **Token-baserad prissättning:**  
     - **Input (transkripsjon + prompt):** $10 per 1,000,000 tokens (dvs. $0.00001 per token).  
     - **Output (generert notis):** $30 per 1,000,000 tokens (dvs. $0.00003 per token).

       #### Exempelberäkning (endast notisgenerering)
       1. **Beräkning av input:**  
          - Anta att transkriptionen av konsultationen är cirka **700 ord** och att du lägger till en **30-ords prompt**.  
          - Totalt antal ord = 700 + 30 = **730 ord**.  
          - Uppskattade tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Input-kostnad = 547.5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Beräkning av output:**  
          - Anta att den genererade notisen är omkring **250 ord**.  
          - Uppskattade tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Output-kostnad = 187.5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total kostnad för notisgenerering:**  
          - Kombinerad kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultasjon.

## Omtrentlig total kostnad per konsultasjon  
(For en 15-minutters konsultasjon/innspilling med begge funksjoner)  
   - **Tal-till-tekst:** **$0.09**  
   - **Notisgenerering:** **$0.0111**  
   - **Totalt:** Omtrent **$0.101** per konsultasjon.

## Månedlige kostnadsestimater  
Forutsatt at du gjennomfører 20 konsultasjoner per dag, 4 dager per uke, over 4 uker per måned (20 × 4 × 4 = **320 konsultasjoner** per måned):

   1. **Kun tale-til-tekst** :  
      - Månedlig kostnad = 320 × $0.09 = **$28.80**.
   2. **Bruk av både tale-til-tekst og notisgenerering:**  
      - Månedlig kostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativ for notisgenerering  
   Hvis du allerede har en OpenAI-konto, kan du bruke notisgenerering via ChatGPT på ditt eget profil – i praksis gratis. I så fall påløper kun kostnaden for tale-til-tekst når du bruker denne webappen.

## Brukervennlighet  
   I motsetning til leverandører som krever et månedlig abonnement, betaler du kun for faktisk bruk. Hvis du tar en fridag, drar på ferie eller har en periode uten aktivitet, vil kostnadene dine være null. Selv om du bruker tjenesten daglig for alle dine pasientkonsultasjoner, forblir kostnaden per konsultasjon betydelig lavere enn hos andre leverandører.

---

**Direkte Tilkoblingsfordel**  
Vår webapp kobler deg direkte til OpenAI API – ingen mellomledd, ingen ekstra avgifter. Denne direkte koblingen betyr at du kun betaler for den faktiske AI-behandlingskostnaden, noe som gjør vår tjeneste til en av de mest prisgunstige løsningene for tale-til-tekst og notisgenerering som er tilgjengelig i dag.`,
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
  <li><strong>Guide Toggle:</strong> Bruk "Funksjoner" og "Guide" knappene til å bytte mellom funksjon og guide vinduet.</li>
</ul>
Vennligst klikk "Funksjoner" for å returnere til funksjonsvinduet.`,
};
