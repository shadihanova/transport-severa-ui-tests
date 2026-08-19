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

export const TRANSPORT_COLORS = {
  bus: 'rgb(13, 179, 151)', // Зеленый (Автобусы)
  marshrutki: 'rgb(64, 117, 255)', // Синий (Маршрутки)
  tram: 'rgb(255, 162, 63)', // Оранжевый (Трамваи)
};

// Уникальные начала путей (d-атрибут) для иконок ТС
export const TRANSPORT_ICONS = {
  bus: 'M20.9,6.3h-9.9c-2.2,0-4,1.8-4,4v9.9',
  marshrutki: 'M20.9,6.3h-9.9c-2.2,0-4,1.8-4,4v9.9',
  tram: 'M20.7,9h-0.8l1.8-3.7l-1.7-0.8',
};

export interface TransportGroup {
  type: string;
  color: string;
  iconPath: string;
  routes: string[];
}

// Ожидаемые данные для Левой Панели (Sidebar)
export const SIDEBAR_EXPECTED_DATA = {
  headers: ['Городские маршруты', 'Пригородные маршруты', 'Междугородние маршруты', 'Ближайшие остановочные пункты'],

  // Данные по типам ТС внутри секции "Городские маршруты"
  cityTransport: <TransportGroup[]>[
    {
      type: 'Автобус',
      color: TRANSPORT_COLORS.bus,
      iconPath: TRANSPORT_ICONS.bus,
      routes: ['5', '10А', '11', '18', '19', '24', '27', '29', '33Р', '1', '30', '27**', '3Т', '4Т', '4Т*', '27*'],
    },
    {
      type: 'Маршрутки',
      color: TRANSPORT_COLORS.marshrutki,
      iconPath: TRANSPORT_ICONS.marshrutki,
      routes: ['10К', '18К', '51', '52', '53', '54', '55', '57', '71'],
    },
    {
      type: 'Трамвай',
      color: TRANSPORT_COLORS.tram,
      iconPath: TRANSPORT_ICONS.tram,
      routes: ['3', '4', '6', '10'],
    },
  ],

  // Данные по типам ТС внутри секции "Пригородные маршруты"
  suburbanTransport: <TransportGroup[]>[
    {
      type: 'Автобус',
      color: TRANSPORT_COLORS.bus,
      iconPath: TRANSPORT_ICONS.bus,
      routes: ['105', '106Н'], // не все
    },
    {
      type: 'Маршрутки',
      color: TRANSPORT_COLORS.marshrutki,
      iconPath: TRANSPORT_ICONS.marshrutki,
      routes: ['105 (а)', '106 (а)', '105 (б)', '125'],
    },
  ],

  // Данные по типам ТС внутри секции "Междугородние маршруты"
  intercityTransport: <TransportGroup[]>[
    {
      type: 'Автобус',
      color: TRANSPORT_COLORS.bus,
      iconPath: TRANSPORT_ICONS.bus,
      routes: ['206', '241', '202', '209К', '207'], // не все
    },
    {
      type: 'Маршрутки',
      color: TRANSPORT_COLORS.marshrutki,
      iconPath: TRANSPORT_ICONS.marshrutki,
      routes: ['211.', '234', '239'],
    },
  ],

  // Ближайшие остановки
  stops: ['п-д Капитана Тарана'],
};

// Ожидаемые данные для раздела Справка
export const INFO_EXPECTED_DATA = {
  title: 'Справка',
  copyright: '® 2026 Транспорт Севера',
  transflowUrl: 'http://transflow.ru',

  // Ключевые фразы из текста (проверяют, что нужные абзацы присутствуют)
  textSnippets: [
    'Единой платформой управления транспортной системой Мурманской области', // Из первого абзаца
    'По вопросам транспортного обслуживания обращайтесь', // Из второго абзаца
    'Маломобильные группы населения - это инвалиды', // Из третьего абзаца
    'Распоряжение Минтранса России от 31.01.2017', // Проверка наличия ссылки на закон
  ],
};

// Ожидаемые данные для Гида по порталу
export const GUIDE_EXPECTED_DATA = {
  slides: [
    'Приветствуем на Портале «Транспорт Севера»',
    'Разрешите приложению определять Ваше местоположение',
    'Ознакомьтесь с возможностями Портала «Транспорт Севера»',
    'Смотрите онлайн табло прибытия транспорта на остановку',
    'Узнайте, как доехать до нужной Вам остановки',
    'Добавляйте маршруты и остановки в избранное для быстрого доступа',
    'Смотрите актуальную информацию по перекрытиям',
    'Оставляйте отзывы и проходите опросы',
    'Читайте новости',
  ],

  faqQuestions: [
    '1 Что я вижу на карте?',
    '2 Что еще можно увидеть на карте?',
    '3 Как узнать, скоро ли придет мой автобус, или троллейбус?',
    '4 Как доехать от остановки А до остановки Б?',
    '5 Как сделать портал удобнее?',
    '6 Как можно дать обратную связь?',
    '7 Где узнать новости?',
    '8 Где посмотреть справочную информацию?',
  ],
};
