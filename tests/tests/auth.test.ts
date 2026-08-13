import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';
import { USERS } from '../data/users';
import { invalidEmails, invalidNames, invalidPasswords, VALID_USER } from '../data/consts';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../data/messages';

test.describe('Авторизация и регистрация', () => {
  let loginPage: LoginPage;

  // Выполняется перед каждым тестом в файле
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test(
    '1. Валидация полей формы регистрации: Проверка обязательности полей и подсветок невалидных данных',
    { tag: ['@no-auth'] },
    async () => {
      await test.step('0. Открытие формы регистрации', async () => {
        await loginPage.menuButton.click();
        await loginPage.menuAuthorizeButton.click();
        await expect(loginPage.loginModal).toBeVisible();
        await loginPage.makeAccountButton.click();
        for (const element of loginPage.registrationFormElements) {
          await expect(element).toBeVisible();
        }
      });

      await test.step('1. Оставить все поля формы пустыми и кликнуть на кнопку «Зарегистрироваться»', async () => {
        await loginPage.submitRegistrationButton.click();
        await expect(loginPage.flashError).toBeVisible();
        await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidRegistration);
        await expect(loginPage.flashError).toBeHidden();
        // todo: считаю что должно быть
        // await expect.soft(loginPage.regNameGroupWithError).toBeVisible();
        // await expect.soft(loginPage.regSurnameGroupWithError).toBeVisible();
        // await expect.soft(loginPage.regEmailGroupWithError).toBeVisible();
        // await expect.soft(loginPage.regPasswordGroupWithError).toBeVisible();
        // await expect.soft(loginPage.regPasswordConfirmGroupWithError).toBeVisible();
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
          await expect.soft(loginPage.regEmailGroupWithError).toBeVisible(); // добавлено .soft
        }
      });

      await test.step('5. Ввести в поле "Пароль" невалидные значения', async () => {
        for (const password of invalidPasswords) {
          await loginPage.regPasswordInput.fill(password);
          await expect.soft(loginPage.regPasswordGroupWithError).toBeVisible(); // добавлено .soft
        }
      });
    },
  );

  test('2. Позитивная регистрация нового пользователя с автозаполнением формы входа', { tag: ['@no-auth'] }, async () => {
    const testUser = VALID_USER;

    await test.step('0. Открытие формы регистрации', async () => {
      await loginPage.menuButton.click();
      await loginPage.menuAuthorizeButton.click();

      // Ждем, пока откроется модалка входа
      await expect(loginPage.loginModal).toBeVisible();

      await loginPage.makeAccountButton.click();
      for (const element of loginPage.registrationFormElements) {
        await expect(element).toBeVisible();
      }
    });

    await test.step('1. Заполнение формы регистрации', async () => {
      await loginPage.fillRegisterForm(testUser);
      await expect(loginPage.regNameGroupWithError).toBeHidden();
      await expect(loginPage.regSurnameGroupWithError).toBeHidden();
      await expect(loginPage.regEmailGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordGroupWithError).toBeHidden();
      await expect(loginPage.regPasswordConfirmGroupWithError).toBeHidden();
    });
    // раскоментировать когда будет метод на удаление пользователей портала
    // await test.step('2. Нажать кнопку «Зарегистрироваться»', async () => {
    //   await loginPage.submitRegistrationButton.click();
    //   await expect(loginPage.flashSuccess).toBeVisible();
    //   await expect(loginPage.flashSuccess).toContainText(SUCCESS_MESSAGES.successRegistration);
    //   await expect(loginPage.flashSuccess).toBeHidden();
    //
    // });

    // await test.step('3. Проверить состояние полей модального окна входа', async () => {
    //   await expect(loginPage.registrationModal).toBeHidden();
    //   await expect(loginPage.loginModal).toBeVisible();
    //   await expect(loginPage.loginModalTitle).toContainText('Вход');
    //   for (const element of loginPage.loginFormElements) {
    //     await expect(element).toBeVisible();
    //   }
    //   await expect(loginPage.authEmailInput).toHaveValue(testUser.email);
    //   await expect(loginPage.authPasswordInput).toHaveValue(testUser.password);
    //   await expect(loginPage.rememberMeCheckbox).toBeChecked();
    // });

    // await test.step('4. Проверить вход только что зарегистрированного пользователя', async () => {
    //   await loginPage.submitLoginButton.click();
    //   await expect(loginPage.menuLogoutButton).toBeVisible();
    //   const fullName = `${testUser.name} ${testUser.surname}`;
    //   await expect(loginPage.getMenuProfileButton(fullName)).toBeVisible();
    // });
  });

  test('3. Негативный вход в систему с неверным паролем/email', { tag: ['@no-auth'] }, async () => {
    await test.step('1. Заполнение формы входа невалидным паролем и существующим Email', async () => {
      await loginPage.menuButton.click();
      await loginPage.menuAuthorizeButton.click();
      await loginPage.authEmailInput.fill(USERS.user1.email);
      await loginPage.authPasswordInput.fill('WrongPassword123!');
      await loginPage.submitLoginButton.click();
      await expect(loginPage.flashError).toBeVisible();
      await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidCredentials);
      await expect(loginPage.flashError).toBeHidden();
    });

    await test.step('2. Заполнение формы входа незарегистрирвоанным Email', async () => {
      await loginPage.authEmailInput.fill('WrongEmail123@test.ru');
      await loginPage.authPasswordInput.fill(USERS.user1.password!);
      await loginPage.submitLoginButton.click();
      await expect(loginPage.flashError).toBeVisible();
      await expect(loginPage.flashError).toContainText(ERROR_MESSAGES.invalidCredentials);
      await expect(loginPage.flashError).toBeHidden();
    });
  });

  test('4. Успешная авторизация пользователя по Email и паролю', { tag: ['@no-auth'] }, async () => {
    await test.step('1. Заполнение формы входа зарегистрированным пользователем', async () => {
      await loginPage.menuButton.click();
      await loginPage.menuAuthorizeButton.click();
      await loginPage.authEmailInput.fill(USERS.user1.email);
      await loginPage.authPasswordInput.fill(USERS.user1.password!);
    });

    await test.step('2. Вход и проверка состояния профиля', async () => {
      await loginPage.submitLoginButton.click();
      await expect(loginPage.flashSuccess).toBeVisible();
      await expect(loginPage.flashSuccess).toContainText(SUCCESS_MESSAGES.successLogin);
      await expect(loginPage.flashSuccess).toBeHidden();

      await expect(loginPage.menuLogoutButton).toBeVisible();
      const fullName = `${USERS.user1.name} ${USERS.user1.surname}`;
      await expect(loginPage.getMenuProfileButton(fullName)).toBeVisible();
    });
  });

  test('5. Сохранение авторизационной сессии через чекбокс «Оставаться в системе»', { tag: ['@no-auth'] }, async ({ page, browser }) => {
    await test.step('1. Ввод данных и активация чекбокса «Оставаться в системе»', async () => {
      await loginPage.menuButton.click();
      await loginPage.menuAuthorizeButton.click();
      await loginPage.authEmailInput.fill(USERS.user1.email);
      await loginPage.authPasswordInput.fill(USERS.user1.password!);
      await loginPage.rememberMeCheckbox.check();
      await expect(loginPage.rememberMeCheckbox).toBeChecked();
    });

    await test.step('2. Авторизация', async () => {
      await loginPage.submitLoginButton.click();
      await expect(loginPage.menuLogoutButton).toBeVisible();
    });

    await test.step('3. Имитация закрытия браузера и проверка сохранения сессии', async () => {
      // 1. Вытаскиваем сохраненные данные (localStorage и куки) из текущей сессии
      const state = await page.context().storageState();

      // 2. Создаем НОВЫЙ контекст и ПЕРЕДАЕМ ЕМУ эти данные
      const newContext = await browser.newContext({ storageState: state });
      const newPage = await newContext.newPage();
      const newLoginPage = new LoginPage(newPage);

      await newLoginPage.goto();

      // Проверяем, что сессия СОХРАНИЛАСЬ
      await newLoginPage.menuButton.click();
      const fullName = `${USERS.user1.name} ${USERS.user1.surname}`;
      await expect(newLoginPage.getMenuProfileButton(fullName)).toBeVisible();
      await expect(newLoginPage.menuLogoutButton).toBeVisible();

      // Закрываем контекст за собой
      await newContext.close();
    });
  });

  test('8 Успешный выход из системы (Logout)', { tag: ['@auth'] }, async () => {
    await test.step('1. Выход и проверка состояния профиля', async () => {
      await loginPage.menuButton.click();
      await expect(loginPage.menuLogoutButton).toBeVisible();
      await loginPage.menuLogoutButton.click();
      await expect(loginPage.menuLogoutButton).toBeHidden();
      const fullName = `${USERS.user1.name} ${USERS.user1.surname}`;
      await expect(loginPage.getMenuProfileButton(fullName)).toBeHidden();
      await expect(loginPage.menuAuthorizeButton).toBeVisible();
    });
  });

  // test('9. Разрыв авторизационной сессии без чекбокса «Оставаться в системе»', { tag: ['@no-auth'] }, async ({ page, browser }) => {
  //   await test.step('1. Ввод данных без активации чекбокса', async () => {
  //     await loginPage.menuButton.click();
  //     await loginPage.menuAuthorizeButton.click();
  //     await loginPage.authEmailInput.fill(USERS.user2.email);
  //     await loginPage.authPasswordInput.fill(USERS.user2.password!);
  //     await loginPage.rememberMeCheckbox.uncheck();
  //     await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  //   });

  //   await test.step('2. Авторизация', async () => {
  //     await loginPage.submitLoginButton.click();
  //     await expect(loginPage.menuLogoutButton).toBeVisible();
  //   });

  //   await test.step('3. Имитация закрытия браузера (открытие новой вкладки)', async () => {
  //     // 1. Вытаскиваем сохраненные данные из текущей сессии
  //     const state = await page.context().storageState();

  //     // 2. Создаем НОВЫЙ контекст и ПЕРЕДАЕМ ЕМУ эти данные
  //     const newContext = await browser.newContext({ storageState: state });
  //     const newPage = await newContext.newPage();
  //     const newLoginPage = new LoginPage(newPage);
  //     await newLoginPage.goto();

  //     // Проверяем, что сессия сбросилась, несмотря на переданный state.
  //     // Это доказывает, что токен не был сохранен в localStorage.
  //     await newLoginPage.menuButton.click();
  //     await expect(newLoginPage.menuAuthorizeButton).toBeVisible();
  //     await expect(newLoginPage.menuLogoutButton).toBeHidden();

  //     // Закрываем контекст за собой
  //     await newContext.close();
  //   });
  // });
});
