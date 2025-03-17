// js/language-sv.js

export const indexTranslations = {
  pageTitle: "Whisper Klinisk Transkription",
  headerTitle: "Whisper Klinisk Transkription",
  headerSubtitle: "Avancerad AI-driven tal-till-text och anteckningsgenerering för vårdkonsultationer",
  startText: "För att komma igång, vänligen ange din OpenAI API-nyckel:",
  apiPlaceholder: "Ange API-nyckel här",
  enterButton: "Öppna transkriptionverktyget",
  guideButton: "API-guide – Så här använder du",
  securityButton: "Säkerhet",
  aboutButton: "Om",
  adRevenueMessage: "Eftersom denna webbplats är gratis att använda och enbart finansieras via annonsintäkter, vänligen godkänn personligt anpassade annonser för att stödja tjänsten.",
  securityModalHeading: "Säkerhetsinformation",
  securityModalText: `Din integritet och säkerheten för patientinformation är högsta prioritet. För att säkerställa att data förblir konfidentiell:<br><br>
- <strong>Kryptering av data:</strong> All data som behandlas av systemet skyddas med industristandardiserade krypteringsmetoder. Transkriptioner och anteckningar kopplas uteslutande till din krypterade personliga API-nyckel och den enhet som används för åtkomst, vilket säkerställer att endast du har tillgång till det genererade innehållet.<br><br>
- <strong>Automatisk radering:</strong> När en transkription eller anteckning har genererats och visas på din skärm raderas den automatiskt och oåterkalleligt från servrarna inom 2 minuter.<br><br>
- <strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle inträffa, förblir datan krypterad och skyddad med enhetsspecifika markörer, vilket gör informationen otillgänglig.<br><br>
- <strong>GDPR-kompatibel hosting:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, fullt förenliga med GDPR-reglerna.<br><br>
Var säker på att strikta säkerhetsåtgärder garanterar att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  aboutModalHeading: "Om projektet",
  aboutModalText: `Jag är en norsk husläkare med ett stort intresse för teknologiska framsteg, särskilt inom artificiell intelligens, och jag har noggrant följt AI-utvecklingen inom vården.<br><br>
När jag först fick höra om företag som erbjöd tal-till-text-tjänster för medicinska konsultationer i Norge, blev jag entusiastisk. Kollegor och recensioner på nätet berömde dessa tjänster och betonade de betydande förbättringarna i deras effektivitet och arbetsflöde. Men när jag undersökte saken närmare blev jag förvånad över hur mycket dessa företag tog betalt för sina tjänster – särskilt med tanke på att den faktiska kostnaden för teknologin bara är en bråkdel av deras priser.<br><br>
Motiverad av denna insikt utvecklade jag min egen tal-till-text-lösning, initialt för eget bruk. När jag såg hur effektiv och kostnadseffektiv den var, beslutade jag att göra den tillgänglig online – med samma hastighet, noggrannhet och kvalitet som premiumtjänster erbjuder, men utan de höga avgifterna.<br><br>
Till skillnad från kommersiella leverantörer höjer inte denna plattform priserna eller inför onödiga avgifter.<br>
• Istället betalar du direkt till OpenAI – vilket innebär att du går direkt till källan till teknologin, utan mellanhänder som tar en extra avgift.<br>
• Tack vare detta är det det billigaste alternativet som ändå håller toppklassig kvalitet.<br><br>
Jag anser att de tjänster som erbjuds av vissa företag, trots att de är användbara, är överprissatta i förhållande till vad de faktiskt levererar. Många av mina kollegor – som arbetar hårt varje dag med patientvård – slutar med att betala betydligt mer än nödvändigt bara för att få tillgång till ett verktyg som borde vara prisvärt för alla.<br><br>
Denna webbplats är helt gratis att använda – din enda kostnad är den direkta avgiften för OpenAI:s transkriptionstjänster.<br>
• Inga månadsavgifter, inga prenumerationer, inga åtaganden – du betalar endast för de uppgifter du utför.<br>
• Du kontrollerar hur mycket du spenderar genom att bestämma hur mycket du vill överföra till din OpenAI-plånbok.<br><br>
Det enda jag ber om är att du accepterar annonser, vilket hjälper till att täcka backend-serverkostnaderna.<br>
Ju fler som använder webbplatsen, desto högre blir hosting- och driftskostnaderna, och annonsintäkterna säkerställer att jag kan hålla tjänsten gratis och igång utan att ta betalt av användarna.`,
  guideModalHeading: "Så här ställer du in din OpenAI API för Whisper Klinisk Transkription",
  guideModalText: `För att använda denna webbapp måste du först skapa en profil på OpenAI API, generera en API-nyckel och fylla på din OpenAI-plånbok med pengar. Din API-nyckel kopieras sedan och klistras in i det angivna fältet för API-nyckel. När du trycker på Enter sparas API-nyckeln temporärt för din session – denna nyckel kopplar dig till OpenAI:s servrar så att tal-till-text-transkription och anteckningsgenerering kan fungera. Observera att du debiteras omedelbart per utförd uppgift. För mer information om kostnader, vänligen se avsnittet "Kostnad" på startsidan.<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
För att börja måste du skapa en profil på OpenAI API-plattformen. Denna profil fungerar som ditt konto för att hantera API-nycklar och fakturering. För att komma igång, besök <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Registrering</a>. Följ instruktionerna genom att ange din e-postadress, skapa ett lösenord och verifiera ditt konto. När du är registrerad har du tillgång till din instrumentpanel.<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Efter att ha skapat din profil, generera en API-nyckel genom att navigera till sidan för <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nyckelhantering</a>. Klicka på knappen för att skapa en ny API-nyckel. Viktigt: Du kommer bara att se din API-nyckel en gång. Kopiera den omedelbart och spara den på ett säkert ställe (t.ex. i en textfil) för framtida bruk. Om du förlorar nyckeln eller misstänker att den har komprometterats, radera den från ditt konto och skapa en ny.<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
För att webbappen ska fungera måste din OpenAI-plånbok ha tillräckliga medel. Besök sidan för <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturering & Betalning</a> för att fylla på med pengar. Du kan överföra vilket belopp som helst när som helst. Så länge det finns medel tillgängliga kan du använda sidan – varje uppgift debiteras omedelbart.<br><br>
<strong>Påminnelse om sessionssäkerhet</strong><br>
När du loggar in genom att ange din API-nyckel lagras den endast temporärt i din webbläsarsession. Det innebär att om du lämnar webbplatsen, stänger din webbläsare eller stänger av datorn, kommer API-nyckeln inte att sparas. Du måste ange din API-nyckel igen nästa gång du använder webbappen, vilket säkerställer att din nyckel förblir säker.`,
  priceButton: "Pris",
  priceModalHeading: "Kostnadsinformation",
  priceModalText: `# Kostnadsinformation

## Prissättning för tal-till-text  
- **Kostnad:** $0.006 per minut.  
  *Exempel:* En 15-minuters konsultation kommer att kosta 15 × $0.006 = **$0.09** per konsultation.

## Prissättning för anteckningsgenerering  
- **Prissättning baserad på tokens:**  
   - **Inmatning (transkription + prompt):** $10 per 1 000 000 tokens (dvs. $0.00001 per token).  
   - **Utmatning (genererad anteckning):** $30 per 1 000 000 tokens (dvs. $0.00003 per token).

#### Exempel på konsultationsberäkning (endast anteckningsgenerering)
1. **Beräkning av inmatning:**  
   - Antag att konsultationens transkription omfattar cirka **700 ord** och att du lägger till en **prompt på 30 ord**.  
   - Totalt antal ord = 700 + 30 = **730 ord**.  
   - Uppskattat antal tokens = 730 × 0.75 ≈ **547,5 tokens**.  
   - Kostnad för inmatning = 547,5 tokens × $0.00001 ≈ **$0.0055**.
2. **Beräkning av utmatning:**  
   - Antag att den genererade anteckningen omfattar cirka **250 ord**.  
   - Uppskattat antal tokens = 250 × 0.75 ≈ **187,5 tokens**.  
   - Kostnad för utmatning = 187,5 tokens × $0.00003 ≈ **$0.0056**.
3. **Total kostnad för anteckningsgenerering:**  
   - Sammanlagd kostnad ≈ $0.0055 + $0.0056 = **$0.0111** per konsultation.

## Ungefärlig total kostnad per konsultation  
(för en 15-minuters konsultation/inspelning, med båda funktionerna)  
- **Tal-till-text:** **$0.09**  
- **Anteckningsgenerering:** **$0.0111**  
- **Totalt:** Ungefär **$0.101** per konsultation.

## Månatliga kostnadsuppskattningar  
Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 × 4 × 4 = **320 konsultationer** per månad):

