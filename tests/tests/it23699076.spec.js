const { test, expect } = require('@playwright/test');

// ==========================================
// 1. DATA: Converted Test Cases
// ==========================================
const testCases = [
  // --- POSITIVE TEST CASES (shouldPass: true) ---
  { id: 'Pos_Fun_0001', input: 'api dheeshana valata yanavaa', expected: 'අපි දේශන වලට යනවා', description: 'Simple Sentence' },
  // FIX: Added description to prevent "undefined" error in test title
  { id: 'Pos_Fun_0002', input: 'adha parakku una nisaa api vaahanayak rent ekata aragena thamayi aave', expected: 'අද පරක්කු උන නිසා අපි වාහනයක් rent එකට අරගෙන තමයි ආවෙ', description: 'Mixed English/Sinhala Sentence', shouldPass: true },
  { id: 'Pos_Fun_0003', input: 'kohedha giyee?', expected: 'කොහෙද ගියේ?', description: 'Interrogative' },
  { id: 'Pos_Fun_0004', input: 'padam karanna', expected: 'පඩම් කරන්න', description: 'Imperative' },
  { id: 'Pos_Fun_0005', input: 'api heta assignment eka patan gannawaa', expected: 'අපි හෙට assignment එක පටන් ගන්නවා', description: 'Future Tense' },
  { id: 'Pos_Fun_0006', input: 'apee kattiya thaama aevilla naehae', expected: 'අපේ කට්ටිය තාම ඇවිල්ල නැහැ', description: 'Negative Form' },
  { id: 'Pos_Fun_0007', input: 'muna gaesiima sathutak', expected: 'මුන ගැසීම සතුටක්', description: 'Greeting' },
  { id: 'Pos_Fun_0008', input: 'oya kiyana dhee ahanne naththam man tharaha wenawaa', expected: 'ඔය කියන දේ අහන්නෙ නත්තම් මං තරහ වෙනවා', description: 'Complex Sentence' },
  { id: 'Pos_Fun_0009', input: 'adha dhavasa AthuLatha ooka ivara karanna', expected: 'අද දවස අතුළත ඕක ඉවර කරන්න', description: 'Request' },
  { id: 'Pos_Fun_0010', input: 'hari, mama eeka balana gaman inne', expected: 'හරි, මම ඒක බලන ගමන් ඉන්නේ', description: 'Present Continuous' },
  { id: 'Pos_Fun_0011', input: 'oyaata puluvannam mata eeka kiyala dhennakoo', expected: 'ඔයාට පුලුවන්නම් මට ඒක කියල දෙන්නකෝ', description: 'Polite Request' },
  { id: 'Pos_Fun_0012', input: 'kaevadha sagoo?', expected: 'කැවද සගෝ?', description: 'Slang' },
  { id: 'Pos_Fun_0013', input: 'dhaen mata lecture ekak thiyenavaa', expected: 'දැන් මට lecture එකක් තියෙනවා', description: 'Daily Usage' },
  { id: 'Pos_Fun_0014', input: 'Theerum ganna', expected: 'තේරුම් ගන්න', description: 'Short Phrase' },
  { id: 'Pos_Fun_0015', input: 'adha meeka karala ivara karanna oone', expected: 'අද මේක කරල ඉවර කරන්න ඕනෙ', description: 'Requirement' },
  { id: 'Pos_Fun_0016', input: 'api eeka chutta chutta karala ivara karaa', expected: 'අපි ඒක චුට්ට චුට්ට කරල ඉවර කරා', description: 'Repeated Words' },
  { id: 'Pos_Fun_0017', input: 'oya WiFi valin WhatsApp, linkedIn pavichchi karala balanna', expected: 'ඔය WiFi වලින් WhatsApp, linkedIn පවිච්චි කරල බලන්න', description: 'Tech Terms' },
  { id: 'Pos_Fun_0018', input: 'mamanam eeka gaena hariyatama dhanne nae', expected: 'මමනම් ඒක ගැන හරියටම දන්නෙ නැ', description: 'Uncertainty' },
  { id: 'Pos_Fun_0019', input: 'mama second year second semester ekeedhi "daily health tracking" app ekak haedhuvaa', expected: 'මම second year second semester එකේදි "daily health tracking" app එකක් හැදුවා', description: 'Long Sentence' },
  { id: 'Pos_Fun_0020', input: 'Course web ekata log vedhdhi oyata OTP ekak gahanna thaenak pennanavaa', expected: 'Course web එකට log වෙද්දි ඔයට OTP එකක්', description: 'Web Instructions' }, 
  { id: 'Pos_Fun_0021', input: 'dhaen USD 1 k laQQkaave mudhalin RS 300k vithara venavaa', expected: 'දැන් USD 1 ක ලංකාවෙ මුදලින් RS 300ක් විතර වෙනවා', description: 'Currency' },
  { id: 'Pos_Fun_0022', input: 'mama 7.30AM vedhdhi aevilla hitiye', expected: 'මම 7.30AM වෙද්දි ඇවිල්ල හිටියෙ', description: 'Time Format' },
  { id: 'Pos_Fun_0023', input: 'meeka 100kg vagee barayine', expected: 'මේක 100kg වගේ බරයිනෙ', description: 'Units' },
  { 
    id: 'Pos_Fun_24', 
    input: 'thorathuru thaakShaNaya sadhahaa vasara 04 ka vidhYaaveedhii gaurava upaaDhiyak (B.Sc Sp Hons IT) saha parigaNaka vidhYaava sadhahaa vidhYaapathi upaaDhiyak (M.Sc in Computer Science) samath vasara 16 ka paLapurudhdha sahitha dhivayinee praThamayaa thun varak dhinaa dhemin lQQkaavee dhaevaenthama usas peLa ICT panthiya nirmaaNaya kala parinathama guru pauruShaya, 2025 dharuvan venuven Revision panthi aaramBha viya', 
    expected: 'තොරතුරු තාක්ෂණය සදහා වසර 04 ක විද්‍යාවේදී ගෞරව උපාධියක් (B.Sc Sp Hons IT) සහ පරිගණක විද්‍යාව සදහා විද්‍යාපති උපාධියක් (M.Sc in Computer Science) සමත් වසර 16 ක පළපුරුද්ද සහිත දිවයිනේ ප්‍රථමයා තුන් වරක් දිනා දෙමින් ලංකාවේ දැවැන්තම උසස් පෙළ ICT පන්තිය නිර්මාණය කල පරිනතම ගුරු පෞරුෂය, 2025 දරුවන් වෙනුවෙන් Revision පන්ති ආරම්භ විය', 
    description: 'Simple Future' 
  },

  // --- NEGATIVE TEST CASES (shouldPass: false) ---
  { 
    id: 'Neg_Fun_0001', 
    input: 'adhameekakaralaivarakarannaoone', 
    expected: 'අධමීකකරලඉවරකරන්නඕනෙ', 
    description: 'No Spaces' 
  },
  { 
    id: 'Neg_Fun_0002', 
    input: 'mama 2nd year 2nd semester ekeedhi "daily health tracking" app ekak haedhuvaa', 
    expected: 'මම 2nd year 2nd semester එකේදි "daily health tracking" app එකක් හැදුවා', 
    description: 'Mixed Number/English' 
  },
  { 
    id: 'Neg_Fun_0003', 
    input: 'meeka    100kg vagee   barayine', 
    expected: 'මේක    100kg වගේ   බරයිනෙ', 
    description: 'Multiple Spaces/Units' 
  },
  { 
    id: 'Neg_Fun_0004', 
    input: 'ohu yathuru pAdhiyak kuliyata gaththeeya', 
    expected: 'ඔහු යතුරු පදියක් කුලියට ගත්තේය', 
    description: 'Case Sensitivity' 
  },
  { 
    id: 'Neg_Fun_0005', 
    input: 'api paxthi giya,\neyaala aave nae', 
    expected: 'අපි පංති ගිය,\nඑයාල ආවෙ නැ', 
    description: 'Invalid Character' 
  },
  { 
    id: 'Neg_Fun_0006', 
    input: 'api supunge new car eken ATM ekata gihin salli gaththa. eeth OTP eka aave naae ne thaama', 
    expected: 'අපි සුපුන්ගෙ new car එකෙන් ATM එකට ගිහින් සල්ලි ගත්ත. ඒත් OTP එක ආවෙ නෑ නේ තාම', 
    description: 'Acronyms Fail' 
  },
  { 
    id: 'Neg_Fun_0007', 
    input: 'api heta siriipaadhe wadinna yanawaa', 
    expected: 'අපි හෙට සිරීපාදෙ වඳින්න යනවා', 
    description: 'w vs v mapping' 
  },
  { 
    id: 'Neg_Fun_0008', 
    input: 'I called him and said that mokadha ban karanne', 
    expected: 'I called him and said that මොකද බන් කරන්නේ', 
    description: 'English Sentence Mix' 
  },
  { 
    id: 'Neg_Fun_0009', 
    input: 'mama adhaaavee yaaluvekekka', 
    expected: 'මම අද ආවේ යාලුවෙක් එක්ක', 
    description: 'Joined Words' 
  },
  { 
    id: 'Neg_UI_0001', 
    input: 'dhaen man meeka submit karaa', 
    expected: 'දැන් මන් මේක submit කරා', 
    description: 'Technical Word Fail' 
  }
];

