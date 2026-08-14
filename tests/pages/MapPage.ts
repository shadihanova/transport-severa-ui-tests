import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MapPage extends BasePage {
  readonly mapCanvas: Locator;

  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;
  readonly myLocationButton: Locator;
  readonly accessibleCheckbox: Locator;
  readonly stopsCheckbox: Locator;
  readonly closuresCheckbox: Locator;
  readonly roadsCheckbox: Locator;

  readonly leftPanel: Locator;

  constructor(page: Page) {
    super(page);
    // Карта
    this.mapCanvas = page.getByRole('region', { name: 'Map' });

    // Нижние элементы
    this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
    this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' });
    this.myLocationButton = page.getByRole('button', { name: 'Find my location' });
    this.accessibleCheckbox = page.getByTitle('Отобразить транспорт для маломобильных групп населения');
    this.stopsCheckbox = page.getByTitle('Отобразить остановочные пункты');
    this.closuresCheckbox = page.getByTitle('Отобразить перекрытия дорог');
    this.roadsCheckbox = page.getByTitle('Отобразить дороги');


    // Левая панель
    this.leftPanel = page.locator('.sidebar');
  }

  /**
   * Переход на главную страницу с картой
   */
  async goto(): Promise<void> {
    await this.navigate('');
  }

  get mainControls(): Locator[] {
    return [
      this.menuButton,
      this.searchInput,
      this.routeButton,
      this.toggleButton,
      this.zoomInButton,
      this.zoomOutButton,
      this.myLocationButton,
      this.stopsCheckbox,
      this.roadsCheckbox,
      this.closuresCheckbox,
      this.accessibleCheckbox,
    ];
  }
}
