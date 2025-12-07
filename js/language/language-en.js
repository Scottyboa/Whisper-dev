export const indexTranslations = {
  pageTitle: "Transcribe Notes",
  headerTitle: "Transcribe Notes",
  headerSubtitle: "Advanced AI-Powered Speech-to-Text and Clinical Note Generation for Healthcare Consultations",
  startText: "You can now also choose between different models from various providers. Dont have an API-key yet? Click on «API guide- How to Get» for easy instructions.",
  apiPlaceholder: "Enter OpenAI API Key here",
  enterButton: "Enter Transcription Tool",
  guideButton: "API guide - How to use",
  securityButton: "Security",
  aboutButton: "About",
  adRevenueMessage: "As this website is free to use and relies solely on ad revenue, please consent to ads to help support the service.",
  securityModalHeading: "Privacy",
securityModalText: `
<strong>Privacy and Data Processing</strong><br><br>
This web app is designed as a tool for speech-to-text and note generation. It is your full responsibility as a healthcare professional/data controller to ensure that all use complies with GDPR, the Health Personnel Act, and the Norwegian “Normen” for information security.<br><br>

You alone are responsible for ensuring that the use of this app meets all requirements under:<br>
- GDPR<br>
- The Health Personnel Act<br>
- The Norwegian Information Security Norm (“Normen”)<br><br>

This includes, among other things:<br>
- Entering necessary agreements (DPAs)<br>
- Performing thorough risk assessments (DPIA and TIA)<br><br>

– More information about this is found further down in this text.<br><br>

The developer of this web app assumes no responsibility for your use or lack of compliance. This is not legal advice; you must involve a data protection officer/legal advisor as needed.<br><br>

<hr><br>

<strong>1. How does the web app work?</strong><br>
- Records audio through the browser’s recording functionality.<br>
- Processes audio in the browser’s memory (RAM).<br>
- Uploads the audio file via secure HTTPS to the selected speech-to-text provider (e.g., OpenAI, Soniox, Lemonfox, Mistral/Voxtral, Deepgram) using your own API key from that provider.<br>
- Sends the transcription (and any additional prompt/text) to the selected text model (e.g., GPT-5.1, GPT-4o, Gemini 3, Mistral Large, Lemonfox LLM) via their API, also using your own API key.<br>
- Your browser receives the draft note directly from the provider through a secure/encrypted connection.<br><br>

Your API keys are stored only temporarily in the browser’s memory (SessionStorage). When you close the app or browser, the keys are deleted. To use the web app again, you must paste the keys again. This provides an additional layer of security against unauthorized access.<br><br>

The web app has no server that stores audio or text; all communication is directly between your browser and the services you choose.<br><br>

<hr><br>

<strong>2. Your own API keys are required</strong><br>
All communication with the model providers (OpenAI, Google Gemini, Soniox, Lemonfox, Deepgram, Mistral, etc.) happens directly from your browser using your personal API keys.<br><br>

The developer of this web app has no access to your API keys or the content you send to the providers.<br><br>

<hr><br>

<strong>3. Data Processing Agreements (DPA) with providers</strong><br>
If you will use API services to process personal data (especially patient data), you are advised to enter a Data Processing Agreement (DPA) with each provider you actually use, for example:<br>
- OpenAI (speech-to-text and text generation)<br>
- Google (Gemini 3 via Google AI Studio)<br>
- Soniox (speech-to-text)<br>
- Deepgram (speech-to-text)<br>
- Mistral (Voxtral for speech-to-text, Mistral Large for text)<br>
- Lemonfox (Whisper v3 speech-to-text and Llama 3-based text models)<br><br>

OpenAI provides a standard DPA and an organization profile where company information is registered. Equivalent agreements and documents exist for other providers.<br><br>

Once DPAs are in place, you/your organization are the data controller, while the providers (OpenAI, Google, Soniox, Mistral, Deepgram, Lemonfox, etc.) are data processors. You must verify that the agreements adequately cover your specific use (healthcare, research, etc.).<br><br>

<hr><br>

<strong>4. DPIA and TIA – required risk assessments</strong><br><br>

<strong>DPIA (Data Protection Impact Assessment)</strong><br>
Required under GDPR Article 35 when new technology is used to process special-category data (such as health data). The purpose is to identify and reduce privacy risks related to the processing.<br><br>

You should, among other things:<br>
- Map which data are processed (audio, text, metadata).<br>
- Describe purpose (clinical documentation, quality, research, etc.).<br>
- Assess risks to patients’ rights and freedoms.<br>
- Decide on technical and organizational measures (encryption, access control, logging, training, etc.).<br><br>

<strong>TIA (Transfer Impact Assessment)</strong><br>
Required when personal data is transferred outside the EEA (e.g., to the USA). The purpose is to document that the transfer still provides a “essentially equivalent” level of protection (Schrems II, GDPR Art. 44–49).<br><br>

You should, among other things:<br>
- Assess relevant laws in the recipient country (e.g., FISA 702, CLOUD Act).<br>
- Compare this with the sensitivity of the data and the technical/contractual measures used (encryption, pseudonymization, SCC, ZDR, EU endpoints, etc.).<br>
- Conclude whether the transfer is acceptable and whether the residual risk is tolerable.<br><br>

Both DPIA and TIA should be completed, documented, and approved before using the web app with real patient data.<br><br>

<hr><br>

<strong>5. Data processing, storage, and “GDPR-friendliness” of different providers</strong><br><br>

Below is a rough overview of how services typically operate today. This may change. You must always check current documentation and agreements from each provider.<br><br>

<strong>Lemonfox (speech-to-text and text generation)</strong><br>
EU-based and markets itself as fully GDPR-compliant.<br>
Speech-to-text (Whisper v3) and Llama 3-based text models are processed in the EU, and they state that audio/text is deleted shortly after processing (no training reuse).<br>
This makes Lemonfox relatively GDPR-friendly for both speech-to-text and text generation, provided you still perform DPIA/TIA and have proper agreements.<br><br>

<strong>Soniox (with EU endpoint)</strong><br>
Soniox offers data residency in both the US and EU.<br>
When a project is configured for the EU region, audio and transcripts are processed within that region; some system data (account/billing data) may still be handled globally.<br>
To use the EU endpoint clinically, you typically must contact Soniox and request EU-project access/API key and documentation. Access may take 1–2 days after contact.<br>
With the EU endpoint enabled, Soniox is a strong GDPR-aligned option for speech-to-text, though DPIA/TIA and DPAs remain required.<br><br>

<strong>Mistral (Voxtral for speech-to-text, Mistral Large for text)</strong><br>
EU-based. API data hosting in the EU by default unless explicitly using US endpoints.<br>
Mistral offers Zero Data Retention (ZDR) on request, meaning data is not retained beyond what is necessary to deliver the response. This may simplify GDPR justification but must be documented in DPIA/TIA.<br>
EU endpoint + ZDR (when granted and configured) makes Mistral one of the most GDPR-friendly options in this app.<br><br>

<strong>Gemini 3 (Google)</strong><br>
Gemini via Google AI Studio / Gemini API with pure API key:<br>
Currently processed on global infrastructure, which may involve transfers outside the EEA. Google is gradually rolling out regional processing and residency features, but you must verify whether your license/plan is truly locked to the EU region.<br>
When EU-locked endpoints become available from Google, the app will be updated to support them.<br><br>

<strong>OpenAI</strong><br>
OpenAI states that API data is not used for training by default, but may be stored temporarily (typically up to ~30 days) for abuse detection and debugging.<br>
OpenAI has introduced data residency in Europe for certain API customers and products, but this requires specific agreements/configurations.<br>
With typical usage in this app, OpenAI calls often go to global (US) endpoints, meaning transfers outside the EEA.<br><br>

Using OpenAI with patient data is often a legal gray zone unless you have:<br>
- a clear DPA,<br>
- documented DPIA/TIA covering the transfer,<br>
- any special arrangements for EU data residency/ZDR if available and activated.<br><br>

<strong>Deepgram (Nova-3)</strong><br>
Historically used global endpoints, but now offers dedicated and EU-specific endpoints.<br>
Using only the default/global endpoint typically means audio is processed outside the EEA.<br>
Deepgram also offers EU-hosted services and various compliance setups, but you must configure the correct endpoint (e.g., api.eu.deepgram.com) and have agreements covering data residency and retention.<br>
As commonly used today, Deepgram—like OpenAI—may involve data transfers outside the EU unless explicitly configured otherwise.<br><br>

<strong>Summary of model options in this app:</strong><br><br>

Relatively GDPR-friendly (with DPA + DPIA/TIA):<br>
- Lemonfox (EU STT + LLM, rapid deletion)<br>
- Soniox with EU endpoint<br>
- Mistral (Voxtral + Mistral Large) with EU hosting and optional ZDR<br><br>

More demanding/“gray zones” for patient data (without special agreements/EU residency/ZDR):<br>
- OpenAI via global endpoints<br>
- Deepgram via global endpoints<br>
- Gemini 3 via global Google AI Studio/Gemini API (no EU lock)<br><br>

In all cases, you/your organization must document compliance with GDPR, the Health Personnel Act, and the Norwegian Information Security Norm.<br><br>

<hr><br>

<strong>6. Preconditions for possible clinical use</strong><br>
Your assessment is decisive: The legality of using this tool with patient data depends entirely on your own thorough assessment of both the app and every provider you connect to (OpenAI, Gemini, Soniox, Lemonfox, Mistral, Deepgram, etc.).<br><br>

Minimum requirements before using patient data:<br>
- Valid DPAs with every provider you use.<br>
- Organization-specific DPIA and TIA that are completed, approved, and conclude acceptable residual risk.<br>
- Clear decision on which models/endpoints may be used for patient data (e.g., limiting to Lemonfox, Soniox EU, Mistral, and/or Gemini with EU region if deemed adequate).<br>
- Responsibility for content: You are responsible for all data sent via your API keys and for verifying the generated note before placing it in a patient record.<br><br>

<hr><br>

<strong>7. Overview of data storage</strong><br><br>

(This describes how the web app handles data; provider-side storage must be verified with each provider.)<br><br>

<strong>Your API keys (OpenAI, Soniox, Gemini, Lemonfox, Deepgram, Mistral, etc.)</strong><br>
- Where stored? SessionStorage in your browser.<br>
- For how long? Until you close the app or browser.<br>
- Who has access? Only you and your browser.<br><br>

<strong>Audio segments during recording</strong><br>
- Where stored? Browser memory (RAM).<br>
- For how long? Only during recording/processing. The app does not store audio permanently.<br>
- Who has access? Only you and your browser before the audio is sent to the selected STT API.<br><br>

<strong>Transcribed text/note drafts at providers</strong><br>
- Where stored? At the selected provider (OpenAI, Google, Soniox, Lemonfox, Mistral, Deepgram, etc.) in their cloud infrastructure.<br>
- For how long? Varies—e.g., OpenAI states data may be stored up to ~30 days for abuse detection; some EU providers (Lemonfox/Mistral with ZDR) delete faster. You must verify each provider’s policy.<br>
- Who has access? You through the API response, and the provider during the technical retention period.<br><br>

<strong>Instructions/Prompts inside the web app</strong><br>
- Where stored? Locally in your browser (LocalStorage/SessionStorage). If you use the same browser, PC, and API key, prompts remain available next time.<br>
- For how long? Until you delete them or clear browser data.<br>
- Who has access? You and your browser.<br><br>

<hr><br>

<strong>8. Source code</strong><br>
The source code is open and runs locally in your browser. There are no hidden backdoors transmitting data to the developer’s servers, other than basic usage statistics like click counts, but no sensitive user information or data you send/receive.<br>
`,

  aboutModalHeading: "About",
  aboutModalText: `This website was created to give healthcare professionals and other users direct access to high-quality speech-to-text and clinical note generation — without unnecessary costs or intermediaries.<br><br>
By using your own API keys for speech-to-text and text-generation providers, you connect directly to the source of the technology. This means you only pay the actual usage cost set by each provider, with no markup or subscription fees from this website.<br><br>
Many existing providers offer similar services but charge significantly more — often many times the real cost of the underlying technology. This platform allows you to use the same models at essentially “wholesale price,” making the cost per consultation extremely low.<br><br>

<strong>Key points:</strong><br>
• No subscription, no account required on this website.<br>
• You pay only the providers directly for what you use (speech-to-text and text generation).<br>
• The website itself is completely free to use.<br><br>

To keep this service free, we greatly appreciate if you allow Google Ads to be displayed. The advertising revenue helps us cover hosting and operational costs, allowing the service to remain available to everyone.`,

  guideModalHeading: "API key - How to Get",
guideModalText: `How to obtain API keys:<br><br>
To use the speech-to-text and note-generation models in this app, you must obtain one or more API keys (OpenAI, Soniox, Google Gemini, Lemonfox, Deepgram, Mistral).<br><br>

<strong>Speech-to-text models in the app:</strong><br>
- OpenAI: gpt-4o-transcribe<br>
- Soniox<br>
- Soniox (speaker labels)<br>
- Lemonfox Speech-to-Text (Whisper v3-based)<br>
- Voxtral Mini<br>
- Deepgram Nova-3<br><br>

<strong>Text generation models in the app:</strong><br>
- GPT-5.1 (streaming)<br>
- GPT-5.1 (non-streaming)<br>
- GPT-4-latest<br>
- Lemonfox text generation (Llama 3-based models)<br>
- Mistral Large<br>
- Gemini 3<br><br>

<strong>OpenAI</strong><br>
– Create an account at OpenAI:<br>
https://platform.openai.com<br><br>
– Generate an API key and add credit to your account<br>
– Store the key securely (locally on your PC, text file, password manager, Dropbox, etc.)<br>
– Paste the key into the field “OpenAI API key” on the front page<br>
– You can now use the OpenAI models in the app:<br>
• Speech-to-text: gpt-4o-transcribe (select “OpenAI” in the Recording Module dropdown on the main page)<br>
• Text generation: chatgpt-4-latest, GPT-5.1<br><br>

<strong>Soniox</strong><br>
– Create an account at Soniox:<br>
https://soniox.com<br><br>
– Generate a Soniox API key and purchase/upload credits (same principle as OpenAI)<br>
– Store the key securely and paste it into “Soniox API key (EU or US)” on the front page<br>
– You can now use Soniox speech-to-text (very high-quality and cost-effective, recommended)<br>
– For EU endpoint (GDPR-friendly): email sales@soniox.com and request an EU API key for clinical doctor–patient use<br>
– On the main page, you can choose between EU and US endpoints in the dropdown when using Soniox<br><br>

<strong>Google Gemini</strong><br>
– Create/log in to an account on Google AI Studio:<br>
https://aistudio.google.com<br><br>
– Generate a Gemini API key<br>
– You normally receive some free credits upon account creation (check inside AI Studio)<br>
– Store the key securely and paste it into “Google Gemini API key” on the front page<br>
– Text model: Gemini 3 (currently one of the best text-generation models available)<br><br>

<strong>Google Vertex (Gemini 2.5 Pro – EU endpoint)</strong><br>
– This is a more advanced setup designed for users who want to run Gemini through Google Cloud / Vertex AI using a regional EU endpoint (such as europe-west1 or europe-west4).<br>
– In short: you create your own Google Cloud project, activate Vertex AI, link it to a billing account, and deploy a small backend function (Cloud Run) which gives you a secure HTTPS URL (https://…run.app).<br>
– In this web app, you paste that URL into the field “Vertex backend URL (https://…run.app)” and your secret BACKEND_SECRET into the “Vertex backend secret” field on the front page.<br>
– All usage of Gemini 2.5 Pro then runs through *your* project; you control billing, quotas, and can select an EU region, which improves GDPR compliance.<br>
– The setup is slightly technical, so if you prefer a full step-by-step guide, click the “Guide” link next to the “Google Vertex” header above the input fields on the front page.<br><br>

<strong>Lemonfox</strong><br>
– Create an account on Lemonfox:<br>
https://www.lemonfox.ai<br><br>
– Generate an API key in the Lemonfox dashboard (for speech-to-text and/or text model depending on what you use)<br>
– Lemonfox offers a very inexpensive speech-to-text API, often with free usage for the first month — see the pricing/product page for details. EU endpoint (GDPR-friendly)<br>
– Store the key securely and paste it into “Lemonfox API key” on the front page<br>
– You can now use:<br>
• Speech-to-text: Lemonfox Speech-to-Text (Whisper v3-based, inexpensive and fast)<br>
• Text generation: Lemonfox LLM (Llama 3-based models)<br><br>

<strong>Deepgram</strong><br>
– Create an account at Deepgram:<br>
https://deepgram.com<br><br>
– Go to the developer/API pages (“Developers” / “Docs”) and generate an API key in the Deepgram console<br>
– Store the key securely and paste it into “Deepgram API key” on the front page<br>
– You can now use the Deepgram Nova-3 speech-to-text model in the app<br><br>

<strong>Mistral</strong><br>
– Create an account at Mistral AI and log in to the console:<br>
https://console.mistral.ai<br><br>
– Set up billing if needed, then go to “API keys” in the console and generate a Mistral API key<br>
– Store the key securely and paste it into “Mistral API key” on the front page<br>
– Text model: Mistral Large<br>
– EU endpoint / European data storage by default – well suited for GDPR-friendly use<br>
`,

  priceButton: "Price",
  priceModalHeading: "Price",
priceModalText: `
<div>
  <p><strong>Cost Information</strong></p>

  <p>
    You only pay for what you actually use, directly to each provider (OpenAI, Soniox, Google Gemini,
    Lemonfox, Deepgram, Mistral). There are no subscriptions or markups in this app. The prices below are
    approximate USD figures with conversion to NOK (using roughly 1 USD ≈ 11 NOK).
  </p>

  <p><strong>1. Speech-to-Text<br>(price per minute of audio)</strong></p>

  <p><strong>OpenAI – gpt-4o-transcribe</strong><br>
  Approx. 0.006 USD per minute (≈ 0.07 NOK/min).<br>
  15-minute consultation: approx. 0.09 USD ≈ 1.00 NOK.</p>

  <p><strong>Soniox (recommended – best quality and price)</strong><br>
  Approx. 0.0017 USD per minute.<br>
  15-minute consultation: approx. 0.025 USD ≈ 0.30 NOK.</p>

  <p><strong>Lemonfox – Whisper v3</strong><br>
  Approx. 0.50 USD for 3 hours of audio ≈ 0.17 USD per hour ≈ 0.0028 USD per minute.<br>
  15-minute consultation: approx. 0.042 USD ≈ 0.45 NOK.</p>

  <p><strong>Mistral</strong><br>
  API pricing starts around 0.001 USD per minute.<br>
  15-minute consultation: approx. 0.015 USD ≈ 0.17 NOK.</p>

  <p><strong>Deepgram – Nova-3</strong><br>
  Approx. 0.004 USD per minute.<br>
  15-minute consultation = approx. 0.60 NOK.</p>

  <p><strong>2. Text Generation – typical prices (per 1 million tokens)</strong></p>

  <p><strong>OpenAI – GPT-5.1</strong><br>
  Input: 1.25 USD (≈ 13.75 NOK)<br>
  Output: 10 USD (≈ 110 NOK)</p>

  <p><strong>OpenAI – chatgpt-4o-latest</strong><br>
  Input: 5 USD (≈ 55 NOK)<br>
  Output: 15 USD (≈ 165 NOK)</p>

  <p><strong>Google Gemini 3</strong><br>
  Input: approx. 2 USD (≈ 22 NOK)<br>
  Output: approx. 12 USD (≈ 132 NOK)</p>

  <p><strong>Mistral – Mistral Large</strong><br>
  Approx. 2 USD per 1M input tokens and 6 USD per 1M output tokens (≈ 22 and 66 NOK).</p>

  <p><strong>Lemonfox – Llama 3-based models</strong><br>
  Typically around 0.50 USD per 1M LLM input and output tokens (≈ 5.50 NOK).</p>

  <p><strong>3. What are tokens – and how much does 1 consultation cost?</strong></p>

  <p>Models count text in tokens, not plain words.</p>

  <ul>
    <li>1 token ≈ 4 characters ≈ ¾ of a word</li>
    <li>100 tokens ≈ 75 words</li>
    <li>1,000 tokens ≈ 750 words</li>
  </ul>

  <p>
    A 15-minute consultation typically:<br>
    2,200 input tokens per 15-minute consultation (the full transcription + structured text sent in),<br>
    450 output tokens in the finished note,<br>
    total approx. 2,650 tokens per consultation.<br><br>
    This means 1 million tokens gives about 350–400 consultations in this usage
    (depending on length and detail).
  </p>

  <p><strong>4. Example: cost per 15-minute consultation</strong></p>

  <p><em>Speech-to-text (approximate prices per 15 min):</em></p>
  <ul>
    <li>OpenAI gpt-4o-transcribe: ≈ 1.00 NOK</li>
    <li>Soniox: ≈ 0.30 NOK</li>
    <li>Lemonfox (Whisper v3): ≈ 0.45 NOK</li>
    <li>Voxtral (Mistral): ≈ 0.17 NOK</li>
    <li>Deepgram Nova-3 (batch): ≈ 0.70 NOK</li>
  </ul>

  <p><em>Note generation (2,200 input + 450 output tokens):</em></p>
  <ul>
    <li>GPT-5.1: ≈ 0.08 NOK per note</li>
    <li>chatgpt-4o-latest: ≈ 0.20 NOK per note</li>
    <li>Gemini 3: ≈ 0.11 NOK per note</li>
    <li>Mistral Large: ≈ 0.08 NOK per note</li>
    <li>Lemonfox LLM: ≈ 0.02 NOK per note</li>
  </ul>

  <p><em>Some typical combinations for one 15-minute consultation:</em></p>

  <ul>
    <li>OpenAI (gpt-4o-transcribe) + GPT-5.1<br>
      ≈ 1.00 NOK (STT) + 0.08 NOK (note) ≈ 1.10 NOK per consultation
    </li>
    <li>Soniox + GPT-5.1<br>
      ≈ 0.30 NOK (STT) + 0.08 NOK (note) ≈ 0.40 NOK per consultation
    </li>
    <li>Voxtral + Mistral Large<br>
      ≈ 0.17 NOK (STT) + 0.08 NOK (note) ≈ 0.25 NOK per consultation
    </li>
  </ul>

  <p>
    In other words: the text model is extremely cheap — the speech-to-text portion dominates the total cost.
  </p>

  <p><strong>5. Example: monthly cost with steady use</strong></p>

  <p>
    Assume:<br>
    20 consultations per day<br>
    4 days per week<br>
    4 weeks per month<br>
    ⇒ approx. 320 consultations per month (≈ 80 hours of audio).
  </p>

  <p>This yields approximately:</p>

  <ul>
    <li>OpenAI gpt-4o-transcribe + GPT-5.1<br>
      ≈ 31 USD ≈ 340 NOK per month
    </li>
    <li>Soniox + GPT-5.1<br>
      ≈ 10 USD ≈ 110 NOK per month
    </li>
    <li>Voxtral + Mistral Large<br>
      ≈ 7 USD ≈ 80 NOK per month
    </li>
    <li>Lemonfox (Whisper v3 + Llama 3)<br>
      ≈ 14 USD ≈ 150 NOK per month
    </li>
    <li>Deepgram Nova-3 + GPT-5.1<br>
      ≈ 23 USD ≈ 250 NOK per month
    </li>
  </ul>

  <p>
    If you don’t use the service (vacation, sick leave, parental leave), no fixed costs accrue;
    you only pay for actual usage with each provider.
  </p>
</div>
`,

};

