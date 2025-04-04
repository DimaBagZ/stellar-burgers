import {
  burgerConstructorReducer,
  addIngredients,
  removeIngredient,
  ingredientsToUp,
  ingredientsToDown
} from '../../services/slices/burgerConstructorSlice';
import { TIngredient } from '@utils-types';

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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const mockIngredient1: TIngredient = {
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
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const mockIngredient2: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
};

describe('burgerConstructor reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    isIngredientsLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: 'UNKNOWN' })).toEqual(
      initialState
    );
  });

  it('should handle addIngredients with bun', () => {
    const state = burgerConstructorReducer(
      initialState,
      addIngredients(mockBun)
    );
    expect(state.constructorItems.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  it('should handle addIngredients with non-bun ingredient', () => {
    const state = burgerConstructorReducer(
      initialState,
      addIngredients(mockIngredient1)
    );
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toEqual([
      { ...mockIngredient1, id: expect.any(String) }
    ]);
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = burgerConstructorReducer(
      initialState,
      addIngredients(mockIngredient1)
    );
    const state = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient(stateWithIngredient.constructorItems.ingredients[0])
    );
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  it('should handle moveIngredient', () => {
    let state = burgerConstructorReducer(
      initialState,
      addIngredients(mockIngredient1)
    );
    state = burgerConstructorReducer(state, addIngredients(mockIngredient2));

    const firstIngredient = state.constructorItems.ingredients[0];
    const secondIngredient = state.constructorItems.ingredients[1];

    state = burgerConstructorReducer(state, ingredientsToDown(0));
    expect(state.constructorItems.ingredients[0]).toEqual(secondIngredient);
    expect(state.constructorItems.ingredients[1]).toEqual(firstIngredient);

    state = burgerConstructorReducer(state, ingredientsToUp(1));
    expect(state.constructorItems.ingredients[0]).toEqual(firstIngredient);
    expect(state.constructorItems.ingredients[1]).toEqual(secondIngredient);
  });
});
