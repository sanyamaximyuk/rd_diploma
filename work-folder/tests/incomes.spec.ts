import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { IncomesPage } from '../src/pages/incomes.page';

test.describe('Income Management Tests', () => {
    test.beforeEach(async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const userEmail = 'sanya.maximyuk@gmail.com';
        const userPassword = 'testTest5!';

        await loginPage.navigate();
        await loginPage.login(userEmail, userPassword);
    });

    test('should add a new income entry successfully', async ({ page }): Promise<void> => {

        const incomesPage = new IncomesPage(page);
        const newIncomeAmount = '500';
        const newIncomeComment = `Test comment ${Date.now()}`;

        await incomesPage.navigate();

        await incomesPage.openNewIncomeForm();

        await incomesPage.fillAndSaveNewIncome(newIncomeAmount, newIncomeComment);

        await expect(incomesPage.incomeAmountInput).toBeVisible({ timeout: 5000 });

        await expect(incomesPage.commentInput).toBeVisible({ timeout: 5000 });
    });
});
