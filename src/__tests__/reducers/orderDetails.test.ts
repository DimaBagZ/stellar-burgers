import { orderDetailsReducer } from '../../services/slices/orderDetailsSlice';
import { fetchOrderByNumber } from '../../services/slices/orderDetailsSlice';
import { orderResponse } from '../../utils/testData';

describe('orderDetails reducer', () => {
  const initialState = {
    orders: [],
    orderIsLoading: false,
    error: undefined
  };

  it('should return initial state', () => {
    expect(orderDetailsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderIsLoading).toBe(true);
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: orderResponse
    };
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderIsLoading).toBe(false);
    expect(state.orders).toEqual(orderResponse.orders);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Error' }
    };
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderIsLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
