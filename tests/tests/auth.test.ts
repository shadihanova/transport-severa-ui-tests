import { test, expect } from '../fixtures';
import { LoginPage } from '@pages';
import { USERS } from '@data/users';
import { INVALID_REGISTRATION_DATA, VALID_USER } from '@data/consts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@data/messages';

test.describe('Авторизация и регистрация', { tag: '@no-auth' }, () => {
  // --- БЛОК РЕГИСТРАЦИИ ---
  test.describe('Регистрация', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.openRegistrationModal();
      await expect(loginPage.registrationModal).toBeVisible();
    });

    test('1. Валидация полей формы регистрации: Проверка обязательности полей и подсветок невалидных данных [TESTY-1132]', async ({
      loginPage,
    }) => {
      await test.step('Отправка пустой формы', async () => {
        await loginPage.submitRegistrationButton.click();
        await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidRegistration);
      });

      await test.step('Валидация поля "Имя"', async () => {
        for (const name of INVALID_REGISTRATION_DATA.names) {
          await loginPage.regNameInput.fill(name);
          await expect.soft(loginPage.regNameGroupWithError).toBeVisible();
        }
      });

      await test.step('Валидация поля "Фамилия"', async () => {
        for (const surname of INVALID_REGISTRATION_DATA.names) {
          await loginPage.regSurnameInput.fill(surname);
          await expect.soft(loginPage.regSurnameGroupWithError).toBeVisible();
        }
      });

      await test.step('Валидация поля "Email"', async () => {
        for (const email of INVALID_REGISTRATION_DATA.emails) {
          await loginPage.regEmailInput.fill(email);
          await expect.soft(loginPage.regEmailGroupWithError).toBeVisible();
        }
      });

      await test.step('Валидация поля "Пароль"', async () => {
        for (const password of INVALID_REGISTRATION_DATA.passwords) {
          await loginPage.regPasswordInput.fill(password);
          await expect.soft(loginPage.regPasswordGroupWithError).toBeVisible();
        }
      });
    });

    test('2. Позитивная регистрация нового пользователя с автозаполнением формы входа [TESTY-1133]', async ({ loginPage }) => {
      await loginPage.fillRegisterForm(VALID_USER);

      await expect(loginPage.regNameGroupWithError).toBeHidden();
      await expect(loginPage.regSurnameGroupWithError).toBeHidden();
      await expect(loginPage.regEmailGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordConfirmGroupWithError).toBeHidden();
    });

    test('10. Регистрация с уже зарегистрированным Email [TESTY-1141]', async ({ loginPage }) => {
      const duplicateUser = { ...VALID_USER, email: USERS.user1.email! };

      await loginPage.fillRegisterForm(duplicateUser);
      await loginPage.submitRegistrationButton.click();

      await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.emailAlreadyInUse);
      await expect(loginPage.registrationModal).toBeVisible();
    });
  });

  // --- БЛОК АВТОРИЗАЦИИ И СЕССИЙ ---
  test.describe('Вход и сессии', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.openLoginModal();
    });

    test('3. Негативный вход в систему с неверным паролем/email [TESTY-1134]', async ({ loginPage }) => {
      await test.step('Вход с неверным паролем', async () => {
        await loginPage.login(USERS.user1.email, 'WrongPassword123!');
        await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidCredentials);
      });

      await test.step('Вход с незарегистрированным Email', async () => {
        await loginPage.login('WrongEmail123@test.ru', USERS.user1.password!);
        await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidCredentials);
      });
    });

    test('4. Успешная авторизация пользователя по Email и паролю [TESTY-1135]', async ({ loginPage }) => {
      await loginPage.login(USERS.user1.email, USERS.user1.password!);

      await expect(loginPage.flashSuccess).toContainText(SUCCESS_MESSAGES.successLogin);
      await expect(loginPage.menuLogoutButton).toBeVisible();

      const fullName = `${USERS.user1.name} ${USERS.user1.surname}`;
      await expect(loginPage.getMenuProfileButton(fullName)).toBeVisible();
    });

    test('5. Сохранение сессии через чекбокс «Оставаться в системе» [TESTY-1136]', async ({ loginPage, page, browser }) => {
      await loginPage.authEmailInput.fill(USERS.user1.email);
      await loginPage.authPasswordInput.fill(USERS.user1.password!);
      await loginPage.rememberMeCheckbox.check();
      await expect(loginPage.rememberMeCheckbox).toBeChecked();

      await loginPage.submitLoginButton.click();
      await expect(loginPage.menuLogoutButton).toBeVisible();

      await test.step('Имитация закрытия браузера и проверка сессии', async () => {
        const state = await page.context().storageState();
        const newContext = await browser.newContext({ storageState: state });
        const newPage = await newContext.newPage();

        try {
          const newLoginPage = new LoginPage(newPage);
          await newLoginPage.navigate('');
          await newLoginPage.openMenu();

          const fullName = `${USERS.user1.name} ${USERS.user1.surname}`;
          await expect(newLoginPage.getMenuProfileButton(fullName)).toBeVisible();
          await expect(newLoginPage.menuLogoutButton).toBeVisible();
        } finally {
          await newContext.close();
        }
      });
    });
  });

  // --- БЛОК AUTH-ОПЕРАЦИЙ ---
  test('8. Успешный выход из системы (Logout) [TESTY-1139]', { tag: '@auth' }, async ({ loginPage }) => {
    await loginPage.openMenu();
    await expect(loginPage.menuLogoutButton).toBeVisible();

    await loginPage.menuLogoutButton.click();

    await expect(loginPage.menuLogoutButton).toBeHidden();
    await expect(loginPage.menuAuthorizeButton).toBeVisible();
  });
});
