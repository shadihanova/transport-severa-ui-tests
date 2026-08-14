import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  // Верхние элементы
  readonly searchInput: Locator;
  readonly menuButton: Locator;
  readonly routeButton: Locator;
  readonly toggleButton: Locator;

  // Меню
  readonly sideMenu: Locator;
  readonly sideMenuHeader: Locator;
  readonly closeMenuBtn: Locator;
  readonly logoImage: Locator;
  readonly sideMenuBody: Locator;
  readonly menuList: Locator;
  readonly menuRoutes: Locator;
  readonly menuStops: Locator;
  readonly menuFavourites: Locator;
  readonly menuNews: Locator;
  readonly menuPolls: Locator;
  readonly menuAbout: Locator;
  readonly menuGuide: Locator;
  readonly menuAuthorizeButton: Locator;
  readonly menuLogoutButton: Locator;
  readonly sideMenuFooter: Locator;

  // Всплывающие сообщения
  readonly flashSuccess: Locator;
  readonly flashError: Locator;

  constructor(page: Page) {
    this.page = page;

    // Верхние элементы
    this.searchInput = page.getByRole('textbox', { name: 'Остановки и маршруты' });
    this.menuButton = page.getByTitle(/Открыть меню/i);
    this.routeButton = page.getByRole('button', { name: 'route' });
    this.toggleButton = page.locator('button.t-btn_toggle');

    // Меню
    this.sideMenu = page.locator('.menu');
    this.sideMenuHeader = this.sideMenu.locator('.menu__header');
    this.sideMenuBody = this.sideMenu.locator('.menu__body');
    this.sideMenuFooter = this.sideMenu.locator('.menu__footer');
    this.closeMenuBtn = this.sideMenuHeader.getByTitle('Закрыть');
    this.logoImage = this.sideMenuHeader.getByRole('img', { name: 'NorthTransport' });
    this.menuList = this.sideMenuBody.locator('.menu-list');
    this.menuRoutes = this.menuList.getByRole('button', { name: 'Маршруты' });
    this.menuStops = this.menuList.getByRole('button', { name: 'Остановки' });
    this.menuFavourites = this.menuList.getByRole('button', { name: 'Избранное' });
    this.menuNews = this.menuList.getByRole('button', { name: 'Новости' });
    this.menuPolls = this.menuList.getByRole('button', { name: 'Опросы' });
    this.menuAbout = this.menuList.getByRole('button', { name: 'Справка' });
    this.menuGuide = this.menuList.getByRole('button', { name: 'Гид по порталу' });
    this.menuAuthorizeButton = this.menuList.getByRole('button', { name: 'Вход' });
    this.menuLogoutButton = this.menuList.getByRole('button', { name: 'Выход' });

    // Всплывающие сообщения
    this.flashSuccess = page.locator('.flash.success');
    this.flashError = page.locator('.flash.error');
  }

  /**
   * Переход по хэш-маршруту (например, '/login', '/routes')
   */
  async navigate(path: string = ''): Promise<void> {
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    await this.page.goto(`/#${formattedPath}`);
  }

  /**
   * Возвращает текст из футера бокового меню
   */
  async getMenuFooterText(): Promise<string | null> {
    const text = await this.sideMenuFooter.textContent();
    return text ? text.trim().replace(/\s+/g, ' ') : null;
  }
}
