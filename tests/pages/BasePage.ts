import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  readonly mapCanvas: Locator;

  readonly searchInput: Locator;
  readonly menuButton: Locator;
  readonly routeButton: Locator;
  readonly toggleButton: Locator;

  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;
  readonly myLocationButton: Locator;
  readonly accessibleCheckbox: Locator;
  readonly stopsCheckbox: Locator;
  readonly closuresCheckbox: Locator;
  readonly roadsCheckbox: Locator;

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
  readonly menuAuthorizeBtn: Locator;
  readonly sideMenuFooter: Locator;

  readonly leftPanel: Locator;

  readonly flash: Locator;

  constructor(page: Page) {
    this.page = page;

    // Карта
    this.mapCanvas = page.getByRole('region', { name: 'Map' });

    // Верхние элементы
    this.searchInput = page.getByRole('textbox', { name: 'Остановки и маршруты' });
    this.menuButton = page.getByTitle(/Открыть меню/i);
    this.routeButton = page.getByRole('button', { name: 'route' });
    this.toggleButton = page.locator('button.t-btn_toggle');

    // Нижние элементы
    this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
    this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' });
    this.myLocationButton = page.getByRole('button', { name: 'Find my location' });
    this.accessibleCheckbox = page.getByTitle('Отобразить транспорт для маломобильных групп населения');
    this.stopsCheckbox = page.getByTitle('Отобразить остановочные пункты');
    this.closuresCheckbox = page.getByTitle('Отобразить перекрытия дорог');
    this.roadsCheckbox = page.getByTitle('Отобразить дороги');

    // Меню
    this.sideMenu = page.locator('.menu');

    this.sideMenuHeader = this.sideMenu.locator('.menu__header');
    this.closeMenuBtn = this.sideMenuHeader.getByTitle('Закрыть');
    this.logoImage = this.sideMenuHeader.getByRole('img', { name: 'NorthTransport' });

    this.sideMenuBody = this.sideMenu.locator('.menu__body');
    this.menuList = this.sideMenuBody.locator('.menu-list');
    this.menuRoutes = this.menuList.getByRole('button', { name: 'Маршруты' });
    this.menuStops = this.menuList.getByRole('button', { name: 'Остановки' });
    this.menuFavourites = this.menuList.getByRole('button', { name: 'Избранное' });
    this.menuNews = this.menuList.getByRole('button', { name: 'Новости' });
    this.menuPolls = this.menuList.getByRole('button', { name: 'Опросы' });
    this.menuAbout = this.menuList.getByRole('button', { name: 'Справка' });
    this.menuGuide = this.menuList.getByRole('button', { name: 'Гид по порталу' });
    this.menuAuthorizeBtn = this.menuList.getByRole('button', { name: 'Вход' });

    this.sideMenuFooter = this.sideMenu.locator('.menu__footer');

    // Левая панель
    this.leftPanel = page.locator('.sidebar');

    // Flash
    this.flash = page.locator('.toast, .notification, [role="alert"]');
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
    // Нормализуем текст: убираем пробелы по краям и заменяем множественные пробелы на один
    return text ? text.trim().replace(/\s+/g, ' ') : null;
  }
}
