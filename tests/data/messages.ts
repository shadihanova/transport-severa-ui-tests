export const ERROR_MESSAGES = {
  invalidCredentials: 'Ошибка входа. Неверный E-mail или пароль',
  invalidRegistration: 'Проверьте правильность заполнения полей',
  // userNotFound: 'Пользователь не найден',
  // networkError: 'Ошибка соединения с сервером',
} as const;

export const SUCCESS_MESSAGES = {
  successRegistration: 'Вы успешно зарегистрированы!',
  successLogin: 'Вход выполнен',
  // routeSaved: 'Маршрут успешно сохранен в Избранное',
} as const;
