import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface IUserOrdersResponse {
  orders: TOrder[];
}

/**
 * Интерфейс состояния заказов пользователя
 * @property userOrders - Массив заказов пользователя
 * @property userOrdersIsLoading - Флаг загрузки заказов
 * @property error - Сообщение об ошибке
 */
interface IUserOrdersSliceState {
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | undefined;
}

/**
 * Начальное состояние заказов пользователя
 */
const initialState: IUserOrdersSliceState = {
  userOrders: [],
  userOrdersIsLoading: false,
  error: undefined
};

/**
 * Асинхронный thunk для получения заказов пользователя
 */
export const fetchUserOrdersApi = createAsyncThunk<IUserOrdersResponse>(
  'userOrders/fetchUserOrdersApi',
  async () => getOrdersApi()
);

/**
 * Слайс для управления состоянием заказов пользователя
 */
const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    /**
     * Селектор для проверки состояния загрузки заказов
     */
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    /**
     * Селектор для получения массива заказов пользователя
     */
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrdersApi.pending, (state) => {
        state.userOrdersIsLoading = true;
      })
      .addCase(fetchUserOrdersApi.rejected, (state, action) => {
        state.userOrdersIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrdersApi.fulfilled, (state, action) => {
        state.userOrdersIsLoading = false;
        state.userOrders = action.payload.orders;
      });
  }
});

export const { selectUserOrdersIsLoading, selectUserOrders } =
  userOrdersSlice.selectors;
export const userOrdersReducer = userOrdersSlice.reducer;
