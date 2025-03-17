// js/language-de.js

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
    <li><strong>Automatische Löschung:</strong> Sobald eine Transkription oder Notiz generiert und angezeigt wird, wird sie innerhalb von 2 Minuten automatisch und unwiderruflich von den Servern gelöscht.</li>
    <li><strong>Schutz vor unbefugtem Zugriff:</strong> Selbst bei unbefugtem Zugriff auf Ihren API-Schlüssel bleiben die Daten verschlüsselt und durch gerätespezifische Marker geschützt, sodass die Informationen nicht zugänglich sind.</li>
    <li><strong>GDPR-konformes Hosting:</strong> Alle Backend-Prozesse laufen auf dedizierten Microsoft Azure-Servern innerhalb der EU, die vollständig den GDPR-Richtlinien entsprechen.</li>
  </ul>
</div>
Seien Sie versichert, dass strenge Sicherheitsmaßnahmen gewährleisten, dass alle patientenbezogenen Daten sicher, vertraulich und ausschließlich unter Ihrer Kontrolle bleiben.`,
  
  aboutModalHeading: "Über dieses Projekt",
  aboutModalText: `Ich bin ein norwegischer Hausarzt, der schon immer ein Interesse an technologischen Fortschritten – insbesondere im Bereich der künstlichen Intelligenz – hatte, und ich verfolge die Entwicklungen in der Gesundheitsbranche sehr genau.<br><br>
Als ich erstmals von Unternehmen erfuhr, die Sprache-zu-Text-Dienste für medizinische Konsultationen in Norwegen anbieten, war ich sehr begeistert. Kollegen und Online-Bewertungen lobten diese Dienste und hoben deutliche Verbesserungen in Effizienz und Arbeitsabläufen hervor. Bei weiterer Recherche war ich jedoch überrascht, wie viel diese Unternehmen für ihre Leistungen verlangten – insbesondere, da die tatsächlichen Kosten der Technologie nur einen Bruchteil dieser Preise ausmachen.<br><br>
Angetrieben von dieser Erkenntnis entwickelte ich zunächst für den persönlichen Gebrauch meine eigene Sprache-zu-Text-Lösung. Nachdem ich sah, wie effektiv und kostengünstig sie war, entschied ich mich, meine Lösung online zugänglich zu machen – sie bietet dieselbe Geschwindigkeit, Genauigkeit und Qualität wie Premium-Dienste, jedoch ohne die hohen Gebühren.<br><br>
Ich bin überzeugt, dass die von einigen dieser Unternehmen angebotenen Dienstleistungen, so nützlich sie auch sein mögen, im Verhältnis zu dem, was sie tatsächlich liefern, überteuert sind. Viele meiner Kollegen – die täglich in der Patientenversorgung tätig sind – zahlen letztlich deutlich mehr als nötig, nur um Zugang zu einem Werkzeug zu erhalten, das für jeden erschwinglich sein sollte.<br><br>
Diese Website ist vollkommen kostenlos – die einzige Gebühr, die anfällt, ist die direkte Nutzungsgebühr von OpenAI für die Transkriptionen.<br>
• Keine monatlichen Gebühren, keine Abonnements, keine Verpflichtungen – Sie zahlen nur für die Aufgaben, die Sie ausführen.<br>
• Sie bestimmen selbst, wie viel Sie ausgeben, indem Sie entscheiden, wie viel Sie in Ihre OpenAI-Wallet überweisen.<br><br>
Das Einzige, worum ich bitte, ist, dass Sie Werbung akzeptieren, die dazu beiträgt, die Kosten der Backend-Server zu decken.<br>
Je mehr Menschen diese Website nutzen, desto höher werden die Hosting- und Betriebskosten, und die Werbeeinnahmen ermöglichen es mir, den Service kostenlos und funktionsfähig zu halten, ohne den Nutzern zusätzliche Kosten aufzubürden.`,
  
  guideModalHeading: "API-Guide – So nutzen Sie es",
  guideModalText: `Um diese Web-App zu verwenden, müssen Sie zunächst ein Profil auf der OpenAI API-Plattform erstellen, einen API-Schlüssel generieren und Ihr OpenAI-Konto aufladen. Ihr API-Schlüssel wird dann in das vorgesehene Feld kopiert und eingefügt. Sobald Sie Enter drücken, wird der Schlüssel vorübergehend für Ihre Sitzung gespeichert – dieser Schlüssel verbindet Sie mit den OpenAI-Servern, sodass die Sprache-zu-Text-Transkription und die Notizenerstellung funktionieren. Bitte beachten Sie, dass Sie für jede ausgeführte Aufgabe sofort belastet werden. Für weitere Informationen zu den Kosten konsultieren Sie bitte den Abschnitt „Cost Information“ auf der Startseite.<br><br>
