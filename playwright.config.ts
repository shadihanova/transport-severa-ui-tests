import { defineConfig, devices, ReporterDescription } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// 1. Собираем базовые репортеры (они работают всегда)
const reporters: ReporterDescription[] = [['list']];

// 2. Если запустили через npm run test:tms, добавляем наш TMS-репортер
if (process.env.TMS_SYNC === 'true') {
  reporters.push(['./scripts/tms-reporter.ts']); 
}

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BASE_URL = process.env.BASE_URL || '';

export default defineConfig({
  testDir: './tests/tests',
  timeout: 25000,
  fullyParallel: false,
  maxFailures: 1,

  expect: {
    timeout: 10000, // таймаут для всех expect(...) до 10 секунд (10000 мс). оставить потому что ждем исчезновения flash-ей
  },

  reporter: reporters, // Передаем собранный массив сюда

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

    // 3. Проект для авторизованного юзера 1 (основные тесты)
    {
      name: 'chromium-user1',
      // Игнорирует публичные тесты и тесты, специфичные только для юзера 2
      grepInvert: /@no-auth|@user2/, 
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'setup/.auth/user1.json',
      },
      dependencies: ['setup'],
    },

    // 4. Прогон тестов от лица USER 2 (только специфичные тесты!)
    {
      name: 'chromium-user2',
      grep: /@user2/, // <--- Запускает ТОЛЬКО тесты с тегом @user2
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'setup/.auth/user2.json',
      },
      dependencies: ['setup'],
    },
  ],
});
