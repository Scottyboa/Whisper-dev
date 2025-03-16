// js/language-fr.js

export const indexTranslations = {
  pageTitle: "Transcription Clinique Whisper",
  headerTitle: "Transcription Clinique Whisper",
  headerSubtitle: "Conversion de la parole en texte et génération de notes par IA pour les consultations médicales",
  startText: "Pour commencer, veuillez entrer votre clé API OpenAI :",
  apiPlaceholder: "Entrez votre clé API ici",
  enterButton: "Accéder à l’outil de transcription",
  guideButton: "Guide API – Comment l'utiliser",
  securityButton: "Sécurité",
  aboutButton: "À propos",
  adRevenueMessage: "Comme ce site est gratuit et financé uniquement par la publicité, veuillez accepter les annonces personnalisées pour soutenir le service.",
  securityModalHeading: "Informations de sécurité",
  securityModalText: `Votre confidentialité et la sécurité des informations de vos patients sont notre priorité absolue. Pour garantir la confidentialité des données :<br><br>
- <strong>Chiffrement des données :</strong> Toutes les données traitées par le système sont protégées par des méthodes de chiffrement reconnues dans l'industrie. Les transcriptions et les notes sont associées exclusivement à votre clé API personnelle chiffrée et à l'appareil utilisé, assurant ainsi que seul vous puissiez accéder aux contenus générés.<br><br>
- <strong>Suppression automatique :</strong> Dès qu'une transcription ou une note est générée et affichée, elle est automatiquement et définitivement supprimée des serveurs dans un délai de 2 minutes.<br><br>
- <strong>Protection contre les accès non autorisés :</strong> Même en cas d'accès non autorisé à votre clé API, les données restent chiffrées et protégées par des marqueurs spécifiques à l'appareil, rendant l'information inaccessible.<br><br>
- <strong>Hébergement conforme au RGPD :</strong> Tous les processus backend s'exécutent sur des serveurs dédiés Microsoft Azure situés dans l'Union Européenne, en totale conformité avec le RGPD.<br><br>
Soyez assuré(e) que des mesures de sécurité strictes garantissent que toutes les informations relatives aux patients restent sûres, confidentielles et entièrement sous votre contrôle.`,
  aboutModalHeading: "À propos de ce projet",
  aboutModalText: `Je suis un médecin de famille norvégien, toujours passionné par les avancées technologiques, notamment dans le domaine de l'intelligence artificielle, et j'ai suivi de près l'évolution de l'IA dans le secteur de la santé.<br><br>
Lorsque j'ai découvert pour la première fois des entreprises offrant des services de conversion de la parole en texte pour les consultations médicales en Norvège, j'ai été très enthousiasmé. Des collègues et des avis en ligne ont salué ces services en mettant en avant d'importantes améliorations en termes d'efficacité et d'organisation du travail. Toutefois, en approfondissant mes recherches, j'ai été surpris par les montants facturés par ces entreprises, d'autant plus que le coût réel de la technologie n'est qu'une fraction de ces prix.<br><br>
Motivé par cette constatation, j'ai développé ma propre solution de conversion de la parole en texte, initialement pour un usage personnel. Constatant son efficacité et sa rentabilité, j'ai décidé de rendre cette solution accessible en ligne, offrant ainsi la même rapidité, précision et qualité que les services haut de gamme, mais sans les frais excessifs.<br><br>
Contrairement aux fournisseurs commerciaux, cette plateforme n'applique pas de majorations ni de frais superflus.<br>
• Vous payez directement OpenAI — c'est-à-dire que vous accédez directement à la source de la technologie, sans que des intermédiaires ne prélèvent une commission supplémentaire.<br>
• Grâce à cela, c'est l'option la plus économique tout en maintenant une qualité de premier ordre.<br><br>
Je suis convaincu(e) que les services proposés par certaines de ces entreprises, bien que utiles, sont surévalués par rapport à ce qu'ils offrent réellement. De nombreux collègues, qui travaillent dur chaque jour dans les soins aux patients, se retrouvent à payer bien plus que nécessaire pour accéder à un outil qui devrait être abordable pour tous.<br><br>
Ce site web est entièrement gratuit — le seul coût que vous assumez est la facture directe d'utilisation d'OpenAI pour les transcriptions.<br>
• Pas de frais mensuels, pas d'abonnements, pas d'engagements — vous payez uniquement pour les tâches que vous effectuez.<br>
• Vous contrôlez vos dépenses en décidant du montant à transférer dans votre portefeuille OpenAI.<br><br>
La seule chose que je demande, c'est d'accepter les publicités, qui aident à couvrir les coûts des serveurs backend.<br>
À mesure que le nombre d'utilisateurs augmente, les frais d'hébergement et d'exploitation vont croître, et les revenus publicitaires me permettront de maintenir ce service gratuit et opérationnel sans facturer les utilisateurs.`,
  guideModalHeading: "Guide API – Comment l'utiliser",
  guideModalText: `Pour utiliser cette application web, vous devez d'abord créer un profil sur la plateforme API d'OpenAI, générer une clé API et approvisionner votre compte OpenAI. Votre clé API est ensuite copiée et collée dans le champ prévu à cet effet. Une fois que vous appuyez sur Entrée, la clé est temporairement enregistrée pour votre session, vous connectant ainsi directement aux serveurs d'OpenAI pour permettre la conversion de la parole en texte et la génération de notes. Veuillez noter que chaque opération entraîne une facturation immédiate. Pour plus d'informations sur les coûts, consultez la section "Cost Information" sur la page d'accueil.<br><br>
<strong>1. Créez votre profil API sur OpenAI</strong><br>
Commencez par créer un profil sur la plateforme API d'OpenAI. Ce profil sert de compte pour la gestion des clés API et la facturation. Rendez-vous sur la page <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> et suivez les instructions en fournissant votre adresse e-mail, en créant un mot de passe et en vérifiant votre compte. Une fois inscrit(e), vous aurez accès à votre tableau de bord.<br><br>
<strong>2. Générez une clé API</strong><br>
Après avoir créé votre profil, générez une clé API en vous rendant sur la page de gestion des clés (<a href="https://platform.openai.com/account/api-keys" style="color:blue;">Gestion des clés API</a>). Cliquez sur le bouton pour créer une nouvelle clé. Important : vous ne verrez votre clé qu'une seule fois. Copiez-la immédiatement et conservez-la en lieu sûr (par exemple dans un fichier texte). Si vous perdez la clé ou pensez qu'elle a été compromise, supprimez-la de votre compte et générez-en une nouvelle.<br><br>
<strong>3. Approvisionnez votre compte OpenAI</strong><br>
Pour que l'application fonctionne, votre compte OpenAI doit être suffisamment approvisionné. Rendez-vous sur la page <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> pour ajouter des fonds. Vous pouvez transférer le montant de votre choix à tout moment. Tant que des fonds sont disponibles, vous pourrez utiliser le service — chaque opération étant facturée immédiatement.<br><br>
<strong>Rappel sur la sécurité de la session</strong><br>
Lorsque vous vous connectez en entrant votre clé API, celle-ci est stockée temporairement dans votre session de navigateur. Ainsi, si vous quittez le site, fermez le navigateur ou éteignez votre ordinateur, la clé ne sera pas conservée de manière permanente. Vous devrez la saisir à nouveau lors de votre prochaine utilisation, garantissant ainsi sa sécurité.`,
  priceButton: "Price",
  priceModalHeading: "Cost Information",
  priceModalText: `# Cost Information

## Speech-to-Text Pricing  
   - **Cost:** $0.006 per minute.  
     *Example:* A 15-minute consultation will cost 15 × $0.006 = **$0.09** per consultation.

## Note Generation Pricing  
   - **Token-Based Pricing:**  
     - **Input (transcription + prompt):** $10 per 1,000,000 tokens (i.e. $0.00001 per token).  
     - **Output (generated note):** $30 per 1,000,000 tokens (i.e. $0.00003 per token).

       #### Example Consultation Calculation (Note Generation Only)
       1. **Input Calculation:**  
          - Assume the consultation transcription is about **700 words** and you add a **30-word prompt**.  
          - Total words = 700 + 30 = **730 words**.  
          - Estimated tokens = 730 × 0.75 ≈ **547.5 tokens**.  
          - Input cost = 547.5 tokens × $0.00001 ≈ **$0.0055**.
       2. **Output Calculation:**  
          - Assume the generated note is around **250 words**.  
          - Estimated tokens = 250 × 0.75 ≈ **187.5 tokens**.  
          - Output cost = 187.5 tokens × $0.00003 ≈ **$0.0056**.
       3. **Total Note Generation Cost:**  
          - Combined cost ≈ $0.0055 + $0.0056 = **$0.0111** per consultation.

## Approximate Combined Cost Per Consultation  
(for a 15 min consultation/recording, using both functions)  
   - **Speech-to-Text:** **$0.09**  
   - **Note Generation:** **$0.0111**  
   - **Total:** Approximately **$0.101** per consultation.

## Monthly Cost Estimates  
Assuming you conduct 20 consultations per day, 4 days per week, over 4 weeks per month (20 × 4 × 4 = **320 consultations** per month):

   1. **Using Only Speech-to-Text** (with note generation via your own ChatGPT account, which is essentially free):  
      - Monthly cost = 320 × $0.09 = **$28.80**.
   2. **Using Both Speech-to-Text and Note Generation:**  
      - Monthly cost = 320 × $0.101 ≈ **$32.32**.

## Alternative Note Generation Option  
   If you already have an OpenAI account, you can use note generation via ChatGPT on your own profile—which is essentially free. In that case, you only incur the speech-to-text cost when using this webapp.

## Usage Flexibility  
   Unlike providers that require a monthly subscription, you only pay per usage. If you take a day off, go on vacation, or have a period of no activity, your costs will be zero. Even if you use the service every day for all your patient consultations, the per-use cost remains significantly lower compared to other providers.

---

**Direct Connection Advantage**  
Our webapp connects you directly with the OpenAI API—no intermediary, no extra fees. This direct link means you only pay for the actual AI processing cost, making our service one of the most affordable speech-to-text and note generation solutions available today.`,
};

export const transcribeTranslations = {
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
};
