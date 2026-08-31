import { test, expect } from '../fixtures';
import { UI_TEXTS } from '@data/texts';

test.describe('Боковое меню навигации', () => {
  // --- БЛОК БЕЗ АВТОРИЗАЦИИ ---
  test.describe('Гостевой режим', { tag: '@no-auth' }, () => {
    test('1. Открытие, проверка элементов и закрытие бокового меню [TESTY-1156]', async ({ mapPage }) => {
      await test.step('Открыть боковое меню и проверить структуру', async () => {
        await mapPage.menuButton.click();
        await expect(mapPage.sideMenu).toBeVisible();
        await expect(mapPage.closeMenuBtn).toBeVisible();
        await expect(mapPage.logoImage).toBeVisible();
        await expect(mapPage.sideMenuBody).toBeVisible();
        await expect(mapPage.sideMenuFooter).toBeVisible();
      });

      await test.step('Проверить список пунктов и футер', async () => {
        await expect(mapPage.menuRoutes).toBeVisible();
        await expect(mapPage.menuStops).toBeVisible();
        await expect(mapPage.menuNews).toBeVisible();
        await expect(mapPage.menuPolls).toBeVisible();
        await expect(mapPage.menuAbout).toBeVisible();
        await expect(mapPage.menuAuthorizeButton).toBeVisible();

        expect(await mapPage.getMenuFooterText()).toEqual(UI_TEXTS.footerCopyright);
      });

      await test.step('Закрыть боковое меню по крестику', async () => {
        await mapPage.closeMenuBtn.click();
        await expect(mapPage.sideMenu).toBeHidden();
      });
    });

    test('2. Переход в раздел «Маршруты» через меню и автозакрытие [TESTY-1157]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuRoutes.click();

      await expect(page).toHaveURL(/.*\/#\/routes/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('3. Переход в раздел «Остановки» через меню [TESTY-1158]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuStops.click();

      await expect(page).toHaveURL(/.*\/#\/stops/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('4. Редирект на /login при клике на «Избранное» (неавторизованный) [TESTY-1159]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuFavourites.click();

      await expect(page).toHaveURL(/.*\/#\/login/);
    });

    test('5. Переход в раздел «Новости» через меню [TESTY-1160]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuNews.click();

      await expect(page).toHaveURL(/.*\/#\/news/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('6. Редирект на /login при клике на «Опросы» (неавторизованный) [TESTY-1161]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuPolls.click();

      await expect(page).toHaveURL(/.*\/#\/login/);
    });

    test('7. Переход в раздел «Справка» через меню [TESTY-1162]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuAbout.click();

      await expect(page).toHaveURL(/.*\/#\/info/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('8. Переход в раздел «Гид по порталу» через меню [TESTY-1163]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuGuide.click();

      await expect(page).toHaveURL(/.*\/#\/guide/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('9. Наличие кнопки «Вход» для неавторизованного пользователя [TESTY-1164]', async ({ mapPage }) => {
      await mapPage.menuButton.click();
      await expect(mapPage.menuAuthorizeButton).toBeVisible();
      await expect(mapPage.menuLogoutButton).toBeHidden();
    });
  });

  // --- БЛОК С АВТОРИЗАЦИЕЙ ---
  test.describe('Авторизованный режим', { tag: '@auth' }, () => {
    test('10. Переход в раздел «Избранное» авторизованным пользователем [TESTY-1165]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuFavourites.click();

      await expect(page).toHaveURL(/.*\/#\/favorites/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('11. Переход в раздел «Опросы» авторизованным пользователем [TESTY-1166]', async ({ mapPage, page }) => {
      await mapPage.menuButton.click();
      await mapPage.menuPolls.click();

      await expect(page).toHaveURL(/.*\/#\/polls/);
      await expect(mapPage.sideMenu).toBeHidden();
    });

    test('12. Наличие кнопки «Выход» для авторизованного пользователя [TESTY-1167]', async ({ mapPage }) => {
      await mapPage.menuButton.click();
      await expect(mapPage.menuLogoutButton).toBeVisible();
      await expect(mapPage.menuAuthorizeButton).toBeHidden();
    });
  });
});
