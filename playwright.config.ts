import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 25000,
  fullyParallel: false,
  maxFailures: 1,
  reporter: [
    ['list'], // Подробный красивый список со временем выполнения каждого теста
    ['html', { open: 'never' }], // Чтобы параллельно генерировался и HTML-отчет
  ],
  
  use: {
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
        args: ['--start-maximized'],
        },
    headless: true, // Показывать браузер при прогоне=false или нет=true
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', 
  },

  projects: [
    // 1. Setup проект (выполняется самым первым, делает логин и сохраняет стейт)
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Основной проект (зависит от setup, использует сохраненные куки)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Пока закомментировано, так как файла еще нет. Раскомментируем, когда setup будет готов:
        // storageState: '.auth/superAdmin.json' 
      },
      dependencies: ['setup'], // Сначала запускает setup, потом основные тесты
    },
  ],
});
