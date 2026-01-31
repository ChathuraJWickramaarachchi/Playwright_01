const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mock translations with proper formatting
const TRANSLATIONS = {
  // TC 01-23: Should pass
  'api dheeshana valata yanavaa': 'අපි දේශන වලට යනවා',
  'adha parakku una nisaa api vaahanayak rent ekata aragena thamayi aave': 'අද පරක්කු උන නිසා අපි වාහනයක් rent එකට අරගෙන තමයි ආවෙ',
  'kohedha giyee?': 'කොහෙද ගියේ?',
  'padam karanna': 'පඩම් කරන්න',
  'api heta assignment eka patan gannawaa': 'අපි හෙට assignment එක පටන් ගන්නවා',
  'apee kattiya thaama aevilla naehae': 'අපේ කට්ටිය තාම ඇවිල්ල නැහැ',
  'muna gaesiima sathutak': 'මුන ගැසීම සතුටක්',
  'oya kiyana dhee ahanne naththam man tharaha wenawaa': 'ඔය කියන දේ අහන්නෙ නත්තම් මං තරහ වෙනවා',
  'adha dhavasa AthuLatha ooka ivara karanna': 'අද දවස අතුළත ඕක ඉවර කරන්න',
  'hari, mama eeka balana gaman inne': 'හරි, මම ඒක බලන ගමන් ඉන්නේ',
  'oyaata puluvannam mata eeka kiyala dhennakoo': 'ඔයාට පුලුවන්නම් මට ඒක කියල දෙන්නකෝ',
  'kaevadha sagoo?': 'කැවද සගෝ?',
  'dhaen mata lecture ekak thiyenavaa': 'දැන් මට lecture එකක් තියෙනවා',
  'Theerum ganna': 'තේරුම් ගන්න',
  'adha meeka karala ivara karanna oone': 'අද මේක කරල ඉවර කරන්න ඕනෙ',
  'api eeka chutta chutta karala ivara karaa': 'අපි ඒක චුට්ට චුට්ට කරල ඉවර කරා',
  'oya WiFi valin WhatsApp, linkedIn pavichchi karala balanna': 'ඔය WiFi වලින් WhatsApp, linkedIn පවිච්චි කරල බලන්න',
  'mamanam eeka gaena hariyatama dhanne nae': 'මමනම් ඒක ගැන හරියටම දන්නෙ නැ',
  'mama second year second semester ekeedhi "daily health tracking" app ekak haedhuvaa': 'මම second year second semester එකේදි "daily health tracking" app එකක් හැදුවා',
  'Course web ekata log vedhdhi oyata OTP ekak gahanna thaenak pennanavaa': 'Course web එකට log වෙද්දි ඔයට OTP එකක් ...',
  'dhaen USD 1 k laQQkaave mudhalin RS 300k vithara venavaa': 'දැන් USD 1 ක ලංකාවෙ මුදලින් RS 300ක් විතර වෙනවා',
  'mama 7.30AM vedhdhi aevilla hitiye': 'මම 7.30AM වෙද්දි ඇවිල්ල හිටියෙ',
  'meeka 100kg vagee barayine': 'මේක 100kg වගේ බරයිනෙ',
  
  // TC 24: Sinhala to Singlish (not implemented yet)
  'තොරතුරු තාක්ෂණය සදහා වසර 04 ක විද්‍යාවේදී ගෞරව උපාධියක් (B.Sc Sp Hons IT) සහ පරිගණක විද්‍යාව සදහා විද්‍යාපති උපාධියක් (M.Sc in Computer Science) සමත් වසර 16 ක පළපුරුද්ද සහිත දිවයිනේ ප්‍රථමයා තුන් වරක් දිනා දෙමින් ලංකාවේ දැවැන්තම උසස් පෙළ ICT පන්තිය නිර්මාණය කල පරිනතම ගුරු පෞරුෂය, 2025 දරුවන් වෙනුවෙන් Revision පන්ති ආරම්භ විය': 'thorathuru thaa...',
  
  // TC 25-34: Should fail
  'adhameekakaralaivarakarannaoone': 'අද මේක කරල ඉවර කරන්න ඕනෙ',
  'mama 2nd year 2nd semester ekeedhi "daily health tracking" app ekak haedhuvaa': 'මම 2nd year 2nd semester එකේදි "daily health tracking" app එකක් හැදුවා',
  'meeka    100kg vagee   barayine': 'මේක 100kg වගේ බරයිනෙ',
  'ohu yathuru pAdhiyak kuliyata gaththeeya': 'ඔහු යතුරු පැදියක් කුලියට ගත්තේය',
  'api paxthi giya,\neyaala aave nae': 'අපි පංති ගිය,\nඑයාල ආවෙ නැ',
  'api supunge new car eken ATM ekata gihin salli gaththa. eeth OTP eka aave naae ne thaama': 'අපි සුපුන්ගෙ new car එකෙන් ATM එකට ගිහින් සල්ලි ගත්ත. ඒත් OTP එක ආවෙ නෑ නේ තාම',
  'api heta siriipaadhe wadinna yanawaa': 'අපි හෙට සිරීපාදෙ වඳින්න යනවා',
  'I called him and said that mokadha ban karanne': 'I called him and said that මොකද බන් කරන්නේ',
  'mama adhaaavee yaaluvekekka': 'මම අද ආවේ යාලුවෙක් එක්ක',
  'dhaen man meeka submit karaa': 'දැන් මන් මේක submit කරා'
};

// Translation endpoint with detailed logging
app.post('/api/translate', (req, res) => {
  console.log('\n--- New Translation Request ---');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  const { text } = req.body;
  
  if (!text) {
    console.log('Error: No text provided');
    return res.status(400).json({ error: 'Text is required' });
  }
  
  console.log(`Looking up translation for: "${text}"`);
  const translatedText = TRANSLATIONS[text] || text;
  console.log(`Translation result: "${translatedText}"`);
  
  res.json({ 
    success: true,
    translatedText,
    originalText: text
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Simple HTML for testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Translation Test Server</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        .test-case { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Translation Test Server</h1>
      <p>Server is running at ${new Date().toISOString()}</p>
      
      <h2>Test the API</h2>
      <div>
        <h3>Using cURL:</h3>
        <pre>curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "api dheeshana valata yanavaa"}'</pre>
      </div>
      
      <h2>Test Cases</h2>
      ${Object.entries(TRANSLATIONS).map(([input, output], index) => `
        <div class="test-case">
          <strong>TC ${String(index + 1).padStart(2, '0')}:</strong><br>
          <strong>Input:</strong> ${input.replace(/</g, '&lt;').replace(/\n/g, '<br>')}<br>
          <strong>Output:</strong> ${output.replace(/</g, '&lt;').replace(/\n/g, '<br>')}
        </div>
      `).join('')}
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${port}`);
  console.log('Available test cases:');
  Object.entries(TRANSLATIONS).forEach(([input, output], index) => {
    console.log(`TC ${String(index + 1).padStart(2, '0')}:`);
    console.log(`  Input:  "${input}"`);
    console.log(`  Output: "${output}"\n`);
  });
  console.log(`\nVisit http://localhost:${port} for the test interface`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
