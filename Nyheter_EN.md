## 15 March, 2026

### Fixed: information buttons on the front page are working again

It was recently discovered that the information modules/buttons on the front page had accidentally been disabled for the last week or two.

This has now been fixed, and the information buttons can once again be opened and viewed as normal.

---

## 11 March, 2026

### Important: refresh the webpage regularly to get the newest version

This app is **100% front-end**, which means updates to the app will only appear after the webpage is refreshed.

If you keep the app open in a browser tab for a long time, such as for days or weeks, you may continue seeing an older version of the app even if new updates have already been released.

To make sure you are using the newest version, please refresh the page regularly. On Windows, you can use **Ctrl + F5** to do a hard refresh.
 
This is especially important after new updates or changes have been made to the app.

---

## 9 March, 2026

### New redaction tools added to the Transcribe page

A new **Redactor** module has now been added to the Transcribe page. This tool makes it easier to remove or mask sensitive information before further use of the transcript or extracted text.

The Redactor supports both **general terms** and **specific terms**:
- **General terms** can be reused while the tab remains open
- **Specific terms** can be added for one-off redaction tasks
- A built-in **birthdate helper** is also included to make it easier to add date-related sensitive information

When you click **Redact**, the tool will scan the transcript and apply redaction based on the terms you have entered.

### OCR support in the Redactor

The Redactor module also includes a built-in **OCR** function for extracting text from screenshots or image files.

You can use it in three ways:
- Paste a screenshot into the image field
- Press **Ctrl + V** while the image area is focused
- Upload an image file manually

The OCR tool can then be used to:
- Extract text as **raw OCR text**
- Send OCR text directly into the **specific terms** field for quick redaction setup

This makes it easier to redact sensitive information not only from transcripts, but also from screenshots, scanned text, and other image-based content.

---

## 7 March, 2026

**GPT-5.4** has now been added to the OpenAI model dropdown for note generation.

### Pricing:
GPT-5.4 currently costs **$2.50 per 1 million input tokens** and **$15.00 per 1 million output tokens**.

### Important regarding privacy / GDPR:
Please note that use of **GPT-5.4** and the other **OpenAI models** in the current standard setup is **not GDPR compliant for sensitive/patient data**, because data is **not processed in the EU by default**, and OpenAI states that API data may be **stored for up to 30 days before deletion**.

For note generation workflows that require a **GDPR-compliant setup**, **AWS Bedrock** is recommended instead.

### Prompt module update:
The prompt module has now been updated so that prompt slots can be **reordered by drag and drop**.

To reorder the slots:
- Open the prompt slot menu
- Click and hold the drag handle next to a slot
- Drag the slot up or down to the desired position
- Release the mouse to save the new order

---

## 4 March, 2026

### Temporary capacity issues with Claude Opus 4.6 (AWS Bedrock)

There are currently periods where **Claude Sonnet/Opus 4.6** on AWS Bedrock may be temporarily overloaded. This can sometimes cause note generation to fail and return an error from AWS.

If this happens, we recommend **temporarily using Claude Sonnet/Opus 4.5**, which is stable and produces very similar results.

This issue is related to capacity on AWS Bedrock and is **not caused by the app itself**. Once the load on Opus 4.6 normalizes, the model should work as expected again.

---

## 3 March 2026

Claude Sonnet 4.6 and Claude Opus 4.6 have now been added to the AWS Bedrock model dropdown.

These 4.6 models are the latest generation and generally deliver stronger reasoning, better instruction-following, and higher-quality summaries/notes compared to their 4.5 counterparts—especially on longer or more complex transcripts.

**Pricing:** Claude Sonnet 4.6 costs the same as Claude Sonnet 4.5, and Claude Opus 4.6 costs the same as Claude Opus 4.5.

### Important (AWS users): Update your stack

To use Sonnet 4.6 / Opus 4.6, you must update your existing AWS proxy stack (CloudFormation). The update enables the required Bedrock configuration for these models.

**How to update your function:**  
Go to the home page, click the “AWS guide” button next to the AWS Bedrock key fields, scroll all the way to the bottom, and follow the instructions under “HOW TO UPDATE THE STACK (CLOUDFORMATION)”. Once completed, you can select and use Sonnet 4.6 / Opus 4.6 in the app.

<a href="index.html#bedrock-update-stack" target="_blank" rel="noopener">HOW TO UPDATE THE STACK (CLOUDFORMATION)</a>

---

## 2 March 2026

This new Info button shows ongoing status messages and changes in the web app (such as new features, bug fixes, and important announcements).

### AWS time limit update:

Up until now, notes generated with the AWS models have had a time limit of 45 sec, which means that if it takes more than 45 sec to generate the note, it will result in an error message. This issue has now been resolved by increasing the time limit to 2.5 min, which will be more than enough to generate a note.

To carry out this update, you as a user must update the AWS function that you have already created if you have used the AWS models so far.

To update your function; Go to the home page, click the “AWS guide” button next to the fields for the AWS Bedrock key, scroll all the way to the bottom of the page, and follow the instructions under "HOW TO UPDATE THE STACK (CLOUDFORMATION)". Once this is done, the problem will be resolved.
