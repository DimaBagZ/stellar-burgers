import { ingredientsReducer } from '../../services/slices/ingredientsSlice';
import {
  fetchIngredients,
  getIngredients,
  getIngredientsAdded
} from '../../services/slices/ingredientsSlice';

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: undefined
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
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен установить флаг загрузки в true при начале загрузки', () => {
    const expectedState = {
      ...initialState,
      isIngredientsLoading: true
    };
    expect(
      ingredientsReducer(initialState, { type: fetchIngredients.pending.type })
    ).toEqual(expectedState);
  });

  it('должен установить флаг загрузки в false и добавить ингредиенты при успешной загрузке', () => {
    const mockIngredients = [mockIngredient];
    const expectedState = {
      ...initialState,
      isIngredientsLoading: false,
      ingredients: mockIngredients
    };
    expect(
      ingredientsReducer(
        initialState,
        fetchIngredients.fulfilled(mockIngredients, '')
      )
    ).toEqual(expectedState);
  });

  it('должен установить флаг загрузки в false и добавить ошибку при неудачной загрузке', () => {
    const error = 'Ошибка загрузки';
    const expectedState = {
      ...initialState,
      isIngredientsLoading: false,
      error
    };
    expect(
      ingredientsReducer(
        initialState,
        fetchIngredients.rejected(new Error(error), '', undefined, error)
      )
    ).toEqual(expectedState);
  });

  it('должен сбросить флаг загрузки', () => {
    const stateWithLoading = {
      ...initialState,
      isIngredientsLoading: true
    };
    const expectedState = {
      ...initialState,
      isIngredientsLoading: false
    };
    expect(ingredientsReducer(stateWithLoading, getIngredients())).toEqual(
      expectedState
    );
  });

  it('должен добавить ингредиент', () => {
    const expectedState = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: expect.any(String) }]
    };
    expect(
      ingredientsReducer(
        initialState,
        getIngredientsAdded({ ...mockIngredient, id: 'test-id' })
      )
    ).toEqual(expectedState);
  });
});
