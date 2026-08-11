import { test, expect } from '@playwright/test';
import { MapPage } from '../pages';
import { UI_TEXTS } from '../data/texts';

test.describe('Главная страница и карта', () => {
  test('1. UI: Проверка состава элементов управления ГИС-карты', { tag: ['@no-auth'] }, async ({ page }) => {
    const mapPage = new MapPage(page);

    await test.step('Открытие главной страницы', async () => {
      await mapPage.goto();
    });

    await test.step('Проверка загрузки Canvas карты', async () => {
      await expect(mapPage.mapCanvas).toBeVisible();
    });

    await test.step('Проверка панелей и поиска', async () => {
      await expect(mapPage.menuButton).toBeVisible();
      await expect(mapPage.searchInput).toBeVisible();
      await expect(mapPage.routeButton).toBeVisible();
      await expect(mapPage.toggleButton).toBeVisible();
      await expect(mapPage.zoomInButton).toBeVisible();
      await expect(mapPage.zoomOutButton).toBeVisible();
      await expect(mapPage.myLocationButton).toBeVisible();
      await expect(mapPage.stopsCheckbox).toBeVisible();
      await expect(mapPage.roadsCheckbox).toBeVisible();
      await expect(mapPage.closuresCheckbox).toBeVisible();
      await expect(mapPage.accessibleCheckbox).toBeVisible();
    });
  });

  test('2. UI: Взаимодействие с кнопкой «Меню» и отображение содержимого Левой Панели (ЛП)', { tag: ['@no-auth'] }, async ({ page }) => {
    const mapPage = new MapPage(page);
    await mapPage.goto();

    await test.step('Шаг 1. Открыть боковое меню', async () => {
      await mapPage.menuButton.click();
      await expect(mapPage.sideMenu).toBeVisible();
      // Проверяем наличие всех пунктов меню и текста в футере
      await expect(mapPage.menuRoutes).toBeVisible();
      await expect(mapPage.menuStops).toBeVisible();
      await expect(mapPage.menuNews).toBeVisible();
      await expect(mapPage.menuPolls).toBeVisible();
      await expect(mapPage.menuAbout).toBeVisible();
      await expect(mapPage.menuAuthorizeBtn).toBeVisible();
      expect(await mapPage.getMenuFooterText()).toEqual(UI_TEXTS.footerCopyright);
    });

    await test.step('Шаг 2. Закрыть боковое меню', async () => {
      await mapPage.closeMenuBtn.click();
      await expect(mapPage.sideMenu).toBeHidden();
    });

    await test.step('Шаг 3. Развернуть левую панель и проверить содержимое', async () => {
      await mapPage.toggleButton.click();
      await expect(mapPage.leftPanel).toBeVisible();
      await expect(mapPage.toggleButton).toHaveClass(/active/);
      // Проверяем, что в развернутой панели есть перечни маршрутов и остановок
      await expect(mapPage.leftPanel.getByText('Городские маршруты')).toBeVisible();
      await expect(mapPage.leftPanel.getByText('Ближайшие остановочные пункты')).toBeVisible();
    });

    await test.step('Шаг 4. Свернуть левую панель', async () => {
      // Убедимся, что панель изначально развернута, а у кнопки есть класс 'active'
      await expect(mapPage.leftPanel).toBeVisible();
      await expect(mapPage.toggleButton).toHaveClass(/active/);
      await mapPage.toggleButton.click();
      await expect(mapPage.leftPanel).toBeHidden();
      await expect(mapPage.toggleButton).not.toHaveClass(/active/);
    });
  });
});
