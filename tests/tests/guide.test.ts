import { test, expect } from '@playwright/test';
import { GuidePage } from '../pages';
import { GUIDE_EXPECTED_DATA } from '../data/consts';

test.describe('Гид по порталу', () => {
  let guidePage: GuidePage;

  test.beforeEach(async ({ page }) => {
    guidePage = new GuidePage(page);
    await guidePage.goto();
  });

  // --- ФАЗА 1: СЛАЙДЕР ---

  test('1. Открытие гида, проверка заголовка и состава слайдера [TESTY-1168]', { tag: ['@no-auth'] }, async () => {
    await test.step('Проверить видимость панели Гида и заголовка', async () => {
      await expect(guidePage.guideSidebar).toBeVisible();
      await expect(guidePage.guideTitle).toBeVisible();
    });

    await test.step('Проверить наличие кнопок навигации и закрытия', async () => {
      await expect(guidePage.prevSlideButton).toBeVisible();
      await expect(guidePage.nextSlideButton).toBeVisible();
      await expect(guidePage.detailsButton).toBeVisible();
      await expect(guidePage.closeGuideButton).toBeVisible();
    });

    await test.step('Проверить, что отображается первый слайд', async () => {
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(GUIDE_EXPECTED_DATA.slides[0]);
    });
  });

  test('2. Листание слайдов, проверка счетчика и состояний кнопок [TESTY-1169]', { tag: ['@no-auth'] }, async () => {
    const slidesData = GUIDE_EXPECTED_DATA.slides;

    // Проверка первого слайда
    await test.step(`Проверить слайд 1: "${slidesData[0]}"`, async () => {
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(slidesData[0]);
      await expect(guidePage.slideCounter).toContainText('1 / 9');
      // Кнопка Назад должна быть disabled
      await expect(guidePage.prevSlideButton).toHaveClass(/disabled/);
    });

    // Перелистывание до конца
    for (let i = 1; i < slidesData.length; i++) {
      const expectedText = slidesData[i];

      await test.step(`Кликнуть "Вперед" и проверить слайд ${i + 1}: "${expectedText}"`, async () => {
        await guidePage.nextSlideButton.click();
        await expect(guidePage.activeSlide).toHaveCount(1);
        await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(expectedText);
        await expect(guidePage.slideCounter).toContainText(`${i + 1} / 9`);
      });
    }

    // Проверка последнего слайда
    await test.step('Проверить, что на 9-м слайде кнопка "Вперед" стала неактивной', async () => {
      await expect(guidePage.nextSlideButton).toHaveClass(/disabled/);
    });
  });

  test('3. Переход в раздел FAQ по кнопке "Подробнее" [TESTY-1170]', { tag: ['@no-auth'] }, async () => {
    await test.step('Нажать кнопку "Подробнее"', async () => {
      await guidePage.detailsButton.click();
    });

    await test.step('Проверить, что слайдер скрылся, а появился список FAQ', async () => {
      await expect(guidePage.slides.first()).toBeHidden();
      await expect(guidePage.faqNav).toBeVisible();
      // Проверяем точное количество вопросов
      await expect(guidePage.faqQuestions).toHaveCount(8);
    });

    await test.step('Проверить наличие всех 8 конкретных вопросов', async () => {
      // Проходимся по массиву ожидаемых вопросов
      for (const questionText of GUIDE_EXPECTED_DATA.faqQuestions) {
        await expect(guidePage.faqNav.getByText(questionText, { exact: false })).toBeVisible();
      }
    });
  });

  // --- ФАЗА 2: FAQ И ОТВЕТЫ ---

  test('4. Навигация по вопросам и проверка активного класса [TESTY-1171]', { tag: ['@no-auth'] }, async () => {
    // Переходим в режим FAQ
    await guidePage.detailsButton.click();
    await expect(guidePage.faqNav).toBeVisible();

    await test.step('Кликнуть на первый вопрос и проверить открытие ответа и класс active', async () => {
      const q1Text = GUIDE_EXPECTED_DATA.faqQuestions[0];
      const q1Item = guidePage.getFaqQuestionItem(q1Text);

      await q1Item.click();

      // Проверяем, что справа открылся ответ p1
      const answer1 = guidePage.getGuideAnswerSection('p1');
      await expect(answer1).toBeVisible();
      await expect(answer1.locator('h2')).toContainText('Что я вижу на карте');

      // Проверяем, что у пункта списка появился класс 'active'
      await expect(q1Item).toHaveClass(/active/);
    });

    await test.step('Кликнуть на второй вопрос и проверить навигацию к ответу и смену active', async () => {
      const q1Text = GUIDE_EXPECTED_DATA.faqQuestions[0];
      const q1Item = guidePage.getFaqQuestionItem(q1Text);

      const q2Text = GUIDE_EXPECTED_DATA.faqQuestions[1];
      const q2Item = guidePage.getFaqQuestionItem(q2Text);

      await q2Item.click();

      // Проверяем, что открылся ответ p2
      const answer2 = guidePage.getGuideAnswerSection('p2');
      await expect(answer2).toBeVisible();
      await expect(answer2.locator('h2')).toContainText('Что еще можно увидеть на карте?');

      // Проверяем, что у второго вопроса появился класс 'active'
      await expect(q2Item).toHaveClass(/active/);

      // А у первого вопроса класс 'active' исчез
      await expect(q1Item).not.toHaveClass(/active/);
    });
  });

  test('5. Закрытие панели Гида по крестику [TESTY-1172]', { tag: ['@no-auth'] }, async () => {
    await test.step('Шаг 1. Нажать на крестик в слайдере -> Открывается панель с вопросами (FAQ)', async () => {
      await guidePage.closeGuideButton.click();
      await expect(guidePage.slides.first()).toBeHidden();
      await expect(guidePage.faqNav).toBeVisible();
    });

    await test.step('Шаг 2. Нажать на крестик в панели FAQ -> Панель Гида полностью скрывается', async () => {
      await guidePage.closeGuideButton.click();
      await expect(guidePage.guideContainer).toBeHidden();
    });
  });

  test('6. Обратная навигация по слайдам (кнопка Назад) [TESTY-1173]', { tag: ['@no-auth'] }, async () => {
    await test.step('Перелистать слайды вперед до 3-го слайда', async () => {
      await guidePage.nextSlideButton.click(); // 2-й слайд
      await guidePage.nextSlideButton.click(); // 3-й слайд
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(GUIDE_EXPECTED_DATA.slides[2]);
    });

    await test.step('Нажать кнопку "Назад" и проверить возврат на 2-й слайд', async () => {
      await guidePage.prevSlideButton.click();
      await expect(guidePage.activeSlide).toHaveCount(1);
      await expect(guidePage.activeSlide.locator('.slide__title')).toContainText(GUIDE_EXPECTED_DATA.slides[1]);
      await expect(guidePage.slideCounter).toContainText('2 / 9');
    });
  });
});
