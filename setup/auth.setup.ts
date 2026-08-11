import { test as setup } from '@playwright/test';
import { USERS, AUTH_STORAGE_PATHS } from '../tests/data/users';
import { LoginPage } from '../tests/pages';

// ===== Авторизация первого пользователя (USER 1) =====
setup('Авторизация user-1 и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Логинимся кредами USER 1 из .env
  await loginPage.login(USERS.user1.username, USERS.user1.password);

  // TODO: Раскомментировать/уточнить проверку после готовности авторизации
  // await expect(page.getByTestId('user-profile')).toBeVisible();

  // Сохраняем стейт первого пользователя
  await page.context().storageState({ path: AUTH_STORAGE_PATHS.user1 });
});

// ===== Авторизация второго пользователя (USER 2) =====
setup('Авторизация user-2 и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Логинимся кредами USER 2 из .env
  await loginPage.login(USERS.user2.username, USERS.user2.password);

  // TODO: Раскомментировать/уточнить проверку
  // await expect(page.getByTestId('user-profile')).toBeVisible();

  // Сохраняем стейт второго пользователя
  await page.context().storageState({ path: AUTH_STORAGE_PATHS.user2 });
});
