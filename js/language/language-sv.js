// js/language-sv.js

export const indexTranslations = {
  pageTitle: "Whisper Klinisk Transkription",
  headerTitle: "Whisper Klinisk Transkription",
  headerSubtitle: "Avancerad AI-driven tal-till-text och anteckningsgenerering för vårdkonsultationer",
  startText: "För att komma igång, vänligen ange din OpenAI API-nyckel:",
  apiPlaceholder: "Ange API-nyckel här",
  enterButton: "Gå in i transkriptionstjänsten",
  guideButton: "API-guide – Hur man använder",
  securityButton: "Säkerhet",
  aboutButton: "Om",
  adRevenueMessage: "Eftersom denna webbplats är gratis att använda och enbart finansieras genom annonsintäkter, vänligen godkänn personliga annonser för att hjälpa till att stödja tjänsten.",
  securityModalHeading: "Säkerhetsinformation",
  securityModalText: `Din integritet och säkerheten för patientinformation är våra högsta prioriteringar. För att säkerställa att data förblir konfidentiell:<br><br>
- <strong>Datakryptering:</strong> All data som behandlas av systemet skyddas med industristandardiserade krypteringsmetoder. Transkriptioner och anteckningar är exklusivt kopplade till din krypterade personliga API-nyckel och den enhet du använder, vilket säkerställer att endast du har tillgång till det genererade innehållet.<br><br>
- <strong>Automatisk radering:</strong> När en transkription eller anteckning har genererats och visas på din skärm, raderas den automatiskt och oåterkalleligt från servrarna inom 2 minuter.<br><br>
- <strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle inträffa, förblir datan krypterad och skyddad med enhetsspecifika markörer, vilket gör informationen otillgänglig.<br><br>
- <strong>GDPR-kompatibelt värdskap:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, fullt kompatibla med GDPR-reglerna.<br><br>
Var trygg med att strikta säkerhetsåtgärder säkerställer att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  aboutModalHeading: "Om projektet",
  aboutModalText: `Jag är en norsk husläkare som alltid haft ett intresse för teknologiska framsteg, särskilt inom artificiell intelligens, och jag har noggrant följt AI-utvecklingen inom hälso- och sjukvården.<br><br>
När jag först fick höra om företag som erbjöd tal-till-text-tjänster för medicinska konsultationer i Norge blev jag entusiastisk. Kollegor och online-recensioner berömde dessa tjänster och påpekade betydande förbättringar i deras effektivitet och arbetsflöde. Men efter ytterligare undersökning blev jag förvånad över hur mycket dessa företag debiterade för sina tjänster – särskilt med tanke på att den faktiska kostnaden för teknologin bara utgör en bråkdel av deras priser.<br><br>
Motiverad av denna insikt utvecklade jag min egen tal-till-text-lösning, initialt för personligt bruk. När jag såg hur effektiv och kostnadseffektiv den var, beslutade jag att göra lösningen tillgänglig online, och erbjuda samma hastighet, noggrannhet och kvalitet som finns i premiumtjänster, men utan de höga avgifterna.<br><br>
Till skillnad från kommersiella leverantörer lägger denna plattform inte på extra kostnader eller onödiga avgifter.<br>
• Istället betalar du direkt till OpenAI – vilket innebär att du går direkt till källan för teknologin, utan mellanhänder som tar en extra del.<br>
• Tack vare detta är det det billigaste alternativet som samtidigt upprätthåller högsta kvalitet.<br><br>
Jag anser att de tjänster som erbjuds av vissa av dessa företag, även om de är användbara, är överprissatta i förhållande till vad de faktiskt levererar. Många av mina kollegor – som jobbar hårt varje dag inom patientvården – slutar med att betala betydligt mer än nödvändigt bara för att få tillgång till ett verktyg som borde vara prisvärt för alla.<br><br>
Denna webbplats är helt gratis att använda – din enda kostnad är den direkta OpenAI-avgiften för transkriptioner.<br>
• Inga månadsavgifter, inga prenumerationer, inga bindningstider – du betalar bara för de uppgifter du utför.<br>
• Du kontrollerar hur mycket du spenderar genom att bestämma hur mycket du överför till din OpenAI-plånbok.<br><br>
Det enda jag ber om är att du accepterar annonser, vilket hjälper till att täcka kostnaderna för backend-servrarna.<br>
Allt eftersom fler använder webbplatsen kommer värd- och driftskostnaderna att öka, och annonsintäkter säkerställer att jag kan hålla den gratis och igång utan att ta betalt av användarna.`,
  guideModalHeading: "Hur du ställer in din OpenAI API för Whisper Klinisk Transkription",
  guideModalText: `För att använda denna webbapplikation måste du först skapa en profil på OpenAI API, generera en API-nyckel och fylla på din OpenAI-plånbok. Din API-nyckel kopieras sedan och klistras in i det angivna fältet för API-nyckel. När du trycker på Enter sparar webbapplikationen API-nyckeln temporärt för din session – denna nyckel kopplar dig till OpenAI-servrarna så att tal-till-text-transkription och anteckningsgenerering kan fungera. Observera att du debiteras omedelbart per utförd uppgift. För mer information om kostnader, se avsnittet "Pris" på startsidan.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
För att börja behöver du skapa en profil på OpenAI API-plattformen. Denna profil fungerar som ditt konto för att hantera API-nycklar och fakturering. För att komma igång, besök <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a>-sidan. Följ instruktionerna för att registrera dig genom att ange din e-postadress, sätta ett lösenord och verifiera ditt konto. När du är registrerad får du tillgång till din instrumentpanel.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Efter att ha skapat din profil, generera en API-nyckel genom att navigera till <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nyckelhantering</a>-sidan. Klicka på knappen för att skapa en ny API-nyckel. Viktigt: Du kommer endast att se din API-nyckel en gång. Kopiera den omedelbart och spara den säkert (t.ex. i en textfil) för framtida bruk. Om du förlorar nyckeln eller misstänker att den har komprometterats, radera den från ditt konto och skapa en ny.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
För att webbapplikationen ska fungera måste din OpenAI-plånbok ha tillräckliga medel. Besök <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturerings- & Betalningssidan</a> för att lägga till medel. Du kan överföra vilket belopp som helst när som helst. Så länge medel finns tillgängliga kan du använda webbplatsen – varje uppgift debiteras omedelbart.
<br><br>
<strong>Påminnelse om sessionssäkerhet</strong><br>
När du loggar in genom att ange din API-nyckel, sparas den endast temporärt i din webbläsarsession. Det innebär att om du lämnar webbplatsen, stänger webbläsaren eller stänger av datorn, kommer API-nyckeln inte att sparas. Du måste ange din API-nyckel igen nästa gång du använder webbapplikationen, vilket säkerställer att din nyckel förblir säker.`,
  priceButton: "Pris",
  priceModalHeading: "Kostnadsinformation",
  priceModalText: `# Kostnadsinformation

## Tal-till-text-prissättning  
   - **Kostnad:** $0.006 per minut.  
     *Exempel:* En 15-minuters konsultation kostar 15 × $0.006 = **$0.09** per konsultation.

## Prissättning för anteckningsgenerering  
   - **Token-baserad prissättning:**  
     - **Input (transkription + prompt):** $10 per 1,000,000 tokens (d.v.s. $0.00001 per token).  
     - **Output (genererad anteckning):** $30 per 1,000,000 tokens (d.v.s. $0.00003 per token).

       #### Exempelberäkning för konsultation (endast anteckningsgenerering)
       1. **Beräkning av input:**  
          - Anta att konsultationens transkription är cirka **700 ord** och att du lägger till en **30-ords prompt**.  
          - Totalt antal ord = 700 + 30 = **730 ord**.  
          - Uppskattat antal tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Input-kostnad = 547.5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Beräkning av output:**  
          - Anta att den genererade anteckningen är cirka **250 ord**.  
          - Uppskattat antal tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Output-kostnad = 187.5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total kostnad för anteckningsgenerering:**  
          - Sammanlagd kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultation.

## Ungefärlig total kostnad per konsultation  
(för en 15 minuters konsultation/inspelning med båda funktionerna)  
   - **Tal-till-text:** **$0.09**  
   - **Anteckningsgenerering:** **$0.0111**  
   - **Totalt:** Ungefär **$0.101** per konsultation.

## Månadskostnadsberäkningar  
Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 × 4 × 4 = **320 konsultationer** per månad):

   1. **Endast tal-till-text** (med anteckningsgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):  
      - Månadskostnad = 320 × $0.09 = **$28.80**.
   2. **Både tal-till-text och anteckningsgenerering:**  
      - Månadskostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativ för anteckningsgenerering  
   Om du redan har ett OpenAI-konto kan du använda anteckningsgenereringen via ChatGPT på ditt eget konto – vilket i princip är gratis. I så fall debiteras du endast för tal-till-text-kostnaden när du använder denna webbapplikation.

## Flexibilitet i användningen  
   Till skillnad från leverantörer som kräver en månadsprenumeration betalar du bara per användning. Om du tar en ledig dag, är på semester eller har en period utan aktivitet, blir dina kostnader noll. Även om du använder tjänsten varje dag för alla dina patientkonsultationer, förblir kostnaden per användning avsevärt lägre jämfört med andra leverantörer.

---

**Direktanslutningsfördel**  
Vår webbapplikation kopplar dig direkt till OpenAI API – utan mellanhänder och extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-behandlingskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och anteckningsgenerering som finns tillgängliga idag.`,
};

export const transcribeTranslations = {
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
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" stoppas inspelningen. Färdigställandetimern börjar sedan ticka tills hela transkriptionen mottagits. Detta tar vanligtvis mellan 5-10 sekunder.</li>
  <li><strong>Anteckningsgenerering:</strong> Efter transkriptionen, klicka på "Generera anteckning" för att skapa en anteckning baserad på ditt transkript och din anpassade prompt.</li>
  <li><strong>Anpassad prompt:</strong> Till höger, välj en promptplats (1–10) och ange din anpassade prompt. Din prompt sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Guideväxling:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Vänligen klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
};
