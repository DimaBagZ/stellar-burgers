import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BurgerConstructorUI } from '../../components/ui/burger-constructor/burger-constructor';
import { TIngredient } from '../../utils/types';
import { store } from '../../services/store';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const defaultProps = {
  orderRequest: false,
  price: 0,
  orderModalData: null,
  onOrderClick: jest.fn(),
  closeOrderModal: jest.fn()
};

describe('BurgerConstructor', () => {
  it('renders empty constructor', () => {
    render(
      <Provider store={store}>
        <BurgerConstructorUI
          constructorItems={{ bun: null, ingredients: [] }}
          {...defaultProps}
        />
      </Provider>
    );

    expect(screen.getByText('Выберите начинку')).toBeInTheDocument();
    expect(screen.getAllByText('Выберите булки')[0]).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders bun when provided', () => {
    render(
      <Provider store={store}>
        <BurgerConstructorUI
          constructorItems={{ bun: mockBun, ingredients: [] }}
          {...defaultProps}
          price={2510}
        />
      </Provider>
    );

    expect(
      screen.getByText('Краторная булка N-200i (верх)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Краторная булка N-200i (низ)')
    ).toBeInTheDocument();
    expect(screen.getByText('2510')).toBeInTheDocument();
  });

  it('renders ingredients when provided', () => {
    render(
      <Provider store={store}>
        <BurgerConstructorUI
          constructorItems={{ bun: null, ingredients: [mockIngredient] }}
          {...defaultProps}
        />
      </Provider>
    );

    expect(
      screen.getByText('Биокотлета из марсианской Магнолии')
    ).toBeInTheDocument();
    expect(screen.getByText('424')).toBeInTheDocument();
  });

  it('renders order button', () => {
    render(
      <Provider store={store}>
        <BurgerConstructorUI
          constructorItems={{ bun: null, ingredients: [] }}
          {...defaultProps}
        />
      </Provider>
    );
    expect(
      screen.getByRole('button', { name: 'Оформить заказ' })
    ).toBeInTheDocument();
  });
});
