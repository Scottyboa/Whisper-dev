const indexTranslations = {
  en: {
    pageTitle: "Whisper Clinical Transcription",
    headerTitle: "Whisper Clinical Transcription",
    headerSubtitle: "Advanced AI-Powered Speech-to-Text and Note Generation for Healthcare Consultations",
    startText: "To get started, please enter your OpenAI API key:",
    apiPlaceholder: "Enter API Key here",
    enterButton: "Enter Transcription Tool",
    // Updated API guide button text:
    guideButton: "API guide - How to use",
    securityButton: "Security",
    aboutButton: "About",
    adRevenueMessage: "As this website is free to use and relies solely on ad revenue, please consent to personalized ads to help support the service.",
    securityModalHeading: "Security Information",
    securityModalText: `Your privacy and the security of patient information are the highest priorities. To ensure that data remains confidential:<br><br>
- <strong>Data Encryption:</strong> All data processed by the system is secured using industry-standard encryption methods. Transcripts and notes are linked exclusively to your encrypted personal API key and the device used for access, ensuring that only you have access to the generated content.<br><br>
- <strong>Automatic Deletion:</strong> Once a transcript or note is generated and displayed on your screen, it is automatically and irreversibly deleted from the servers within 2 minutes.<br><br>
- <strong>Unauthorized Access Protection:</strong> Even if unauthorized access to your API key were to occur, the data remains encrypted and secured by device-specific markers, rendering the information inaccessible.<br><br>
- <strong>GDPR-Compliant Hosting:</strong> All backend processes run on dedicated Microsoft Azure servers located within the EU, fully compliant with GDPR regulations.<br><br>
Rest assured, stringent security measures ensure that all patient-related data remains safe, confidential, and entirely under your control.`,
    aboutModalHeading: "About This Project",
    aboutModalText: `I’m a Norwegian family doctor with a strong interest in technology and AI developments in healthcare. I developed this solution to significantly reduce transcription costs and provide an affordable, direct-to-OpenAI service. You pay only for the actual OpenAI usage fee without any monthly subscription.`,
    // New API guide modal keys:
    guideModalHeading: "How to Set Up Your OpenAI API for Whisper Clinical Transcription",
    guideModalText: `To use this webapp, you must first create an OpenAI API profile, generate an API key, and fund your OpenAI wallet. Your API key is then copied and pasted into the provided API key field. Once you press Enter, the webapp saves the API key temporarily for your session—this key links you to the OpenAI servers so that speech-to-text transcription and note generation can work. Please note, you are charged immediately per task performed. For more info on cost, please review the "Cost" section on the front page.
<br><br>
<strong>1. Create Your OpenAI API Profile</strong><br>
To begin, you need to create a profile on the OpenAI API platform. This profile serves as your account for managing API keys and billing. To get started, visit the <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> page. Follow the instructions to sign up by providing your email address, setting a password, and verifying your account. Once registered, you'll have access to your dashboard.
<br><br>
<strong>2. Generate an API Key</strong><br>
After creating your profile, generate an API key by navigating to the <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> page. Click the button to create a new API key. Important: You will only see your API key once. Copy it immediately and store it securely (e.g., in a text file) for future use. If you lose the key or suspect it has been compromised, delete it from your account and create a new one.
<br><br>
<strong>3. Fund Your OpenAI Wallet</strong><br>
For the webapp to function, your OpenAI wallet must have sufficient funds. Visit the <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> page to add funds. You can transfer any amount at any time. As long as funds are available, you'll be able to use the site—each task is charged immediately. For more info on costs, please see the "Cost" section on the front page.
<br><br>
<strong>Session Security Reminder</strong><br>
When you log in by entering your API key, it is stored only temporarily in your browser session. This means if you exit the website, close your browser, or turn off your computer, the API key will not be saved. You will need to re-enter your API key the next time you use the webapp, ensuring your key remains secure.`,
    // New Price (Cost) modal keys:
    priceButton: "Price",
    priceModalHeading: "Cost Information for Whisper Clinical Transcription",
    priceModalText: `Speech-to-Text Pricing<br>
Cost: $0.006 per minute.<br>
Example: A 15-minute consultation will cost 15 × $0.006 = $0.09 per consultation.
<br><br>
Note Generation Pricing<br>
Token-Based Pricing:<br>
Input (transcription + prompt): $10 per 1,000,000 tokens (i.e. $0.00001 per token).<br>
Output (generated note): $30 per 1,000,000 tokens (i.e. $0.00003 per token).<br>
<br>
Example Consultation Calculation (Note Generation Only)<br>
Input Calculation:<br>
Assume the consultation transcription is about 700 words and you add a 30-word prompt.<br>
Total words = 700 + 30 = 730 words.<br>
Estimated tokens = 730 × 0.75 ≈ 547.5 tokens.<br>
Input cost = 547.5 tokens × $0.00001 ≈ $0.0055.<br>
<br>
Output Calculation:<br>
Assume the generated note is around 250 words.<br>
Estimated tokens = 250 × 0.75 ≈ 187.5 tokens.<br>
Output cost = 187.5 tokens × $0.00003 ≈ $0.0056.<br>
<br>
Total Note Generation Cost:<br>
Combined cost ≈ $0.0055 + $0.0056 = $0.0111 per consultation.<br>
<br>
Approximate Combined Cost Per Consultation (for a 15 min consultation/recording):<br>
Speech-to-Text: $0.09<br>
Note Generation: $0.0111<br>
Total: Approximately $0.101 per consultation.<br>
<br>
Monthly Cost Estimates<br>
Assuming 20 consultations per day, 4 days per week, over 4 weeks (320 consultations per month):<br>
Using Only Speech-to-Text: 320 × $0.09 = $28.80<br>
Using Both Functions: 320 × $0.101 ≈ $32.32<br>
<br>
Alternative Note Generation Option<br>
If you already have an OpenAI account, you can use ChatGPT for note generation—which is essentially free. In that case, you only incur the speech-to-text cost.<br>
<br>
Usage Flexibility<br>
You pay per usage, with zero cost on idle days.<br>
<br>
Direct Connection Advantage<br>
Our webapp connects you directly with the OpenAI API—no intermediary, no extra fees.`
  },
  no: {
    pageTitle: "Whisper Klinisk Transkripsjon",
    headerTitle: "Whisper Klinisk Transkripsjon",
    headerSubtitle: "Avansert AI-drevet tale-til-tekst og notatgenerering for helsekonsultasjoner",
    startText: "For å komme i gang, vennligst skriv inn din OpenAI API-nøkkel:",
    apiPlaceholder: "Skriv inn API-nøkkel her",
    enterButton: "Gå til transkripsjonsverktøy",
    // Translated (or adapted) API guide button and modal:
    guideButton: "API-veiledning – Slik bruker du",
    securityButton: "Sikkerhet",
    aboutButton: "Om",
    adRevenueMessage: "Siden denne nettsiden er gratis å bruke og kun støttes av annonseinntekter, vennligst gi ditt samtykke til personaliserte annonser for å støtte tjenesten.",
    securityModalHeading: "Sikkerhetsinformasjon",
    securityModalText: `Personvernet og sikkerheten til pasientinformasjon er av høyeste prioritet. For å sikre at data forblir konfidensielle:<br><br>
- <strong>Datakryptering:</strong> All data behandlet av systemet sikres med industristandard kryptering.<br><br>
- <strong>Automatisk sletting:</strong> Transkripsjoner og notater slettes automatisk innen 2 minutter.<br><br>
- <strong>Uautorisert tilgangsbeskyttelse:</strong> Data er beskyttet med enhetsspesifikke markører.<br><br>
- <strong>GDPR-kompatibel hosting:</strong> Alle prosesser kjøres på Azure-servere i EU.`,
    aboutModalHeading: "Om dette prosjektet",
    aboutModalText: `Jeg er en norsk allmennlege med stor interesse for teknologi og AI i helsevesenet. Dette verktøyet er utviklet for å redusere transkripsjonskostnadene og tilby en direkte løsning til OpenAI uten ekstra abonnement.`,
    guideModalHeading: "Slik setter du opp din OpenAI API for Whisper Klinisk Transkripsjon",
    guideModalText: `For å bruke dette verktøyet må du først opprette en profil på OpenAI API, generere en API-nøkkel og fylle opp lommeboken din. API-nøkkelen kopieres og limes inn i feltet. Når du trykker Enter lagres nøkkelen midlertidig – den kobler deg til OpenAI slik at transkripsjon og notatgenerering fungerer. Du belastes umiddelbart per oppgave. For mer info om kostnader, se "Kostnader" på forsiden.
<br><br>
<strong>1. Opprett din OpenAI API-profil</strong><br>
Besøk <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> for å registrere deg. Følg instruksjonene med e-post, passord og verifisering.
<br><br>
<strong>2. Generer en API-nøkkel</strong><br>
Gå til <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> for å opprette en ny API-nøkkel. Kopier nøkkelen umiddelbart.
<br><br>
<strong>3. Fyll opp din OpenAI-lommebok</strong><br>
Besøk <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> for å legge til midler. Hver oppgave trekkes direkte fra lommeboken.
<br><br>
<strong>Sikkerhetspåminnelse</strong><br>
API-nøkkelen lagres kun midlertidig i nettlesersesjonen. Du må taste den inn på nytt ved neste besøk.`,
    priceButton: "Pris",
    priceModalHeading: "Kostnadsinformasjon for Whisper Klinisk Transkripsjon",
    priceModalText: `Tale-til-tekst-prising<br>
Kostnad: $0.006 per minutt.<br>
Eksempel: En 15-minutters konsultasjon koster 15 × $0.006 = $0.09.<br>
<br><br>
Notatgenererings-prising<br>
Token-basert prising:<br>
Input (transkripsjon + prompt): $10 per 1,000,000 tokens (dvs. $0.00001 per token).<br>
Output (generert notat): $30 per 1,000,000 tokens (dvs. $0.00003 per token).<br>
<br>
Eksempelberegning:<br>
700 ord + 30 ord prompt = 730 ord, ca. 547.5 tokens (input) → $0.0055<br>
250 ord generert, ca. 187.5 tokens (output) → $0.0056<br>
Totalt ca. $0.0111 per konsultasjon.<br>
<br>
Månedlig (320 konsultasjoner):<br>
Kun tale-til-tekst: $28.80<br>
Med begge funksjoner: ca. $32.32`
  },
  sv: {
    pageTitle: "Whisper Klinisk Transkription",
    headerTitle: "Whisper Klinisk Transkription",
    headerSubtitle: "Avancerad AI-driven tal-till-text och notisgenerering för vårdkonsultationer",
    startText: "För att komma igång, ange din OpenAI API-nyckel:",
    apiPlaceholder: "Ange API-nyckel här",
    enterButton: "Gå till transkriberingsverktyget",
    guideButton: "API-guide – Hur du använder",
    securityButton: "Säkerhet",
    aboutButton: "Om",
    adRevenueMessage: "Eftersom denna webbplats är gratis och enbart förlitar sig på annonsintäkter, vänligen godkänn personliga annonser för att stödja tjänsten.",
    securityModalHeading: "Säkerhetsinformation",
    securityModalText: `Ditt privatliv och säkerheten för patientdata är prioriterade. All data krypteras och transkriptioner raderas automatiskt inom 2 minuter.`,
    aboutModalHeading: "Om detta projekt",
    aboutModalText: `Jag är en svensk läkare med intresse för AI. Detta verktyg utvecklades för att minska transkriptionskostnader och ge en direktanslutning till OpenAI utan extra avgifter.`,
    guideModalHeading: "Så ställer du in din OpenAI API för Whisper Klinisk Transkription",
    guideModalText: `För att använda denna webapp måste du skapa en OpenAI API-profil, generera en API-nyckel och fylla på din plånbok. API-nyckeln kopieras och klistras in i fältet. När du trycker Enter sparas nyckeln temporärt – den kopplar dig till OpenAI för att möjliggöra transkription och notisgenerering. Du debiteras direkt per uppgift. Se "Kostnader" på startsidan för mer information.
<br><br>
<strong>1. Skapa din OpenAI API-profil</strong><br>
Besök <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> för att registrera dig med e-post och lösenord.
<br><br>
<strong>2. Generera en API-nyckel</strong><br>
Gå till <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> för att skapa en ny nyckel. Kopiera den direkt.
<br><br>
<strong>3. Fyll på din OpenAI-plånbok</strong><br>
Besök <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> för att lägga till medel. Varje uppgift debiteras direkt.
<br><br>
<strong>Sessionens säkerhet</strong><br>
API-nyckeln lagras endast temporärt i webbläsaren.`,
    priceButton: "Pris",
    priceModalHeading: "Kostnadsinformation för Whisper Klinisk Transkription",
    priceModalText: `Tal-till-text prissättning<br>
Kostnad: $0.006 per minut.<br>
Exempel: En 15-minuters konsultation kostar 15 × $0.006 = $0.09.<br>
<br><br>
Notisgenerering<br>
Tokenbaserad prissättning:<br>
Input: $10 per 1,000,000 tokens (ca $0.00001 per token).<br>
Output: $30 per 1,000,000 tokens (ca $0.00003 per token).<br>
<br>
Exempel:<br>
700 ord + 30 ord prompt = ca 547.5 tokens → $0.0055<br>
250 ord = ca 187.5 tokens → $0.0056<br>
Totalt ca $0.0111 per konsultation.<br>
<br>
Månatlig kostnad (320 konsultationer):<br>
Enbart tal-till-text: $28.80<br>
Med båda funktionerna: ca $32.32`
  },
  de: {
    pageTitle: "Whisper Klinische Transkription",
    headerTitle: "Whisper Klinische Transkription",
    headerSubtitle: "Fortschrittliche KI-gestützte Sprach-zu-Text- und Notizenerstellung für Gesundheitskonsultationen",
    startText: "Um zu beginnen, geben Sie bitte Ihren OpenAI API-Schlüssel ein:",
    apiPlaceholder: "API-Schlüssel hier eingeben",
    enterButton: "Transkriptionswerkzeug öffnen",
    guideButton: "API-Anleitung – So nutzen Sie sie",
    securityButton: "Sicherheit",
    aboutButton: "Über",
    adRevenueMessage: "Da diese Website kostenlos ist und ausschließlich auf Werbeeinnahmen beruht, stimmen Sie bitte personalisierten Anzeigen zu, um den Dienst zu unterstützen.",
    securityModalHeading: "Sicherheitsinformationen",
    securityModalText: `Der Schutz der Privatsphäre und die Sicherheit von Patientendaten haben höchste Priorität. Alle Daten werden verschlüsselt und Transkripte innerhalb von 2 Minuten gelöscht.`,
    aboutModalHeading: "Über dieses Projekt",
    aboutModalText: `Ich bin ein norwegischer Hausarzt mit Interesse an technologischen Fortschritten. Dieses Projekt wurde entwickelt, um die Transkriptionskosten zu senken und eine direkte Verbindung zu OpenAI ohne zusätzliche Gebühren anzubieten.`,
    guideModalHeading: "So richten Sie Ihre OpenAI API für Whisper Klinische Transkription ein",
    guideModalText: `Um diese Webapp zu nutzen, müssen Sie zunächst ein Profil auf der OpenAI API-Plattform erstellen, einen API-Schlüssel generieren und Ihre Wallet aufladen. Ihr API-Schlüssel wird kopiert und in das vorgesehene Feld eingefügt. Nach Drücken der Eingabetaste wird der Schlüssel temporär gespeichert – er verbindet Sie mit OpenAI, sodass Sprach-zu-Text und Notizenerstellung funktionieren. Sie werden sofort pro Aufgabe belastet. Weitere Informationen finden Sie im Abschnitt "Kosten" auf der Startseite.
<br><br>
<strong>1. Erstellen Sie Ihr OpenAI API-Profil</strong><br>
Besuchen Sie <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> und registrieren Sie sich mit E-Mail und Passwort.
<br><br>
<strong>2. Generieren Sie einen API-Schlüssel</strong><br>
Gehen Sie zur <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> und erstellen Sie einen neuen Schlüssel. Kopieren Sie diesen sofort.
<br><br>
<strong>3. Laden Sie Ihre OpenAI-Wallet auf</strong><br>
Besuchen Sie <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a>, um Ihre Wallet aufzuladen.
<br><br>
<strong>Sitzungssicherheit</strong><br>
Ihr API-Schlüssel wird nur temporär in der Browsersitzung gespeichert.`,
    priceButton: "Preis",
    priceModalHeading: "Kosteninformation für Whisper Klinische Transkription",
    priceModalText: `Sprach-zu-Text-Preisgestaltung<br>
Kosten: $0.006 pro Minute.<br>
Beispiel: Eine 15-minütige Konsultation kostet 15 × $0.006 = $0.09.<br>
<br><br>
Notizenerstellung<br>
Token-basierte Preisgestaltung:<br>
Input (Transkription + Prompt): $10 pro 1.000.000 Tokens (ca. $0.00001 pro Token).<br>
Output (generierte Notiz): $30 pro 1.000.000 Tokens (ca. $0.00003 pro Token).<br>
<br>
Beispielrechnung:<br>
700 Wörter + 30 Wörter Prompt → ca 547.5 Tokens → $0.0055<br>
250 Wörter → ca 187.5 Tokens → $0.0056<br>
Gesamtkosten ca. $0.0111 pro Konsultation.<br>
<br>
Monatliche Kostenschätzung (320 Konsultationen):<br>
Nur Sprach-zu-Text: $28.80<br>
Mit beiden Funktionen: ca. $32.32`
  },
  fr: {
    pageTitle: "Whisper Transcription Clinique",
    headerTitle: "Whisper Transcription Clinique",
    headerSubtitle: "Conversion de la parole en texte et génération de notes par IA avancée pour les consultations de santé",
    startText: "Pour commencer, veuillez entrer votre clé API OpenAI :",
    apiPlaceholder: "Entrez la clé API ici",
    enterButton: "Accéder à l'outil de transcription",
    guideButton: "Guide API - Comment l'utiliser",
    securityButton: "Sécurité",
    aboutButton: "À propos",
    adRevenueMessage: "Ce site étant gratuit et reposant uniquement sur les revenus publicitaires, veuillez accepter les annonces personnalisées pour soutenir le service.",
    securityModalHeading: "Informations de Sécurité",
    securityModalText: `La confidentialité et la sécurité des données patients sont primordiales. Les données sont chiffrées et les transcriptions sont supprimées automatiquement après 2 minutes.`,
    aboutModalHeading: "À propos de ce projet",
    aboutModalText: `Je suis un médecin de famille norvégien passionné par les avancées technologiques en santé. Ce projet vise à réduire les coûts de transcription via une connexion directe à OpenAI sans frais supplémentaires.`,
    guideModalHeading: "Comment configurer votre API OpenAI pour Whisper Transcription Clinique",
    guideModalText: `Pour utiliser cette application, créez d'abord un profil sur la plateforme OpenAI API, générez une clé API et approvisionnez votre portefeuille OpenAI. Copiez ensuite la clé et collez-la dans le champ prévu. Une fois validée, la clé est sauvegardée temporairement pour votre session, vous reliant aux serveurs OpenAI pour activer la transcription et la génération de notes. Vous serez facturé immédiatement pour chaque tâche. Pour plus d’informations sur les coûts, consultez la section "Coûts" de la page d’accueil.
<br><br>
<strong>1. Créez votre profil OpenAI API</strong><br>
Rendez-vous sur la page <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> et inscrivez-vous en fournissant votre email, en définissant un mot de passe et en vérifiant votre compte.
<br><br>
<strong>2. Générez une clé API</strong><br>
Accédez à la page <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> pour créer une nouvelle clé API. Copiez-la immédiatement.
<br><br>
<strong>3. Approvisionnez votre portefeuille OpenAI</strong><br>
Visitez la page <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> pour ajouter des fonds. Chaque tâche sera débitée directement de votre portefeuille.
<br><br>
<strong>Rappel de sécurité</strong><br>
La clé API est stockée temporairement dans votre session navigateur.`,
    priceButton: "Prix",
    priceModalHeading: "Informations de coût pour Whisper Transcription Clinique",
    priceModalText: `Tarification de la transcription audio<br>
Coût : $0.006 par minute.<br>
Exemple : Une consultation de 15 minutes coûtera 15 × $0.006 = $0.09.<br>
<br><br>
Tarification de la génération de notes<br>
Basée sur les tokens :<br>
Entrée (transcription + prompt) : $10 pour 1 000 000 de tokens (≈ $0.00001 par token).<br>
Sortie (note générée) : $30 pour 1 000 000 de tokens (≈ $0.00003 par token).<br>
<br>
Exemple de calcul:<br>
700 mots + 30 mots de prompt ≈ 547.5 tokens → $0.0055<br>
250 mots ≈ 187.5 tokens → $0.0056<br>
Total ≈ $0.0111 par consultation.<br>
<br>
Coût combiné (15 min, les deux fonctions) :<br>
Transcription audio : $0.09<br>
Génération de notes : $0.0111<br>
Total : Environ $0.101 par consultation.<br>
<br>
Estimation mensuelle (320 consultations) :<br>
Uniquement transcription : $28.80<br>
Les deux fonctions : ≈ $32.32`
  },
  it: {
    pageTitle: "Whisper Trascrizione Clinica",
    headerTitle: "Whisper Trascrizione Clinica",
    headerSubtitle: "Conversione avanzata da voce a testo e generazione di note per consulti sanitari",
    startText: "Per iniziare, inserisci la tua chiave API OpenAI:",
    apiPlaceholder: "Inserisci qui la chiave API",
    enterButton: "Accedi allo strumento di trascrizione",
    guideButton: "Guida API - Come utilizzarla",
    securityButton: "Sicurezza",
    aboutButton: "Informazioni",
    adRevenueMessage: "Poiché questo sito è gratuito e si basa esclusivamente sui ricavi pubblicitari, accetta annunci personalizzati per supportare il servizio.",
    securityModalHeading: "Informazioni sulla Sicurezza",
    securityModalText: `La sicurezza dei dati dei pazienti è prioritaria. Tutti i dati sono crittografati e le trascrizioni vengono eliminate automaticamente dopo 2 minuti.`,
    aboutModalHeading: "Informazioni su questo Progetto",
    aboutModalText: `Sono un medico di famiglia norvegese interessato ai progressi tecnologici in sanità. Questo strumento è stato creato per ridurre i costi di trascrizione offrendo una connessione diretta a OpenAI senza costi aggiuntivi.`,
    guideModalHeading: "Come configurare la tua API OpenAI per Whisper Trascrizione Clinica",
    guideModalText: `Per utilizzare questa webapp, devi prima creare un profilo sulla piattaforma OpenAI API, generare una chiave API e finanziare il tuo portafoglio OpenAI. La chiave API viene copiata e incollata nel campo previsto. Una volta premuto Invio, la chiave viene salvata temporaneamente per la sessione, collegandoti ai server OpenAI per abilitare la trascrizione e la generazione di note. Verrai addebitato immediatamente per ogni operazione. Per maggiori informazioni sui costi, consulta la sezione "Costi" della pagina iniziale.
<br><br>
<strong>1. Crea il tuo profilo OpenAI API</strong><br>
Visita la pagina <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> e registrati fornendo email, password e conferma dell'account.
<br><br>
<strong>2. Genera una chiave API</strong><br>
Accedi alla pagina <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API key management</a> per creare una nuova chiave API. Copiala immediatamente.
<br><br>
<strong>3. Ricarica il tuo portafoglio OpenAI</strong><br>
Visita la pagina <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> per aggiungere fondi. Ogni operazione verrà addebitata direttamente.<br><br>
<strong>Promemoria sulla sicurezza</strong><br>
La chiave API viene salvata temporaneamente nella sessione del browser.`,
    priceButton: "Prezzo",
    priceModalHeading: "Informazioni sui costi per Whisper Trascrizione Clinica",
    priceModalText: `Tariffazione per la trascrizione da voce a testo<br>
Costo: $0.006 al minuto.<br>
Esempio: Una consulenza di 15 minuti costerà 15 × $0.006 = $0.09.<br>
<br><br>
Tariffazione per la generazione di note<br>
Basata sui token:<br>
Input (trascrizione + prompt): $10 per 1.000.000 di token (≈ $0.00001 per token).<br>
Output (nota generata): $30 per 1.000.000 di token (≈ $0.00003 per token).<br>
<br>
Esempio di calcolo:<br>
700 parole + 30 parole prompt ≈ 547.5 token → $0.0055<br>
250 parole ≈ 187.5 token → $0.0056<br>
Totale ≈ $0.0111 per consulto.<br>
<br>
Costo combinato (15 min, entrambe le funzioni):<br>
Trascrizione: $0.09<br>
Generazione di note: $0.0111<br>
Totale: Circa $0.101 per consulto.<br>
<br>
Stima mensile (320 consulti):<br>
Solo trascrizione: $28.80<br>
Con entrambe le funzioni: ≈ $32.32`
  }
};

