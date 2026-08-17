import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GuidePage extends BasePage {
  // ===== КОНТЕЙНЕРЫ =====
  readonly guideContainer: Locator;
  readonly guideSidebar: Locator;
  readonly guideContent: Locator;

  // ===== ЭЛЕМЕНТЫ СЛАЙДЕРА =====
  readonly guideTitle: Locator;
  readonly closeGuideButton: Locator;
  readonly slides: Locator;
  readonly activeSlide: Locator;
  readonly prevSlideButton: Locator;
  readonly nextSlideButton: Locator;
  readonly slideCounter: Locator;
  readonly detailsButton: Locator;

  // ===== ЭЛЕМЕНТЫ FAQ =====
  readonly faqNav: Locator;
  readonly faqQuestions: Locator;
  readonly faqItems: Locator; // Элементы <li> списка вопросов

  constructor(page: Page) {
    super(page);

    // Контейнеры
    this.guideContainer = page.locator('.guide');
    this.guideSidebar = page.locator('.guide .sidebar');
    this.guideContent = page.locator('.guide-content');

    // Элементы слайдера
    this.guideTitle = this.guideSidebar.getByText('Гид портала Транспорт Севера');
    this.closeGuideButton = this.guideSidebar.locator('.close-btn');
    this.slides = this.guideSidebar.locator('.slide');
    this.activeSlide = this.guideSidebar.locator('.slide:not([style*="display: none"])');
    this.prevSlideButton = this.guideSidebar.locator('.counter button').filter({ has: page.getByAltText('arrow_left') });
    this.nextSlideButton = this.guideSidebar.locator('.counter button').filter({ has: page.getByAltText('arrow_right') });
    this.slideCounter = this.guideSidebar.locator('.counter');
    this.detailsButton = this.guideSidebar.getByRole('button', { name: 'Подробнее' });

    // Элементы FAQ
    this.faqNav = this.guideSidebar.locator('.guide__nav');
    this.faqQuestions = this.faqNav.getByRole('button');
    this.faqItems = this.faqNav.locator('li'); // Коллекция всех <li> (для проверки active)
  }

  /**
   * Возвращает локатор конкретного вопроса в списке FAQ по его номеру (например, "1")
   */
  getFaqQuestionByNumber(num: string): Locator {
    return this.faqQuestions.filter({ hasText: `${num} ` }).first();
  }

  /**
   * Возвращает локатор элемента списка (<li>) по тексту вопроса.
   * Используется для проверки класса 'active'.
   */
  getFaqQuestionItem(text: string): Locator {
    return this.faqItems.filter({ hasText: text });
  }

  /**
   * Возвращает локатор блока с ответом по ID заголовка (например, "p1")
   */
  getGuideAnswerSection(id: string): Locator {
    return this.guideContent.locator(`.guide-item:has(h2#${id})`);
  }

  async goto(): Promise<void> {
    await this.navigate('/guide');
  }
}
