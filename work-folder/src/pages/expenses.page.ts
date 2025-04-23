import { type Page, type Locator, expect } from '@playwright/test';

export class ExpensesPage {
    public readonly page: Page;
    public readonly sideNavExpensesLink: Locator;
    public readonly addExpenseButton: Locator;
    public readonly expenseAmountInput: Locator;
    public readonly commentInput: Locator;
    public readonly saveNewExpenseButton: Locator;
    public readonly expensesTable: Locator;
    public readonly editExpenseButton: Locator;
    public readonly editAmountInput: Locator;
    public readonly saveEditedExpenseButton: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.sideNavExpensesLink = page.getByRole('button', { name: /Витрати/i });

        this.addExpenseButton = page.getByRole('button', { name: /Додати Витрату/i });

        this.expenseAmountInput = page.locator('//*[@id="Expense-New"]');
        this.commentInput = page.locator('//*[@id="Comment-New"]');
        this.saveNewExpenseButton = page.locator('//*[@id="BtnAdd-New"]');

        this.expensesTable = page.locator('//*[@id="test-table"]/div/table/tbody');

        this.editExpenseButton = page.getByRole('button', { name: /Редагувати/i });

        this.editAmountInput = page.locator('//*[@id="Expense-24008293-613b-4c93-a132-86ad9ea78472"]');

        this.saveEditedExpenseButton = page.getByRole('button', { name: /Зберегти зміни/i });

    }

    public async navigateToExpensesSection(): Promise<void> {
        await this.sideNavExpensesLink.click();
        await expect(this.addExpenseButton).toBeVisible({ timeout: 10000 });
    }

    public async openNewExpenseForm(): Promise<void> {
        await this.addExpenseButton.click();
        await expect(this.expenseAmountInput).toBeVisible({ timeout: 5000 });
    }

    public async addNewExpense(amount: string, comment: string): Promise<void> {
        await this.expenseAmountInput.fill(amount);
        await this.commentInput.fill(comment);
        await this.saveNewExpenseButton.click();
    }

    public getExpenseRowLocator(amount: string, comment: string): Locator {
        return this.expensesTable
            .locator('tr, .expense-row')
            .filter({ hasText: amount })
            .filter({ hasText: comment });
    }

    public async clickEditOnExpense(amount: string, comment: string): Promise<void> {
        const rowLocator = this.getExpenseRowLocator(amount, comment);
        const editButton = rowLocator.getByRole('button', { name: /Редагувати/i });
        await editButton.click();
        await expect(this.editAmountInput).toBeVisible({ timeout: 5000 });
    }

    public async editExpenseAmount(newAmount: string): Promise<void> {
        await this.editAmountInput.fill(newAmount);
        await this.saveEditedExpenseButton.click();
    }

    public async clickDeleteOnExpense(amount: string, comment: string): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        const rowLocator = this.getExpenseRowLocator(amount, comment);
        const deleteButton = rowLocator.getByRole('button', { name: /Видалити/i });
        await deleteButton.click();
    }
}
