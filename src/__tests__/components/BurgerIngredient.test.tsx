import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Location, MemoryRouter } from 'react-router-dom';
import { BurgerIngredientUI } from '../../components/ui/burger-ingredient/burger-ingredient';
import { store } from '../../services/store';
import { TIngredient } from '../../utils/types';

const mockIngredient: TIngredient = {
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

describe('BurgerIngredient', () => {
  const mockHandleAdd = jest.fn();
  const mockLocation: Location = {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ingredient correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerIngredientUI
            ingredient={mockIngredient}
            count={0}
            handleAdd={mockHandleAdd}
            locationState={{ background: mockLocation }}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Краторная булка N-200i')).toBeInTheDocument();
    expect(screen.getByText('1255')).toBeInTheDocument();
    expect(screen.getByAltText('картинка ингредиента.')).toBeInTheDocument();
  });

  it('navigates to ingredient details on click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerIngredientUI
            ingredient={mockIngredient}
            count={0}
            handleAdd={mockHandleAdd}
            locationState={{ background: mockLocation }}
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/ingredients/${mockIngredient._id}`);
  });

  it('displays counter when ingredient is in constructor', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerIngredientUI
            ingredient={mockIngredient}
            count={2}
            handleAdd={mockHandleAdd}
            locationState={{ background: mockLocation }}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls handleAdd when add button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerIngredientUI
            ingredient={mockIngredient}
            count={0}
            handleAdd={mockHandleAdd}
            locationState={{ background: mockLocation }}
          />
        </MemoryRouter>
      </Provider>
    );

    const addButton = screen.getByText('Добавить');
    fireEvent.click(addButton);

    expect(mockHandleAdd).toHaveBeenCalled();
  });

  it('is draggable', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerIngredientUI
            ingredient={mockIngredient}
            count={0}
            handleAdd={mockHandleAdd}
            locationState={{ background: mockLocation }}
          />
        </MemoryRouter>
      </Provider>
    );

    const ingredientItem = screen.getByRole('listitem');
    expect(ingredientItem).toHaveAttribute('draggable', 'true');
  });
});
