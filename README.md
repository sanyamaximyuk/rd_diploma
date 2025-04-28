rd_diploma project

Here is my diploma project based on Playwright test framework.

Website covered by tests: https://new.fophelp.pro/

You can see all files in 'work-folder'.

Were added:
- API tests: in folder ../work-folder/api-tests
- UI tests: in ../work-folder/tests

Also, were set the following reports:
- Playwright report (as default) - reports data will be generated to 'playwright-report' folder
- Allure report - reports data will be generated to 'allure-results' folder

For running UI tests, please use 'npm run test' command
For running API tests, move to api-tests folder (cd .\api-tests\) and please use newman for running (firstly newman should be installed: npm install -g newman) - 'newman run .\FOP_test.postman_collection.json' command

CI/CD will be configured after creating pull request and will be visible in my repo