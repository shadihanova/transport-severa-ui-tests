import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserForRegistration, VALID_USER } from '../data/consts';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  readonly makeAccountButton: Locator;

  readonly registrationModal: Locator;
  readonly regNameInput: Locator;
  readonly regSurnameInput: Locator;
  readonly regEmailInput: Locator;
  readonly regPasswordInput: Locator;
  readonly regPasswordConfirmInput: Locator;

  readonly regNameGroupWithError: Locator;
  readonly regSurnameGroupWithError: Locator;
  readonly regEmailGroupWithError: Locator;
  readonly regPasswordGroupWithError: Locator;
  readonly regPasswordConfirmGroupWithError: Locator;

  readonly submitRegistrationButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole('textbox', { name: 'Электронная почта' });
    this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
    this.submitButton = page.getByRole('button', { name: 'Войти' });

    this.makeAccountButton = page.getByText('Зарегистрируйтесь');

    this.registrationModal = page.getByText('Регистрация');
    this.regNameInput = page.getByRole('textbox', { name: 'Имя *' });
    this.regSurnameInput = page.getByRole('textbox', { name: 'Фамилия' });
    this.regEmailInput = page.getByRole('textbox', { name: 'Электронная почта *' });
    this.regPasswordInput = page.getByRole('textbox', { name: 'Пароль *' });
    this.regPasswordConfirmInput = page.getByRole('textbox', { name: 'Подтверждение пароля *' });

    this.regNameGroupWithError = page.locator('.t-input-group.t-input-group_error').filter({ hasText: 'Имя' });
    this.regSurnameGroupWithError = page.locator('.t-input-group.t-input-group_error').filter({ hasText: 'Фамилия' });
    this.regEmailGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Электронная почта' });
    this.regPasswordGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Пароль' });
    this.regPasswordConfirmGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Подтверждение пароля' });

    this.submitRegistrationButton = page.getByRole('button', { name: 'Зарегистрироваться' });
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Возвращает массив ключевых локаторов формы регистрации.
   * Используется для массовой проверки видимости.
   */
  get registrationFormElements(): Locator[] {
    return [
      this.registrationModal,
      this.regNameInput,
      this.regSurnameInput,
      this.regEmailInput,
      this.regPasswordInput,
      this.regPasswordConfirmInput,
      this.submitRegistrationButton,
    ];
  }

  /**
   * Бизнес-метод выполнения авторизации
   */
  async login(username: string, password?: string): Promise<void> {
    await this.emailInput.fill(username);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.submitButton.click();
  }

  /**
   * Заполнение формы регистрации
   * По умолчанию заполняет валидными данными, но можно передать любые другие.
   */
  async fillRegisterForm(data: UserForRegistration = VALID_USER): Promise<void> {
    await this.regNameInput.fill(data.name);
    await this.regSurnameInput.fill(data.surname);
    await this.regEmailInput.fill(data.email);
    await this.regPasswordInput.fill(data.password);
    await this.regPasswordConfirmInput.fill(data.passwordConfirm);
  }
}
