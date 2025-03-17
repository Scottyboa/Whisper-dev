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
  securityModalText: `Din integritet och säkerheten för patientinformation är av högsta vikt. För att säkerställa att data förblir konfidentiell:
<div style="margin-left:20px;">
  <ul>
    <li><strong>Datakryptering:</strong> All data som behandlas av systemet skyddas med industristandard krypteringsmetoder. Transkriptioner och notiser är uteslutande kopplade till din krypterade personliga API-nyckel och den enhet du använder, vilket säkerställer att endast du har åtkomst till det genererade innehållet.</li>
    <li><strong>Automatisk radering:</strong> Så fort en transkription eller notis genereras och visas raderas den automatiskt och permanent från servrarna inom 2 minuter.</li>
    <li><strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle inträffa, förblir datan krypterad och skyddad med enhetsspecifika markörer, så att informationen inte blir åtkomlig.</li>
    <li><strong>GDPR-kompatibel hosting:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, helt i enlighet med GDPR.</li>
  </ul>
</div>
Var säker på att strikta säkerhetsåtgärder gör att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  
  aboutModalHeading: "Om detta projekt",
  aboutModalText: `Jag är en norsk allmänläkare med ett långvarigt intresse för teknologiska framsteg, särskilt inom artificiell intelligens, och jag har följt AI-utvecklingen inom vården noggrant.<br><br>
När jag först hörde om företag som erbjuder tal-till-text-tjänster för medicinska konsultationer i Norge, blev jag mycket entusiastisk. Kollegor och online-recensioner berömde dessa tjänster och lyfte fram betydande förbättringar i effektivitet och arbetsflöde. Men efter att ha gjort en djupare undersökning blev jag förvånad över hur mycket dessa företag tar betalt – särskilt med tanke på att den faktiska kostnaden för teknologin endast utgör en liten del av deras priser.<br><br>
Motiverad av denna insikt utvecklade jag min egen tal-till-text-lösning, först för personligt bruk. När jag såg hur effektiv och kostnadseffektiv lösningen var, bestämde jag mig för att göra den tillgänglig online, så att du kan få samma hastighet, noggrannhet och kvalitet som premiumtjänster, men utan de höga avgifterna.<br><br>
Jag anser att de tjänster som erbjuds av vissa av dessa företag, även om de är användbara, är överprissatta i förhållande till vad de faktiskt levererar. Många av mina kollegor – som arbetar hårt varje dag med patientvård – betalar i slutändan mycket mer än nödvändigt för att få tillgång till ett verktyg som borde vara prisvärt för alla.<br><br>
Denna webbplats är helt gratis att använda – den enda kostnaden du får är den direkta användningsavgiften från OpenAI för transkriptioner.<br>
• Inga månatliga avgifter, inga prenumerationer, inga förpliktelser – du betalar bara för de uppgifter du utför.<br>
• Du bestämmer själv hur mycket du vill spendera genom att avgöra hur mycket du överför till din OpenAI-plånbok.<br><br>
Det enda jag ber om är att du accepterar annonser, vilka bidrar till att täcka kostnaderna för backend-servrar.<br>
Ju fler som använder webbplatsen, desto högre blir hosting- och driftskostnaderna, och annonsintäkterna säkerställer att jag kan hålla tjänsten gratis och i drift utan att belasta användarna.`,
  
  guideModalHeading: "API-guide – Så använder du",
  guideModalText: `För att använda denna webbapp måste du först skapa en API-profil hos OpenAI, generera en API-nyckel och fylla på med medel i din OpenAI-plånbok. API-nyckeln kopieras och klistras in i det angivna fältet. När du trycker Enter sparas API-nyckeln tillfälligt för din session – denna nyckel kopplar dig till OpenAI:s servrar så att tal-till-text-transkription och notisgenerering fungerar. Observera att du debiteras direkt per utförd uppgift. För mer information om kostnader, se avsnittet "Kostnadsinformation" på startsidan.`,
  
  priceButton: "Priser",
  priceModalHeading: "Kostnadsinformation",
  priceModalText: `# Kostnadsinformation

## Speech-to-text prissättning  
   - **Kostnad:** $0.006 per minut.  
     *Exempel:* En 15-minuters konsultation kostar 15 × $0.006 = **$0.09** per konsultation.

