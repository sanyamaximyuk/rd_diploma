import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
    public readonly page: Page;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly submitButton: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('//*[@id="email"]');

        this.passwordInput = page.locator('//*[@id="password"]');

        this.submitButton = page.getByRole('button', { name: /Увійти/i });
    }

    public async navigate(): Promise<void> {
        await this.page.goto('/auth/login');

        await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    }

    public async login(email: string, password: string): Promise<void> {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.submitButton.click();
    }
}
