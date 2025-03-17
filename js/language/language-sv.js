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
    <li><strong>Automatisk radering:</strong> Så snart en transkription eller notis har genererats och visas raderas den automatiskt och permanent från servrarna inom 2 minuter.</li>
    <li><strong>Skydd mot obehörig åtkomst:</strong> Även om obehörig åtkomst till din API-nyckel skulle inträffa, förblir informationen krypterad och skyddad med enhetsspecifika markörer, vilket gör den otillgänglig.</li>
    <li><strong>GDPR-kompatibel hosting:</strong> Alla backend-processer körs på dedikerade Microsoft Azure-servrar inom EU, i full överensstämmelse med GDPR.</li>
  </ul>
</div>
Var säker på att strikta säkerhetsåtgärder garanterar att all patientrelaterad data förblir säker, konfidentiell och helt under din kontroll.`,
  
  aboutModalHeading: "Om detta projekt",
  aboutModalText: `Jag är en norsk allmänläkare med ett långvarigt intresse för teknologiska framsteg, särskilt inom artificiell intelligens, och jag har noggrant följt AI-utvecklingen inom vården.<br><br>
När jag först hörde talas om företag som erbjuder tal-till-text-tjänster för medicinska konsultationer i Norge, blev jag entusiastisk. Kollegor och online-recensioner berömde dessa tjänster och lyfte fram betydande förbättringar i effektivitet och arbetsflöde. Vid närmare granskning blev jag dock förvånad över de höga priserna, särskilt med tanke på att den faktiska kostnaden för teknologin endast utgör en bråkdel av dessa priser.<br><br>
Motiverad av denna insikt utvecklade jag min egen tal-till-text-lösning, först för personligt bruk. När jag såg hur effektiv och kostnadseffektiv den var, bestämde jag mig för att göra den tillgänglig online – och erbjuda samma hastighet, noggrannhet och kvalitet som premiumtjänster, men utan de höga avgifterna.<br><br>
Till skillnad från kommersiella leverantörer lägger inte denna plattform på extra kostnader eller onödiga avgifter.<br>
• Du betalar direkt till OpenAI – vilket innebär att du får direkt tillgång till teknologikällan, utan mellanhänder som tar en extra andel.<br>
• Därför är detta den mest prisvärda lösningen, samtidigt som den upprätthåller högsta kvalitet.<br><br>
Jag anser att de tjänster som erbjuds av vissa företag, även om de är användbara, är överprissatta i förhållande till vad de faktiskt levererar. Många av mina kollegor, som varje dag arbetar hårt med patientvård, slutar med att betala avsevärt mer än nödvändigt bara för att få tillgång till ett verktyg som borde vara överkomligt för alla.<br><br>
Denna webbplats är helt gratis att använda – den enda kostnaden du har är den direkta avgiften från OpenAI för transkriptioner.<br>
• Inga månatliga avgifter, inga prenumerationer, inga förpliktelser – du betalar endast för de uppgifter du utför.<br>
• Du bestämmer själv hur mycket du vill spendera genom att välja hur mycket du överför till din OpenAI-plånbok.<br><br>
Det enda jag ber om är att du accepterar annonser, vilket hjälper till att täcka backend-serverkostnaderna.<br>
Allteftersom fler använder webbplatsen kommer hosting- och driftskostnaderna att öka, och annonsintäkterna säkerställer att jag kan hålla tjänsten gratis och igång utan att belasta användarna.`,
  
  guideModalHeading: "API-guide – Så använder du",
  guideModalText: `För att använda denna webapp måste du först skapa en API-profil hos OpenAI, generera en API-nyckel och fylla på med medel i din OpenAI-plånbok. Din API-nyckel kopieras och klistras in i det angivna fältet. När du trycker på Enter sparas API-nyckeln temporärt för din session – denna nyckel länkar dig till OpenAI:s servrar så att tal-till-text-transkription och notisgenerering fungerar. Observera att du omedelbart debiteras för varje utförd uppgift. För mer information om kostnader, se avsnittet "Kostnadsinformation" på förstasidan.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