## Notisgenereringsprising  
   - **Token-baserad prissättning:**  
     - **Input (transkription + prompt):** $10 per 1 000 000 tokens (d.v.s. $0.00001 per token).  
     - **Output (genererad notis):** $30 per 1 000 000 tokens (d.v.s. $0.00003 per token).

       #### Exempelberäkning (endast notisgenerering)
       1. **Beräkna input:**  
          - Anta att transkriptionen av konsultationen är cirka **700 ord**, och att du lägger till en **30-ords prompt**.  
          - Totalt antal ord = 700 + 30 = **730 ord**.  
          - Uppskattade tokens = 730 × 0.75 ≈ **547,5 tokens**.  
          - Input-kostnad = 547,5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Beräkna output:**  
          - Anta att den genererade notisen är på cirka **250 ord**.  
          - Uppskattade tokens = 250 × 0.75 ≈ **187,5 tokens**.  
          - Output-kostnad = 187,5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total kostnad för notisgenerering:**  
          - Kombinerad kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultation.

## Omtrentlig total kostnad per konsultation  
(för en 15-minuters konsultation/inspelning med båda funktionerna)  
   - **Speech-to-text:** **$0.09**  
   - **Notisgenerering:** **$0.0111**  
   - **Totalt:** Ungefär **$0.101** per konsultation.

## Månatliga kostnadsuppskattningar  
Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 × 4 × 4 = **320 konsultationer** per månad):

   1. **Endast speech-to-text** (med notisgenerering via ditt eget ChatGPT-konto, vilket i praktiken är gratis):  
      - Månadskostnad = 320 × $0.09 = **$28.80**.
   2. **Med både speech-to-text och notisgenerering:**  
      - Månadskostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativ för notisgenerering  
   Om du redan har ett OpenAI-konto kan du använda notisgenerering via ChatGPT på ditt eget konto – i praktiken gratis. I så fall betalar du endast för speech-to-text när du använder denna webapp.

## Användarvänlighet  
   Till skillnad från leverantörer som kräver ett månatligt abonnemang, betalar du bara för faktisk användning. Om du tar en ledig dag, åker på semester eller har en period utan aktivitet blir dina kostnader noll. Även om du använder tjänsten dagligen för alla dina patientkonsultationer förblir kostnaden per konsultation betydligt lägre än hos andra leverantörer.

---

**Direktanslutningsfördel**  
Vår webapp kopplar dig direkt till OpenAI API – inga mellanhänder, inga extra avgifter. Denna direkta anslutning innebär att du bara betalar för den faktiska AI-behandlingskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och notisgenerering som finns tillgänglig.`,
};

export const transcribeTranslations = {
  pageTitle: "Transkriberingsverktyg med annonser och guideöversikt",
  openaiUsageLinkText: "Kostnadsöversikt",
  btnFunctions: "Funktioner",
  btnGuide: "Guide",
  recordingAreaTitle: "Inspelningsområde",
  recordTimer: "Inspelningstimer: 0 sek",
  transcribeTimer: "Avslutningstimer: 0 sek",
  transcriptionPlaceholder: "Transkriberingsresultatet visas här...",
  startButton: "Starta inspelning",
  stopButton: "Stoppa/Avsluta",
  pauseButton: "Pausa inspelning",
  statusMessage: "Välkommen! Klicka på 'Starta inspelning' för att börja.",
  noteGenerationTitle: "Notisgenerering",
  generateNoteButton: "Generera notis",
  noteTimer: "Notistimer: 0 sek",
  generatedNotePlaceholder: "Det genererade notiset visas här...",
  customPromptTitle: "Anpassad prompt",
  promptSlotLabel: "Promptplats:",
  customPromptPlaceholder: "Skriv in anpassad prompt här",
  adUnitText: "Din annons här",
  guideHeading: "Guide och instruktioner",
  guideText: `Välkommen till Whisper Transkriberingsverktyg. Denna applikation låter medicinska experter, terapeuter och andra spela in och transkribera konsultationer, samt generera professionella notiser med hjälp av en AI-driven notisgenerator.<br><br>
<strong>Sätt att använda funktionerna:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka på "Starta inspelning" för att börja ta upp ljud. Ljudet fångas upp via MediaStreamTrackProcessor (med hjälp av WebCodecs) och samlas i upp till 40 sekunder innan det paketeras som en fristående WAV-fil.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" avslutas inspelningen. En sista inspelningsperiod på 2 sekunder samlar upp eventuell kvarvarande ljud innan den sista delen bearbetas. Avslutningstimern fortsätter tills hela transkriptionen är mottagen.</li>
  <li><strong>Notisgenerering:</strong> Efter transkriptionen, klicka på "Generera notis" för att skapa en notis baserad på transkriptionen och din anpassade prompt.</li>
  <li><strong>Anpassad prompt:</strong> Välj en promptplats (1–10) och skriv in din anpassade prompt. Prompten sparas automatiskt och knyts till din API-nyckel.</li>
  <li><strong>Guidevisning:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Vänligen klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
};
