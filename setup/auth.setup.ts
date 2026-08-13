import { expect, test as setup } from '@playwright/test';
import { USERS, AUTH_STORAGE_PATHS } from '../tests/data/users';
import { LoginPage } from '../tests/pages';

// ===== Авторизация первого пользователя (USER 1) =====
setup('Авторизация user-1 и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.menuButton.click();
  await loginPage.menuAuthorizeButton.click();
  await expect(loginPage.loginModal).toBeVisible();

  // Логинимся кредами USER 1 из .env
  await loginPage.login(USERS.user1.email, USERS.user1.password);
  await expect(loginPage.getMenuProfileButton('Иван Иванов')).toBeVisible();

  await page.context().storageState({ path: AUTH_STORAGE_PATHS.user1 });
});

// ===== Авторизация второго пользователя (USER 2) =====
setup('Авторизация user-2 и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.menuButton.click();
  await loginPage.menuAuthorizeButton.click();
  await expect(loginPage.loginModal).toBeVisible();

  // Логинимся кредами USER 2 из .env
  await loginPage.login(USERS.user2.email, USERS.user2.password);
  await expect(loginPage.getMenuProfileButton('Петр Петров')).toBeVisible();

  await page.context().storageState({ path: AUTH_STORAGE_PATHS.user2 });
});
