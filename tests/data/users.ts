export interface UserCredentials {
  username: string;
  password?: string;
}

export const USERS = {
  user1: {
    username: process.env.USER1_LOGIN || 'user_1',
    password: process.env.USER1_PASSWORD || 'default_pass_1',
  },
  user2: {
    username: process.env.USER2_LOGIN || 'user_2',
    password: process.env.USER2_PASSWORD || 'default_pass_2',
  },
} as const;

export const AUTH_STORAGE_PATHS = {
  user1: 'setup/.auth/user1.json',
  user2: 'setup/.auth/user2.json',
};