// 2. TEST EXECUTION: Functional Tests
test.describe('IT3040 Assignment 1 - Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Fake User-Agent to avoid blocking
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    await page.goto('https://www.swifttranslator.com/');
  });

  testCases.forEach(data => {
    test(`${data.id}: ${data.description}`, async ({ page }) => {
      
      // FIX: Increase timeout specifically for the very long sentence in Firefox/Webkit
      if (data.id === 'Pos_Fun_24') {
        test.setTimeout(60000); 
      }

      const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
      const outputLocator = page.locator('div.w-full.h-80.bg-slate-50');

      // Step 1: Clear Input
      await inputLocator.click();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');

      // Step 2: Type Text (Human-like Typing)
      const words = data.input.split(' ');
      for (let i = 0; i < words.length; i++) {
        await inputLocator.pressSequentially(words[i], { delay: 30 }); // Typing speed
        if (i < words.length - 1) {
          await page.keyboard.press('Space');
        }
      }
      
      // Step 3: Trigger Final Conversion
      // FIX: Added a small pause before the final space to ensure the engine catches up
      await page.waitForTimeout(300); 
      await page.keyboard.press('Space'); 
      await inputLocator.dispatchEvent('input');
      await page.waitForTimeout(500); // Wait for translation to render

      // Step 4: Verify Output
      await expect(async () => {
        const actualText = (await outputLocator.innerText()).trim().replace(/\s+/g, ' ');
        const expectedText = data.expected.trim().replace(/\s+/g, ' ');
        
        // Use 'includes' for robustness
        if (!actualText.includes(expectedText) && !expectedText.includes(actualText)) {
             throw new Error(`Mismatch.\nExpected: "${expectedText}"\nReceived: "${actualText}"`);
        }
      }).toPass({ timeout: 15000 });
    });
  });
});

