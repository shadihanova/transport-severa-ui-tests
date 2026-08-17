import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  // ===== ЭЛЕМЕНТЫ ВЕРХНЕЙ ПАНЕЛИ УПРАВЛЕНИЯ =====
  readonly menuButton: Locator;
  readonly toggleButton: Locator; // Кнопка сворачивания/разворачивания ЛП
  readonly searchInput: Locator;
  readonly routeButton: Locator;

  // ===== МЕНЮ =====
  readonly sideMenu: Locator;
  readonly sideMenuHeader: Locator;
  readonly closeMenuBtn: Locator;
  readonly logoImage: Locator;
  readonly sideMenuBody: Locator;
  readonly sideMenuFooter: Locator;

  // Пункты меню навигации
  readonly menuList: Locator;
  readonly menuRoutes: Locator;
  readonly menuStops: Locator;
  readonly menuFavourites: Locator;
  readonly menuNews: Locator;
  readonly menuPolls: Locator;
  readonly menuAbout: Locator;
  readonly menuGuide: Locator;

  // Авторизация
  readonly menuAuthorizeButton: Locator;
  readonly menuLogoutButton: Locator;

  // ===== ЛЕВАЯ ПАНЕЛЬ (SIDEBAR) =====
  readonly sidebar: Locator;
  
  // Заголовки секций Sidebar
  readonly cityRoutesHeader: Locator;
  readonly suburbanRoutesHeader: Locator;
  readonly intercityRoutesHeader: Locator;
  readonly nearbyStopsHeader: Locator;

  // Списки и элементы Sidebar
  readonly cityRouteBadges: Locator;
  readonly suburbanRouteBadges: Locator;
  readonly intercityRouteBadges: Locator;
  readonly nearbyStopsList: Locator;

  // ===== ВСПЛЫВАЮЩИЕ СООБЩЕНИЯ FLASH =====
  readonly flashSuccess: Locator;
  readonly flashError: Locator;

  constructor(page: Page) {
    this.page = page;

    // ===== ЭЛЕМЕНТЫ ВЕРХНЕЙ ПАНЕЛИ УПРАВЛЕНИЯ =====
    this.searchInput = page.getByRole('textbox', { name: 'Остановки и маршруты' });
    this.menuButton = page.getByTitle(/Открыть меню/i);
    this.routeButton = page.getByRole('button', { name: 'route' });
    this.toggleButton = page.locator('button.t-btn_toggle');
 
    // ===== МЕНЮ =====
    this.sideMenu = page.locator('.menu');
    this.sideMenuHeader = this.sideMenu.locator('.menu__header');
    this.sideMenuBody = this.sideMenu.locator('.menu__body');
    this.sideMenuFooter = this.sideMenu.locator('.menu__footer');
    this.closeMenuBtn = this.sideMenuHeader.getByTitle('Закрыть');
    this.logoImage = this.sideMenuHeader.getByRole('img', { name: 'NorthTransport' });

    // Пункты меню навигации
    this.menuList = this.sideMenuBody.locator('.menu-list');
    this.menuRoutes = this.menuList.getByRole('button', { name: 'Маршруты' });
    this.menuStops = this.menuList.getByRole('button', { name: 'Остановки' });
    this.menuFavourites = this.menuList.getByRole('button', { name: 'Избранное' });
    this.menuNews = this.menuList.getByRole('button', { name: 'Новости' });
    this.menuPolls = this.menuList.getByRole('button', { name: 'Опросы' });
    this.menuAbout = this.menuList.getByRole('button', { name: 'Справка' });
    this.menuGuide = this.menuList.getByRole('button', { name: 'Гид по порталу' });

    // Авторизация
    this.menuAuthorizeButton = this.menuList.getByRole('button', { name: 'Вход' });
    this.menuLogoutButton = this.menuList.getByRole('button', { name: 'Выход' });

    // ===== ЛЕВАЯ ПАНЕЛЬ (SIDEBAR) =====
    this.sidebar = page.locator('.sidebar');

    // Заголовки секций Sidebar
    this.cityRoutesHeader = this.sidebar.getByText('Городские маршруты', { exact: true });
    this.suburbanRoutesHeader = this.sidebar.getByText('Пригородные маршруты', { exact: true });
    this.intercityRoutesHeader = this.sidebar.getByText('Междугородние маршруты', { exact: true });
    this.nearbyStopsHeader = this.sidebar.getByText('Ближайшие остановочные пункты', { exact: true });
    
    // Списки и элементы Sidebar
    this.cityRouteBadges = this.sidebar
      .locator('.sidebar__section', { has: this.cityRoutesHeader })
      .locator('.route-badge, .badge, button');
      
    this.suburbanRouteBadges = this.sidebar
      .locator('.sidebar__section', { has: this.suburbanRoutesHeader })
      .locator('.route-badge, .badge, button');
      
    this.intercityRouteBadges = this.sidebar
      .locator('.sidebar__section', { has: this.intercityRoutesHeader })
      .locator('.route-badge, .badge, button');

    // Элементы списка ближайших остановок
    this.nearbyStopsList = this.sidebar
      .locator('.sidebar__section', { has: this.nearbyStopsHeader })
      .locator('.stop-item, li, [class*="stop"]');

    // ===== ВСПЛЫВАЮЩИЕ СООБЩЕНИЯ FLASH =====
    this.flashSuccess = page.locator('.flash.success');
    this.flashError = page.locator('.flash.error');
  }

  /**
   * Переход по хэш-маршруту.
   * Открыть главную страницу - await page.open();
   * Открыть панель маршрутов - await page.open('/routes');
   */
  async navigate(path: string = ''): Promise<void> {
  const formattedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  await this.page.goto(`/#${formattedPath}`);
}

  /**
   * Возвращает текст из футера бокового меню
   */
  async getMenuFooterText(): Promise<string | null> {
    const text = await this.sideMenuFooter.textContent();
    return text ? text.trim().replace(/\s+/g, ' ') : null;
  }

  /**
   * Возвращает локатор кнопки профиля в боковом меню по имени пользователя.
   * Используется для проверки успешной авторизации на любой странице.
   */
  getMenuProfileButton(userName: string): Locator {
    return this.menuList.getByRole('button', { name: userName });
  }
}
