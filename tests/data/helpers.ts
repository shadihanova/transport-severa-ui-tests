// Вспомогательная функция: генерирует случайную строку из маленьких букв
function getRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Главная функция: собирает email по маске
export function generateRandomEmail(): string {
  const timestamp = Date.now().toString().slice(-5);
  const username = getRandomString(4);
  const domain = getRandomString(3);
  const tld = getRandomString(2);

  return `${timestamp}_${username}@${domain}.${tld}`;
}
