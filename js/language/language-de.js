export const indexTranslations = {
  pageTitle: "Whisper Klinische Transkription",
  headerTitle: "Whisper Klinische Transkription",
  headerSubtitle: "Fortschrittliche KI-gestützte Sprach-zu-Text-Transkription und Notizenerstellung für medizinische Konsultationen",
  startText: "Um zu beginnen, geben Sie bitte Ihren OpenAI API-Schlüssel ein:",
  apiPlaceholder: "Geben Sie hier den API-Schlüssel ein",
  enterButton: "Transkriptionstool öffnen",
  guideButton: "API-Anleitung – So nutzen Sie es",
  securityButton: "Sicherheit",
  aboutButton: "Über",
  adRevenueMessage: "Da diese Website kostenlos genutzt werden kann und ausschließlich auf Werbeeinnahmen angewiesen ist, stimmen Sie bitte personalisierter Werbung zu, um den Dienst zu unterstützen.",
  securityModalHeading: "Sicherheitsinformationen",
  securityModalText: `Ihre Privatsphäre und die Sicherheit von Patientendaten haben höchste Priorität. Um die Vertraulichkeit der Daten zu gewährleisten:<br><br>
- <strong>Datenverschlüsselung:</strong> Alle vom System verarbeiteten Daten werden mit branchenüblichen Verschlüsselungsmethoden gesichert. Transkripte und Notizen sind ausschließlich mit Ihrem verschlüsselten persönlichen API-Schlüssel und dem verwendeten Gerät verknüpft, sodass nur Sie Zugriff auf die generierten Inhalte haben.<br><br>
- <strong>Automatische Löschung:</strong> Sobald ein Transkript oder eine Notiz erstellt und auf Ihrem Bildschirm angezeigt wird, wird es automatisch und unwiderruflich innerhalb von 2 Minuten von den Servern gelöscht.<br><br>
- <strong>Schutz vor unbefugtem Zugriff:</strong> Selbst wenn es zu unbefugtem Zugriff auf Ihren API-Schlüssel kommen sollte, bleiben die Daten verschlüsselt und durch gerätespezifische Marker gesichert, wodurch die Informationen unzugänglich bleiben.<br><br>
- <strong>GDPR-konformes Hosting:</strong> Alle Backend-Prozesse laufen auf dedizierten Microsoft Azure-Servern in der EU und entsprechen vollständig den GDPR-Vorschriften.<br><br>
Seien Sie versichert, dass strenge Sicherheitsmaßnahmen gewährleisten, dass alle patientenbezogenen Daten sicher, vertraulich und vollständig unter Ihrer Kontrolle bleiben.`,
  aboutModalHeading: "Über dieses Projekt",
  aboutModalText: `Ich bin ein norwegischer Hausarzt, der schon immer ein Interesse an technologischen Fortschritten, insbesondere im Bereich der künstlichen Intelligenz, hatte und die Entwicklungen der KI im Gesundheitswesen aufmerksam verfolgt hat.<br><br>
Als ich erstmals von Unternehmen erfuhr, die Sprach-zu-Text-Dienste für medizinische Konsultationen in Norwegen anboten, war ich begeistert. Kollegen und Online-Bewertungen lobten diese Dienste und hoben die erheblichen Verbesserungen in Effizienz und Arbeitsabläufen hervor. Bei weiterer Recherche war ich jedoch überrascht, wie viel diese Unternehmen für ihre Dienstleistungen verlangten – insbesondere, wenn man bedenkt, dass die tatsächlichen Kosten der Technologie nur einen Bruchteil ihrer Preise ausmachen.<br><br>
Motiviert durch diese Erkenntnis entwickelte ich zunächst für den persönlichen Gebrauch meine eigene Sprach-zu-Text-Lösung. Nachdem ich festgestellt hatte, wie effektiv und kosteneffizient sie war, entschied ich mich, meine Lösung online zugänglich zu machen – und dabei die gleiche Geschwindigkeit, Genauigkeit und Qualität wie Premium-Dienste zu bieten, jedoch ohne hohe Gebühren.<br><br>
Im Gegensatz zu kommerziellen Anbietern markiert diese Plattform die Kosten nicht auf und erhebt keine unnötigen Gebühren.<br>
• Stattdessen zahlen Sie direkt an OpenAI – das heißt, Sie greifen direkt auf die Quelle der Technologie zu, ohne dass Zwischenhändler einen zusätzlichen Anteil nehmen.<br>
• Dadurch ist es die günstigste Option, die gleichzeitig erstklassige Qualität beibehält.<br><br>
Ich bin der Meinung, dass die von einigen dieser Unternehmen angebotenen Dienste, obwohl nützlich, im Vergleich zu dem, was sie tatsächlich bieten, überteuert sind. Viele meiner Kollegen – die täglich in der Patientenversorgung hart arbeiten – zahlen letztlich erheblich mehr als nötig, um Zugang zu einem Werkzeug zu erhalten, das für jeden erschwinglich sein sollte.<br><br>
Diese Website ist vollständig kostenlos – Ihre einzigen Kosten sind die direkten OpenAI-Nutzungsgebühren für Transkriptionen.<br>
• Keine monatlichen Gebühren, keine Abonnements, keine Verpflichtungen – Sie zahlen nur für die von Ihnen durchgeführten Aufgaben.<br>
• Sie bestimmen, wie viel Sie ausgeben, indem Sie selbst entscheiden, wie viel Sie auf Ihre OpenAI-Wallet überweisen.<br><br>
Das Einzige, was ich verlange, ist die Akzeptanz von Werbung, die dazu beiträgt, die Backend-Serverkosten zu decken.<br>
Je mehr Menschen die Website nutzen, desto höher werden die Hosting- und Betriebskosten, und die Werbeeinnahmen stellen sicher, dass ich sie kostenlos betreiben kann.`,
  guideModalHeading: "Einrichtung Ihrer OpenAI API für Whisper Klinische Transkription",
  guideModalText: `Um diese Webapp zu nutzen, müssen Sie zunächst ein OpenAI API-Profil erstellen, einen API-Schlüssel generieren und Ihre OpenAI-Wallet aufladen. Anschließend kopieren Sie Ihren API-Schlüssel und fügen ihn in das vorgesehene Feld ein. Sobald Sie die Eingabetaste drücken, speichert die Webapp den API-Schlüssel vorübergehend für Ihre Sitzung – dieser Schlüssel verbindet Sie mit den OpenAI-Servern, sodass die Sprach-zu-Text-Transkription und die Notizenerstellung funktionieren. Bitte beachten Sie, dass Sie für jede durchgeführte Aufgabe sofort belastet werden. Für weitere Informationen zu den Kosten lesen Sie bitte den Abschnitt "Kosten" auf der Startseite.
<br><br>
<strong>1. Erstellen Sie Ihr OpenAI API-Profil</strong><br>
Zunächst müssen Sie ein Profil auf der OpenAI API-Plattform erstellen. Dieses Profil dient als Ihr Konto zur Verwaltung von API-Schlüsseln und Abrechnungen. Um loszulegen, besuchen Sie die <a href="https://platform.openai.com/signup" style="color:blue;">OpenAI API-Anmeldung</a>. Folgen Sie den Anweisungen, indem Sie Ihre E-Mail-Adresse angeben, ein Passwort festlegen und Ihr Konto verifizieren. Nach der Registrierung haben Sie Zugriff auf Ihr Dashboard.
<br><br>
<strong>2. Generieren Sie einen API-Schlüssel</strong><br>
Nachdem Sie Ihr Profil erstellt haben, generieren Sie einen API-Schlüssel, indem Sie zur Seite <a href="https://platform.openai.com/account/api-keys" style="color:blue;">API-Schlüssel-Verwaltung</a> navigieren. Klicken Sie auf die Schaltfläche, um einen neuen API-Schlüssel zu erstellen. Wichtig: Sie sehen Ihren API-Schlüssel nur einmal. Kopieren Sie ihn sofort und bewahren Sie ihn sicher auf (z. B. in einer Textdatei) für die zukünftige Verwendung. Wenn Sie den Schlüssel verlieren oder vermuten, dass er kompromittiert wurde, löschen Sie ihn aus Ihrem Konto und erstellen Sie einen neuen.
<br><br>
<strong>3. Laden Sie Ihre OpenAI-Wallet auf</strong><br>
Damit die Webapp funktioniert, muss Ihre OpenAI-Wallet über ausreichende Mittel verfügen. Besuchen Sie die Seite <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Abrechnung & Zahlung</a>, um Geld hinzuzufügen. Sie können jederzeit einen beliebigen Betrag überweisen. Solange ausreichend Mittel vorhanden sind, können Sie die Website nutzen – jede Aufgabe wird sofort berechnet.
<br><br>
<strong>Hinweis zur Sitzungs-Sicherheit</strong><br>
Wenn Sie sich durch Eingabe Ihres API-Schlüssels anmelden, wird dieser nur vorübergehend in Ihrer Browser-Sitzung gespeichert. Das bedeutet, wenn Sie die Website verlassen, Ihren Browser schließen oder Ihren Computer ausschalten, wird der API-Schlüssel nicht gespeichert. Beim nächsten Besuch der Webapp müssen Sie Ihren API-Schlüssel erneut eingeben, um die Sicherheit Ihres Schlüssels zu gewährleisten.`,
  priceButton: "Preis",
  priceModalHeading: "Kosteninformationen",
  priceModalText: `# Kosteninformationen

## Preisgestaltung für Sprach-zu-Text  
   - **Kosten:** $0.006 pro Minute.  
     *Beispiel:* Eine 15-minütige Konsultation kostet 15 × $0.006 = **$0.09** pro Konsultation.

## Preisgestaltung für die Notizenerstellung  
   - **Token-basierte Preisgestaltung:**  
     - **Eingabe (Transkription + Prompt):** $10 pro 1.000.000 Tokens (d.h. $0.00001 pro Token).  
     - **Ausgabe (generierte Notiz):** $30 pro 1.000.000 Tokens (d.h. $0.00003 pro Token).

       #### Beispielrechnung für eine Konsultation (nur Notizenerstellung)
       1. **Berechnung der Eingabe:**  
          - Angenommen, die Transkription der Konsultation umfasst etwa **700 Wörter** und Sie fügen einen **30-Wörter-Prompt** hinzu.  
          - Gesamtanzahl der Wörter = 700 + 30 = **730 Wörter**.  
          - Geschätzte Tokens = 730 × 0.75 ≈ **547,5 Tokens**.  
          - Eingabekosten = 547,5 Tokens × $0.00001 ≈ **$0.0055**.
       2. **Berechnung der Ausgabe:**  
          - Angenommen, die generierte Notiz umfasst etwa **250 Wörter**.  
          - Geschätzte Tokens = 250 × 0.75 ≈ **187,5 Tokens**.  
          - Ausgabekosten = 187,5 Tokens × $0.00003 ≈ **$0.0056**.
       3. **Gesamtkosten der Notizenerstellung:**  
          - Gesamtkosten ≈ $0.0055 + $0.0056 = **$0.0111** pro Konsultation.

## Ungefähre Gesamtkosten pro Konsultation  
(für eine 15-minütige Konsultation/Aufzeichnung, bei Nutzung beider Funktionen)  
   - **Sprach-zu-Text:** **$0.09**  
   - **Notizenerstellung:** **$0.0111**  
   - **Gesamt:** Ungefähr **$0.101** pro Konsultation.

## Monatliche Kostenschätzungen  
Angenommen, Sie führen 20 Konsultationen pro Tag durch, 4 Tage pro Woche, über 4 Wochen im Monat (20 × 4 × 4 = **320 Konsultationen** pro Monat):

   1. **Nur Sprach-zu-Text** (mit Notizenerstellung über Ihr eigenes ChatGPT-Konto, das im Grunde kostenlos ist):  
      - Monatliche Kosten = 320 × $0.09 = **$28.80**.
   2. **Sprach-zu-Text und Notizenerstellung:**  
      - Monatliche Kosten = 320 × $0.101 ≈ **$32.32**.

## Alternative Option für die Notizenerstellung  
   Falls Sie bereits ein OpenAI-Konto besitzen, können Sie die Notizenerstellung über ChatGPT in Ihrem eigenen Profil nutzen – was im Grunde kostenlos ist. In diesem Fall entstehen Ihnen nur die Kosten für den Sprach-zu-Text-Dienst bei Nutzung dieser Webapp.

## Flexibilität in der Nutzung  
   Im Gegensatz zu Anbietern, die ein monatliches Abonnement verlangen, zahlen Sie nur pro Nutzung. Wenn Sie einen Tag frei nehmen, in den Urlaub fahren oder eine Zeit ohne Aktivität haben, betragen Ihre Kosten null. Selbst wenn Sie den Dienst täglich für alle Ihre Patienten konsultationen nutzen, bleiben die Kosten pro Nutzung deutlich niedriger im Vergleich zu anderen Anbietern.

--- 

**Vorteil der direkten Verbindung**  
Unsere Webapp verbindet Sie direkt mit der OpenAI API – kein Zwischenhändler, keine zusätzlichen Gebühren. Diese direkte Verbindung bedeutet, dass Sie nur für die tatsächlichen KI-Verarbeitungskosten zahlen, was unseren Service zu einer der erschwinglichsten Lösungen für Sprach-zu-Text und Notizenerstellung macht.`,
};

