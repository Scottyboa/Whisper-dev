// js/languages/language-sv.js

export const indexTranslations = {
  pageTitle: "Whisper Klinisk Transkribering",
  headerTitle: "Whisper Klinisk Transkribering",
  headerSubtitle: "Avancerad AI-drivet tal-till-text och notisgenerering för vårdkonsultationer",
  startText: "För att komma igång, vänligen ange din OpenAI API-nyckel:",
  apiPlaceholder: "Ange API-nyckel här",
  enterButton: "Gå till transkriberingsverktyget",
  guideButton: "API-guide – Så använder du",
  securityButton: "Säkerhet",
  aboutButton: "Om",
  adRevenueMessage: "Eftersom denna webbplats är gratis att använda och enbart förlitar sig på annonsintäkter, vänligen godkänn personliga annonser för att stödja tjänsten.",
  
  securityModalHeading: "Säkerhetsinformation",
  securityModalText: `Din integritet och säkerheten för patientinformation är högsta prioritet. För att säkerställa att data förblir konfidentiell:
<div style="margin-left:20px;">
  <ul>
    <li><strong>Datakryptering:</strong> All data som behandlas av systemet skyddas med industristandard krypteringsmetoder. Transkriptioner och anteckningar kopplas uteslutande till din krypterade personliga API-nyckel och den enhet som används för åtkomst, vilket garanterar att endast du har tillgång till den genererade informationen.</li>
    <li><strong>Automatisk radering:</strong> Så snart en transkription eller anteckning genereras och visas på din skärm, raderas den automatiskt och oåterkalleligt från servrarna inom 2 minuter.</li>
    <li><strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle ske, förblir datan krypterad och skyddad med enhetsspecifika markörer, vilket gör informationen otillgänglig.</li>
    <li><strong>GDPR-kompatibel hosting:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, helt kompatibla med GDPR.</li>
  </ul>
</div>
Var säker på att strikta säkerhetsåtgärder garanterar att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  
  aboutModalHeading: "Om detta projekt",
  aboutModalText: `Jag är en norsk allmänläkare med ett starkt intresse för teknologi och AI-utveckling inom vården. Jag utvecklade denna lösning för att avsevärt minska transkriptionskostnaderna och erbjuda en prisvärd, direktansluten lösning till OpenAI – du betalar endast för den faktiska användningen av OpenAI.`,
  
  guideModalHeading: "API-guide – Så använder du",
  guideModalText: `För att använda denna webapp måste du först skapa en OpenAI API-profil, generera en API-nyckel och fylla på din OpenAI-plånbok. Din API-nyckel kopieras och klistras in i det angivna fältet för API-nyckel. När du trycker på Enter sparas API-nyckeln tillfälligt för din session – denna nyckel länkar dig till OpenAI:s servrar så att tal-till-text-transkription och notisgenerering kan fungera. Observera att du debiteras omedelbart per utförd uppgift. För mer information om kostnader, vänligen se avsnittet "Kostnader" på startsidan.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
För att komma igång måste du skapa en profil på OpenAI API-plattformen. Denna profil fungerar som ditt konto för att hantera API-nycklar och fakturering. För att starta, besök sidan för <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a>. Följ instruktionerna genom att ange din e-postadress, sätta ett lösenord och verifiera ditt konto. När du är registrerad får du tillgång till din dashboard.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Efter att ha skapat din profil, generera en API-nyckel genom att navigera till sidan för <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nyckelhantering</a>. Klicka på knappen för att skapa en ny API-nyckel. Viktigt: Du kommer endast att se din API-nyckel en gång. Kopiera den omedelbart och spara den säkert (t.ex. i en textfil) för framtida bruk. Om du förlorar nyckeln eller misstänker att den har komprometterats, ta bort den från ditt konto och skapa en ny.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
För att webappen ska fungera måste din OpenAI-plånbok ha tillräckliga medel. Besök sidan för <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturering & Betalning</a> för att fylla på medel. Du kan överföra valfri summa när som helst. Så länge medlen räcker kan du använda sidan – varje uppgift debiteras omedelbart. För mer information om kostnader, se avsnittet "Kostnader" på startsidan.
<br><br>
<strong>Påminnelse om sessionssäkerhet</strong><br>
När du loggar in genom att ange din API-nyckel sparas den endast tillfälligt i din webbläsarsession. Detta innebär att om du lämnar webbplatsen, stänger webbläsaren eller stänger av datorn, sparas inte API-nyckeln. Du måste ange den igen nästa gång du använder webappen, vilket säkerställer att din nyckel förblir säker.`,
  
  // Replace the Price button/modal text with your provided Swedish translation,
  // with indented bullet points for clarity.
  priceButton: "Här är en högkvalitativ svensk översättning av din text:",
  priceModalHeading: "Kostnadsinformation för Whisper klinisk transkribering",
  priceModalText: `<h2>Priser för tal-till-text</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Kostnad:</strong> $0.006 per minut.</li>
    <li><em>Exempel:</em> En 15-minuters konsultation kostar 15 × $0.006 = <strong>$0.09</strong> per konsultation.</li>
  </ul>
</div>
<h2>Priser för anteckningsgenerering</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Token-baserad prissättning:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li><strong>Input (transkribering + prompt):</strong> $10 per 1 000 000 tokens (dvs. $0.00001 per token).</li>
          <li><strong>Output (genererad anteckning):</strong> $30 per 1 000 000 tokens (dvs. $0.00003 per token).</li>
        </ul>
      </div>
    </li>
  </ul>
</div>
<h4>Exempelberäkning för en konsultation (endast anteckningsgenerering)</h4>
<div style="margin-left:20px;">
  <ol>
    <li>
      <strong>Beräkning av input:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Antag att konsultationens transkribering är cirka <strong>700 ord</strong>, och att du lägger till en <strong>30-ords prompt</strong>.</li>
          <li>Totalt antal ord = 700 + 30 = <strong>730 ord</strong>.</li>
          <li>Uppskattat antal tokens = 730 × 0.75 ≈ <strong>547.5 tokens</strong>.</li>
          <li>Input-kostnad = 547.5 tokens × $0.00001 ≈ <strong>$0.0055</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Beräkning av output:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Antag att den genererade anteckningen är cirka <strong>250 ord</strong>.</li>
          <li>Uppskattat antal tokens = 250 × 0.75 ≈ <strong>187.5 tokens</strong>.</li>
          <li>Output-kostnad = 187.5 tokens × $0.00003 ≈ <strong>$0.0056</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Total kostnad för anteckningsgenerering:</strong>
      <div style="margin-left:20px;">
        Sammanlagd kostnad ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per konsultation.
      </div>
    </li>
  </ol>
</div>
<h2>Ungefärlig total kostnad per konsultation</h2>
<div style="margin-left:20px;">
  (för en 15-minuters konsultation/inspelning där båda funktionerna används)
  <ul>
    <li><strong>Tal-till-text:</strong> <strong>$0.09</strong></li>
    <li><strong>Anteckningsgenerering:</strong> <strong>$0.0111</strong></li>
    <li><strong>Totalt:</strong> Cirka <strong>$0.101</strong> per konsultation.</li>
  </ul>
</div>
<h2>Månatliga kostnadsuppskattningar</h2>
<div style="margin-left:20px;">
  Om du genomför 20 konsultationer per dag, 4 dagar per vecka, under 4 veckor per månad (20 × 4 × 4 = <strong>320 konsultationer</strong> per månad):
  <ol>
    <li>
      <strong>Endast tal-till-text</strong> (med anteckningsgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):
      <div style="margin-left:20px;">Månadskostnad = 320 × $0.09 = <strong>$28.80</strong>.</div>
    </li>
    <li>
      <strong>Användning av både tal-till-text och anteckningsgenerering:</strong>
      <div style="margin-left:20px;">Månadskostnad = 320 × $0.101 ≈ <strong>$32.32</strong>.</div>
    </li>
  </ol>
</div>
<h2>Alternativ för anteckningsgenerering</h2>
<div style="margin-left:20px;">
  Om du redan har ett OpenAI-konto kan du använda anteckningsgenerering via ChatGPT på din egen profil – vilket i princip är gratis. I så fall betalar du endast för tal-till-text när du använder denna webbapp.
</div>
<h2>Flexibilitet i användning</h2>
<div style="margin-left:20px;">
  Till skillnad från leverantörer som kräver ett månatligt abonnemang betalar du endast för faktisk användning. Om du tar en ledig dag, åker på semester eller har en period utan aktivitet blir dina kostnader noll. Även om du använder tjänsten dagligen för alla patientkonsultationer förblir kostnaden per användning avsevärt lägre jämfört med andra leverantörer.
</div>
<hr>
<h2>Fördel med direktanslutning</h2>
<div style="margin-left:20px;">
  Vår webbapp ansluter dig direkt till OpenAI API – inga mellanhänder, inga extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-bearbetningskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och anteckningsgenerering som finns idag.
</div>`,
};

export const transcribeTranslations = {
  pageTitle: "Transkriberingsverktyg med annonser och guideöversikt",
  openaiUsageLinkText: "Översikt över OpenAI-användning",
  btnFunctions: "Funktioner",
  btnGuide: "Guide",
  recordingAreaTitle: "Opptaksområde",
  recordTimer: "Opptakstimer: 0 sek",
  transcribeTimer: "Avslutningstimer: 0 sek",
  transcriptionPlaceholder: "Transkriberingsresultatet visas här...",
  startButton: "Starta opptak",
  stopButton: "Stoppa/Avsluta",
  pauseButton: "Pausa opptak",
  statusMessage: "Välkommen! Klicka på 'Starta opptak' för att börja.",
  noteGenerationTitle: "Notisgenerering",
  generateNoteButton: "Generera notis",
  noteTimer: "Notistimer: 0 sek",
  generatedNotePlaceholder: "Den genererade notisen visas här...",
  customPromptTitle: "Anpassad uppmaning",
  promptSlotLabel: "Uppmaningsplats:",
  customPromptPlaceholder: "Ange din anpassade uppmaning här",
  adUnitText: "Din annons här",
  guideHeading: "Guide & Instruktioner",
  guideText: `Välkommen till Whisper Transkriberingsverktyg. Detta verktyg gör det möjligt för medicinska yrkesverksamma, terapeuter och andra att spela in och transkribera konsultationer, samt generera professionella notiser med hjälp av en AI-drivet notisgenerator.<br><br>
<strong>Hur man använder funktionerna:</strong>
<ul>
  <li><strong>Opptak:</strong> Klicka på "Starta opptak" för att börja spela in ljud. Ljudet fångas upp via MediaStreamTrackProcessor (med WebCodecs) och samlas upp i upp till 40 sekunder innan det paketeras som en självständig WAV-fil.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" slutar inspelningen. En sista inspelningsperiod på 2 sekunder samlar upp eventuell kvarvarande ljud innan den sista chunk bearbetas. Avslutningstimern tickar sedan tills hela transkriptionen är mottagen.</li>
  <li><strong>Notisgenerering:</strong> Efter transkriberingen, klicka på "Generera notis" för att skapa en notis baserad på din transkription och anpassade uppmaning.</li>
  <li><strong>Anpassad uppmaning:</strong> På höger sida, välj en uppmaningsplats (1–10) och ange din anpassade uppmaning. Din uppmaning sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guide:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Var god klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
};