<strong>1. Erstellen Sie Ihr OpenAI API-Profil</strong><br>
Um zu beginnen, müssen Sie ein Profil auf der OpenAI API-Plattform erstellen. Dieses Profil dient als Ihr Konto für die Verwaltung von API-Schlüsseln und die Abrechnung. Besuchen Sie die Seite <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API Signup</a> und folgen Sie den Anweisungen, indem Sie Ihre E-Mail-Adresse angeben, ein Passwort festlegen und Ihr Konto verifizieren. Nach der Registrierung erhalten Sie Zugriff auf Ihr Dashboard.<br><br>
<strong>2. Generieren Sie einen API-Schlüssel</strong><br>
Nachdem Sie Ihr Profil erstellt haben, generieren Sie einen API-Schlüssel, indem Sie zur Seite der API-Schlüsselverwaltung (<a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-Schlüsselverwaltung</a>) gehen. Klicken Sie auf den Button, um einen neuen API-Schlüssel zu erstellen. Wichtig: Sie werden Ihren API-Schlüssel nur einmal sehen, also kopieren Sie ihn umgehend und bewahren Sie ihn sicher auf (z. B. in einer Textdatei). Falls Sie den Schlüssel verlieren oder vermuten, dass er kompromittiert wurde, löschen Sie ihn aus Ihrem Konto und generieren Sie einen neuen.<br><br>
<strong>3. Laden Sie Ihr OpenAI-Konto auf</strong><br>
Damit die Web-App funktioniert, muss Ihr OpenAI-Konto ausreichend finanziert sein. Besuchen Sie die Seite <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a>, um Geldmittel hinzuzufügen. Sie können beliebige Beträge jederzeit überweisen. Solange genügend Mittel vorhanden sind, können Sie den Service nutzen – jede Aufgabe wird sofort abgerechnet.<br><br>
<strong>Sitzungssicherheits-Erinnerung</strong><br>
Wenn Sie sich mit Ihrem API-Schlüssel anmelden, wird dieser nur vorübergehend in Ihrer Browsersitzung gespeichert. Das bedeutet, wenn Sie die Website verlassen, den Browser schließen oder Ihren Computer ausschalten, wird der Schlüssel nicht dauerhaft gespeichert. Sie müssen ihn bei der nächsten Nutzung erneut eingeben, um die Sicherheit Ihres Schlüssels zu gewährleisten.`,
  
  priceButton: "Price",
  priceModalText: `<h1 style="font-size:24px;">Kosteninformation</h1>

<h2 style="font-size:20px;">Preisgestaltung für Sprache-zu-Text</h2>
<p style="font-size:16px;">
   <strong>Kosten:</strong> 0,006 $ pro Minute.<br>
   <em>Beispiel:</em> Eine 15-minütige Konsultation kostet 15 × 0,006 $ = <strong>0,09 $</strong> pro Konsultation.
</p>

<h2 style="font-size:20px;">Preisgestaltung für die Notizenerstellung</h2>
<p style="font-size:16px;">
   <strong>Token-basierte Preisgestaltung:</strong><br>
   - <strong>Eingabe (Transkription + Prompt):</strong> 10 $ pro 1.000.000 Tokens (d.h. 0,00001 $ pro Token).<br>
   - <strong>Ausgabe (generierte Notiz):</strong> 30 $ pro 1.000.000 Tokens (d.h. 0,00003 $ pro Token).
</p>

