import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/**
 * Интерфейс состояния текущего заказа
 * @property order - Данные текущего заказа
 * @property orderIsLoading - Флаг загрузки заказа
 * @property error - Сообщение об ошибке
 */
interface ICurrentOrderSliceState {
  order: TOrder | null;
  orderIsLoading: boolean;
  error: string | undefined;
}

/**
 * Начальное состояние текущего заказа
 */
const initialState: ICurrentOrderSliceState = {
  order: null,
  orderIsLoading: false,
  error: undefined
};

/**
 * Асинхронный thunk для создания заказа
 * @param data - Массив ID ингредиентов для заказа
 */
export const fetchOrderBurgerApi = createAsyncThunk(
  'currentOrder/fetchOrderBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);

/**
 * Слайс для управления состоянием текущего заказа
 */
const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    /**
     * Очищает данные текущего заказа
     */
    clearOrder: (state) => {
      state.order = null;
      state.orderIsLoading = false;
    }
  },
  selectors: {
    /**
     * Селектор для проверки состояния загрузки заказа
     */
    selectOrderIsLoading: (state) => state.orderIsLoading,
    /**
     * Селектор для получения данных текущего заказа
     */
    selectOrder: (state) => state.order
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state, action) => {
        state.orderIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder } = currentOrderSlice.actions;
export const { selectOrderIsLoading, selectOrder } =
  currentOrderSlice.selectors;
export const currentOrderReducer = currentOrderSlice.reducer;