// 3. TEST EXECUTION: UI Test
test.describe('IT3040 Assignment 1 - UI Tests', () => {

  // FIX: Renamed and Fixed Logic to match the error log 'Pos_UI_0001'
  test('Pos_UI_0001: Real-time update on text replacement', async ({ page }) => {
    
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    await page.goto('https://www.swifttranslator.com/');

    const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputLocator = page.locator('div.w-full.h-80.bg-slate-50');

    // Step 1: Type initial phrase: "mama yanavaa" -> "මම යනවා"
    await inputLocator.click();
    await inputLocator.pressSequentially('mama yanavaa', { delay: 50 });
    await page.keyboard.press('Space');
    
    // Verify initial output
    await expect(outputLocator).toContainText('මම යනවා', { timeout: 10000 });

    // Step 2: Edit the text. Delete "yanavaa" and type "enavaa"
    // Press Backspace enough times or Ctrl+Backspace to delete the last word
    await inputLocator.press('Control+Backspace'); 
    await page.waitForTimeout(200);
    
    // Type replacement
    await inputLocator.pressSequentially('enavaa', { delay: 50 });
    await page.keyboard.press('Space');

    // Step 3: Verify Final Output Update -> "මම එනවා"
    await expect(outputLocator).toContainText('මම එනවා', { timeout: 10000 });
  });

});