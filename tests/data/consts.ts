export const invalidEmails: string[] = [' ', 'test@ru', 'test.ru', 'test@.com'];
export const invalidNames: string[] = ['Я', ' '];
export const invalidPasswords: string[] = ['1234', '!@#.', ' '];

export interface UserForRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const VALID_USER: UserForRegistration = {
  name: 'Иван',
  surname: 'Тестович',
  email: generateRandomEmail(),
  password: '12345',
  passwordConfirm: '12345',
};

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
  const timestamp = Date.now();
  const username = getRandomString(4); // например: "qxkirty"
  const domain = getRandomString(3); // например: "mnbvc"
  const tld = getRandomString(2); // например: "com" или "ru" (рандомные буквы)

  return `${timestamp}_${username}@${domain}.${tld}`;
}
