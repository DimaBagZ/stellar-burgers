import { feedOrdersReducer } from '../../services/slices/feedOrdersSlice';
import { fetchFeedsApi } from '../../services/slices/feedOrdersSlice';
import { feedsResponse } from '../../utils/testData';

describe('feedOrders reducer', () => {
  const initialState = {
    feeds: [],
    feedIsLoading: false,
    total: 0,
    totalToday: 0,
    error: undefined
  };

  it('should return initial state', () => {
    expect(feedOrdersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchFeedsApi.pending', () => {
    const action = { type: fetchFeedsApi.pending.type };
    const state = feedOrdersReducer(initialState, action);
    expect(state.feedIsLoading).toBe(true);
  });

  it('should handle fetchFeedsApi.fulfilled', () => {
    const action = {
      type: fetchFeedsApi.fulfilled.type,
      payload: feedsResponse
    };
    const state = feedOrdersReducer(initialState, action);
    expect(state.feedIsLoading).toBe(false);
    expect(state.feeds).toEqual(feedsResponse.orders);
    expect(state.total).toBe(feedsResponse.total);
    expect(state.totalToday).toBe(feedsResponse.totalToday);
  });

  it('should handle fetchFeedsApi.rejected', () => {
    const action = {
      type: fetchFeedsApi.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedOrdersReducer(initialState, action);
    expect(state.feedIsLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
