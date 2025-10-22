import { burgerConstructorReducer } from '../../services/slices/burgerConstructorSlice';
import {
  addIngredients,
  removeIngredient,
  ingredientsToUp,
  ingredientsToDown,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';

describe('burgerConstructor reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    isIngredientsLoading: false,
    error: null
  };

  const mockBun = {
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

  const mockIngredient = {
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

  it('должен вернуть начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен добавить булку', () => {
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        bun: { ...mockBun, id: expect.any(String) }
      }
    };
    expect(
      burgerConstructorReducer(initialState, addIngredients(mockBun))
    ).toEqual(expectedState);
  });

  it('должен добавить ингредиент', () => {
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...mockIngredient, id: expect.any(String) }]
      }
    };
    expect(
      burgerConstructorReducer(initialState, addIngredients(mockIngredient))
    ).toEqual(expectedState);
  });

  it('должен удалить ингредиент', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      }
    };
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: []
      }
    };
    expect(
      burgerConstructorReducer(
        stateWithIngredient,
        removeIngredient({ ...mockIngredient, id: 'test-id' })
      )
    ).toEqual(expectedState);
  });

  it('должен переместить ингредиент вверх', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '1' },
          { ...mockIngredient, id: '2' }
        ]
      }
    };
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '2' },
          { ...mockIngredient, id: '1' }
        ]
      }
    };
    expect(
      burgerConstructorReducer(stateWithIngredients, ingredientsToUp(1))
    ).toEqual(expectedState);
  });

  it('должен переместить ингредиент вниз', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '1' },
          { ...mockIngredient, id: '2' }
        ]
      }
    };
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '2' },
          { ...mockIngredient, id: '1' }
        ]
      }
    };
    expect(
      burgerConstructorReducer(stateWithIngredients, ingredientsToDown(0))
    ).toEqual(expectedState);
  });

  it('должен очистить конструктор', () => {
    const stateWithItems = {
      ...initialState,
      constructorItems: {
        bun: { ...mockBun, id: 'bun-id' },
        ingredients: [{ ...mockIngredient, id: '1' }]
      }
    };
    expect(
      burgerConstructorReducer(stateWithItems, clearConstructor())
    ).toEqual(initialState);
  });
});
