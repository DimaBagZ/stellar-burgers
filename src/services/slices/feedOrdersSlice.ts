import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/**
 * Интерфейс состояния ленты заказов
 * @property feeds - Массив заказов
 * @property feedIsLoading - Флаг загрузки ленты
 * @property total - Общее количество заказов
 * @property totalToday - Количество заказов за сегодня
 * @property error - Сообщение об ошибке
 */
interface IFeedOrdersSliceState {
  feeds: TOrder[];
  feedIsLoading: boolean;
  total: number;
  totalToday: number;
  error: string | undefined;
}

/**
 * Начальное состояние ленты заказов
 */
const initialState: IFeedOrdersSliceState = {
  feeds: [],
  feedIsLoading: false,
  total: 0,
  totalToday: 0,
  error: undefined
};

/**
 * Асинхронный thunk для получения ленты заказов
 */
export const fetchFeedsApi = createAsyncThunk(
  'feedOrders/fetchFeedsApi',
  async () => getFeedsApi()
);

/**
 * Слайс для управления состоянием ленты заказов
 */
const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {},
  selectors: {
    /**
     * Селектор для проверки состояния загрузки ленты
     */
    selectFeedIsLoading: (state) => state.feedIsLoading,
    /**
     * Селектор для получения массива заказов
     */
    selectFeeds: (state) => state.feeds,
    /**
     * Селектор для получения общего количества заказов
     */
    selectTotal: (state) => state.total,
    /**
     * Селектор для получения количества заказов за сегодня
     */
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedsApi.pending, (state) => {
        state.feedIsLoading = true;
      })
      .addCase(fetchFeedsApi.rejected, (state, action) => {
        state.feedIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeedsApi.fulfilled, (state, action) => {
        state.feedIsLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  selectFeedIsLoading,
  selectFeeds,
  selectTotal,
  selectTotalToday
} = feedOrdersSlice.selectors;
export const feedOrdersReducer = feedOrdersSlice.reducer;
