// js/language-sv.js

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
    <li><strong>Datakryptering:</strong> All data som behandlas av systemet skyddas med industristandard krypteringsmetoder. Transkriptioner och notiser är uteslutande kopplade till din krypterade personliga API-nyckel och den enhet du använder, vilket säkerställer att endast du har åtkomst till det genererade innehållet.</li>
    <li><strong>Automatisk radering:</strong> Så snart en transkription eller notis genereras och visas på din skärm raderas den automatiskt och permanent från servrarna inom 2 minuter.</li>
    <li><strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle ske, förblir datan krypterad och skyddad med enhetsspecifika markörer, vilket gör informationen otillgänglig.</li>
    <li><strong>GDPR-kompatibel hosting:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, helt i enlighet med GDPR.</li>
  </ul>
</div>
Var säker på att strikta säkerhetsåtgärder ser till att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  
  aboutModalHeading: "Om detta projekt",
  aboutModalText: `Jag är en norsk allmänläkare med ett långvarigt intresse för teknologiska framsteg, särskilt inom artificiell intelligens, och jag har följt AI-utvecklingen inom vården noggrant.<br><br>
När jag först fick höra om företag som erbjuder tal-till-text-tjänster för medicinska konsultationer i Norge var jag mycket entusiastisk. Kollegor och online-recensioner berömde dessa tjänster och lyfte fram betydande förbättringar i effektivitet och arbetsflöde. Men efter att ha gjort ytterligare efterforskningar blev jag förvånad över hur mycket dessa företag tog betalt för sina tjänster – särskilt med tanke på att den faktiska kostnaden för teknologin endast utgör en liten del av deras priser.<br><br>
Motiverad av denna insikt utvecklade jag min egen tal-till-text-lösning, först för personligt bruk. När jag såg hur effektiv och kostnadseffektiv lösningen var bestämde jag mig för att göra den tillgänglig online, så att den erbjuder samma hastighet, noggrannhet och kvalitet som premiumtjänster, men utan de höga avgifterna.<br><br>
Till skillnad från kommersiella leverantörer lägger inte denna plattform på extra kostnader eller onödiga avgifter.<br>
• Istället betalar du direkt till OpenAI – det innebär att du går rakt till källan för teknologin, utan att mellanliggande aktörer tar en extra andel.<br>
• På grund av detta är detta det billigaste alternativet som samtidigt upprätthåller högsta kvalitet.<br><br>
Jag anser att de tjänster som erbjuds av vissa av dessa företag, även om de är användbara, är överprissatta i förhållande till vad de faktiskt levererar. Många av mina kollegor – som arbetar hårt varje dag med patientvård – slutar med att betala betydligt mer än nödvändigt bara för att få tillgång till ett verktyg som borde vara prisvärt för alla.<br><br>
Denna webbplats är helt gratis att använda – den enda kostnaden du ådrar dig är den direkta avgiften för OpenAI:s användning vid transkriptioner.<br>
• Inga månatliga avgifter, inga prenumerationer, inga förpliktelser – du betalar endast för de uppgifter du utför.<br>
• Du bestämmer själv hur mycket du vill spendera genom att avgöra hur mycket du överför till din OpenAI-plånbok.<br><br>
Det enda jag ber om är att du accepterar annonser, vilket hjälper till att täcka kostnaderna för backend-servrarna.<br>
Allteftersom fler använder webbplatsen kommer hosting- och driftskostnaderna att öka, och annonsintäkterna säkerställer att jag kan hålla tjänsten gratis och igång utan att belasta användarna.`,
  
  guideModalHeading: "API-guide – Så använder du",
  guideModalText: `För att använda denna webapp måste du först skapa en API-profil hos OpenAI, generera en API-nyckel och fylla på med medel i din OpenAI-plånbok. Din API-nyckel kopieras och klistras in i det angivna fältet. När du trycker på Enter sparas API-nyckeln tillfälligt för din session – denna nyckel kopplar dig till OpenAI:s servrar så att tal-till-text-transkription och notisgenerering kan fungera. Observera att du debiteras omedelbart per utförd uppgift. För mer information om kostnader, se avsnittet "Kostnadsinformation" på startsidan.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
För att komma igång måste du skapa en profil på OpenAI:s API-plattform. Denna profil fungerar som ditt konto för hantering av API-nycklar och fakturering. Besök sidan <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> och följ instruktionerna genom att ange din e-postadress, sätta ett lösenord och verifiera ditt konto. När du har registrerat dig får du tillgång till din instrumentpanel.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Efter att du skapat din profil, generera en API-nyckel genom att gå till <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nyckeladministrationen</a>. Klicka på knappen för att skapa en ny API-nyckel. Viktigt: Du kommer bara att se din API-nyckel en gång. Kopiera den omedelbart och förvara den säkert (t.ex. i en textfil). Om du förlorar nyckeln eller misstänker att den har blivit komprometterad, ta bort den från ditt konto och generera en ny.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
För att webappen ska fungera måste din OpenAI-plånbok ha tillräckliga medel. Besök sidan <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturering & Betalning</a> för att fylla på med medel. Du kan överföra valfri summa när som helst. Så länge medlen räcker, kan du använda tjänsten – varje uppgift debiteras omedelbart.
<br><br>
<strong>Sessionssäkerhetspåminnelse</strong><br>
När du loggar in med din API-nyckel sparas den endast tillfälligt i din webbläsarsession. Detta innebär att om du lämnar webbplatsen, stänger webbläsaren eller stänger av datorn, sparas inte nyckeln permanent. Du måste skriva in den igen nästa gång du använder webappen, vilket säkerställer att din nyckel förblir säker.`,
  
  priceButton: "Price",
  priceModalHeading: "Kostnadsinformation",
  priceModalText: `# Kostnadsinformation

## Tal-till-text-prissättning  
   - **Kostnad:** $0.006 per minut.  
     *Exempel:* En 15-minuters konsultation kostar 15 × $0.006 = **$0.09** per konsultation.

## Notisgenereringsprissättning  
   - **Token-baserad prissättning:**  
     - **Input (transkription + prompt):** $10 per 1,000,000 tokens (dvs. $0.00001 per token).  
     - **Output (genererad notis):** $30 per 1,000,000 tokens (dvs. $0.00003 per token).

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
          - Kombinerad kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultation.

## Omtrentlig total kostnad per konsultation  
(för en 15-minuters konsultation/innspelning med båda funktionerna)  
   - **Tal-till-text:** **$0.09**  
   - **Notisgenerering:** **$0.0111**  
   - **Totalt:** Ungefär **$0.101** per konsultation.

## Månatliga kostnadsuppskattningar  
Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 × 4 × 4 = **320 konsultationer** per månad):

   1. **Endast tal-till-text** (med notisgenerering via ditt eget ChatGPT-konto, vilket i praktiken är gratis):  
      - Månadskostnad = 320 × $0.09 = **$28.80**.
   2. **Både tal-till-text och notisgenerering:**  
      - Månadskostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativ för notisgenerering  
   Om du redan har ett OpenAI-konto kan du använda notisgenerering via ChatGPT på ditt eget konto – vilket i praktiken är gratis. I så fall betalar du bara för tal-till-text-tjänsten när du använder denna webapp.

## Användningsflexibilitet  
   Till skillnad från leverantörer som kräver ett månatligt abonnemang, betalar du endast för faktisk användning. Om du tar en fridag, åker på semester eller har en period utan aktivitet blir dina kostnader noll. Även om du använder tjänsten dagligen för alla dina konsultationer förblir kostnaden per konsultation betydligt lägre än hos andra leverantörer.

---

**Direktanslutningsfördel**  
Vår webapp kopplar dig direkt till OpenAI API – inga mellanhänder, inga extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-behandlingskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och notisgenerering som finns idag.`,
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
  <li><strong>Opptak:</strong> Klicka på "Starta opptak" för att börja spela in ljud. Ljudet fångas upp via MediaStreamTrackProcessor (med WebCodecs) och samlas i upp till 40 sekunder innan det paketeras som en självständig WAV-fil.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" avslutas inspelningen. En sista inspelningsperiod på 2 sekunder samlar upp eventuell kvarvarande ljud innan den sista delen behandlas. Avslutningstimern fortsätter tills hela transkriptionen är mottagen.</li>
  <li><strong>Notisgenerering:</strong> Efter transkriptionen, klicka på "Generera notis" för att skapa en notis baserad på din transkription och din anpassade uppmaning.</li>
  <li><strong>Anpassad uppmaning:</strong> Välj en uppmaningsplats (1–10) och skriv in din anpassade uppmaning. Din uppmaning sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guide:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Var god klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
};
