// tests/fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage, MapPage, GuidePage, InfoPage } from '@pages';

type AppFixtures = {
  loginPage: LoginPage;
  mapPage: MapPage;
  guidePage: GuidePage;
  infoPage: InfoPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('');
    await use(loginPage);
  },
  mapPage: async ({ page }, use) => {
    const mapPage = new MapPage(page);
    await mapPage.goto();
    await use(mapPage);
  },
  guidePage: async ({ page }, use) => {
    const guidePage = new GuidePage(page);
    await guidePage.goto();
    await use(guidePage);
  },
  infoPage: async ({ page }, use) => {
    const infoPage = new InfoPage(page);
    await infoPage.goto();
    await use(infoPage);
  },
});

export { expect } from '@playwright/test';
