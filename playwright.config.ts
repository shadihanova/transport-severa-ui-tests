import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Берем URL из файла .env. Если вдруг файла нет, падаем на запасной URL
const BASE_URL = process.env.BASE_URL || '';

export default defineConfig({
  testDir: './tests/tests',
  timeout: 25000,
  fullyParallel: false,
  maxFailures: 1,

  expect: {
    timeout: 10000, // таймаут для всех expect(...) до 10 секунд (10000 мс)
  },

  reporter: [
    ['list'], // Подробный красивый список со временем выполнения каждого теста
    ['html', { open: 'never' }], // Чтобы параллельно генерировался и HTML-отчет
  ],

  use: {
    baseURL: BASE_URL,
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ['--start-maximized'],
    //  slowMo: 800,
    },
    headless: false, // Показывать браузер при прогоне=false или нет=true
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 1. Setup проект (выполняется первым и создает файлы авторизации для двух юзеров)
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Проект для всех публичных/гостевых тестов БЕЗ авторизации
    {
      name: 'chromium-no-auth',
      grep: /@no-auth/, // Подхватывает только тесты с тегом @no-auth
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] }, // Чистая сессия
      },
    },

    // 3. Проект для авторизованного юзера (пропускает тесты с @no-auth)
    {
      name: 'chromium-user1',
      grepInvert: /@no-auth/, // Игнорирует публичные тесты
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'setup/.auth/user1.json',
      },
      dependencies: ['setup'],
    },

    // 4. Прогон тестов от лица USER 2
    {
      name: 'chromium-user2',
      grepInvert: /@no-auth/, // Игнорирует публичные тесты
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'setup/.auth/user2.json',
      },
      dependencies: ['setup'],
    },
  ],
});
