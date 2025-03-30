import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

/**
 * Интерфейс состояния ингредиентов
 * @property ingredients - Массив ингредиентов
 * @property isIngredientsLoading - Флаг загрузки ингредиентов
 * @property error - Сообщение об ошибке
 */
interface IIngredientsSliceState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | undefined;
}

/**
 * Начальное состояние ингредиентов
 */
const initialState: IIngredientsSliceState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: undefined
};

/**
 * Асинхронный thunk для получения списка ингредиентов
 */
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

/**
 * Слайс для управления состоянием ингредиентов
 */
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    /**
     * Сбрасывает флаг загрузки ингредиентов
     */
    getIngredients: (state) => {
      state.isIngredientsLoading = false;
    },
    /**
     * Добавляет ингредиент в список
     * @param payload - Ингредиент для добавления
     */
    getIngredientsAdded: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(payload);
    }
  },
  selectors: {
    /**
     * Селектор для получения массива ингредиентов
     */
    selectIngredients: (state) => state.ingredients,
    /**
     * Селектор для проверки состояния загрузки ингредиентов
     */
    selectIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
export const { getIngredients, getIngredientsAdded } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
