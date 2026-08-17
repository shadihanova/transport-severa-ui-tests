import { generateRandomEmail } from './helpers';

export interface UserForRegistration {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const INVALID_REGISTRATION_DATA = {
  emails: [' ', 'test@ru', 'test.ru', 'test@.com'],
  names: ['Я', ' '],
  passwords: ['1234', '!@#.', ' '],
};

export const VALID_USER: UserForRegistration = {
  name: 'Иван',
  surname: 'Тестович',
  email: generateRandomEmail(),
  password: '12345',
  passwordConfirm: '12345',
};