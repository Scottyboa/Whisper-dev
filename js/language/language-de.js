// js/languages/language-de.js

export const indexTranslations = {
  pageTitle: "Whisper Klinische Transkription",
  headerTitle: "Whisper Klinische Transkription",
  headerSubtitle: "Fortschrittliche KI-gestützte Sprache-zu-Text und Notizenerstellung für medizinische Konsultationen",
  startText: "Um zu starten, geben Sie bitte Ihren OpenAI API-Schlüssel ein:",
  apiPlaceholder: "API-Schlüssel hier eingeben",
  enterButton: "Zum Transkriptionswerkzeug",
  guideButton: "API-Guide – So nutzen Sie es",
  securityButton: "Sicherheit",
  aboutButton: "Über",
  adRevenueMessage: "Da diese Website kostenlos ist und sich ausschließlich über Werbeeinnahmen finanziert, stimmen Sie bitte personalisierten Anzeigen zu, um den Service zu unterstützen.",
  
  securityModalHeading: "Sicherheitsinformationen",
  securityModalText: `Ihre Privatsphäre und die Sicherheit der Patientendaten haben oberste Priorität. Um sicherzustellen, dass die Daten vertraulich bleiben:
<div style="margin-left:20px;">
  <ul>
    <li><strong>Datenschutz durch Verschlüsselung:</strong> Alle vom System verarbeiteten Daten werden mit branchenüblichen Verschlüsselungsmethoden gesichert. Transkriptionen und Notizen sind ausschließlich mit Ihrem verschlüsselten persönlichen API-Schlüssel und dem verwendeten Gerät verknüpft, sodass nur Sie Zugriff auf die generierten Inhalte haben.</li>
    <li><strong>Automatische Löschung:</strong> Sobald eine Transkription oder Notiz generiert und auf Ihrem Bildschirm angezeigt wird, wird sie innerhalb von 2 Minuten automatisch und unwiderruflich von den Servern gelöscht.</li>
    <li><strong>Schutz vor unbefugtem Zugriff:</strong> Selbst im Falle eines unbefugten Zugriffs auf Ihren API-Schlüssel bleiben die Daten verschlüsselt und durch gerätespezifische Marker geschützt, sodass sie nicht zugänglich sind.</li>
    <li><strong>GDPR-konformes Hosting:</strong> Alle Backend-Prozesse laufen auf dedizierten Microsoft Azure-Servern innerhalb der EU, die vollständig den GDPR-Richtlinien entsprechen.</li>
  </ul>
</div>
Seien Sie versichert, dass strenge Sicherheitsmaßnahmen gewährleisten, dass alle patientenbezogenen Daten sicher, vertraulich und ausschließlich unter Ihrer Kontrolle bleiben.`,
  
  aboutModalHeading: "Über dieses Projekt",
  aboutModalText: `Ich bin ein norwegischer Hausarzt mit großem Interesse an Technologie und KI-Entwicklungen im Gesundheitswesen. Ich habe diese Lösung entwickelt, um die Transkriptionskosten erheblich zu senken und einen kostengünstigen, direkten Zugang zu OpenAI zu bieten – Sie zahlen nur für die tatsächliche Nutzung von OpenAI.`,
  
  guideModalHeading: "API-Guide – So nutzen Sie es",
  guideModalText: `Um diese Web-App zu nutzen, müssen Sie zunächst ein OpenAI API-Profil erstellen, einen API-Schlüssel generieren und Ihr OpenAI-Konto aufladen. Ihr API-Schlüssel wird in das vorgesehene Feld kopiert und eingefügt. Sobald Sie Enter drücken, wird der API-Schlüssel temporär für Ihre Sitzung gespeichert – dieser Schlüssel verbindet Sie mit den OpenAI-Servern, sodass die Sprache-zu-Text-Transkription und die Notizenerstellung funktionieren. Bitte beachten Sie, dass Sie pro ausgeführter Aufgabe sofort belastet werden. Weitere Informationen zu den Kosten finden Sie im Abschnitt "Kosten" auf der Startseite.
<br><br>
<strong>1. Erstellen Sie Ihr OpenAI API-Profil</strong><br>
Um zu beginnen, müssen Sie ein Profil auf der OpenAI API-Plattform erstellen. Dieses Profil dient als Ihr Konto zur Verwaltung von API-Schlüsseln und zur Abrechnung. Besuchen Sie dazu die <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a>-Seite und folgen Sie den Anweisungen, indem Sie Ihre E-Mail-Adresse angeben, ein Passwort festlegen und Ihr Konto verifizieren. Nach der Registrierung erhalten Sie Zugriff auf Ihr Dashboard.
<br><br>
<strong>2. Generieren Sie einen API-Schlüssel</strong><br>
Nachdem Sie Ihr Profil erstellt haben, generieren Sie einen API-Schlüssel, indem Sie zur Seite für <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-Schlüsselverwaltung</a> navigieren. Klicken Sie auf den Button, um einen neuen API-Schlüssel zu erstellen. Wichtig: Sie werden Ihren API-Schlüssel nur einmal sehen. Kopieren Sie ihn sofort und bewahren Sie ihn sicher auf (z.B. in einer Textdatei) für den zukünftigen Gebrauch. Falls Sie den Schlüssel verlieren oder vermuten, dass er kompromittiert wurde, löschen Sie ihn von Ihrem Konto und erstellen Sie einen neuen.
<br><br>
<strong>3. Laden Sie Ihr OpenAI-Konto auf</strong><br>
Damit die Web-App funktioniert, muss Ihr OpenAI-Konto über ausreichende Mittel verfügen. Besuchen Sie die Seite für <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Abrechnung & Zahlung</a>, um Ihr Konto aufzuladen. Sie können jederzeit einen beliebigen Betrag überweisen. Solange ausreichend Mittel vorhanden sind, können Sie die Web-App nutzen – jede Aufgabe wird sofort abgerechnet.
<br><br>
<strong>Sicherheits-Hinweis zur Sitzung</strong><br>
Wenn Sie sich mit Ihrem API-Schlüssel anmelden, wird dieser nur temporär in Ihrer Browser-Sitzung gespeichert. Das bedeutet, wenn Sie die Website verlassen, den Browser schließen oder Ihren Computer ausschalten, wird der API-Schlüssel nicht dauerhaft gespeichert. Sie müssen ihn beim nächsten Mal erneut eingeben, was die Sicherheit Ihres Schlüssels gewährleistet.`,
  
  priceButton: "Hier ist eine hochwertige deutsche Übersetzung Ihres Textes:",
  priceModalHeading: "Kosteninformationen",
  priceModalText: `<h2>Preise für Sprache-zu-Text</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Kosten:</strong> $0.006 pro Minute.</li>
    <li><em>Beispiel:</em> Eine 15-minütige Konsultation kostet 15 × $0.006 = <strong>$0.09</strong> pro Konsultation.</li>
  </ul>
</div>
<h2>Preise für Notizenerstellung</h2>
<div style="margin-left:20px;">
  <ul>
    <li><strong>Token-basierte Preisgestaltung:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li><strong>Eingabe (Transkription + Eingabeaufforderung):</strong> $10 pro 1.000.000 Tokens (d. h. $0.00001 pro Token).</li>
          <li><strong>Ausgabe (generierte Notiz):</strong> $30 pro 1.000.000 Tokens (d. h. $0.00003 pro Token).</li>
        </ul>
      </div>
    </li>
  </ul>
</div>
<h4>Beispielkalkulation für eine Konsultation (nur Notizenerstellung)</h4>
<div style="margin-left:20px;">
  <ol>
    <li>
      <strong>Berechnung der Eingabe:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Angenommen, die Transkription der Konsultation umfasst <strong>700 Wörter</strong>, und Sie fügen eine <strong>30-Wörter-Eingabeaufforderung</strong> hinzu.</li>
          <li>Gesamtanzahl der Wörter = 700 + 30 = <strong>730 Wörter</strong>.</li>
          <li>Geschätzte Tokens = 730 × 0.75 ≈ <strong>547.5 Tokens</strong>.</li>
          <li>Kosten für die Eingabe = 547.5 Tokens × $0.00001 ≈ <strong>$0.0055</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Berechnung der Ausgabe:</strong>
      <div style="margin-left:20px;">
        <ul>
          <li>Angenommen, die generierte Notiz umfasst <strong>250 Wörter</strong>.</li>
          <li>Geschätzte Tokens = 250 × 0.75 ≈ <strong>187.5 Tokens</strong>.</li>
          <li>Kosten für die Ausgabe = 187.5 Tokens × $0.00003 ≈ <strong>$0.0056</strong>.</li>
        </ul>
      </div>
    </li>
    <li>
      <strong>Gesamtkosten für die Notizenerstellung:</strong>
      <div style="margin-left:20px;">
        Gesamtkosten ≈ $0.0055 + $0.0056 = <strong>$0.0111</strong> pro Konsultation.
      </div>
    </li>
  </ol>
</div>
<h2>Ungefähre Gesamtkosten pro Konsultation</h2>
<div style="margin-left:20px;">
  (für eine 15-minütige Konsultation/Aufzeichnung mit beiden Funktionen)
  <ul>
    <li><strong>Sprache-zu-Text:</strong> <strong>$0.09</strong></li>
    <li><strong>Notizenerstellung:</strong> <strong>$0.0111</strong></li>
    <li><strong>Gesamt:</strong> Ungefähr <strong>$0.101</strong> pro Konsultation.</li>
  </ul>
</div>
<h2>Monatliche Kostenschätzungen</h2>
<div style="margin-left:20px;">
  Angenommen, Sie führen 20 Konsultationen pro Tag durch, 4 Tage pro Woche, über 4 Wochen pro Monat (20 × 4 × 4 = <strong>320 Konsultationen</strong> pro Monat):
  <ol>
    <li>
      <strong>Nur Sprache-zu-Text</strong> (mit Notizenerstellung über Ihr eigenes ChatGPT-Konto, das praktisch kostenlos ist):
      <div style="margin-left:20px;">Monatliche Kosten = 320 × $0.09 = <strong>$28.80</strong>.</div>
    </li>
    <li>
      <strong>Verwendung sowohl von Sprache-zu-Text als auch von Notizenerstellung:</strong>
      <div style="margin-left:20px;">Monatliche Kosten = 320 × $0.101 ≈ <strong>$32.32</strong>.</div>
    </li>
  </ol>
</div>
<h2>Alternative Option für die Notizenerstellung</h2>
<div style="margin-left:20px;">
  Wenn Sie bereits über ein OpenAI-Konto verfügen, können Sie die Notizenerstellung über ChatGPT in Ihrem eigenen Profil nutzen – dies ist praktisch kostenlos. In diesem Fall fallen für die Nutzung dieser Web-App nur die Kosten für Sprache-zu-Text an.
</div>
<h2>Nutzungsmöglichkeiten und Flexibilität</h2>
<div style="margin-left:20px;">
  Im Gegensatz zu Anbietern, die ein monatliches Abonnement erfordern, zahlen Sie nur für die tatsächliche Nutzung. Wenn Sie einen freien Tag nehmen, in den Urlaub fahren oder eine Phase ohne Aktivitäten haben, sind Ihre Kosten gleich null. Selbst wenn Sie den Dienst täglich für alle Patientenkonsultationen nutzen, bleiben die Kosten pro Konsultation deutlich niedriger als bei anderen Anbietern.
</div>
<hr>
<h2>Vorteil der direkten Verbindung</h2>
<div style="margin-left:20px;">
  Unsere Web-App verbindet Sie direkt mit der OpenAI API – keine Zwischenhändler, keine zusätzlichen Gebühren. Diese direkte Verbindung bedeutet, dass Sie nur für die tatsächlichen KI-Verarbeitungskosten zahlen, was unseren Dienst zu einer der kostengünstigsten Lösungen für Sprache-zu-Text und Notizenerstellung macht, die heute verfügbar sind.
</div>`,
};