export const transcribeTranslations = {
  pageTitle: "Transcription Tool with Ads and Guide Overlay",
  openaiUsageLinkText: "Cost Usage Overview",
  openaiWalletLinkText: "Wallet Balance",
  btnFunctions: "Functions",
  btnGuide: "Guide",
  backToHome: "Back to frontpage",
  recordingAreaTitle: "Recording Area",
  recordTimer: "Recording Timer: 0 sec",
  transcribeTimer: "Completion Timer: 0 sec",
  transcriptionPlaceholder: "Transcription result will appear here...",
  startButton: "Start Recording",
  readFirstText: "Read first! ➔",
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
guideText: `Welcome to the Transcribe Notes Transcription tool. This application allows medical professionals, therapists, and other practitioners to record and transcribe consultations, as well as generate professional notes using an AI-powered note generator.<br><br>

<strong>How to Use the Functions:</strong><br><br>

<ul>
  <li><strong>Recording:</strong> Patient consent must always be obtained prior to recording. Click "Start Recording" to begin capturing audio. Every 2 minutes, a chunk of audio is automatically sent to the OpenAI servers for transcription. The transcripts will appear sequentially in the transcription output field.<br><br>
  <strong><u>Important:</u> The recorder does not work in every web browser. It is recommended to use either <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.</strong></li><br>

  <li><strong>Pause and Resume:</strong> You can use the "Pause" button to temporarily stop the recording—for instance, if the consultation is interrupted or you need to step out of the office briefly. When you click "Pause", the current audio segment is uploaded and transcribed, and the recording is paused. When you're ready to continue, click "Resume", and the recording automatically resumes with the next segment. The timer continues from where it left off, and the session can be ended as usual by clicking "Stop/Complete".</li><br>

  <li><strong>Completion:</strong> After clicking "Stop/Complete", the recording stops. The Completion Timer counts until the full transcript is received (usually within 5–10 seconds).</li><br>

  <li><strong>Custom Prompt:</strong> On the right, select a prompt slot (1–10) and enter your custom prompt. Your prompt is saved automatically and linked to your API key. You can create any prompt that fits your documentation style, tone, and clinical focus. This gives you full flexibility over how your notes are generated.</li><br>

  <li><strong>Note Generation:</strong> Once transcription is complete, click "Generate Note" to create a note based on your transcript and selected/custom prompt. Generated medical notes must be reviewed and validated by healthcare professionals before use.</li><br>

  <li><strong>Usage Overview:</strong> To check your current usage at OpenAI, click on the usage overview hyperlink on the main interface.</li><br>

  <li><strong>Security:</strong> Your audio recording is sent directly to OpenAI’s API servers for transcription, only for the purpose of transcription. It is not stored or used for machine learning. The transcribed text displayed in your browser is not saved anywhere, and is deleted/disappears as soon as you close the browser or load new content.</li><br>

  <li><strong>Guide Toggle:</strong> Click the "Guide" button again to return to the main interface.</li>
</ul><br><br>

<strong>Prompt Examples:</strong><br><br>

<strong>Consultation:</strong><br>
"System prompt – Medical Note Generator

Write a medically accurate, journal-ready note based on a transcribed doctor-patient conversation. Use the following structure (unless otherwise specified in the dictation):
Background (only if relevant history), Presenting complaint/anamnesis, Examination (bullet points), Assessment, Plan.

Rules:
– Do not include information, investigations, or findings not explicitly mentioned.
– Negative findings only if stated.
– Blood tests: write “relevant blood tests are ordered”, do not list them.
– Correct obvious misspellings in medication names.
– Do not use special characters or line breaks before headings.
– Follow explicit instructions from the doctor regarding style, length, or specific wording.

If the doctor adds comments after the patient has left, these must be considered. The note should be well-written."

<br><br>

<strong>Letter to patient:</strong><br>
"Write a letter from the doctor to the patient. Start with Hi \\"name\\", and end with<br>
Regards<br>
\\"Your name\\"<br>
\\"Clinic name\\"<br>
The letter must have a professional and formal tone. You may improve the wording slightly for better flow."

<br><br>

These are examples that work well, but feel free to adapt them to your documentation style, specialty, and type of consultation. You can also create entirely custom prompts for any purpose you wish.
`,
};

export default { indexTranslations, transcribeTranslations };
