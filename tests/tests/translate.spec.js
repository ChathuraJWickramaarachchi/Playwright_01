const { test, expect } = require('@playwright/test');
const { spawn } = require('child_process');

// Local development server URL
const APP_URL = 'http://localhost:3000';

// Start the local server before all tests
test.beforeAll(async () => {
  // Start the server
  const server = spawn('node', ['server.js']);
  
  // Give the server time to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Handle server output
  server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
  });
  
  server.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });
  

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });

    // Give server time to start
    setTimeout(resolve, 2000);
  });

// Stop server after all tests
test.afterAll(() => {
  if(serverProcess) {
    console.log('Stopping test server...');
    serverProcess.kill();
  }
});

// Test cases with expected results
const TEST_CASES = [
  { id: '01', input: 'api dheeshana valata yanavaa', expected: 'අපි දේශන වලට යනවා', shouldPass: true },
  { id: '02', input: 'adha parakku una nisaa api vaahanayak rent ekata aragena thamayi aave', expected: 'අද පරක්කු උන නිසා අපි වාහනයක් rent එකට අරගෙන තමයි ආවෙ', shouldPass: true },
  { id: '03', input: 'kohedha giyee?', expected: 'කොහෙද ගියේ?', shouldPass: true },
  { id: '04', input: 'padam karanna', expected: 'පඩම් කරන්න', shouldPass: true },
  { id: '05', input: 'api heta assignment eka patan gannawaa', expected: 'අපි හෙට assignment එක පටන් ගන්නවා', shouldPass: true },
  { id: '06', input: 'apee kattiya thaama aevilla naehae', expected: 'අපේ කට්ටිය තාම ඇවිල්ල නැහැ', shouldPass: true },
  { id: '07', input: 'muna gaesiima sathutak', expected: 'මුන ගැසීම සතුටක්', shouldPass: true },
  { id: '08', input: 'oya kiyana dhee ahanne naththam man tharaha wenawaa', expected: 'ඔය කියන දේ අහන්නෙ නත්තම් මං තරහ වෙනවා', shouldPass: true },
  { id: '09', input: 'adha dhavasa AthuLatha ooka ivara karanna', expected: 'අද දවස අතුළත ඕක ඉවර කරන්න', shouldPass: true },
  { id: '10', input: 'hari, mama eeka balana gaman inne', expected: 'හරි, මම ඒක බලන ගමන් ඉන්නේ', shouldPass: true },
  { id: '11', input: 'oyaata puluvannam mata eeka kiyala dhennakoo', expected: 'ඔයාට පුලුවන්නම් මට ඒක කියල දෙන්නකෝ', shouldPass: true },
  { id: '12', input: 'kaevadha sagoo?', expected: 'කැවද සගෝ?', shouldPass: true },
  { id: '13', input: 'dhaen mata lecture ekak thiyenavaa', expected: 'දැන් මට lecture එකක් තියෙනවා', shouldPass: true },
  { id: '14', input: 'Theerum ganna', expected: 'තේරුම් ගන්න', shouldPass: true },
  { id: '15', input: 'adha meeka karala ivara karanna oone', expected: 'අද මේක කරල ඉවර කරන්න ඕනෙ', shouldPass: true },
  { id: '16', input: 'api eeka chutta chutta karala ivara karaa', expected: 'අපි ඒක චුට්ට චුට්ට කරල ඉවර කරා', shouldPass: true },
  { id: '17', input: 'oya WiFi valin WhatsApp, linkedIn pavichchi karala balanna', expected: 'ඔය WiFi වලින් WhatsApp, linkedIn පවිච්චි කරල බලන්න', shouldPass: true },
  { id: '18', input: 'mamanam eeka gaena hariyatama dhanne nae', expected: 'මමනම් ඒක ගැන හරියටම දන්නෙ නැ', shouldPass: true },
  { id: '19', input: 'mama second year second semester ekeedhi "daily health tracking" app ekak haedhuvaa', expected: 'මම second year second semester එකේදි "daily health tracking" app එකක් හැදුවා', shouldPass: true },
  { id: '20', input: 'Course web ekata log vedhdhi oyata OTP ekak gahanna thaenak pennanavaa', expected: 'Course web එකට log වෙද්දි ඔයට OTP එකක් ...', shouldPass: true },
  { id: '21', input: 'dhaen USD 1 k laQQkaave mudhalin RS 300k vithara venavaa', expected: 'දැන් USD 1 ක ලංකාවෙ මුදලින් RS 300ක් විතර වෙනවා', shouldPass: true },
  { id: '22', input: 'mama 7.30AM vedhdhi aevilla hitiye', expected: 'මම 7.30AM වෙද්දි ඇවිල්ල හිටියෙ', shouldPass: true },
  { id: '23', input: 'meeka 100kg vagee barayine', expected: 'මේක 100kg වගේ බරයිනෙ', shouldPass: true },
  { id: '24', input: 'තොරතුරු තාක්ෂණය සදහා වසර 04 ක විද්‍යාවේදී ගෞරව උපාධියක් (B.Sc Sp Hons IT) සහ පරිගණක විද්‍යාව සදහා විද්‍යාපති උපාධියක් (M.Sc in Computer Science) සමත් වසර 16 ක පළපුරුද්ද සහිත දිවයිනේ ප්‍රථමයා තුන් වරක් දිනා දෙමින් ලංකාවේ දැවැන්තම උසස් පෙළ ICT පන්තිය නිර්මාණය කල පරිනතම ගුරු පෞරුෂය, 2025 දරුවන් වෙනුවෙන් Revision පන්ති ආරම්භ විය', expected: 'thorathuru thaa...', shouldPass: true },
  { id: '25', input: 'adhameekakaralaivarakarannaoone', expected: 'අද මේක කරල ඉවර කරන්න ඕනෙ', shouldPass: false },
  { id: '26', input: 'mama 2nd year 2nd semester ekeedhi "daily health tracking" app ekak haedhuvaa', expected: 'මම 2nd year 2nd semester එකේදි "daily health tracking" app එකක් හැදුවා', shouldPass: false },
  { id: '27', input: 'meeka    100kg vagee   barayine', expected: 'මේක 100kg වගේ බරයිනෙ', shouldPass: false },
  { id: '28', input: 'ohu yathuru pAdhiyak kuliyata gaththeeya', expected: 'ඔහු යතුරු පැදියක් කුලියට ගත්තේය', shouldPass: false },
  { id: '29', input: 'api paxthi giya,\neyaala aave nae', expected: 'අපි පංති ගිය,\nඑයාල ආවෙ නැ', shouldPass: false },
  { id: '30', input: 'api supunge new car eken ATM ekata gihin salli gaththa. eeth OTP eka aave naae ne thaama', expected: 'අපි සුපුන්ගෙ new car එකෙන් ATM එකට ගිහින් සල්ලි ගත්ත. ඒත් OTP එක ආවෙ නෑ නේ තාම', shouldPass: false },
  { id: '31', input: 'api heta siriipaadhe wadinna yanawaa', expected: 'අපි හෙට සිරීපාදෙ වඳින්න යනවා', shouldPass: false },
  { id: '32', input: 'I called him and said that mokadha ban karanne', expected: 'I called him and said that මොකද බන් කරන්නේ', shouldPass: false },
  { id: '33', input: 'mama adhaaavee yaaluvekekka', expected: 'මම අද ආවේ යාලුවෙක් එක්ක', shouldPass: false },
  { id: '34', input: 'dhaen man meeka submit karaa', expected: 'දැන් මන් මේක submit කරා', shouldPass: false },
];

test.describe('Singlish → Sinhala Translation API Tests', () => {
  let apiContext;

  test.beforeAll(async () => {
    // Create a new API context for making HTTP requests
    apiContext = await request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    // Cleanup API context
    await apiContext.dispose();
  });

  TEST_CASES.forEach((tc) => {
    test(`TC ${tc.id.padStart(2, '0')}: ${tc.input.substring(0, 40)}${tc.input.length > 40 ? '...' : ''}`, async () => {
      // Make API request
      const response = await apiContext.post('/api/translate', {
        data: { text: tc.input },
      });
      
      // Parse response
      const data = await response.json();
      const actual = data.translatedText;

      // Log test case details
      console.log(`\nTC ${tc.id}:`);
      console.log(`Input:    "${tc.input}"`);
      console.log(`Expected: "${tc.expected}"`);
      console.log(`Actual:   "${actual}"`);

      // Assert based on shouldPass flag
      if (tc.shouldPass) {
        expect(actual, `TC ${tc.id} should match expected output`).toBe(tc.expected);
      } else {
        expect(actual, `TC ${tc.id} should NOT match expected output`).not.toBe(tc.expected);
      }
    });
  });
});