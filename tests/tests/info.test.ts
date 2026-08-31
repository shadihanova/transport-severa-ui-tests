import { test, expect } from '../fixtures';
import { INFO_EXPECTED_DATA } from '@data/consts';

test.describe('Раздел Справка', { tag: '@no-auth' }, () => {
  test('1. Открытие раздела и проверка контента [TESTY-1174]', async ({ infoPage }) => {
    await test.step('Проверить видимость панели и заголовка', async () => {
      await expect(infoPage.sidebar).toBeVisible();
      await expect(infoPage.infoTitle).toBeVisible();
      await expect(infoPage.infoTitle).toContainText(INFO_EXPECTED_DATA.title);
    });

    await test.step('Проверить наличие текста справки по ключевым фразам', async () => {
      await expect(infoPage.infoBody).toBeVisible();
      await expect(infoPage.infoBody).toContainText(INFO_EXPECTED_DATA.copyright);

      const textPattern = new RegExp(INFO_EXPECTED_DATA.textSnippets.join('.*'), 's');
      await expect(infoPage.infoBody).toHaveText(textPattern);
    });

    await test.step('Проверить наличие корректной ссылки на Трансфлоу', async () => {
      await expect(infoPage.transflowLink).toBeVisible();
      await expect(infoPage.transflowLink).toHaveAttribute('href', INFO_EXPECTED_DATA.transflowUrl);
    });
  });

  test('2. Закрытие панели Справки по крестику [TESTY-1175]', async ({ infoPage }) => {
    await test.step('Нажать на крестик закрытия', async () => {
      await expect(infoPage.closeInfoButton).toBeVisible();
      await infoPage.closeInfoButton.click();
    });

    await test.step('Проверить, что панель Справки полностью скрылась', async () => {
      await expect(infoPage.infoPanel).toBeHidden();
      await expect(infoPage.toggleButton).not.toHaveClass(/active/);
    });
  });
});
