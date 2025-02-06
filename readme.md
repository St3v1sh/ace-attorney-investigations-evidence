# Ace Attorney Evidence

This is a Twitch extension that displays evidence and profiles as a video component and a mobile component. The lists are controlled by a Google Sheets document.

## Set Up

1. Clone the repository
2. `cd ace-attorney-investigatiosn-evidence`
3. `npm i`

## Development

- `npm run dev`

## Use For Yourself

- Copy the example Google Sheets document [here](https://docs.google.com/spreadsheets/d/1mn8asfrO6YfniwwELGkVo1DjNX8Ur9Fjijga7yvq2Ug).

### (OPTIONAL) Allow the the document script to run

1. Visit [Google Scripts](https://script.google.com/home) to set up the document script.
2. Find and open the script called `UpdateSheetNames`.
3. On the navigation on the left, click on "Triggers."
4. Add a new trigger with the event type "On change" and save.
5. Make sure you understand what the script does, then authorize it.
   - If preferred, make the script use a specific file rather than any active spreadsheet.

### INSTRUCTIONS WITHOUT THE DOCUMENT SCRIPT

If you choose to not use the document script, you will have to manually type the name of the evidence list (sheet name) to use in the control panel page. Everything still works if you type the name manually, though please make sure the names are exact.

### Create the web application and get API URL

1. Go to the home page of Google Script and create a new Apps Script.
2. Understand and paste the following script:

```js
function doGet() {
  const id = "1cFQ63OScDlJGAISzanY2W9goLaFwtEAcP890CBh2A94";
  const sheet = SpreadsheetApp.openById(id);
  const controlPanel = sheet.getSheetByName("Control Panel");
  const sheetName = controlPanel.getRange("F3").getValue();

  const evidenceSheet = sheet.getSheetByName(sheetName);

  // Get evidence data
  const numRows = evidenceSheet.getLastRow();
  const rawEvidence = evidenceSheet.getRange(2, 2, numRows, 5).getValues();
  // Filter for checked rows
  const filteredEvidence = rawEvidence.filter(
    (evidence) => evidence[4] === true
  );

  // Get profile data
  const rawProfiles = evidenceSheet.getRange(2, 9, numRows, 5).getValues();
  // Filter for checked profiles
  const filteredProfiles = rawProfiles.filter((profile) => profile[4] === true);

  return ContentService.createTextOutput(
    JSON.stringify({ evidence: filteredEvidence, profiles: filteredProfiles })
  ).setMimeType(ContentService.MimeType.JSON);
}

function testDoGet() {
  const result = doGet();
  Logger.log(result.getContent());
}
```

3. Change the `id` to your copied sheet's document ID.
   - This ID can be found in the address bar of the evidence sheet.
4. Deploy the script as a "Web app".
   - Execute as yourself (the document owner.)
   - Give anyone access.
5. After deployment, copy the Web app URL.

### Compile the evidence tool front-end

1. See and follow [the setup and development procedure](#set-up).
2. Paste and replace the Web app URL in src > App.tsx where `const url = ...`.
3. Paste your Google Sheets link in public > config.html with the link displaying the text "Google Sheets". This link will be shared with the streamer when they install the extension.
4. Build the project with `npm run build`.
5. Your evidence tool is now compiled in the dist folder.

Note: The tool is already usable in this step if you host it as a website.

### Create a Twitch Extension

1. Make sure you've updated the `config.html` file and the Web app URL in `app.tsx`.
2. Go to the [Twitch Developer Console](https://dev.twitch.tv/console).
3. Go through all the necessary steps to create a new extension. Please read and understand the Twitch extension documentation for this section.
4. Obtain the extension files (`ace-attorney-investigations-evidence.zip`) by running `npm run zip`.
5. Upload this zip during in the `Files` tab of your extension's page on the twitch developer console.
6. Submit the extension for review.
   - If Twitch staff requests changes, follow those changes and resubmit.

Note: Depending on what you need to do in your version of the extension, you may need to change the allowlists in the capabilities tab of your extension on the Twitch developer console. Don't forget to put your Web app URL in the fetching domains allowlist. For my own purposes, I also added `https://i.imgur.com/` as an image domain to host all the evidence images. Video evidence is out of the scope of this extension since Twitch disallows embeds in extensions, although it's possible to set up your own CDN to host video files for your extension. See src > components > DetailImages > DetailImages.tsx if you are interested in implementing video evidence.
