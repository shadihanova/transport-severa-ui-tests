import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';
import { USERS } from '../data/users';
import { invalidEmails, invalidNames, invalidPasswords } from '../data/consts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../data/messages';

test.describe('Авторизация и регистрация', () => {
  test(
    '1. Валидация полей формы регистрации: Проверка обязательности полей и подсветок невалидных данных',
    { tag: ['@no-auth'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await test.step('Открытие главной страницы', async () => {
        await loginPage.goto();
      });

      await test.step('0. Открытие формы регистрации', async () => {
        await loginPage.makeAccountButton.click();
        for (const element of loginPage.registrationFormElements) {
          await expect(element).toBeVisible();
        }
      });

      await test.step('1. Оставить все поля формы пустыми и кликнуть на кнопку «Зарегистрироваться»', async () => {
        await loginPage.submitRegistrationButton.click();
        await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidRegistration);
        // await expect(loginPage.regNameInput).toHaveClass(/is-invalid/);
        // await expect(loginPage.regSurnameInput).toHaveClass(/is-invalid/);
        // await expect(loginPage.regEmailInput).toHaveClass(/is-invalid/);
        // await expect(loginPage.regPasswordInput).toHaveClass(/is-invalid/);
        // await expect(loginPage.regPasswordConfirmInput).toHaveClass(/is-invalid/);
      });

      await test.step('2. Ввести в поле "Имя" невалидные значения', async () => {
        for (const name of invalidNames) {
          await loginPage.regNameInput.fill(name);
          await expect.soft(loginPage.regNameGroupWithError).toBeVisible();
        }
      });

      await test.step('3. Ввести в поле "Фамилия" невалидные значения', async () => {
        for (const surnname of invalidNames) {
          await loginPage.regSurnameInput.fill(surnname);
          await expect.soft(loginPage.regSurnameGroupWithError).toBeVisible();
        }
      });

      await test.step('4. Ввести в поле "Email" невалидные значения', async () => {
        for (const email of invalidEmails) {
          await loginPage.regEmailInput.fill(email);
          await expect(loginPage.regEmailGroupWithError).toBeVisible();
        }
      });

      await test.step('5. Ввести в поле "Пароль" невалидные значения', async () => {
        for (const password of invalidPasswords) {
          await loginPage.regPasswordInput.fill(password);
          await expect(loginPage.regPasswordGroupWithError).toBeVisible();
        }
      });

      await test.step('6. Проверка несовпадения паролей', async () => {
        await loginPage.regPasswordInput.fill('qwert');
        await expect(loginPage.regPasswordGroupWithError).toBeHidden();
        await loginPage.regPasswordConfirmInput.fill('qwerе');
        await expect(loginPage.regPasswordConfirmGroupWithError).toBeVisible();
      });
    },
  );

  test('2. Позитивная регистрация нового пользователя с автозаполнением формы входа', { tag: ['@no-auth'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Открытие главной страницы', async () => {
      await loginPage.goto();
    });

    await test.step('0. Открытие формы регистрации', async () => {
      await loginPage.makeAccountButton.click();
      for (const element of loginPage.registrationFormElements) {
        await expect(element).toBeVisible();
      }
    });

    await test.step('1. Заполнение формы регистрации', async () => {
      await loginPage.fillRegisterForm();
      await expect(loginPage.regNameGroupWithError).toBeHidden();
      await expect(loginPage.regSurnameGroupWithError).toBeHidden();
      await expect(loginPage.regEmailGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordConfirmGroupWithError).toBeHidden();
    });
  });
});
