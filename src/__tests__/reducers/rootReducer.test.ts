import { rootReducer } from '../../services/store';
import { ingredientsReducer } from '../../services/slices/ingredientsSlice';
import { burgerConstructorReducer } from '../../services/slices/burgerConstructorSlice';
import { orderDetailsReducer } from '../../services/slices/orderDetailsSlice';
import { currentOrderReducer } from '../../services/slices/currentOrderSlice';
import { feedOrdersReducer } from '../../services/slices/feedOrdersSlice';
import { userOrdersReducer } from '../../services/slices/userOrdersSlice';
import { userReducer } from '../../services/slices/userSlice';
import { passwordReducer } from '../../services/slices/passwordSlice';

describe('rootReducer', () => {
  const initialState = {
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
      feedIsLoading: false,
      total: 0,
      totalToday: 0,
      error: undefined
    },
    orderDetails: {
      orders: [],
      orderIsLoading: false,
      error: undefined
    },
    userOrders: {
      userOrders: [],
      userOrdersIsLoading: false,
      error: undefined
    },
    user: {
      isAuthenticated: false,
      data: { name: '', email: '' },
      error: undefined,
      loginUserRequest: false
    },
    password: {
      error: undefined,
      isRequesting: false
    }
  };

  it('должен вернуть начальное состояние', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать действия для ingredients', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.ingredients).toEqual(
      ingredientsReducer(initialState.ingredients, action)
    );
  });

  it('должен обрабатывать действия для burgerConstructor', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(initialState.burgerConstructor, action)
    );
  });

  it('должен обрабатывать действия для currentOrder', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.currentOrder).toEqual(
      currentOrderReducer(initialState.currentOrder, action)
    );
  });

  it('должен обрабатывать действия для feedOrders', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.feedOrders).toEqual(
      feedOrdersReducer(initialState.feedOrders, action)
    );
  });

  it('должен обрабатывать действия для orderDetails', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.orderDetails).toEqual(
      orderDetailsReducer(initialState.orderDetails, action)
    );
  });

  it('должен обрабатывать действия для userOrders', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.userOrders).toEqual(
      userOrdersReducer(initialState.userOrders, action)
    );
  });

  it('должен обрабатывать действия для user', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.user).toEqual(userReducer(initialState.user, action));
  });

  it('должен обрабатывать действия для password', () => {
    const action = { type: 'unknown' };
    const state = rootReducer(initialState, action);
    expect(state.password).toEqual(
      passwordReducer(initialState.password, action)
    );
  });
});
