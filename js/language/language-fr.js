// js/language-fr.js

export const indexTranslations = {
  pageTitle: "Transcription Clinique Whisper",
  headerTitle: "Transcription Clinique Whisper",
  headerSubtitle: "Transcription audio en texte et génération de notes avancées pour consultations médicales, propulsées par l'IA",
  startText: "Pour commencer, veuillez entrer votre clé API OpenAI :",
  apiPlaceholder: "Entrez la clé API ici",
  enterButton: "Accéder à l'outil de transcription",
  guideButton: "Guide API – Mode d'emploi",
  securityButton: "Sécurité",
  aboutButton: "À propos",
  adRevenueMessage: "Comme ce site est gratuit et financé uniquement par la publicité, veuillez accepter les publicités personnalisées afin de soutenir le service.",
  securityModalHeading: "Confidentialité",
securityModalText: `Votre vie privée et la sécurité des informations relatives aux patients sont nos priorités absolues. Nous utilisons des mesures robustes pour garantir que vos données restent confidentielles et sécurisées:<br><br>
- <strong>Chiffrement des données :</strong> Toutes les données traitées par notre système — y compris les enregistrements audio, les transcriptions et les notes — sont chiffrées selon des méthodes conformes aux standards de l'industrie. Les transcriptions et notes sont exclusivement associées à votre clé API personnelle chiffrée et à l'appareil utilisé pour y accéder, garantissant ainsi que seul vous pouvez consulter le contenu généré.<br><br>
- <strong>Suppression automatique :</strong> Dès qu'une transcription ou une note est générée et affichée sur votre écran, elle est automatiquement et irréversiblement supprimée de nos serveurs dans un délai de 2 minutes. Les fichiers audio sont stockés uniquement de manière temporaire pour le traitement et ne sont pas conservés au-delà de leur utilisation immédiate.<br><br>
- <strong>Protection contre les accès non autorisés :</strong> Même en cas d'accès non autorisé à votre clé API, vos données restent chiffrées et sécurisées grâce à des marqueurs spécifiques à l'appareil, rendant l'information inaccessible.<br><br>
- <strong>Hébergement conforme au RGPD :</strong> Tous les processus backend s'exécutent sur des serveurs dédiés de Microsoft Azure situés au sein de l'UE, en totale conformité avec les réglementations du RGPD. Vous pouvez en savoir plus sur la manière dont nous protégeons vos données en visitant <a href="https://openai.com/security-and-privacy/" target="_blank" style="color: blue; text-decoration: underline;">Sécurité et confidentialité d’OpenAI</a>.<br><br>
<strong>Pratiques supplémentaires en matière de confidentialité :</strong><br><br>
- <strong>Collecte minimale de données :</strong> Nous ne collectons que les informations essentielles nécessaires à la fourniture de nos services. Cela inclut votre clé API OpenAI (stockée sous forme chiffrée pour la durée de votre session), un jeton d'appareil utilisé uniquement pour le chiffrement, ainsi que votre préférence linguistique. Aucune donnée personnelle supplémentaire n'est stockée.<br><br>
- <strong>Utilisation des cookies :</strong> Les cookies sur ce site sont utilisés exclusivement pour diffuser des publicités personnalisées et améliorer votre expérience. Nous n'utilisons pas ces cookies pour collecter ou stocker des données personnelles au-delà de ce qui est nécessaire à cet effet. De plus, notre site utilise des cookies pour mémoriser les préférences des utilisateurs et gérer le consentement.<br><br>
- <strong>Traitement et conservation des données :</strong> Toutes les données traitées par notre système — y compris les enregistrements audio, les transcriptions et les notes générées — ne sont conservées que pendant le temps nécessaire à l'achèvement du processus de transcription et de génération de notes, puis sont automatiquement supprimées peu de temps après la fin du traitement. Nous ne stockons ni ne partageons aucune information permettant de vous identifier personnellement au-delà de ce qui est requis pour le bon fonctionnement de notre service.<br><br>
- <strong>Partage des données avec des tiers et conformité réglementaire :</strong> Nous ne vendons ni ne partageons vos données personnelles avec des tiers. Toute donnée partagée avec des services externes — tels qu'OpenAI pour la transcription et la génération de notes ou Google AdSense pour les publicités personnalisées — se limite à des informations anonymisées relatives uniquement à la personnalisation des publicités et aux préférences des utilisateurs, et n'inclut pas vos enregistrements, transcriptions ou notes générées. Tout partage de données est effectué selon des normes strictes de confidentialité et en totale conformité avec les réglementations sur la protection de la vie privée en vigueur.<br><br>
Veuillez noter qu'en raison de la conception de notre système, toutes les données sont automatiquement supprimées peu de temps après leur traitement et ne sont pas conservées à long terme.`,
  aboutModalHeading: "À propos",
  aboutModalText: `Ce site a été créé pour offrir aux professionnels de santé et autres utilisateurs un accès direct à une transcription vocale de haute qualité et à la génération de notes cliniques—sans frais inutiles ni intermédiaires.<br><br>
En utilisant votre propre clé API OpenAI, vous vous connectez directement à la source de la technologie. Cela signifie que vous ne payez que le coût réel d’utilisation défini par OpenAI, sans majoration ni abonnement.<br><br>
De nombreux fournisseurs proposent des services similaires, mais à des tarifs bien plus élevés—souvent 8 à 10 fois plus que le coût réel de la technologie sous-jacente. Cette plateforme offre les mêmes fonctionnalités à une fraction du prix.<br><br>
<strong>Points clés :</strong><br>
• Aucun abonnement, aucun compte requis.<br>
• Vous payez uniquement OpenAI directement pour ce que vous utilisez.<br>
• Le site lui-même est entièrement gratuit.<br><br>
Pour continuer à offrir ce service gratuitement, nous vous serions très reconnaissants d’accepter l’affichage de publicités Google Ads. Les revenus publicitaires nous aident à couvrir les frais d’hébergement et de fonctionnement, afin que le service reste accessible à tous.`,
  guideModalHeading: "Comment utiliser",
  guideModalText: `Pour utiliser cette application web, vous devez d'abord créer un profil API OpenAI, générer une clé API et approvisionner votre portefeuille OpenAI. Votre clé API est ensuite copiée et collée dans le champ dédié. Une fois que vous appuyez sur Entrée, l'application web enregistre temporairement la clé pour votre session — cette clé vous connecte aux serveurs d'OpenAI, permettant ainsi la transcription de la parole en texte et la génération de notes. Veuillez noter que chaque tâche effectuée vous est facturée immédiatement. Pour plus d'informations sur les coûts, veuillez consulter la section "Coûts" sur la page d'accueil.
<br><br>
<strong>1. Créez votre profil API OpenAI</strong><br>
Pour commencer, vous devez créer un profil sur la plateforme API d'OpenAI. Ce profil sert de compte pour gérer vos clés API et la facturation. Pour débuter, rendez-vous sur la page <a href="https://platform.openai.com/signup" style="color:blue;">Inscription à l'API OpenAI</a>. Suivez les instructions pour vous inscrire en fournissant votre adresse e-mail, en créant un mot de passe et en vérifiant votre compte. Une fois enregistré, vous aurez accès à votre tableau de bord.
<br><br>
<strong>2. Générez une clé API</strong><br>
Après avoir créé votre profil, générez une clé API en vous rendant sur la page <a href="https://platform.openai.com/account/api-keys" style="color:blue;">Gestion des clés API</a>. Cliquez sur le bouton pour créer une nouvelle clé API. Important : vous ne verrez votre clé API qu'une seule fois. Copiez-la immédiatement et conservez-la en lieu sûr (par exemple, dans un fichier texte) pour une utilisation future. Si vous perdez la clé ou pensez qu'elle a été compromise, supprimez-la de votre compte et créez-en une nouvelle.
<br><br>
<strong>3. Approvisionnez votre portefeuille OpenAI</strong><br>
Pour que l'application web fonctionne, votre portefeuille OpenAI doit disposer de fonds suffisants. Rendez-vous sur la page <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Facturation & Paiement</a> pour ajouter des fonds. Vous pouvez transférer n'importe quel montant à tout moment. Tant que des fonds sont disponibles, vous pourrez utiliser le site — chaque tâche est facturée immédiatement.
<br><br>
<strong>Rappel sur la sécurité de la session</strong><br>
Lorsque vous vous connectez en saisissant votre clé API, celle-ci est stockée uniquement temporairement dans votre session de navigateur. Cela signifie que si vous quittez le site, fermez votre navigateur ou éteignez votre ordinateur, la clé API ne sera pas sauvegardée. Vous devrez la ressaisir lors de votre prochaine utilisation de l'application web, garantissant ainsi la sécurité de votre clé.`,
  priceButton: "Prix",
  priceModalHeading: "Prix",
priceModalText: `
<div>
  <h1>Informations sur les Coûts</h1>
  <h2>Tarification de la Transcription Voix-en-Texte</h2>
  <ul>
    <li><strong>Coût :</strong> 0,006 $ par minute. <em>Exemple :</em> Une consultation de 15 minutes coûtera 15 × 0,006 $ = <strong>0,09 $</strong> par consultation.</li>
  </ul>
  <h2>Tarification de la Génération de Notes</h2>
  <ul>
    <li><strong>Tarification basée sur les jetons (tokens) :</strong></li>
    <ul>
      <li><strong>Entrée (transcription + prompt) :</strong> 5,00 $ pour 1 000 000 de jetons (soit 0,000005 $ par jeton).</li>
      <li><strong>Sortie (note générée) :</strong> 15,00 $ pour 1 000 000 de jetons (soit 0,000015 $ par jeton).</li>
    </ul>
  </ul>
  <h3>Exemple de Calcul pour une Consultation (génération de note uniquement)</h3>
  <ol>
    <li>
      <strong>Calcul pour l'entrée :</strong>
      <p>Supposons que la transcription fasse environ <strong>700 mots</strong> et que vous ajoutiez un prompt de <strong>30 mots</strong>.<br>
      Total des mots = 700 + 30 = <strong>730 mots</strong>.<br>
      Estimation en jetons = 730 × 0,75 ≈ <strong>547,5 jetons</strong>.<br>
      Coût d’entrée = 547,5 × 0,000005 $ ≈ <strong>0,0027 $</strong>.</p>
    </li>
    <li>
      <strong>Calcul pour la sortie :</strong>
      <p>Supposons que la note générée fasse environ <strong>250 mots</strong>.<br>
      Estimation en jetons = 250 × 0,75 ≈ <strong>187,5 jetons</strong>.<br>
      Coût de sortie = 187,5 × 0,000015 $ ≈ <strong>0,0028 $</strong>.</p>
    </li>
    <li>
      <strong>Coût total pour la génération de note :</strong>
      <p>Coût combiné ≈ 0,0027 $ + 0,0028 $ = <strong>0,0055 $</strong> par consultation.</p>
    </li>
  </ol>
  <h2>Coût Total Approximatif par Consultation</h2>
  <p>(pour une consultation ou un enregistrement de 15 minutes utilisant les deux fonctions)</p>
  <ul>
    <li><strong>Transcription Voix-en-Texte :</strong> <strong>0,09 $</strong></li>
    <li><strong>Génération de Note :</strong> <strong>0,0055 $</strong></li>
    <li><strong>Total :</strong> Environ <strong>0,0955 $</strong> par consultation.</li>
  </ul>
  <h2>Estimations Mensuelles</h2>
  <p>Si vous effectuez 20 consultations par jour, 4 jours par semaine, pendant 4 semaines (20 × 4 × 4 = <strong>320 consultations</strong> par mois) :</p>
  <ol>
    <li>
      <strong>Utilisation uniquement de la transcription :</strong><br>
      Coût mensuel = 320 × 0,09 $ = <strong>28,80 $</strong>.
    </li>
    <li>
      <strong>Utilisation de la transcription et de la génération de notes :</strong><br>
      Coût mensuel = 320 × 0,0955 $ ≈ <strong>30,56 $</strong>.
    </li>
  </ol>
  <h2>Souplesse d’Utilisation</h2>
  <p>Contrairement à certains prestataires qui imposent un abonnement mensuel, ici vous ne payez que ce que vous consommez réellement. Si vous prenez des congés ou avez des jours sans activité, le coût est nul. Même avec un usage quotidien, le coût par consultation reste bien inférieur à celui des solutions concurrentes.</p>
  <hr>
  <h2>Avantage de la Connexion Directe</h2>
  <p>Notre application se connecte directement à l’API d’OpenAI — sans intermédiaire ni frais supplémentaires. Cela signifie que vous ne payez que pour le traitement réel effectué par l’IA, faisant de notre service l’une des options les plus abordables pour la transcription et la génération de notes disponibles aujourd’hui.</p>
</div>
`,
};

