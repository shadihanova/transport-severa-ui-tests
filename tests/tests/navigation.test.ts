import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage'; 
import { UI_TEXTS } from '../data/texts';

test.describe('Боковое меню навигации', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigate(''); // Переходим на главную
  });

  // --- БЛОК NO-AUTH ---

  test('1. Открытие, проверка элементов и закрытие бокового меню [TESTY-1156]', { tag: ['@no-auth'] }, async () => {
    await test.step('Открыть боковое меню', async () => {
      await basePage.menuButton.click();
      await expect(basePage.sideMenu).toBeVisible();
      await expect(basePage.closeMenuBtn).toBeVisible();
      await expect(basePage.logoImage).toBeVisible();
      await expect(basePage.logoImage).toHaveAttribute('src', /.*north-transport\.svg/);
      await expect(basePage.sideMenuBody).toBeVisible();
      await expect(basePage.sideMenuFooter).toBeVisible();
    });

    await test.step('Проверить наличие всех пунктов меню и текста в футере', async () => {
      await expect(basePage.menuRoutes).toBeVisible();
      await expect(basePage.menuStops).toBeVisible();
      await expect(basePage.menuNews).toBeVisible();
      await expect(basePage.menuPolls).toBeVisible();
      await expect(basePage.menuAbout).toBeVisible();
      await expect(basePage.menuAuthorizeButton).toBeVisible();
      
      expect(await basePage.getMenuFooterText()).toEqual(UI_TEXTS.footerCopyright);
    });

    await test.step('Закрыть боковое меню по крестику', async () => {
      await basePage.closeMenuBtn.click();
      await expect(basePage.sideMenu).toBeHidden();
    });
  });

  test('2. Переход в раздел «Маршруты» через меню и автозакрытие [TESTY-1157]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuRoutes.click();
    
    await expect(basePage.page).toHaveURL(/.*\/#\/routes/);
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('3. Переход в раздел «Остановки» через меню [TESTY-1158]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuStops.click();
    
    await expect(basePage.page).toHaveURL(/.*\/#\/stops/);
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('4. Редирект на /login при клике на «Избранное» (неавторизованный) [TESTY-1159]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuFavourites.click();
    
    // Проверяем редирект на логин
    await expect(basePage.page).toHaveURL(/.*\/#\/login/);
  });

  test('5. Переход в раздел «Новости» через меню [TESTY-1160]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuNews.click();
    
    await expect(basePage.page).toHaveURL(/.*\/#\/news/);
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('6. Редирект на /login при клике на «Опросы» (неавторизованный) [TESTY-1161]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuPolls.click();
    
    // Проверяем редирект на логин
    await expect(basePage.page).toHaveURL(/.*\/#\/login/);
  });

  test('7. Переход в раздел «Справка» через меню [TESTY-1162]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuAbout.click();
    
    await expect(basePage.page).toHaveURL(/.*\/#\/info/); 
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('8. Переход в раздел «Гид по порталу» через меню [TESTY-1163]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuGuide.click();
    
    await expect(basePage.page).toHaveURL(/.*\/#\/guide/); 
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('9. Наличие кнопки «Вход» для неавторизованного пользователя [TESTY-1164]', { tag: ['@no-auth'] }, async () => {
    await basePage.menuButton.click();
    
    await expect(basePage.menuAuthorizeButton).toBeVisible();
    await expect(basePage.menuLogoutButton).toBeHidden();
  });

  // --- БЛОК AUTH ---

  test('10. Переход в раздел «Избранное» авторизованным пользователем [TESTY-1165]', { tag: ['@auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuFavourites.click();
    
    // Проверяем, что открылось Избранное, а не редирект на логин
    await expect(basePage.page).toHaveURL(/.*\/#\/favorites/);
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('11. Переход в раздел «Опросы» авторизованным пользователем [TESTY-1166]', { tag: ['@auth'] }, async () => {
    await basePage.menuButton.click();
    await basePage.menuPolls.click();
    
    // Проверяем, что открылись Опросы, а не редирект на логин
    await expect(basePage.page).toHaveURL(/.*\/#\/polls/);
    await expect(basePage.sideMenu).toBeHidden();
  });

  test('12. Наличие кнопки «Выход» для авторизованного пользователя [TESTY-1167]', { tag: ['@auth'] }, async () => {
    await basePage.menuButton.click();
    
    // Проверяем, что кнопка Выход видна, а кнопки Вход нет
    await expect(basePage.menuLogoutButton).toBeVisible();
    await expect(basePage.menuAuthorizeButton).toBeHidden();
  });
});