const transcribeTranslations = {
  en: {
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
Please click "Functions" to return to the main interface.`
  },
  no: {
    pageTitle: "Whisper Klinisk Transkripsjon - Transkripsjonsverktøy",
    openaiUsageLinkText: "Vis OpenAI-bruk",
    btnFunctions: "Funksjoner",
    btnGuide: "Veiledning",
    recordingAreaTitle: "Opptaksområde",
    recordTimer: "Opptakstimer: 0 sek",
    transcribeTimer: "Fullføringstimer: 0 sek",
    transcriptionPlaceholder: "Transkripsjonsresultatet vises her...",
    startButton: "Start opptak",
    stopButton: "Stopp/Fullfør",
    pauseButton: "Pause opptak",
    statusMessage: "Velkommen! Klikk 'Start opptak' for å begynne.",
    noteGenerationTitle: "Notatgenerering",
    generateNoteButton: "Generer notat",
    noteTimer: "Notatgenereringstimer: 0 sek",
    generatedNotePlaceholder: "Generert notat vises her...",
    customPromptTitle: "Tilpasset melding",
    promptSlotLabel: "Meldingsplass:",
    customPromptPlaceholder: "Skriv inn tilpasset melding her",
    adUnitText: "Din annonse her",
    guideHeading: "Veiledning og Instruksjoner",
    guideText: `Velkommen til Whisper Transkripsjonsverktøy. Denne applikasjonen lar deg ta opp og transkribere konsultasjoner, samt generere profesjonelle notater med AI.<br><br>
<strong>Slik bruker du funksjonene:</strong>
<ul>
  <li><strong>Opptak:</strong> Klikk "Start opptak" for å starte lydopptaket.</li>
  <li><strong>Fullføring:</strong> Klikk "Stopp/Fullfør" for å avslutte opptaket. En 2-sekunders periode samler opp eventuell gjenværende lyd.</li>
  <li><strong>Notatgenerering:</strong> Klikk "Generer notat" etter transkripsjonen.</li>
  <li><strong>Tilpasset melding:</strong> Velg et meldingsfelt (1–10) og skriv inn din melding. Meldingen lagres automatisk.</li>
  <li><strong>Veiledning:</strong> Bruk "Funksjoner" og "Veiledning" for å bytte visning.</li>
</ul>
Klikk "Funksjoner" for å gå tilbake til hovedskjermen.`
  },
  sv: {
    pageTitle: "Whisper Klinisk Transkription - Transkriberingsverktyg",
    openaiUsageLinkText: "Översikt över OpenAI-användning",
    btnFunctions: "Funktioner",
    btnGuide: "Guide",
    recordingAreaTitle: "Inspelningsområde",
    recordTimer: "Inspelningstimer: 0 sek",
    transcribeTimer: "Avslutningstimer: 0 sek",
    transcriptionPlaceholder: "Transkriptionen visas här...",
    startButton: "Starta inspelning",
    stopButton: "Stoppa/Avsluta",
    pauseButton: "Pausa inspelning",
    statusMessage: "Välkommen! Klicka på \"Starta inspelning\" för att börja.",
    noteGenerationTitle: "Noteringsgenerering",
    generateNoteButton: "Generera anteckning",
    noteTimer: "Noteringstimer: 0 sek",
    generatedNotePlaceholder: "Genererad anteckning visas här...",
    customPromptTitle: "Anpassad uppmaning",
    promptSlotLabel: "Uppmaningsplats:",
    customPromptPlaceholder: "Ange anpassad uppmaning här",
    adUnitText: "Din annons här",
    guideHeading: "Guide & Instruktioner",
    guideText: `Välkommen till Whisper Transkriberingsverktyget. Detta verktyg låter dig spela in och transkribera konsultationer samt generera professionella anteckningar med AI.<br><br>
<strong>Hur du använder funktionerna:</strong>
<ul>
  <li><strong>Inspelning:</strong> Klicka "Starta inspelning" för att börja.</li>
  <li><strong>Avslutning:</strong> Klicka "Stoppa/Avsluta" för att avsluta inspelningen.</li>
  <li><strong>Noteringsgenerering:</strong> Klicka "Generera anteckning" efter transkriberingen.</li>
  <li><strong>Anpassad uppmaning:</strong> Välj ett uppmaningsfält (1–10) och ange din uppmaning.</li>
  <li><strong>Guide:</strong> Använd "Funktioner" och "Guide" för att växla visningen.</li>
</ul>
Klicka på "Funktioner" för att återgå till huvudskärmen.`
  },
  de: {
    pageTitle: "Whisper Klinische Transkription - Transkriptionswerkzeug",
    openaiUsageLinkText: "Übersicht über OpenAI-Nutzung",
    btnFunctions: "Funktionen",
    btnGuide: "Anleitung",
    recordingAreaTitle: "Aufnahmebereich",
    recordTimer: "Aufnahmetimer: 0 Sek",
    transcribeTimer: "Abschlusstimer: 0 Sek",
    transcriptionPlaceholder: "Das Transkript erscheint hier...",
    startButton: "Aufnahme starten",
    stopButton: "Stoppen/Abschließen",
    pauseButton: "Aufnahme pausieren",
    statusMessage: "Willkommen! Klicken Sie auf \"Aufnahme starten\", um zu beginnen.",
    noteGenerationTitle: "Notizenerstellung",
    generateNoteButton: "Notiz generieren",
    noteTimer: "Notiz-Timer: 0 Sek",
    generatedNotePlaceholder: "Die generierte Notiz erscheint hier...",
    customPromptTitle: "Benutzerdefinierte Aufforderung",
    promptSlotLabel: "Aufforderungsplatz:",
    customPromptPlaceholder: "Benutzerdefinierte Aufforderung hier eingeben",
    adUnitText: "Ihre Anzeige hier",
    guideHeading: "Anleitung & Hinweise",
    guideText: `Willkommen beim Whisper Transkriptionswerkzeug. Dieses Tool ermöglicht es, Konsultationen aufzunehmen, zu transkribieren und Notizen zu generieren.<br><br>
<strong>So nutzen Sie die Funktionen:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf "Aufnahme starten" um zu beginnen.</li>
  <li><strong>Abschluss:</strong> Klicken Sie auf "Stoppen/Abschließen" um die Aufnahme zu beenden.</li>
  <li><strong>Notizenerstellung:</strong> Klicken Sie nach der Transkription auf "Notiz generieren".</li>
  <li><strong>Benutzerdefinierte Aufforderung:</strong> Wählen Sie einen Platz (1–10) und geben Sie Ihre Aufforderung ein.</li>
  <li><strong>Anleitung:</strong> Verwenden Sie "Funktionen" und "Anleitung" um zu wechseln.</li>
</ul>
Bitte klicken Sie auf "Funktionen", um zur Hauptoberfläche zurückzukehren.`
  },
  fr: {
    pageTitle: "Whisper Transcription Clinique - Outil de Transcription",
    openaiUsageLinkText: "Vue d'ensemble de l'utilisation d'OpenAI",
    btnFunctions: "Fonctions",
    btnGuide: "Guide",
    recordingAreaTitle: "Zone d'enregistrement",
    recordTimer: "Minuteur d'enregistrement : 0 sec",
    transcribeTimer: "Minuteur de finalisation : 0 sec",
    transcriptionPlaceholder: "Le résultat de la transcription apparaîtra ici...",
    startButton: "Démarrer l'enregistrement",
    stopButton: "Arrêter/Terminer",
    pauseButton: "Suspendre l'enregistrement",
    statusMessage: "Bienvenue ! Cliquez sur \"Démarrer l'enregistrement\" pour commencer.",
    noteGenerationTitle: "Génération de notes",
    generateNoteButton: "Générer une note",
    noteTimer: "Minuteur de génération de note : 0 sec",
    generatedNotePlaceholder: "La note générée apparaîtra ici...",
    customPromptTitle: "Invite personnalisée",
    promptSlotLabel: "Emplacement de l'invite :",
    customPromptPlaceholder: "Entrez l'invite personnalisée ici",
    adUnitText: "Votre annonce ici",
    guideHeading: "Guide et instructions",
    guideText: `Bienvenue dans l'outil de transcription Whisper. Cette application permet d'enregistrer, de transcrire et de générer des notes professionnelles grâce à l'IA.<br><br>
<strong>Comment utiliser les fonctions :</strong>
<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l'enregistrement" pour commencer.</li>
  <li><strong>Finalisation :</strong> Cliquez sur "Arrêter/Terminer" pour arrêter l'enregistrement.</li>
  <li><strong>Génération de notes :</strong> Cliquez sur "Générer une note" après la transcription.</li>
  <li><strong>Invite personnalisée :</strong> Sélectionnez un emplacement (1–10) et saisissez votre invite.</li>
  <li><strong>Guide :</strong> Utilisez les boutons "Fonctions" et "Guide" pour alterner.</li>
</ul>
Veuillez cliquer sur "Fonctions" pour revenir à l'interface principale.`,
  },
  it: {
    pageTitle: "Whisper Trascrizione Clinica - Strumento di Trascrizione",
    openaiUsageLinkText: "Panoramica dell'utilizzo di OpenAI",
    btnFunctions: "Funzioni",
    btnGuide: "Guida",
    recordingAreaTitle: "Area di registrazione",
    recordTimer: "Timer di registrazione: 0 sec",
    transcribeTimer: "Timer di completamento: 0 sec",
    transcriptionPlaceholder: "Il risultato della trascrizione apparirà qui...",
    startButton: "Avvia registrazione",
    stopButton: "Ferma/Completa",
    pauseButton: "Pausa registrazione",
    statusMessage: "Benvenuto! Clicca su \"Avvia registrazione\" per iniziare.",
    noteGenerationTitle: "Generazione di note",
    generateNoteButton: "Genera nota",
    noteTimer: "Timer generazione note: 0 sec",
    generatedNotePlaceholder: "La nota generata apparirà qui...",
    customPromptTitle: "Prompt personalizzato",
    promptSlotLabel: "Slot per il prompt:",
    customPromptPlaceholder: "Inserisci il prompt personalizzato qui",
    adUnitText: "Il tuo annuncio qui",
    guideHeading: "Guida e istruzioni",
    guideText: `Benvenuto nello strumento di trascrizione Whisper. Questa applicazione permette di registrare, trascrivere e generare note professionali grazie all'IA.<br><br>
<strong>Come utilizzare le funzioni:</strong>
<ul>
  <li><strong>Registrazione:</strong> Clicca su "Avvia registrazione" per iniziare.</li>
  <li><strong>Completamento:</strong> Clicca su "Ferma/Completa" per terminare la registrazione.</li>
  <li><strong>Generazione di note:</strong> Clicca su "Genera nota" dopo la trascrizione.</li>
  <li><strong>Prompt personalizzato:</strong> Seleziona uno slot e inserisci il tuo prompt.</li>
  <li><strong>Guida:</strong> Utilizza i pulsanti "Funzioni" e "Guida" per passare dall'interfaccia alla guida.</li>
</ul>
Clicca su "Funzioni" per tornare all'interfaccia principale.`,
    priceButton: "Prezzo",
    priceModalHeading: "Informazioni sui costi per Whisper Trascrizione Clinica",
    priceModalText: `Tariffazione per la trascrizione da voce a testo<br>
Costo: $0.006 al minuto.<br>
Esempio: Una consulenza di 15 minuti costerà 15 × $0.006 = $0.09.<br>
<br><br>
Tariffazione per la generazione di note<br>
Basata sui token:<br>
Input (trascrizione + prompt): $10 per 1.000.000 di token (≈ $0.00001 per token).<br>
Output (nota generata): $30 per 1.000.000 di token (≈ $0.00003 per token).<br>
<br>
Esempio di calcolo:<br>
700 parole + 30 parole ≈ 547.5 token → $0.0055<br>
250 parole ≈ 187.5 token → $0.0056<br>
Totale ≈ $0.0111 per consulto.<br>
<br>
Costo combinato (15 min, entrambe le funzioni):<br>
Trascrizione: $0.09<br>
Generazione di note: $0.0111<br>
Totale: Circa $0.101 per consulto.<br>
<br>
Stima mensile (320 consulti):<br>
Solo trascrizione: $28.80<br>
Con entrambe le funzioni: ≈ $32.32`
  }
};

