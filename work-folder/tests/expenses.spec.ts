import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ExpensesPage } from '../src/pages/expenses.page';

test.describe('Expense Management Tests', () => {

    test.beforeEach(async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const userEmail = 'sanya.maximyuk@gmail.com';
        const userPassword = 'testTest5!';

        await loginPage.navigate();
        await loginPage.login(userEmail, userPassword);
    });

    test('should add a new expense entry', async ({ page }): Promise<void> => {

        const expensesPage = new ExpensesPage(page);
        const amount = '8888';
        const comment = `expenses ${Date.now()}`;

        await expensesPage.navigateToExpensesSection();
        await expensesPage.openNewExpenseForm();
        await expensesPage.addNewExpense(amount, comment);

        await expect(expensesPage.expenseAmountInput).not.toBeVisible({ timeout: 5000 });
    });

    test('should edit an existing expense entry', async ({ page }): Promise<void> => {

        const expensesPage = new ExpensesPage(page);
        const initialAmount = '1234';
        const updatedAmount = '3333';
        const comment = `edit-me ${Date.now()}`;

        await expensesPage.navigateToExpensesSection();
        await expensesPage.openNewExpenseForm();
        await expensesPage.addNewExpense(initialAmount, comment);
        await expect(expensesPage.getExpenseRowLocator(initialAmount, comment)).toBeVisible({ timeout: 10000 });

        await expensesPage.clickEditOnExpense(initialAmount, comment);
        await expensesPage.editExpenseAmount(updatedAmount);

        await expect(expensesPage.getExpenseRowLocator(initialAmount, comment)).not.toBeVisible();
        await expect(expensesPage.getExpenseRowLocator(updatedAmount, comment)).toBeVisible({ timeout: 10000 });
    });

    test('should delete an existing expense entry', async ({ page }): Promise<void> => {

        const expensesPage = new ExpensesPage(page);
        const amount = '9999';
        const comment = `delete-me ${Date.now()}`;

        await expensesPage.navigateToExpensesSection();
        await expensesPage.openNewExpenseForm();
        await expensesPage.addNewExpense(amount, comment);

        await expect(expensesPage.getExpenseRowLocator(amount, comment)).toBeVisible({ timeout: 10000 });

        await expensesPage.clickDeleteOnExpense(amount, comment);

        await expect(expensesPage.getExpenseRowLocator(amount, comment)).not.toBeVisible({ timeout: 10000 });
    });
});
