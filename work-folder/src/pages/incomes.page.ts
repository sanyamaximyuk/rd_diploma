// src/pages/IncomesPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class IncomesPage {
    public readonly page: Page;
    public readonly addIncomeButton: Locator;
    public readonly incomeAmountInput: Locator;
    public readonly commentInput: Locator;
    public readonly saveIncomeButton: Locator;
    public readonly incomesTable: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.addIncomeButton = page.getByRole('button', { name: /Додати новий дохід/i });

        this.incomeAmountInput = page.locator('#Income-New');

        this.commentInput = page.locator('#Comment-New');

        this.saveIncomeButton = page.locator('#BtnAdd-New');

        this.incomesTable = page.locator('table');
    }

    public async navigate(): Promise<void> {
        await this.page.goto('/incomes');
        await expect(this.addIncomeButton).toBeVisible({ timeout: 10000 });
    }

    public async openNewIncomeForm(): Promise<void> {
        await this.addIncomeButton.click();
        await expect(this.incomeAmountInput).toBeVisible({ timeout: 5000 });
    }

    public async fillAndSaveNewIncome(amount: string, comment: string): Promise<void> {
        await this.incomeAmountInput.fill(amount);
        await this.commentInput.fill(comment);
        await this.saveIncomeButton.click();
    }

    public getIncomeRowLocator(amount: string, comment: string): Locator {
        return this.incomesTable
            .locator('tr')
            .filter({ hasText: amount })
            .filter({ hasText: comment });
    }
}
