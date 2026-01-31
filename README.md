# Playwright_01
This project contains automated API tests for a Singlish-to-Sinhala transliteration/translation service using Playwright Test.
First you should have to intall node.js
**Node.js** ≥ 18 (LTS recommended)  
  Download: https://nodejs.org  
  Verify after installation:
  in bash:
  node --version
  npm --version

  How to Create a clone or a project folder?
  mkdir playwright_01
  cd playwright_01

  How to Initialize npm project (creates package.json)?
  npm init -y

  How to Install Playwright Test?
  npm install --save-dev @playwright/test

  How to Install browser binaries (Chromium, Firefox, WebKit)?
  npx playwright install

  How to Install additional tools?
  npm install --save-dev @playwright/test allure-playwright

  How to Running Test?
  server.js is running on port number 3000.

  Task                                                  Command                 
Run all tests                                   npx playwright test
npx playwright test                             npx playwright test --headed
Run only one test case                          npx playwright test -g "TC 01"
Run in debug mode (step-by-step)                npx playwright test --debug
Run and generate HTML report                    npx playwright test 
show report                                     npx playwright show-report
Run with trace files (for debugging)            npx playwright test --trace on

How to debug?
            Task                                                    Command
    Start server manually first                                  node server.js
    In another terminal, run one test with browser               npx playwright test --headed -g "TC 01"
    open the report                                              npx playwright show-report