// js/language-en.js

export const indexTranslations = {
  pageTitle: "Whisper Clinical Transcription",
  headerTitle: "Whisper Clinical Transcription",
  headerSubtitle: "Advanced AI-Powered Speech-to-Text and Note Generation for Healthcare Consultations",
  startText: "To get started, please enter your OpenAI API key:",
  apiPlaceholder: "Enter API Key here",
  enterButton: "Enter Transcription Tool",
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
  aboutModalText: `I’m a Norwegian family doctor who has always had an interest in technological advancements, particularly in artificial intelligence, and I have followed AI developments in healthcare closely.<br><br>
When I initially learned about companies providing speech-to-text services for medical consultations in Norway, I was enthusiastic. Colleagues and online reviews praised these services, noting significant improvements in their efficiency and workflow. However, upon researching further, I was surprised at how much these companies charged for their services—especially considering that the actual cost of the technology itself is only a fraction of their prices.<br><br>
Motivated by this realization, I developed my own speech-to-text solution initially for personal use. Seeing how effective and cost-efficient it was, I decided to make my solution accessible online, offering the same speed, accuracy, and quality found in premium services, but without the high fees.<br><br>
Unlike commercial providers, this platform doesn’t mark up costs or impose unnecessary fees.<br>
• Instead, you pay OpenAI directly—meaning you are going straight to the source of the technology, without middlemen taking an extra cut.<br>
• Because of this, it’s the cheapest option available while maintaining top-tier quality.<br><br>
I believe that the services offered by some of these companies, while useful, are overpriced for what they actually provide. Many of my colleagues—who work hard every day in patient care—end up paying significantly more than necessary just to access a tool that should be affordable for everyone.<br><br>
This website is completely free to use—your only cost is the direct OpenAI usage fee for transcriptions.<br>
• No monthly fees, no subscriptions, no commitments—you only pay for the tasks you perform.<br>
• You control how much you spend by deciding how much to transfer to your OpenAI wallet.<br><br>
The only thing I ask is that you accept ads, which help cover backend server costs.<br>
As more people use the website, the hosting and operational fees will increase, and ad revenue ensures that I can keep it free and running without charging users.`,
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
For the webapp to function, your OpenAI wallet must have sufficient funds. Visit the <a href="https://platform.openai.com/account/billing/overview" style="color:blue;">Billing & Payment</a> page to add funds. You can transfer any amount at any time. As long as funds are available, you'll be able to use the site—each task is charged immediately.
<br><br>
<strong>Session Security Reminder</strong><br>
When you log in by entering your API key, it is stored only temporarily in your browser session. This means if you exit the website, close your browser, or turn off your computer, the API key will not be saved. You will need to re-enter your API key the next time you use the webapp, ensuring your key remains secure.`,
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
