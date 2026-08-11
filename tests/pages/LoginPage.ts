import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('input[name="username"], input[type="text"]');
    this.passwordInput = page.locator('input[name="password"], input[type="password"]');
    this.submitButton = page.getByRole('button', { name: 'Войти' });
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Бизнес-метод выполнения авторизации
   */
  async login(username: string, password?: string): Promise<void> {
    await this.usernameInput.fill(username);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.submitButton.click();
  }
}
