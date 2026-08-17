import { test, expect } from '@playwright/test';
import { MapPage } from '../pages';
import { SIDEBAR_EXPECTED_DATA } from '../data/consts';

test.describe('Карта и гео-слои', () => {
  let mapPage: MapPage;

  test.beforeEach(async ({ page }) => {
    mapPage = new MapPage(page);

    await test.step('Предусловие: Открытие главной страницы и ожидание загрузки карты', async () => {
      await mapPage.goto();
      await expect(mapPage.mapCanvas).toBeVisible();
    });
  });

  test('1. UI: Проверка состава элементов управления ГИС-карты [TESTY-1068]', { tag: ['@no-auth'] }, async () => {
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

  test('2. UI: Взаимодействие с кнопкой «Меню» и кнопкой сворачивания ЛП [TESTY-1201]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });
  //   await test.step('Шаг 1. Нажать на кнопку «Меню» -> Открывается боковое главное меню', async () => {
  //     await mapPage.menuButton.click();
  //     await expect(mapPage.sideMenu).toBeVisible();
  //     await expect(mapPage.menuRoutes).toBeVisible();
  //     await expect(mapPage.menuStops).toBeVisible();
  //     await expect(mapPage.menuNews).toBeVisible();
  //     await expect(mapPage.menuAuthorizeButton).toBeVisible();
  //   });

  //   await test.step('Шаг 2. Нажать на кнопку закрытия (крестик) -> Меню закрывается', async () => {
  //     await mapPage.closeMenuBtn.click();
  //     await expect(mapPage.sideMenu).toBeHidden();
  //   });

  //   await test.step('Шаг 3. Нажать на кнопку разворачивания ЛП -> Левая панель разворачивается', async () => {
  //     await mapPage.toggleButton.click();
  //     await expect(mapPage.sidebar).toBeVisible();
  //     await expect(mapPage.toggleButton).toHaveClass(/active/);
  //   });

  //   await test.step('Шаг 4. Нажать на кнопку сворачивания ЛП -> Левая панель сворачивается', async () => {
  //     await mapPage.toggleButton.click();
  //     await expect(mapPage.sidebar).toBeHidden();
  //     await expect(mapPage.toggleButton).not.toHaveClass(/active/);
  //   });

  //   await test.step('Шаг 5. Проверить наличие всех 4-х заголовков в ЛП', async () => {
  //     await mapPage.toggleButton.click();
  //     for (const headerText of SIDEBAR_EXPECTED_DATA.headers) {
  //       await expect(mapPage.sidebar.getByText(headerText, { exact: true })).toBeVisible();
  //     }
  //   });

  //   await test.step('Шаг 6. Проверить секцию "Городские маршруты" (иконки, номера, цвета)', async () => {
  //     const transportData = SIDEBAR_EXPECTED_DATA.cityTransport;

  //     for (const transport of transportData) {
  //       // 1. Проверяем, что в секции есть хотя бы одна иконка (svg)
  //       const icon = mapPage.getTransportIconInSection(mapPage.cityRoutesSection);
  //       await expect(icon).toBeVisible();

  //       // 2. Проверяем номера и цвета
  //       for (const routeNumber of transport.routes) {
  //         const badge = mapPage.cityRouteBadges.filter({ hasText: routeNumber }).first();
  //         await expect(badge).toBeVisible();
  //         await expect(badge).toHaveCSS('background-color', transport.color);
  //       }
  //     }
  //   });

  //   await test.step('Шаг 7. Проверить секцию "Пригородные маршруты" (иконки, номера, цвета)', async () => {
  //     const transportData = SIDEBAR_EXPECTED_DATA.suburbanTransport;

  //     for (const transport of transportData) {
  //       const icon = mapPage.getTransportIconInSection(mapPage.suburbanRoutesSection);
  //       await expect(icon).toBeVisible();

  //       for (const routeNumber of transport.routes) {
  //         const badge = mapPage.suburbanRouteBadges.filter({ hasText: routeNumber }).first();
  //         await expect(badge).toBeVisible();
  //         await expect(badge).toHaveCSS('background-color', transport.color);
  //       }
  //     }
  //   });

  //   await test.step('Шаг 8. Проверить секцию "Междугородние маршруты" (иконки, номера, цвета)', async () => {
  //     const transportData = SIDEBAR_EXPECTED_DATA.intercityTransport;

  //     for (const transport of transportData) {
  //       const icon = mapPage.getTransportIconInSection(mapPage.intercityRoutesSection, transport.iconPath);
  //       await expect(icon).toBeVisible();

  //       for (const routeNumber of transport.routes) {
  //         const badge = mapPage.intercityRouteBadges.filter({ hasText: routeNumber }).first();
  //         await expect(badge).toBeVisible();
  //         await expect(badge).toHaveCSS('background-color', transport.color);
  //       }
  //     }
  //   });

  //   await test.step('Шаг 9. Проверить наличие ближайших остановок', async () => {
  //     for (const stopName of SIDEBAR_EXPECTED_DATA.stops) {
  //       await expect(mapPage.nearbyStopsSection.getByText(stopName, { exact: false })).toBeVisible();
  //     }
  //   });
  // });

  test('3. UI: Масштабирование ГИС-карты [TESTY-1070]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('4. UI: Центрирование карты по кнопке «Мое местоположение» [TESTY-1071]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('5. Визуализация и цвета мелких маркеров ТС при отдаленном масштабе [TESTY-1072]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('6. Трансформация маркеров ТС в крупные элементы [TESTY-1073]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('7. Интерактивность: Открытие карточки остановки по клику на маркер [TESTY-1074]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('8. Интерактивность: Открытие карточки маршрута ТС по клику на маркер [TESTY-1075]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('9. Включение и отключение слоя «Остановки» [TESTY-1076]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('10. Фильтрация транспорта по признаку «Для маломобильных» [TESTY-1077]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('11. Включение слоя «Дороги» и появление кнопки фильтрации [TESTY-1078]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('12. Точечная фильтрация дорог и мероприятий через поп-ап окно [TESTY-1079]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('13. Проверка тултипа при наведении на остановку [TESTY-1080]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('14. Проверка тултипа при наведении на маркер ТС [TESTY-1081]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('15. Проверка тултипа при наведении на участок дороги [TESTY-1082]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('16. E2E: Отображение слоя «Перекрытия» при публикации объекта из «Трансфлоу» [TESTY-1083]', { tag: ['@no-auth'] }, async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });
});