För att komma igång måste du skapa en profil på OpenAI:s API-plattform. Denna profil fungerar som ditt konto för att hantera API-nycklar och fakturering. Besök <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> och följ instruktionerna genom att ange din e-postadress, sätta ett lösenord och verifiera ditt konto. När du är registrerad får du tillgång till ditt instrumentpanel.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Efter att ha skapat din profil, generera en API-nyckel genom att gå till <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-nyckelhanteringen</a>. Klicka på knappen för att skapa en ny API-nyckel. Viktigt: Du kommer endast se din API-nyckel en gång, så kopiera den direkt och förvara den säkert (t.ex. i en textfil). Om du skulle tappa bort den eller misstänka att den blivit komprometterad, radera den och generera en ny.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
För att webappen ska fungera måste din OpenAI-plånbok ha tillräckliga medel. Besök <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Fakturering & Betalning</a> för att lägga till medel. Du kan överföra valfri summa när som helst. Så länge medlen finns kvar kan du använda tjänsten – varje uppgift debiteras direkt.<br><br>
<strong>Påminnelse om sessionssäkerhet</strong><br>
När du loggar in med din API-nyckel sparas den endast temporärt i din webbläsarsession. Detta innebär att om du lämnar webbplatsen, stänger webbläsaren eller stänger av datorn, så sparas inte nyckeln. Du måste ange den igen vid nästa användning, vilket säkerställer att din nyckel förblir säker.`,
  
  priceButton: "Price",
  priceModalHeading: "Kostnadsinformation",

<h2 style="font-size:20px;">Tal-till-text-prissättning</h2>
<p style="font-size:16px;">
   <strong>Kostnad:</strong> $0.006 per minut.<br>
   <em>Exempel:</em> En 15-minuters konsultation kostar 15 × $0.006 = <strong>$0.09</strong> per konsultation.
</p>

<h2 style="font-size:20px;">Notisgenerering Prissättning</h2>
<p style="font-size:16px;">
   <strong>Tokenbaserad prissättning:</strong><br>
   - <strong>Indata (transkription + prompt):</strong> $10 per 1 000 000 tokens (d.v.s. $0.00001 per token).<br>
   - <strong>Utdata (genererad notis):</strong> $30 per 1 000 000 tokens (d.v.s. $0.00003 per token).
</p>

<h4 style="font-size:18px;">Exempel på konsultationsberäkning (endast notisgenerering)</h4>
<p style="font-size:16px;">
   1. <strong>Beräkning av indata:</strong><br>
      - Anta att transkriptionen av konsultationen är cirka <strong>700 ord</strong> och att du lägger till en <strong>30-ords prompt</strong>.<br>
      - Totalt antal ord = 700 + 30 = <strong>730 ord</strong>.<br>
      - Uppskattade tokens = 730 × 0.75 ≈ <strong>547.5 tokens</strong>.<br>
      - Indatakostnad = 547.5 tokens × $0.00001 ≈ <strong>$0.0055</strong>.
</p>
<p style="font-size:16px;">
   2. <strong>Beräkning av utdata:</strong><br>
      - Anta att den genererade notisen är omkring <strong>250 ord</strong>.<br>
      - Uppskattade tokens = 250 × 0.75 ≈ <strong>187.5 tokens</strong>.<br>
      - Utdatakostnad = 187.5 tokens × $0.00003 ≈ <strong>$0.0056</strong>.
</p>
<p style="font-size:16px;">
   3. <strong>Total kostnad för notisgenerering:</strong><br>
      - Kombinerad kostnad ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> per konsultation.
</p>

<h2 style="font-size:20px;">Ungefärlig total kostnad per konsultation</h2>
<p style="font-size:16px;">
   (för en 15-minuters konsultation/innspelning med båda funktionerna)<br>
   - <strong>Tal-till-text:</strong> <strong>$0.09</strong><br>
   - <strong>Notisgenerering:</strong> <strong>$0.0111</strong><br>
   - <strong>Total:</strong> Ungefär <strong>$0.101</strong> per konsultation.
</p>

<h2 style="font-size:20px;">Månatliga kostnadsuppskattningar</h2>
<p style="font-size:16px;">
   Om du genomför 20 konsultationer per dag, 4 dagar i veckan, under 4 veckor per månad (20 × 4 × 4 = <strong>320 konsultationer</strong> per månad):<br><br>
   1. <strong>Endast tal-till-text</strong> (med notisgenerering via ditt eget ChatGPT-konto, vilket i princip är gratis):<br>
      - Månadskostnad = 320 × $0.09 = <strong>$28.80</strong>.<br><br>
   2. <strong>Både tal-till-text och notisgenerering:</strong><br>
      - Månadskostnad = 320 × $0.101 ≈ <strong>$32.32</strong>.
</p>

<h2 style="font-size:20px;">Alternativ för notisgenerering</h2>
<p style="font-size:16px;">
   Om du redan har ett OpenAI-konto kan du använda notisgenerering via ChatGPT på ditt eget konto – vilket i princip är gratis. I så fall debiteras du endast för tal-till-text-tjänsten när du använder denna webapp.
</p>

<h2 style="font-size:20px;">Användningsflexibilitet</h2>
<p style="font-size:16px;">
   Till skillnad från leverantörer som kräver ett månatligt abonnemang, betalar du endast för faktisk användning. Om du tar en ledig dag, åker på semester eller har en period utan aktivitet, blir dina kostnader noll. Även om du använder tjänsten dagligen för alla dina konsultationer, förblir kostnaden per konsultation betydligt lägre jämfört med andra leverantörer.
</p>

<hr>

<p style="font-size:16px;">
   <strong>Fördelen med direktanslutning</strong><br>
   Vår webapp kopplar dig direkt till OpenAI API – inga mellanliggande parter, inga extra avgifter. Denna direkta anslutning innebär att du endast betalar för den faktiska AI-behandlingskostnaden, vilket gör vår tjänst till en av de mest kostnadseffektiva lösningarna för tal-till-text och notisgenerering som finns tillgänglig idag.
</p>`,
  
  transcribeTranslations: {
    pageTitle: "Transcription Tool with Ads and Guide Overlay",
    openaiUsageLinkText: "Cost usage overview",
    btnFunctions: "Functions",
    btnGuide: "Guide",
    recordingAreaTitle: "Recording Area",
    recordTimer: "Recording Timer: 0 sec",
    transcribeTimer: "Completion Timer: 0 sec",
    transcriptionPlaceholder: "Transcription result will appear here...",
    startButton: "Start Recording",
    stopButton: "Stop/Complete",
    pauseButton: "Pause Recording",
    statusMessage: "Welcome! Click \"Start Recording\" to begin.",
    noteGenerationTitle: "Note Generation",
    generateNoteButton: "Generate Note",
    noteTimer: "Note Generation Timer: 0 sec",
    generatedNotePlaceholder: "Generated note will appear here...",
    customPromptTitle: "Custom Prompt",
    promptSlotLabel: "Prompt Slot:",
    customPromptPlaceholder: "Enter custom prompt here",
    adUnitText: "Your Ad Here",
    guideHeading: "Guide & Instructions",
    guideText: `Welcome to the Whisper Transcription tool. This application allows medical professionals, therapists, and other practitioners to record and transcribe consultations, as well as generate professional notes using an AI-powered note generator.<br><br>
<strong>How to Use the Functions:</strong>
<ul>
  <li><strong>Recording:</strong> Click "Start Recording" to begin capturing audio. Audio is captured via MediaStreamTrackProcessor (using WebCodecs) and accumulated for up to 40 seconds before being packaged as a self-contained WAV file.</li>
  <li><strong>Completion:</strong> After clicking "Stop/Complete", the recording stops. A 2-second final capture period collects any remaining audio before processing the final chunk. The Completion Timer then ticks until the full transcript is received.</li>
  <li><strong>Note Generation:</strong> After transcription, click "Generate Note" to produce a note based on your transcript and custom prompt.</li>
  <li><strong>Custom Prompt:</strong> On the right, select a prompt slot (1–10) and enter your custom prompt. Your prompt is saved automatically and linked to your API key.</li>
  <li><strong>Guide Toggle:</strong> Use the "Functions" and "Guide" buttons to switch between the functional view and this guide.</li>
</ul>
Please click "Functions" to return to the main interface.`,
  }
};
