//todo проверка togglebutton
// 2. Проверяем, что изначально панель скрыта (кнопка без active)
// Используем утверждение, что класс не содержит 'active'
await expect(toggleButton).not.toHaveClass(/active/);

// 3. Раскрываем панель (кликаем)
await toggleButton.click();

// 4. Проверяем, что появилась кнопка с классом active (панель раскрыта)
await expect(toggleButton).toHaveClass(/active/);

// 5. Снова скрываем панель
await toggleButton.click();

// 6. Проверяем, что active снова исчез
await expect(toggleButton).not.toHaveClass(/active/);

//

Запустить только публичные тесты без авторизации:
npx playwright test --project=chromium-no-auth

Запустить по тегу:
npx playwright test --grep @no-auth --no-deps

Запустить тесты с логином:
npx playwright test --project=chromium-user1
