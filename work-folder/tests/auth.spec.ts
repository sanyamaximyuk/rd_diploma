import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

test.describe('Authentication Tests', () => {

    test('should login successfully and verify dashboard elements', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const userEmail = 'sanya.maximyuk@gmail.com';
        const userPassword = 'testTest5!';

        await loginPage.navigate();

        await loginPage.login(userEmail, userPassword);

        await expect(page).toHaveURL('https://new.fophelp.pro/incomes', { timeout: 10000 });

        const profileLink = page.getByRole('link', { name: /Profile|Account|My Account|Профіль/i });
        await expect(profileLink).not.toBeVisible({ timeout: 10000 });

        await expect(loginPage.emailInput).not.toBeVisible();
        await expect(loginPage.passwordInput).not.toBeVisible();
    });

    test('should show error message with invalid credentials', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid@email.com', 'wrongPassword');

        const errorMessage = page.locator('//form/div[3]/label');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText(/Помилка авторизації/i);
    });
});