<h4 style="font-size:18px;">Beispielrechnung für eine Konsultation (nur Notizenerstellung)</h4>
<p style="font-size:16px;">
   1. <strong>Berechnung der Eingabe:</strong><br>
      - Angenommen, die Transkription der Konsultation umfasst etwa <strong>700 Wörter</strong> und es wird ein Prompt von <strong>30 Wörtern</strong> hinzugefügt.<br>
      - Gesamte Wörter = 700 + 30 = <strong>730 Wörter</strong>.<br>
      - Geschätzte Tokens = 730 × 0,75 ≈ <strong>547,5 Tokens</strong>.<br>
      - Eingabekosten = 547,5 Tokens × 0,00001 $ ≈ <strong>0,0055 $</strong>.
</p>
<p style="font-size:16px;">
   2. <strong>Berechnung der Ausgabe:</strong><br>
      - Angenommen, die generierte Notiz umfasst etwa <strong>250 Wörter</strong>.<br>
      - Geschätzte Tokens = 250 × 0,75 ≈ <strong>187,5 Tokens</strong>.<br>
      - Ausgabekosten = 187,5 Tokens × 0,00003 $ ≈ <strong>0,0056 $</strong>.
</p>
<p style="font-size:16px;">
   3. <strong>Gesamtkosten für die Notizenerstellung:</strong><br>
      - Kombinierte Kosten ≈ 0,0055 $ + 0,0056 $ = <strong>0,0111 $</strong> pro Konsultation.
</p>

<h2 style="font-size:20px;">Ungefähre Gesamtkosten pro Konsultation</h2>
<p style="font-size:16px;">
   (für eine 15-minütige Konsultation/Aufzeichnung, unter Nutzung beider Funktionen)<br>
   - <strong>Sprache-zu-Text:</strong> <strong>0,09 $</strong><br>
   - <strong>Notizenerstellung:</strong> <strong>0,0111 $</strong><br>
   - <strong>Gesamt:</strong> Etwa <strong>0,101 $</strong> pro Konsultation.
</p>

<h2 style="font-size:20px;">Monatliche Kostenschätzungen</h2>
<p style="font-size:16px;">
   Angenommen, Sie führen 20 Konsultationen pro Tag, 4 Tage pro Woche, über 4 Wochen im Monat durch (20 × 4 × 4 = <strong>320 Konsultationen</strong> pro Monat):<br><br>
   1. <strong>Nur Sprache-zu-Text</strong> (mit Notizenerstellung über Ihr eigenes ChatGPT-Konto, das im Grunde kostenlos ist):<br>
      - Monatliche Kosten = 320 × 0,09 $ = <strong>28,80 $</strong>.<br><br>
   2. <strong>Sowohl Sprache-zu-Text als auch Notizenerstellung:</strong><br>
      - Monatliche Kosten = 320 × 0,101 $ ≈ <strong>32,32 $</strong>.
</p>

<h2 style="font-size:20px;">Alternative Option zur Notizenerstellung</h2>
<p style="font-size:16px;">
   Wenn Sie bereits ein OpenAI-Konto besitzen, können Sie die Notizenerstellung über ChatGPT in Ihrem eigenen Profil nutzen – was im Grunde kostenlos ist. In diesem Fall fallen nur die Kosten für Sprache-zu-Text an, wenn Sie diese Webapp verwenden.
</p>

<h2 style="font-size:20px;">Nutzungsflexibilität</h2>
<p style="font-size:16px;">
   Im Gegensatz zu Anbietern, die ein monatliches Abonnement erfordern, zahlen Sie nur für die tatsächliche Nutzung. Wenn Sie einen Tag freinehmen, in den Urlaub fahren oder eine Phase ohne Aktivität haben, betragen Ihre Kosten null. Selbst wenn Sie den Service täglich für alle Ihre Konsultationen nutzen, bleiben die Kosten pro Konsultation deutlich niedriger als bei anderen Anbietern.
</p>

<hr>

<p style="font-size:16px;">
   <strong>Vorteil der direkten Verbindung</strong><br>
   Unsere Webapp verbindet Sie direkt mit der OpenAI-API – ohne Zwischenhändler, ohne zusätzliche Gebühren. Diese direkte Verbindung bedeutet, dass Sie nur für die tatsächlichen Kosten der KI-Verarbeitung zahlen, was unseren Service zu einer der preisgünstigsten Lösungen für Sprache-zu-Text und Notizenerstellung macht.
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
