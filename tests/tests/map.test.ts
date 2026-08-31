/* eslint-disable playwright/expect-expect */
/* eslint-disable playwright/no-skipped-test */
import { test, expect } from '../fixtures';
import { SIDEBAR_EXPECTED_DATA } from '@data/consts';

test.describe('Карта и гео-слои', { tag: '@no-auth' }, () => {
  test('1. UI: Проверка состава элементов управления ГИС-карты [TESTY-1068]', async ({ mapPage }) => {
    await test.step('Шаг 1. Проверка контролов верхней панели', async () => {
      await expect(mapPage.searchInput).toBeVisible();
      await expect(mapPage.menuButton).toBeVisible();
      await expect(mapPage.routeButton).toBeVisible();
      await expect(mapPage.toggleButton).toBeVisible();
    });

    await test.step('Шаг 2. Проверка кнопок зума, геолокации и панели чекбоксов', async () => {
      await expect(mapPage.zoomInButton).toBeVisible();
      await expect(mapPage.zoomOutButton).toBeVisible();
      await expect(mapPage.myLocationButton).toBeVisible();

      await expect(mapPage.stopsCheckbox).toBeVisible();
      await expect(mapPage.roadsCheckbox).toBeVisible();
      await expect(mapPage.closuresCheckbox).toBeVisible();
      await expect(mapPage.accessibleCheckbox).toBeVisible();
    });
  });

  test('2. UI: Взаимодействие с кнопкой сворачивания/разворачивания ЛП [TESTY-1069]', async ({ mapPage }) => {
    await test.step('Развернуть Левую Панель (ЛП)', async () => {
      await mapPage.toggleButton.click();
      await expect(mapPage.sidebar).toBeVisible();
      await expect(mapPage.toggleButton).toHaveClass(/active/);
    });

    await test.step('Свернуть Левую Панель (ЛП)', async () => {
      await mapPage.toggleButton.click();
      await expect(mapPage.sidebar).toBeHidden();
      await expect(mapPage.toggleButton).not.toHaveClass(/active/);
    });

    await test.step('Повторно развернуть ЛП и проверить наличие всех 4-х заголовков', async () => {
      await mapPage.toggleButton.click();
      for (const headerText of SIDEBAR_EXPECTED_DATA.headers) {
        await expect(mapPage.sidebar.getByText(headerText, { exact: true })).toBeVisible();
      }
    });

    await test.step('Шаг 6. Проверить секцию "Городские маршруты"', async () => {
      await expect(mapPage.sidebar.getByText('Городские маршруты', { exact: true })).toBeVisible();

      for (const transport of SIDEBAR_EXPECTED_DATA.cityTransport) {
        for (const routeNumber of transport.routes) {
          const badge = mapPage.sidebar.getByRole('button', { name: routeNumber, exact: true });
          await expect(badge).toBeVisible();
          await expect(badge).toHaveCSS('background-color', transport.color);
        }
      }
    });

    await test.step('Шаг 7. Проверить секцию "Пригородные маршруты"', async () => {
      await expect(mapPage.sidebar.getByText('Пригородные маршруты', { exact: true })).toBeVisible();

      for (const transport of SIDEBAR_EXPECTED_DATA.suburbanTransport) {
        const firstRoute = transport.routes[0];
        const groupItem = mapPage.sidebar
          .getByRole('listitem')
          .filter({ has: mapPage.page.getByRole('button', { name: firstRoute, exact: true }) });

        await expect(groupItem).toBeVisible();

        for (const routeNumber of transport.routes) {
          const badge = mapPage.sidebar.getByRole('button', { name: routeNumber, exact: true });
          await expect(badge).toBeVisible();
          await expect(badge).toHaveCSS('background-color', transport.color);
        }
      }
    });

    await test.step('Шаг 8. Проверить секцию "Междугородние маршруты"', async () => {
      await expect(mapPage.sidebar.getByText('Междугородние маршруты', { exact: true })).toBeVisible();

      for (const transport of SIDEBAR_EXPECTED_DATA.intercityTransport) {
        const firstRoute = transport.routes[0];
        const groupItem = mapPage.sidebar
          .getByRole('listitem')
          .filter({ has: mapPage.page.getByRole('button', { name: firstRoute, exact: true }) });

        await expect(groupItem).toBeVisible();

        for (const routeNumber of transport.routes) {
          const badge = mapPage.sidebar.getByRole('button', { name: routeNumber, exact: true });
          await expect(badge).toBeVisible();
          await expect(badge).toHaveCSS('background-color', transport.color);
        }
      }
    });

   await test.step('Шаг 9. Проверить наличие ближайших остановок', async () => {
      for (const stopName of SIDEBAR_EXPECTED_DATA.stops) {
        const stopItem = mapPage.sidebar.getByRole('button', { name: stopName, exact: false });
        await expect(stopItem.first()).toBeVisible();
      }
    });
  });

  test('3. UI: Масштабирование ГИС-карты [TESTY-1070]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('4. UI: Центрирование карты по кнопке «Мое местоположение» [TESTY-1071]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('5. Визуализация и цвета мелких маркеров ТС при отдаленном масштабе [TESTY-1072]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('6. Трансформация маркеров ТС в крупные элементы [TESTY-1073]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('7. Интерактивность: Открытие карточки остановки по клику на маркер [TESTY-1074]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('8. Интерактивность: Открытие карточки маршрута ТС по клику на маркер [TESTY-1075]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('9. Включение и отключение слоя «Остановки» [TESTY-1076]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('10. Фильтрация транспорта по признаку «Для маломобильных» [TESTY-1077]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('11. Включение слоя «Дороги» и появление кнопки фильтрации [TESTY-1078]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('12. Точечная фильтрация дорог и мероприятий через поп-ап окно [TESTY-1079]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('13. Проверка тултипа при наведении на остановку [TESTY-1080]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('14. Проверка тултипа при наведении на маркер ТС [TESTY-1081]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('15. Проверка тултипа при наведении на участок дороги [TESTY-1082]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });

  test('16. E2E: Отображение слоя «Перекрытия» при публикации объекта из «Трансфлоу» [TESTY-1083]', async () => {
    test.skip(true, 'TODO: Реализовать тест');
  });
});
