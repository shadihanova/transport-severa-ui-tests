import { test, expect } from '../fixtures';
import { GUIDE_EXPECTED_DATA } from '@data/consts';

test.describe('Гид по порталу', { tag: '@no-auth' }, () => {
  // --- ФАЗА 1: СЛАЙДЕР ---

  test('1. Открытие гида, проверка заголовка и состава слайдера [TESTY-1168]', async ({ guidePage }) => {
    await test.step('Проверить видимость панели Гида и элементов управления', async () => {
      await expect(guidePage.guideSidebar).toBeVisible();
      await expect(guidePage.guideTitle).toBeVisible();
      await expect(guidePage.prevSlideButton).toBeVisible();
      await expect(guidePage.nextSlideButton).toBeVisible();
      await expect(guidePage.detailsButton).toBeVisible();
      await expect(guidePage.closeGuideButton).toBeVisible();
    });

    await test.step('Проверить отображение первого слайда', async () => {
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(GUIDE_EXPECTED_DATA.slides[0]);
    });
  });

  test('2. Листание слайдов, проверка счетчика и состояний кнопок [TESTY-1169]', async ({ guidePage }) => {
    const slidesData = GUIDE_EXPECTED_DATA.slides;

    await test.step('Проверить исходное состояние первого слайда', async () => {
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(slidesData[0]);
      await expect(guidePage.slideCounter).toContainText('1 / 9');
      await expect(guidePage.prevSlideButton).toHaveClass(/disabled/);
    });

    for (let i = 1; i < slidesData.length; i++) {
      const expectedText = slidesData[i];

      await test.step(`Кликнуть "Вперед" и проверить слайд ${i + 1}: "${expectedText}"`, async () => {
        await guidePage.nextSlideButton.click();
        await expect(guidePage.activeSlide).toHaveCount(1);
        await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(expectedText);
        await expect(guidePage.slideCounter).toContainText(`${i + 1} / 9`);
      });
    }

    await test.step('Проверить блокировку кнопки "Вперед" на последнем слайде', async () => {
      await expect(guidePage.nextSlideButton).toHaveClass(/disabled/);
    });
  });

  test('3. Переход в раздел FAQ по кнопке "Подробнее" [TESTY-1170]', async ({ guidePage }) => {
    await guidePage.detailsButton.click();

    await test.step('Проверить скрытие слайдера и появление списка вопросов FAQ', async () => {
      await expect(guidePage.slides.first()).toBeHidden();
      await expect(guidePage.faqNav).toBeVisible();
    });

    await test.step('Проверить соответствие текстов всех 8 вопросов', async () => {
      // Автоматически сверяет и count (8 шт), и текст каждого вопроса
      await expect(guidePage.faqQuestions).toHaveText(GUIDE_EXPECTED_DATA.faqQuestions);
    });
  });

  // --- ФАЗА 2: FAQ И НАВИГАЦИЯ ---

  test('4. Навигация по вопросам и проверка активного класса [TESTY-1171]', async ({ guidePage }) => {
    await guidePage.detailsButton.click();
    await expect(guidePage.faqNav).toBeVisible();

    const q1Text = GUIDE_EXPECTED_DATA.faqQuestions[0];
    const q1Item = guidePage.getFaqQuestionItem(q1Text);
    const q2Text = GUIDE_EXPECTED_DATA.faqQuestions[1];
    const q2Item = guidePage.getFaqQuestionItem(q2Text);

    await test.step('Кликнуть на первый вопрос и проверить ответ p1', async () => {
      await q1Item.click();
      const answer1 = guidePage.getGuideAnswerSection('p1');
      await expect(answer1).toBeVisible();
      await expect(answer1.locator('h2')).toContainText('Что я вижу на карте');
      await expect(q1Item).toHaveClass(/active/);
    });

    await test.step('Кликнуть на второй вопрос и проверить переключение ответа на p2', async () => {
      await q2Item.click();
      const answer2 = guidePage.getGuideAnswerSection('p2');
      await expect(answer2).toBeVisible();
      await expect(answer2.locator('h2')).toContainText('Что еще можно увидеть на карте?');
      await expect(q2Item).toHaveClass(/active/);
      await expect(q1Item).not.toHaveClass(/active/);
    });
  });

  test('5. Закрытие панели Гида по крестику [TESTY-1172]', async ({ guidePage }) => {
    await test.step('Нажать на крестик в слайдере -> Переход в режим FAQ', async () => {
      await guidePage.closeGuideButton.click();
      await expect(guidePage.slides.first()).toBeHidden();
      await expect(guidePage.faqNav).toBeVisible();
    });

    await test.step('Нажать на крестик в режиме FAQ -> Полное закрытие панели', async () => {
      await guidePage.closeGuideButton.click();
      await expect(guidePage.guideContainer).toBeHidden();
    });
  });

  test('6. Обратная навигация по слайдам (кнопка Назад) [TESTY-1173]', async ({ guidePage }) => {
    await guidePage.nextSlideButton.click();
    await guidePage.nextSlideButton.click();
    await expect(guidePage.slideCounter).toContainText('3 / 9');

    await test.step('Нажать кнопку "Назад" и проверить возврат на 2-й слайд', async () => {
      await guidePage.prevSlideButton.click();
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(GUIDE_EXPECTED_DATA.slides[1]);
      await expect(guidePage.slideCounter).toContainText('2 / 9');
    });
  });
});
