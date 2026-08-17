import { test, expect } from '@playwright/test';
import { MapPage } from '../pages';

test.describe('Карта и гео-слои', () => {
  let mapPage: MapPage;

  test.beforeEach(async ({ page }) => {
    mapPage = new MapPage(page);

    await test.step('Предусловие: Открытие главной страницы и ожидание загрузки карты', async () => {
      await mapPage.goto();
      await expect(mapPage.mapCanvas).toBeVisible();
    });
  });
  
  test('1. UI: Проверка состава элементов управления ГИС-карты [TESTY-1200]', { tag: ['@no-auth'] }, async () => {
    await test.step('Шаг 1. Проверка элементов управления в верхней части экрана', async () => {
      // Локаторы берутся из BasePage, так как они общие для всего приложения
      await expect(mapPage.searchInput).toBeVisible();
      await expect(mapPage.menuButton).toBeVisible();
      await expect(mapPage.routeButton).toBeVisible();
      await expect(mapPage.toggleButton).toBeVisible();
    });

    await test.step('Шаг 2. Проверка элементов управления в правой и нижней частях карты', async () => {
      // Локаторы берутся из MapPage
      await expect(mapPage.zoomInButton).toBeVisible();
      await expect(mapPage.zoomOutButton).toBeVisible();
      await expect(mapPage.myLocationButton).toBeVisible();
      
      // Проверка панели чекбоксов (нижняя панель)
      await expect(mapPage.stopsCheckbox).toBeVisible();
      await expect(mapPage.roadsCheckbox).toBeVisible();
      await expect(mapPage.closuresCheckbox).toBeVisible();
      await expect(mapPage.accessibleCheckbox).toBeVisible();
    });
  });

  // Тест 2 (TESTY-1201) проверяет и меню, и сайдбар. 
  // Он остается здесь как заглушка, так как в TMS он лежит в наборе "Карта".
  test('2. UI: Взаимодействие с кнопкой «Меню» и кнопкой сворачивания ЛП [TESTY-1201]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать проверку открытия меню, сворачивания ЛП и отображения маршрутов в ЛП'); 
  });

  // Ниже представлены заглушки тестов 3-16. Они остаются без изменений!
  test('3. UI: Масштабирование ГИС-карты [TESTY-1202]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('4. UI: Центрирование карты по кнопке «Мое местоположение» [TESTY-1203]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('5. Визуализация и цвета мелких маркеров ТС при отдаленном масштабе [TESTY-1204]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('6. Трансформация маркеров ТС в крупные элементы [TESTY-1205]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('7. Интерактивность: Открытие карточки остановки по клику на маркер [TESTY-1206]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('8. Интерактивность: Открытие карточки маршрута ТС по клику на маркер [TESTY-1207]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('9. Включение и отключение слоя «Остановки» [TESTY-1208]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('10. Фильтрация транспорта по признаку «Для маломобильных» [TESTY-1209]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('11. Включение слоя «Дороги» и появление кнопки фильтрации [TESTY-1210]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('12. Точечная фильтрация дорог и мероприятий через поп-ап окно [TESTY-1211]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('13. Проверка тултипа при наведении на остановку [TESTY-1212]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('14. Проверка тултипа при наведении на маркер ТС [TESTY-1213]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('15. Проверка тултипа при наведении на участок дороги [TESTY-1214]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });

  test('16. E2E: Отображение слоя «Перекрытия» при публикации объекта из «Трансфлоу» [TESTY-1215]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест'); 
  });
});