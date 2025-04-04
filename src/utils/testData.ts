import { TIngredient, TOrder, TUser } from './types';
import {
  TAuthResponse,
  TRegisterData,
  TLoginData,
  TNewOrderResponse,
  TFeedsResponse,
  TOrderResponse
} from './burger-api';

export const bun = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  name: 'Флюоресцентная булка R2-D3',
  price: 988,
  proteins: 44,
  type: 'bun',
  _id: '643d69a5c3f7b9001cfa093d',
  id: '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
};

export const main = {
  calories: 2674,
  carbohydrates: 300,
  fat: 800,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  name: 'Говяжий метеорит (отбивная)',
  price: 3000,
  proteins: 800,
  type: 'main',
  _id: '643d69a5c3f7b9001cfa0940',
  id: 'df0670f4-6435-4384-b75a-3ee0fa49a29a'
};

export const sauce = {
  calories: 30,
  carbohydrates: 40,
  fat: 20,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  name: 'Соус Spicy-X',
  price: 90,
  proteins: 30,
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0942',
  id: 'b097fe74-75a2-4fa2-b193-86f97909b839'
};

export const order: TOrder = {
  _id: '643d69a5c3f7b9001cfa0940',
  status: 'new',
  name: 'test order',
  createdAt: 'now()',
  updatedAt: 'now()',
  number: 1,
  ingredients: [
    '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
    'df0670f4-6435-4384-b75a-3ee0fa49a29a',
    'b097fe74-75a2-4fa2-b193-86f97909b839',
    '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
  ]
};

export const userOrders: TOrder[] = [
  {
    _id: '643d69a5c3f7b9001cfa0940',
    status: 'new',
    name: 'test order 1',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 1,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    status: 'ready',
    name: 'test order 2',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 2,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    status: 'done',
    name: 'test order 3',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 3,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  }
];

export const ingredients: TIngredient[] = [bun, main, sauce];

export const user: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

export const registerData: TRegisterData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

export const loginData: TLoginData = {
  email: 'test@example.com',
  password: 'password123'
};

export const authResponse: TAuthResponse = {
  success: true,
  accessToken: 'test-access-token',
  refreshToken: 'test-refresh-token',
  user
};

export const newOrderResponse: TNewOrderResponse = {
  success: true,
  name: 'test order',
  order
};

export const feedsResponse: TFeedsResponse = {
  success: true,
  orders: userOrders,
  total: 100,
  totalToday: 10
};

export const orderResponse: TOrderResponse = {
  success: true,
  orders: userOrders
};

export const userResponse = {
  success: true,
  user: {
    name: 'Test User',
    email: 'test@example.com'
  }
};
