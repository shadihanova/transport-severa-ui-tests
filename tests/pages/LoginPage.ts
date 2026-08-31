import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserForRegistration, VALID_USER } from '../data/consts';

export class LoginPage extends BasePage {
  // ===== ОКНО АВТОРИЗАЦИИ =====
  readonly loginModal: Locator;
  readonly loginModalTitle: Locator;
  readonly loginWithYandexBtn: Locator;
  readonly loginWithVkBtn: Locator;
  readonly authEmailInput: Locator;
  readonly authPasswordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitLoginButton: Locator;
  readonly makeAccountButton: Locator;

  // ===== ОКНО РЕГИСТРАЦИИ =====
  readonly registrationModal: Locator;
  readonly regNameInput: Locator;
  readonly regSurnameInput: Locator;
  readonly regEmailInput: Locator;
  readonly regPasswordInput: Locator;
  readonly regPasswordConfirmInput: Locator;
  readonly submitRegistrationButton: Locator;

  // ===== ГРУППЫ ПОЛЕЙ С ОШИБКАМИ (ВАЛИДАЦИЯ) =====
  readonly regNameGroupWithError: Locator;
  readonly regSurnameGroupWithError: Locator;
  readonly regEmailGroupWithError: Locator;
  readonly regPasswordGroupWithError: Locator;
  readonly regPasswordConfirmGroupWithError: Locator;

  constructor(page: Page) {
    super(page);

    // --- Окно авторизации ---
    // Используем :has() и text-is для точного поиска модалки входа,
    // чтобы не пересечься с модалкой регистрации
    this.loginModal = page.locator('.t-modal:has(.t-modal__title:text-is("Вход"))');
    this.loginModalTitle = this.loginModal.locator('.t-modal__title');
    this.loginWithYandexBtn = this.loginModal.getByRole('button', { name: 'Я Яндекс' });
    this.loginWithVkBtn = this.loginModal.getByRole('button', { name: 'VK ВКонтакте' });

    this.authEmailInput = page.getByRole('textbox', { name: 'Электронная почта' });
    this.authPasswordInput = page.getByRole('textbox', { name: 'Пароль' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Оставаться в системе' });
    this.submitLoginButton = page.getByRole('button', { name: 'Войти' });
    this.makeAccountButton = page.getByText('Зарегистрируйтесь');

    // --- Окно регистрации ---
    this.registrationModal = page.getByText('Регистрация');
    this.regNameInput = page.getByRole('textbox', { name: 'Имя *' });
    this.regSurnameInput = page.getByRole('textbox', { name: 'Фамилия' });
    this.regEmailInput = page.getByRole('textbox', { name: 'Электронная почта *' });
    this.regPasswordInput = page.getByRole('textbox', { name: 'Пароль *' });
    this.regPasswordConfirmInput = page.getByRole('textbox', { name: 'Подтверждение пароля *' });

    // --- Группы полей с ошибками ---
    // Отличный подход: фильтруем по тексту внутри блока с ошибкой,
    // чтобы гарантированно проверить подсветку именно нужного поля
    this.regNameGroupWithError = page.locator('.t-input-group.t-input-group_error').filter({ hasText: 'Имя' });
    this.regSurnameGroupWithError = page.locator('.t-input-group.t-input-group_error').filter({ hasText: 'Фамилия' });
    this.regEmailGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Электронная почта' });
    this.regPasswordGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Пароль' });
    this.regPasswordConfirmGroupWithError = page.locator('.t-input-group_error').filter({ hasText: 'Подтверждение пароля' });

    this.submitRegistrationButton = page.getByRole('button', { name: 'Зарегистрироваться' });
  }

  // todo: исправить на await this.navigate('/login'); и waitFor модалки в тестах.
  // Пока оставлено так, так как в auth.test нужны оба варианта (и открытие главной, и прямой переход).
  async open(): Promise<void> {
    await this.navigate('');
  }

  // ===== ГЕТТЕРЫ ДЛЯ МАССОВЫХ ПРОВЕРОК =====

  /**
   * Возвращает массив ключевых локаторов формы регистрации.
   * Используется для массовой проверки видимости в цикле for...of.
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
   * Возвращает массив ключевых локаторов формы входа.
   * Используется для массовой проверки видимости в цикле for...of.
   */
  get loginFormElements(): Locator[] {
    return [
      this.loginModal,
      this.loginWithYandexBtn,
      this.loginWithVkBtn,
      this.authEmailInput,
      this.authPasswordInput,
      this.rememberMeCheckbox,
      this.submitLoginButton,
      this.makeAccountButton,
    ];
  }

  /**
   * Бизнес-метод: Выполнение авторизации.
   * @param email - почта пользователя
   * @param password - пароль (необязательный, если нужно проверить только ввод email)
   */
  async login(email: string, pass: string): Promise<void> {
    await this.authEmailInput.fill(email);
    await this.authPasswordInput.fill(pass);
    await this.submitLoginButton.click();
  }

  /**
   * Бизнес-метод: Заполнение формы регистрации.
   * @param user - объект с данными пользователя (по умолчанию VALID_USER).
   */
  async fillRegisterForm(user: UserForRegistration = VALID_USER): Promise<void> {
    await this.regNameInput.fill(user.name);
    await this.regSurnameInput.fill(user.surname);
    await this.regEmailInput.fill(user.email);
    if (user.password) {
      await this.regPasswordInput.fill(user.password);
      await this.regPasswordConfirmInput.fill(user.password);
    }
  }

  /** Открывает модалку логина через UI меню */
  async openLoginModal(): Promise<void> {
    await this.navigateViaMenu(this.menuAuthorizeButton);
  }

  /** Открывает модалку регистрации через модалку логина */
  async openRegistrationModal(): Promise<void> {
    await this.openLoginModal();
    await this.makeAccountButton.click();
  }
}