1. **Endast tal-till-text** (med anteckningsgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):  
   - Månadskostnad = 320 × $0.09 = **$28.80**.
2. **Med både tal-till-text och anteckningsgenerering:**  
   - Månadskostnad = 320 × $0.101 ≈ **$32.32**.

## Alternativt alternativ för anteckningsgenerering  
Om du redan har ett OpenAI-konto kan du använda anteckningsgenerering via ChatGPT på din egen profil – vilket i princip är gratis. I det fallet betalar du endast för tal-till-text när du använder denna webbapp.

## Användningsflexibilitet  
Till skillnad från leverantörer som kräver en månatlig prenumeration betalar du endast per användning. Om du tar en ledig dag, går på semester eller har en period utan aktivitet blir dina kostnader noll. Även om du använder tjänsten varje dag för alla dina patientkonsultationer förblir kostnaden per användning betydligt lägre jämfört med andra leverantörer.

---

**Fördelen med direktanslutning**  
Vår webbapp kopplar dig direkt till OpenAI API – utan mellanhänder, utan extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-bearbetningskostnaden, vilket gör vår tjänst till en av de mest prisvärda lösningarna för tal-till-text och anteckningsgenerering som finns tillgängliga idag.`,
};

export const transcribeTranslations = {
  pageTitle: "Transkriptionverktyg med annonser och guideöverlägg",
  openaiUsageLinkText: "Kostnadsöversikt",
  btnFunctions: "Funktioner",
  btnGuide: "Guide",
  recordingAreaTitle: "Inspelningsområde",
  recordTimer: "Inspelningstimer: 0 sek",
  transcribeTimer: "Slutförtimer: 0 sek",
  transcriptionPlaceholder: "Transkriptionsresultatet visas här...",
  startButton: "Börja spela in",
  stopButton: "Stoppa/Avsluta",
  pauseButton: "Pausa inspelning",
  statusMessage: "Välkommen! Klicka på \"Börja spela in\" för att starta.",
  noteGenerationTitle: "Anteckningsgenerering",
  generateNoteButton: "Generera anteckning",
  noteTimer: "Anteckningstimer: 0 sek",
  generatedNotePlaceholder: "Den genererade anteckningen visas här...",
  customPromptTitle: "Anpassad prompt",
  promptSlotLabel: "Promptplats:",
  customPromptPlaceholder: "Ange anpassad prompt här",
  adUnitText: "Din annons här",
  guideHeading: "Guide & Instruktioner",
  guideText: `Välkommen till Whisper Transkriptionsverktyget. Denna applikation möjliggör för medicinska experter, terapeuter och andra yrkesutövare att spela in och transkribera konsultationer, samt generera professionella anteckningar med hjälp av en AI-driven anteckningsgenerator.<br><br>
<strong>Så här använder du funktionerna:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka på "Börja spela in" för att starta inspelningen av ljud. Var 40:e sekund skickas en bit ljud automatiskt till OpenAI-servrarna för transkription. Transkriptionerna visas en efter en i transkriptionsfältet.</li>
  <li><strong>Avslutning:</strong> Efter att du klickat på "Stoppa/Avsluta" upphör inspelningen. Slutförtimern räknar sedan tills hela transkriptet har mottagits. Detta tar vanligtvis mellan 5-10 sekunder.</li>
  <li><strong>Anteckningsgenerering:</strong> Efter transkription, klicka på "Generera anteckning" för att skapa en anteckning baserad på ditt transkript och din anpassade prompt.</li>
  <li><strong>Anpassad prompt:</strong> Till höger, välj en promptplats (1–10) och ange din anpassade prompt. Din prompt sparas automatiskt och kopplas till din API-nyckel.</li>
  <li><strong>Växla guide:</strong> Använd knapparna "Funktioner" och "Guide" för att växla mellan funktionsvyn och denna guide.</li>
</ul>
Vänligen klicka på "Funktioner" för att återgå till huvudgränssnittet.`,
};