export const transcribeTranslations = {
  pageTitle: "Transkriptionstool mit Werbung und Anleitung",
  openaiUsageLinkText: "Kostenübersicht",
  btnFunctions: "Funktionen",
  btnGuide: "Anleitung",
  recordingAreaTitle: "Aufnahmebereich",
  recordTimer: "Aufnahme-Timer: 0 Sek.",
  transcribeTimer: "Fertigstellungs-Timer: 0 Sek.",
  transcriptionPlaceholder: "Das Transkriptionsergebnis erscheint hier...",
  startButton: "Aufnahme starten",
  stopButton: "Stoppen/Abschließen",
  pauseButton: "Aufnahme pausieren",
  statusMessage: "Willkommen! Klicken Sie auf „Aufnahme starten“, um zu beginnen.",
  noteGenerationTitle: "Notizenerstellung",
  generateNoteButton: "Notiz generieren",
  noteTimer: "Notiz-Erstellungstimer: 0 Sek.",
  generatedNotePlaceholder: "Die generierte Notiz erscheint hier...",
  customPromptTitle: "Individueller Prompt",
  promptSlotLabel: "Prompt-Slot:",
  customPromptPlaceholder: "Geben Sie hier Ihren individuellen Prompt ein",
  adUnitText: "Ihre Anzeige hier",
  guideHeading: "Anleitung & Hinweise",
  guideText: `Willkommen beim Whisper Transkriptionstool. Diese Anwendung ermöglicht es medizinischen Fachkräften, Therapeuten und anderen Praktikern, Konsultationen aufzunehmen und zu transkribieren sowie professionelle Notizen mithilfe eines KI-gestützten Notizgenerators zu erstellen.<br><br>
<strong>So verwenden Sie die Funktionen:</strong>
<ul>
  <li><strong>Aufnahme:</strong> Klicken Sie auf „Aufnahme starten“, um mit der Audioaufnahme zu beginnen. Alle 40 Sekunden wird ein Abschnitt der Aufnahme automatisch zur Transkription an die OpenAI-Server gesendet. Die Transkripte werden nacheinander im Ausgabefeld für das Transkript angezeigt.</li>
  <li><strong>Fertigstellung:</strong> Nach Klick auf „Stoppen/Abschließen“ endet die Aufnahme. Der Fertigstellungstimer zählt, bis das vollständige Transkript empfangen wurde. Dies dauert in der Regel zwischen 5 und 10 Sekunden.</li>
  <li><strong>Notizenerstellung:</strong> Nach der Transkription klicken Sie auf „Notiz generieren“, um eine Notiz basierend auf Ihrem Transkript und Ihrem individuellen Prompt zu erstellen.</li>
  <li><strong>Individueller Prompt:</strong> Wählen Sie rechts einen Prompt-Slot (1–10) aus und geben Sie Ihren individuellen Prompt ein. Ihr Prompt wird automatisch gespeichert und mit Ihrem API-Schlüssel verknüpft.</li>
  <li><strong>Anleitungs-Umschaltung:</strong> Verwenden Sie die Schaltflächen „Funktionen“ und „Anleitung“, um zwischen der Funktionsansicht und dieser Anleitung zu wechseln.</li>
</ul>
Bitte klicken Sie auf „Funktionen“, um zur Hauptoberfläche zurückzukehren.`,
};
