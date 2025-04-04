import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient } from '../../utils/types';

/**
 * Генерирует уникальный ID для ингредиента в конструкторе
 */
const randomId = () => crypto.randomUUID();

/**
 * Интерфейс состояния конструктора бургера
 * @property constructorItems - Объект, содержащий булку и массив ингредиентов
 * @property isIngredientsLoading - Флаг загрузки ингредиентов
 * @property error - Сообщение об ошибке
 */
export interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
}

/**
 * Начальное состояние конструктора
 */
const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

/**
 * Слайс для управления состоянием конструктора бургера
 */
const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    /**
     * Добавляет ингредиент в конструктор
     * Если это булка - заменяет существующую
     * Если это начинка или соус - добавляет в массив
     */
    addIngredients: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    /**
     * Перемещает ингредиент вверх в списке
     * @param payload - Индекс ингредиента для перемещения
     */
    ingredientsToUp: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];
      const neighbourIngredient =
        state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },
    /**
     * Перемещает ингредиент вниз в списке
     * @param payload - Индекс ингредиента для перемещения
     */
    ingredientsToDown: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];
      const neighbourIngredient =
        state.constructorItems.ingredients[payload + 1];

      state.constructorItems.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },
    /**
     * Удаляет ингредиент из конструктора
     * @param payload - Ингредиент для удаления
     */
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != payload.id
        );
    },
    /**
     * Очищает конструктор, удаляя все ингредиенты
     */
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.isIngredientsLoading = false;
    }
  },
  selectors: {
    /**
     * Селектор для получения всего состояния конструктора
     */
    selectConstructorBurger: (state) => state,
    /**
     * Селектор для получения элементов конструктора (булка и ингредиенты)
     */
    selectBurgerConstructorItems: (state) => state.constructorItems,
    /**
     * Селектор для получения ТОЛЬКО булки конструктора
     */
    selectConstructorBun: (state) => state.constructorItems.bun,
    /**
     * Селектор для получения ТОЛЬКО массива ингредиентов конструктора
     */
    selectConstructorIngredientsArray: (state) =>
      state.constructorItems.ingredients
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorBurger,
  selectBurgerConstructorItems,
  selectConstructorBun,
  selectConstructorIngredientsArray
} = burgerConstructorSlice.selectors;

export const {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
