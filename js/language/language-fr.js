// js/languages/language-fr.js

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
  securityModalText: `Votre confidentialité et la sécurité des informations de vos patients sont notre priorité absolue. Pour garantir la confidentialité des données :
<div style="margin-left:20px;">
  <ul>
    <li><strong>Chiffrement des données :</strong> Toutes les données traitées par le système sont protégées par des méthodes de chiffrement reconnues dans l'industrie. Les transcriptions et les notes sont associées exclusivement à votre clé API personnelle chiffrée et à l'appareil utilisé, assurant ainsi que seul vous puissiez accéder aux contenus générés.</li>
    <li><strong>Suppression automatique :</strong> Dès qu'une transcription ou une note est générée et affichée, elle est automatiquement et définitivement supprimée des serveurs dans un délai de 2 minutes.</li>
    <li><strong>Protection contre les accès non autorisés :</strong> Même en cas d'accès non autorisé à votre clé API, les données restent chiffrées et protégées par des marqueurs spécifiques à l'appareil, rendant l'information inaccessible.</li>
    <li><strong>Hébergement conforme au RGPD :</strong> Tous les processus backend s'exécutent sur des serveurs dédiés Microsoft Azure situés dans l'Union Européenne, en totale conformité avec le RGPD.</li>
  </ul>
</div>
Soyez assuré(e) que des mesures de sécurité strictes garantissent que toutes les informations relatives aux patients restent sûres, confidentielles et entièrement sous votre contrôle.`,

  aboutModalHeading: "À propos de ce projet",
  aboutModalText: `Je suis un médecin de famille passionné par la technologie et le développement de l'IA dans le domaine de la santé. J'ai conçu cette solution pour réduire considérablement les coûts de transcription et offrir un accès direct, économique à OpenAI – vous ne payez que pour l'utilisation effective de l'API.`,
  
  guideModalHeading: "Guide API – Comment l'utiliser",
  guideModalText: `Pour utiliser cette application web, vous devez d'abord créer un profil sur la plateforme API d'OpenAI, générer une clé API et approvisionner votre compte OpenAI. Votre clé API est ensuite copiée et collée dans le champ prévu à cet effet. Une fois que vous appuyez sur Entrée, la clé est temporairement enregistrée pour votre session, vous connectant ainsi directement aux serveurs d'OpenAI pour permettre la conversion de la parole en texte et la génération de notes. Veuillez noter que chaque opération entraîne une facturation immédiate. Pour plus d'informations sur les coûts, consultez la section "Informations sur les coûts" sur la page d'accueil.
<br><br>
<strong>1. Créez votre profil API sur OpenAI</strong><br>
Commencez par créer un profil sur la plateforme OpenAI. Ce profil sert de compte pour la gestion des clés API et la facturation. Rendez-vous sur la page <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> et suivez les instructions en fournissant votre adresse e-mail, en créant un mot de passe et en vérifiant votre compte. Une fois inscrit(e), vous aurez accès à votre tableau de bord.
<br><br>
<strong>2. Générez une clé API</strong><br>
Après avoir créé votre profil, générez une clé API en vous rendant sur la page de gestion des clés (<a href="https://platform.openai.com/account/api-keys" style="color:blue;">Gestion des clés API</a>). Cliquez sur le bouton pour créer une nouvelle clé. Important : vous ne verrez votre clé qu'une seule fois. Copiez-la immédiatement et conservez-la en lieu sûr (par exemple, dans un fichier texte). Si vous perdez la clé ou pensez qu'elle a été compromise, supprimez-la de votre compte et générez-en une nouvelle.
<br><br>
<strong>3. Approvisionnez votre compte OpenAI</strong><br>
Pour que l'application fonctionne, votre compte OpenAI doit être suffisamment approvisionné. Rendez-vous sur la page <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Facturation & Paiement</a> pour ajouter des fonds. Vous pouvez transférer le montant de votre choix à tout moment. Tant que des fonds sont disponibles, vous pourrez utiliser le service – chaque opération étant facturée immédiatement.
<br><br>
<strong>Rappel sur la sécurité de la session</strong><br>
Lorsque vous vous connectez en entrant votre clé API, celle-ci est stockée temporairement dans votre session de navigateur. Ainsi, si vous quittez le site, fermez le navigateur ou éteignez votre ordinateur, la clé ne sera pas conservée de manière permanente. Vous devrez la saisir à nouveau lors de votre prochaine utilisation, garantissant ainsi sa sécurité.`,

  priceButton: "Voici une traduction de haute qualité de votre texte :",
  priceModalHeading: "Informations sur les coûts de la transcription clinique Whisper",
  priceModalText: `<h2>Tarification de la conversion de la parole en texte (Speech-to-Text)</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Coût :</strong> $0.006 par minute.</li>
    <li><em>Exemple :</em> Une consultation de 15 minutes coûtera 15 × $0.006 = <strong>$0.09</strong> par consultation.</li>
  </ul>
</div>
<h2>Tarification de la génération de notes</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Tarification basée sur les tokens :</strong>
      <div style="margin-left:20px;">
        <ul>
          <li><strong>Entrée (transcription + prompt) :</strong> $10 pour 1 000 000 de tokens (soit $0.00001 par token).</li>
          <li><strong>Sortie (note générée) :</strong> $30 pour 1 000 000 de tokens (soit $0.00003 par token).</li>
        </ul>
      </div>
    </li>
  </ul>
</div>
<h4>Exemple de calcul pour une consultation (uniquement pour la génération de notes)</h4>
<div style="margin-left:20px;">
  <ol>
    <li>
      <strong>Calcul de l’entrée :</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Supposons que la transcription de la consultation contienne <strong>700 mots</strong> et que vous ajoutiez un <strong>prompt de 30 mots</strong>.</li>
          <li>Nombre total de mots = 700 + 30 = <strong>730 mots</strong>.</li>
          <li>Estimation des tokens = 730 × 0.75 ≈ <strong>547.5 tokens</strong>.</li>
          <li>Coût de l’entrée = 547.5 tokens × $0.00001 ≈ <strong>$0.0055</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Calcul de la sortie :</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Supposons que la note générée fasse environ <strong>250 mots</strong>.</li>
          <li>Estimation des tokens = 250 × 0.75 ≈ <strong>187.5 tokens</strong>.</li>
          <li>Coût de la sortie = 187.5 tokens × $0.00003 ≈ <strong>$0.0056</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Coût total de la génération de notes :</strong>
      <div style="margin-left:20px;">
        Coût combiné ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> par consultation.
      </div>
    </li>
  </ol>
</div>
<h2>Coût total approximatif par consultation</h2>
<div style="margin-left:20px;">
  (pour une consultation/enregistrement de 15 minutes utilisant les deux fonctions)
  <ul>
    <li><strong>Parole en texte :</strong> <strong>$0.09</strong></li>
    <li><strong>Génération de notes :</strong> <strong>$0.0111</strong></li>
    <li><strong>Total :</strong> Environ <strong>$0.101</strong> par consultation.</li>
  </ul>
</div>
<h2>Estimations des coûts mensuels</h2>
<div style="margin-left:20px;">
  Si vous effectuez 20 consultations par jour, 4 jours par semaine, sur 4 semaines par mois (20 × 4 × 4 = <strong>320 consultations</strong> par mois) :
  <ol>
    <li>
      <strong>Utilisation uniquement de la conversion de la parole en texte</strong> (avec génération de notes via votre propre compte ChatGPT, ce qui est pratiquement gratuit) :
      <div style="margin-left:20px;">Coût mensuel = 320 × $0.09 = <strong>$28.80</strong>.</div>
    </li>
    <li>
      <strong>Utilisation de la conversion de la parole en texte et de la génération de notes :</strong>
      <div style="margin-left:20px;">Coût mensuel = 320 × $0.101 ≈ <strong>$32.32</strong>.</div>
    </li>
  </ol>
</div>
<h2>Option alternative pour la génération de notes</h2>
<div style="margin-left:20px;">
  Si vous possédez déjà un compte OpenAI, vous pouvez utiliser la génération de notes via ChatGPT sur votre propre profil, ce qui est pratiquement gratuit. Dans ce cas, seul le coût de la conversion de la parole en texte sera appliqué lors de l'utilisation de cette application web.
</div>
<h2>Flexibilité d’utilisation</h2>
<div style="margin-left:20px;">
  Contrairement aux fournisseurs qui imposent un abonnement mensuel, vous ne payez que selon votre utilisation. Si vous prenez un jour de congé, partez en vacances ou traversez une période d’inactivité, vos coûts seront nuls. Même si vous utilisez le service quotidiennement pour toutes vos consultations, le coût par utilisation reste nettement inférieur à celui des autres fournisseurs.
</div>
<hr>
<h2>Avantage de la connexion directe</h2>
<div style="margin-left:20px;">
  Notre application web se connecte directement à l’API OpenAI – sans intermédiaire ni frais supplémentaires. Cette connexion directe signifie que vous ne payez que pour le coût réel du traitement par IA, faisant de notre service l’une des solutions les plus abordables pour la conversion de la parole en texte et la génération de notes disponibles aujourd’hui.
</div>`,
};

