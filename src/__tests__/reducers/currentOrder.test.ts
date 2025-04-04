import { currentOrderReducer } from '../../services/slices/currentOrderSlice';
import {
  fetchOrderBurgerApi,
  clearOrder
} from '../../services/slices/currentOrderSlice';
import { newOrderResponse } from '../../utils/testData';

describe('currentOrder reducer', () => {
  const initialState = {
    order: null,
    orderIsLoading: false,
    error: undefined
  };

  it('should return initial state', () => {
    expect(currentOrderReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchOrderBurgerApi.pending', () => {
    const action = { type: fetchOrderBurgerApi.pending.type };
    const state = currentOrderReducer(initialState, action);
    expect(state.orderIsLoading).toBe(true);
  });

  it('should handle fetchOrderBurgerApi.fulfilled', () => {
    const action = {
      type: fetchOrderBurgerApi.fulfilled.type,
      payload: newOrderResponse
    };
    const state = currentOrderReducer(initialState, action);
    expect(state.orderIsLoading).toBe(false);
    expect(state.order).toEqual(newOrderResponse.order);
  });

  it('should handle fetchOrderBurgerApi.rejected', () => {
    const action = {
      type: fetchOrderBurgerApi.rejected.type,
      error: { message: 'Error' }
    };
    const state = currentOrderReducer(initialState, action);
    expect(state.orderIsLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle clearOrder', () => {
    const action = { type: clearOrder.type };
    const state = currentOrderReducer(
      {
        ...initialState,
        order: newOrderResponse.order
      },
      action
    );
    expect(state.order).toBeNull();
  });
});
