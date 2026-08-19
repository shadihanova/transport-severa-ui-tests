import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MapPage extends BasePage {
  // ===== КАРТА =====
  readonly mapCanvas: Locator;

  // ===== ЭЛЕМЕНТЫ УПРАВЛЕНИЯ =====
  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;
  readonly myLocationButton: Locator;

  // Чекбоксы слоев
  readonly accessibleCheckbox: Locator;
  readonly stopsCheckbox: Locator;
  readonly closuresCheckbox: Locator; 
  readonly roadsCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    // Карта
    this.mapCanvas = page.getByRole('region', { name: 'Map' });

    // Элементы правой панели (Зум и геолокация)
    this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
    this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' });
    this.myLocationButton = page.getByRole('button', { name: 'Find my location' });

    // Элементы нижней панели (Слои)
    this.accessibleCheckbox = page.getByTitle('Отобразить транспорт для маломобильных групп населения');
    this.stopsCheckbox = page.getByTitle('Отобразить остановочные пункты');
    this.closuresCheckbox = page.getByTitle('Отобразить перекрытия дорог');
    this.roadsCheckbox = page.getByTitle('Отобразить дороги');
  }

  /**
   * Переход на главную страницу с картой
   */
  async goto(): Promise<void> {
    await this.navigate('');
  }
}
