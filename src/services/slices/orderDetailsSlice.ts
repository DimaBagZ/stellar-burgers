import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/**
 * Интерфейс состояния деталей заказа
 * @property orders - Массив заказов
 * @property orderIsLoading - Флаг загрузки заказа
 * @property error - Сообщение об ошибке
 */
interface IOrderDetailsSliceState {
  orders: TOrder[];
  orderIsLoading: boolean;
  error: string | undefined;
}

/**
 * Начальное состояние деталей заказа
 */
const initialState: IOrderDetailsSliceState = {
  orders: [],
  orderIsLoading: false,
  error: undefined
};

/**
 * Асинхронный thunk для получения заказа по номеру
 * @param number - Номер заказа
 */
export const fetchOrderByNumber = createAsyncThunk(
  'orderDetails/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

/**
 * Слайс для управления состоянием деталей заказа
 */
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  selectors: {
    /**
     * Селектор для проверки состояния загрузки заказа
     */
    selectOrdersIsLoading: (state) => state.orderIsLoading,
    /**
     * Селектор для получения массива заказов
     */
    selectOrders: (state) => state.orders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { selectOrdersIsLoading, selectOrders } =
  orderDetailsSlice.selectors;
export const orderDetailsReducer = orderDetailsSlice.reducer;