export const transcribeTranslations = {
  pageTitle: "Outil de transcription avec publicités et superposition de guide",
  openaiUsageLinkText: "Aperçu des coûts d'utilisation",
  openaiWalletLinkText: "Solde du portefeuille",
  btnFunctions: "Fonctions",
  btnGuide: "Guide",
  backToHome: "Retour à la page d'accueil",
  recordingAreaTitle: "Zone d'enregistrement",
  recordTimer: "Chronomètre d'enregistrement : 0 sec",
  transcribeTimer: "Chronomètre d'achèvement : 0 sec",
  transcriptionPlaceholder: "Le résultat de la transcription apparaîtra ici…",
  startButton: "Commencer l'enregistrement",
  readFirstText: "À lire d'abord ! ➔",
  stopButton: "Arrêter/Terminer",
  pauseButton: "Mettre l'enregistrement en pause",
  statusMessage: "Bienvenue ! Cliquez sur « Commencer l'enregistrement » pour débuter.",
  noteGenerationTitle: "Génération de notes",
  generateNoteButton: "Générer une note",
  noteTimer: "Chronomètre de génération de notes : 0 sec",
  generatedNotePlaceholder: "La note générée apparaîtra ici…",
  customPromptTitle: "Invite personnalisée",
  promptSlotLabel: "Emplacement de l'invite :",
  customPromptPlaceholder: "Saisissez l'invite personnalisée ici",
  adUnitText: "Votre publicité ici",
  guideHeading: "Guide et instructions",
guideText: `Bienvenue dans <strong>Whisper Transcription Clinique</strong>. Cette application permet aux professionnels de santé, thérapeutes et autres praticiens d’enregistrer et de transcrire des consultations, ainsi que de générer des notes professionnelles grâce à un générateur alimenté par intelligence artificielle.<br><br>

<strong>Comment utiliser les fonctionnalités :</strong><br><br>

<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l’enregistrement" pour commencer à capturer l’audio. Toutes les 2 minutes, un segment audio est automatiquement envoyé aux serveurs d’OpenAI pour transcription. Les transcriptions apparaîtront progressivement dans le champ de sortie.<br><br>
  <strong><u>Important :</u> L’enregistreur ne fonctionne pas avec tous les navigateurs. Il est recommandé d’utiliser <strong>Google Chrome</strong> ou <strong>Microsoft Edge</strong>.</strong></li><br>

  <li><strong>Pause et reprise :</strong> Vous pouvez utiliser le bouton "Pause" pour interrompre temporairement l’enregistrement, par exemple si la consultation est interrompue ou si vous devez quitter le cabinet un instant. Lorsque vous cliquez sur "Pause", le segment audio en cours est téléchargé et transcrit, puis l’enregistrement est mis en pause. Lorsque vous êtes prêt à continuer, cliquez sur "Reprendre", et l’enregistrement reprendra automatiquement avec le segment suivant. Le minuteur continue là où il s’était arrêté, et la session peut être terminée normalement en cliquant sur "Stop/Terminer".</li><br>

  <li><strong>Finalisation :</strong> Après avoir cliqué sur "Stop/Terminer", l’enregistrement s’arrête. Le minuteur de finalisation indique le temps nécessaire pour recevoir la transcription complète (généralement en 5 à 10 secondes).</li><br>

  <li><strong>Prompt personnalisé :</strong> Sur la droite, sélectionnez un emplacement de prompt (1 à 10) et saisissez votre propre prompt. Il sera automatiquement enregistré et associé à votre clé API. Vous pouvez créer tout type de prompt adapté à votre style de documentation, ton et domaine clinique. Cela vous offre une flexibilité totale dans la génération des notes.</li><br>

  <li><strong>Génération de note :</strong> Une fois la transcription terminée, cliquez sur "Générer la note" pour créer une note basée sur la transcription et le prompt sélectionné/personnalisé.</li><br>

  <li><strong>Aperçu des coûts :</strong> Pour consulter votre utilisation actuelle chez OpenAI, cliquez sur le lien vers l’aperçu des coûts situé en haut à droite de cette page.</li><br>

  <li><strong>Sécurité :</strong> Votre enregistrement audio est envoyé directement aux serveurs API d’OpenAI, qui ne stockent pas les données et les utilisent uniquement pour la transcription. Le texte transcrit s’affiche uniquement dans votre navigateur, et <strong>il est supprimé/disparaît dès que vous fermez le navigateur ou rechargez du contenu.</strong></li><br>

  <li><strong>Bouton "Guide" :</strong> Cliquez de nouveau sur le bouton "Guide" pour revenir à l’interface principale.</li>
</ul><br><br>

<strong>Exemples de prompts :</strong><br><br>

<strong>Consultation :</strong><br>
"Prompt système – Générateur de note médicale

Rédigez une note médicalement précise et prête pour le journal à partir d’une conversation transcrite entre le médecin et le patient. Utilisez la structure suivante (sauf indication contraire dans le dictat) :
Contexte (seulement si antécédents pertinents), Motif de consultation/anamnèse, Examen (puces), Évaluation, Plan.

Règles :
– Ne pas inclure d’informations, examens ou constatations non mentionnés explicitement.
– Constatations négatives uniquement si mentionnées.
– Bilans sanguins : écrivez “des bilans sanguins pertinents sont prescrits”, sans les détailler.
– Corrigez les fautes évidentes dans les noms de médicaments.
– N’utilisez pas de caractères spéciaux ni de sauts de ligne avant les titres.
– Suivez les instructions explicites du médecin concernant le style, la longueur ou les formulations spécifiques.

Si le médecin ajoute des commentaires après le départ du patient, ceux-ci doivent être pris en compte. La note doit être bien rédigée."

<br><br>

<strong>Lettre au patient :</strong><br>
"Rédigez une lettre du médecin au patient. Commencez par Bonjour \\"nom\\", et terminez par<br>
Cordialement<br>
\\"Votre nom\\"<br>
\\"Nom du cabinet\\"<br>
La lettre doit avoir un ton professionnel et formel. Vous pouvez améliorer légèrement le style pour une meilleure fluidité."

<br><br>

Ce sont des exemples efficaces, mais vous êtes libre de les adapter à votre style de documentation, votre spécialité ou votre type de consultation. Vous pouvez également créer vos propres prompts pour tout autre usage.
`,
};
