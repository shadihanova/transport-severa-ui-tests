export interface UserCredentials {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
}

export const USERS: Record<string, UserCredentials> = {
  user1: {
    name: 'Иван',
    surname: 'Иванов',
    email: process.env.USER1_EMAIL || 'user1@test.ru',
    password: process.env.USER1_PASSWORD || 'password1',
  },
  user2: {
    name: 'Петр',
    surname: 'Петров',
    email: process.env.USER2_EMAIL || 'user2@test.ru',
    password: process.env.USER2_PASSWORD || 'password2',
  },
};

export const AUTH_STORAGE_PATHS = {
  user1: 'setup/.auth/user1.json',
  user2: 'setup/.auth/user2.json',
};