export const transcribeTranslations = {
  pageTitle: "Transkriptionstool mit Anzeigen und Guide-Übersicht",
  openaiUsageLinkText: "Übersicht über OpenAI-Nutzung",
  btnFunctions: "Funktionen",
  btnGuide: "Guide",
  recordingAreaTitle: "Aufnahmebereich",
  recordTimer: "Aufnahmetimer: 0 Sek",
  transcribeTimer: "Abschlusstimer: 0 Sek",
  transcriptionPlaceholder: "Das Transkriptionsergebnis erscheint hier...",
  startButton: "Aufnahme starten",
  stopButton: "Stoppen/Abschließen",
  pauseButton: "Aufnahme pausieren",
  statusMessage: "Willkommen! Klicken Sie auf 'Aufnahme starten', um zu beginnen.",
  noteGenerationTitle: "Notizenerstellung",
  generateNoteButton: "Notiz generieren",
  noteTimer: "Notiz-Timer: 0 Sek",
  generatedNotePlaceholder: "Die generierte Notiz erscheint hier...",
  customPromptTitle: "Benutzerdefinierte Aufforderung",
  promptSlotLabel: "Aufforderungsplatz:",
  customPromptPlaceholder: "Benutzerdefinierte Aufforderung hier eingeben",
  adUnitText: "Ihre Anzeige hier",
  guideHeading: "Guide & Instruktionen",
  guideText: `Willkommen beim Whisper Transkriptionstool. Diese Anwendung ermöglicht es medizinischen Fachkräften, Therapeuten und anderen, Konsultationen aufzunehmen und zu transkribieren sowie professionelle Notizen mithilfe eines KI-gestützten Notizgenerators zu erstellen.<br><br>
<strong>So verwenden Sie die Funktionen:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf "Aufnahme starten", um mit der Audioaufnahme zu beginnen. Das Audio wird über den MediaStreamTrackProcessor (mithilfe von WebCodecs) erfasst und bis zu 40 Sekunden lang gesammelt, bevor es als eigenständige WAV-Datei verpackt wird.</li>
  <li><strong>Abschluss:</strong> Nachdem Sie auf "Stoppen/Abschließen" geklickt haben, endet die Aufnahme. Eine letzte Aufnahmephase von 2 Sekunden sammelt verbleibendes Audio, bevor der finale Chunk verarbeitet wird. Der Abschlusstimer läuft, bis die vollständige Transkription empfangen wurde.</li>
  <li><strong>Notizenerstellung:</strong> Nach der Transkription klicken Sie auf "Notiz generieren", um eine Notiz basierend auf Ihrer Transkription und der benutzerdefinierten Aufforderung zu erstellen.</li>
  <li><strong>Benutzerdefinierte Aufforderung:</strong> Wählen Sie auf der rechten Seite einen Aufforderungsplatz (1–10) und geben Sie Ihre benutzerdefinierte Aufforderung ein. Ihre Aufforderung wird automatisch gespeichert und mit Ihrem API-Schlüssel verknüpft.</li>
  <li><strong>Guide:</strong> Nutzen Sie die Schaltflächen "Funktionen" und "Guide", um zwischen der Funktionsansicht und dieser Anleitung zu wechseln.</li>
</ul>
Bitte klicken Sie auf "Funktionen", um zur Hauptoberfläche zurückzukehren.`,
};