export const transcribeTranslations = {
  pageTitle: "Outil de transcription avec annonces et guide",
  openaiUsageLinkText: "Aperçu de l'utilisation d'OpenAI",
  btnFunctions: "Fonctions",
  btnGuide: "Guide",
  recordingAreaTitle: "Zone d'enregistrement",
  recordTimer: "Minuteur d'enregistrement : 0 sec",
  transcribeTimer: "Minuteur de finalisation : 0 sec",
  transcriptionPlaceholder: "Le résultat de la transcription apparaîtra ici...",
  startButton: "Démarrer l'enregistrement",
  stopButton: "Arrêter/Terminer",
  pauseButton: "Suspendre l'enregistrement",
  statusMessage: "Bienvenue ! Cliquez sur 'Démarrer l'enregistrement' pour commencer.",
  noteGenerationTitle: "Génération de notes",
  generateNoteButton: "Générer une note",
  noteTimer: "Minuteur de génération de note : 0 sec",
  generatedNotePlaceholder: "La note générée apparaîtra ici...",
  customPromptTitle: "Invite personnalisée",
  promptSlotLabel: "Emplacement de l'invite :",
  customPromptPlaceholder: "Entrez votre invite personnalisée ici",
  adUnitText: "Votre annonce ici",
  guideHeading: "Guide & Instructions",
  guideText: `Bienvenue dans l'outil de transcription Whisper. Cette application permet aux professionnels de la santé, aux thérapeutes et à d'autres de enregistrer et de transcrire des consultations, ainsi que de générer des notes professionnelles grâce à un générateur de notes piloté par l'IA.<br><br>
<strong>Comment utiliser les fonctions :</strong>
<ul>
  <li><strong>Enregistrement :</strong> Cliquez sur "Démarrer l'enregistrement" pour commencer à capturer l'audio. L'audio est capturé via MediaStreamTrackProcessor (avec WebCodecs) et accumulé pendant jusqu'à 40 secondes avant d'être emballé dans un fichier WAV autonome.</li>
  <li><strong>Finalisation :</strong> Après avoir cliqué sur "Arrêter/Terminer", l'enregistrement s'arrête. Une période finale de 2 secondes collecte l'audio restant avant le traitement du dernier segment. Le minuteur de finalisation continue jusqu'à ce que la transcription complète soit reçue.</li>
  <li><strong>Génération de notes :</strong> Une fois la transcription terminée, cliquez sur "Générer une note" pour créer une note basée sur votre transcription et votre invite personnalisée.</li>
  <li><strong>Invite personnalisée :</strong> Sélectionnez un emplacement (1–10) et saisissez votre invite personnalisée. Celle-ci est automatiquement enregistrée et associée à votre clé API.</li>
  <li><strong>Guide :</strong> Utilisez les boutons "Fonctions" et "Guide" pour basculer entre la vue fonctionnelle et cette instruction.</li>
</ul>
Veuillez cliquer sur "Fonctions" pour revenir à l'interface principale.`,
};