function updateLanguageIndex(lang) {
  const trans = indexTranslations[lang] || indexTranslations["en"];
  document.getElementById("page-title").textContent = trans.pageTitle;
  document.getElementById("header-title").textContent = trans.headerTitle;
  document.getElementById("header-subtitle").textContent = trans.headerSubtitle;
  document.getElementById("start-text").textContent = trans.startText;
  document.getElementById("apiKeyInput").setAttribute("placeholder", trans.apiPlaceholder);
  document.getElementById("enterTranscriptionBtn").textContent = trans.enterButton;
  document.getElementById("openGuideButton").textContent = trans.guideButton;
  document.getElementById("openSecurityButton").textContent = trans.securityButton;
  document.getElementById("openAboutButton").textContent = trans.aboutButton;
  document.getElementById("ad-revenue-message").textContent = trans.adRevenueMessage;
  document.getElementById("securityModalHeading").textContent = trans.securityModalHeading;
  document.getElementById("securityModalText").innerHTML = trans.securityModalText;
  document.getElementById("aboutModalHeading").textContent = trans.aboutModalHeading;
  document.getElementById("aboutModalText").innerHTML = trans.aboutModalText;
  // Update API guide modal content if present
  if (document.getElementById("guide-heading")) {
    document.getElementById("guide-heading").textContent = trans.guideModalHeading;
  }
  if (document.getElementById("guide-p1")) {
    document.getElementById("guide-p1").innerHTML = trans.guideModalText;
  }
  // Update Price button and modal content if present
  if (document.getElementById("openPriceButton")) {
    document.getElementById("openPriceButton").textContent = trans.priceButton;
  }
  if (document.getElementById("priceModalHeading")) {
    document.getElementById("priceModalHeading").textContent = trans.priceModalHeading;
  }
  if (document.getElementById("priceModalText")) {
    document.getElementById("priceModalText").innerHTML = trans.priceModalText;
  }
}

