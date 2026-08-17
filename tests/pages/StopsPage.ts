import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StopsPage extends BasePage {
  // Контейнер Левой Панели (ЛП) - ограничиваем поиск элементов только внутри панели
  readonly leftPanel: Locator;

  // Общие элементы ЛП
  readonly panelTitle: Locator;
  readonly stopsSearchInput: Locator;
  readonly clearSearchBtn: Locator;
  readonly closePanelBtn: Locator;

  // Состояние 1: Каталог остановок
  readonly stopListItem: Locator;
  readonly emptySearchState: Locator;

  // Состояние 2: Детальная карточка остановки
  readonly stopDetailsTitle: Locator;
  readonly arrivingVehicleItem: Locator;
  readonly emptyArrivalsState: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);

    // Предполагаемый селектор контейнера ЛП (замени на актуальный, если отличается)
    this.leftPanel = page.locator('.panel');

    // Общие элементы
    this.panelTitle = this.leftPanel.getByRole('heading', { name: 'Остановки' });
    // Уточняем инпут внутри панели, чтобы не конфликтовать с глобальным searchInput
    this.stopsSearchInput = this.leftPanel.getByPlaceholder('Поиск остановки');
    this.clearSearchBtn = this.leftPanel.locator('.search-clear-icon'); // или getByRole('button') с нужным именем
    this.closePanelBtn = this.leftPanel.getByTitle('Закрыть');

    // Каталог
    this.stopListItem = this.leftPanel.locator('.stop-list-item');
    this.emptySearchState = this.leftPanel.getByText('Ничего не найдено');

    // Детальная карточка
    this.stopDetailsTitle = this.leftPanel.locator('.stop-details__title');
    this.arrivingVehicleItem = this.leftPanel.locator('.arrival-item');
    this.emptyArrivalsState = this.leftPanel.getByText('Нет активного транспорта');
  }

  /**
   * Открывает панель "Остановки" прямым URL (Быстрый способ)
   */
  async open(): Promise<void> {
    await this.navigate('/stops');
    await this.panelTitle.waitFor({ state: 'visible' });
  }

  /**
   * Вводит текст в поле поиска остановки.
   */
  async searchStop(query: string): Promise<void> {
    await this.stopsSearchInput.fill(query);
  }

  /**
   * Очищает поле поиска по крестику.
   */
  async clearSearch(): Promise<void> {
    await this.clearSearchBtn.click();
  }

  /**
   * Кликает по остановке в списке по её названию.
   */
  async clickStopByName(stopName: string): Promise<void> {
    await this.leftPanel.getByText(stopName).click();
  }

  /**
   * Проверяет видимость остановки в каталоге.
   */
  async isStopVisibleInCatalog(stopName: string): Promise<boolean> {
    return await this.leftPanel.getByText(stopName).isVisible();
  }

  /**
   * Возвращает заголовок (название) открытой детальной карточки остановки.
   */
  async getStopDetailsTitle(): Promise<string | null> {
    return await this.stopDetailsTitle.textContent();
  }

  /**
   * Возвращает количество транспортных средств, прибывающих на остановку.
   */
  async getArrivingVehiclesCount(): Promise<number> {
    return await this.arrivingVehicleItem.count();
  }

  /**
   * Проверяет, есть ли конкретный маршрут в списке прибывающего транспорта.
   */
  async isVehicleInArrivals(routeNumber: string): Promise<boolean> {
    // Ищем внутри элементов прибывающего транспорта кирпичик с номером маршрута
    const routeBadge = this.arrivingVehicleItem.locator('.route-badge', { hasText: routeNumber });
    return await routeBadge.isVisible();
  }

  /**
   * Проверяет, отображается ли заглушка об отсутствии транспорта.
   */
  async isEmptyArrivalsStateDisplayed(): Promise<boolean> {
    return await this.emptyArrivalsState.isVisible();
  }

  /**
   * Закрывает Левую Панель.
   */
  async closePanel(): Promise<void> {
    await this.closePanelBtn.click();
  }
}
