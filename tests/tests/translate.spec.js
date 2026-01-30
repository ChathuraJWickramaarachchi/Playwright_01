const { test, expect } = require('@playwright/test');

test('Translate text from Singlish to Sinhala', async ({ page }) => {
  await page.goto('http://localhost:3000'); // change URL if needed

  // Enter text
  await page.fill('#sourceText', 'Hello');

  // Select languages
  await page.selectOption('#sourceLang', 'singlish');
  await page.selectOption('#targetLang', 'sinhala');

  // Click translate
  await page.click('#translateBtn');

  // Verify output
  const translatedText = await page.textContent('#resultText');
  expect(translatedText).toContain('Hola');
});
