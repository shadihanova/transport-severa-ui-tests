import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MapPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Переход на главную страницу с картой
   */
  async goto(): Promise<void> {
    await this.navigate('');
  }
}