function updateLanguageTranscribe(lang) {
  const trans = transcribeTranslations[lang] || transcribeTranslations["en"];
  document.getElementById("page-title-transcribe").textContent = trans.pageTitle;
  document.getElementById("openaiUsageLink").textContent = trans.openaiUsageLinkText;
  document.getElementById("btnFunctions").textContent = trans.btnFunctions;
  document.getElementById("btnGuide").textContent = trans.btnGuide;
  document.getElementById("recordingAreaTitle").textContent = trans.recordingAreaTitle;
  document.getElementById("recordTimer").textContent = trans.recordTimer;
  document.getElementById("transcribeTimer").textContent = trans.transcribeTimer;
  document.getElementById("transcription").setAttribute("placeholder", trans.transcriptionPlaceholder);
  document.getElementById("startButton").textContent = trans.startButton;
  document.getElementById("stopButton").textContent = trans.stopButton;
  document.getElementById("pauseResumeButton").textContent = trans.pauseButton;
  document.getElementById("statusMessage").textContent = trans.statusMessage;
  document.getElementById("noteGenerationTitle").textContent = trans.noteGenerationTitle;
  document.getElementById("generateNoteButton").textContent = trans.generateNoteButton;
  document.getElementById("noteTimer").textContent = trans.noteTimer;
  document.getElementById("generatedNote").setAttribute("placeholder", trans.generatedNotePlaceholder);
  document.getElementById("customPromptTitle").textContent = trans.customPromptTitle;
  document.getElementById("promptSlotLabel").textContent = trans.promptSlotLabel;
  document.getElementById("customPrompt").setAttribute("placeholder", trans.customPromptPlaceholder);
  document.getElementById("adUnit").textContent = trans.adUnitText;
  document.getElementById("guideHeading").textContent = trans.guideHeading;
  document.getElementById("guideText").innerHTML = trans.guideText;
}

function initIndexLanguage() {
  let currentLang = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select");
  if (!langSelect) return;
  langSelect.value = currentLang;
  updateLanguageIndex(currentLang);
  langSelect.addEventListener("change", function() {
    currentLang = this.value;
    localStorage.setItem("siteLanguage", currentLang);
    updateLanguageIndex(currentLang);
  });
}

function initTranscribeLanguage() {
  let currentLangTranscribe = localStorage.getItem("siteLanguage") || "en";
  const langSelect = document.getElementById("lang-select-transcribe");
  if (!langSelect) return;
  langSelect.value = currentLangTranscribe;
  updateLanguageTranscribe(currentLangTranscribe);
  langSelect.addEventListener("change", function() {
    currentLangTranscribe = this.value;
    localStorage.setItem("siteLanguage", currentLangTranscribe);
    updateLanguageTranscribe(currentLangTranscribe);
  });
}

export { initIndexLanguage, initTranscribeLanguage };
