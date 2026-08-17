import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InfoPage extends BasePage {
  readonly infoPanel: Locator;
  readonly infoTitle: Locator;
  readonly infoBody: Locator;
  readonly closeInfoButton: Locator;
  readonly transflowLink: Locator;

  constructor(page: Page) {
    super(page);

    this.infoPanel = page.locator('.sidebar').filter({ hasText: 'Справка' });
    this.infoTitle = this.infoPanel.locator('.sidebar__title');
    this.infoBody = this.infoPanel.locator('.sidebar__body > .sidebar__block');
    this.closeInfoButton = this.infoPanel.locator('.close-btn');

    this.transflowLink = this.infoBody.locator('a[href="http://transflow.ru"]');
  }

  async goto(): Promise<void> {
    await this.navigate('/info');
  }
}
