import { rootReducer } from '../../services/store';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: undefined
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        isIngredientsLoading: false,
        error: null
      },
      currentOrder: {
        order: null,
        orderIsLoading: false,
        error: undefined
      },
      feedOrders: {
        feeds: [],
        total: 0,
        totalToday: 0,
        feedIsLoading: false,
        error: undefined
      },
      orderDetails: {
        orders: [],
        orderIsLoading: false,
        error: undefined
      },
      user: {
        data: {
          email: '',
          name: ''
        },
        isAuthenticated: false,
        loginUserRequest: false,
        error: undefined
      },
      userOrders: {
        userOrders: [],
        userOrdersIsLoading: false,
        error: undefined
      },
      password: {
        isRequesting: false,
        error: undefined
      }
    });
  });

  it('should return the same state for unknown action', () => {
    const state = {
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: undefined
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        isIngredientsLoading: false,
        error: null
      },
      currentOrder: {
        order: null,
        orderIsLoading: false,
        error: undefined
      },
      feedOrders: {
        feeds: [],
        total: 0,
        totalToday: 0,
        feedIsLoading: false,
        error: undefined
      },
      orderDetails: {
        orders: [],
        orderIsLoading: false,
        error: undefined
      },
      user: {
        data: {
          email: '',
          name: ''
        },
        isAuthenticated: false,
        loginUserRequest: false,
        error: undefined
      },
      userOrders: {
        userOrders: [],
        userOrdersIsLoading: false,
        error: undefined
      },
      password: {
        isRequesting: false,
        error: undefined
      }
    };

    const newState = rootReducer(state, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(state);
  });
});
