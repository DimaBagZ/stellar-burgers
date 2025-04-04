import {
  userOrdersReducer,
  fetchUserOrdersApi
} from '../../services/slices/userOrdersSlice';
import { orderResponse } from '../../utils/testData';

describe('userOrders reducer', () => {
  const initialState = {
    userOrders: [],
    userOrdersIsLoading: false,
    error: undefined
  };

  it('should return initial state', () => {
    expect(userOrdersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchUserOrdersApi.pending', () => {
    const action = { type: fetchUserOrdersApi.pending.type };
    const state = userOrdersReducer(initialState, action);
    expect(state.userOrdersIsLoading).toBe(true);
  });

  it('should handle fetchUserOrdersApi.fulfilled', () => {
    const action = {
      type: fetchUserOrdersApi.fulfilled.type,
      payload: orderResponse
    };
    const state = userOrdersReducer(initialState, action);
    expect(state.userOrdersIsLoading).toBe(false);
    expect(state.userOrders).toEqual(orderResponse.orders);
  });

  it('should handle fetchUserOrdersApi.rejected', () => {
    const action = {
      type: fetchUserOrdersApi.rejected.type,
      error: { message: 'Error' }
    };
    const state = userOrdersReducer(initialState, action);
    expect(state.userOrdersIsLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
