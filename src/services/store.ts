import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { currentOrderReducer } from './slices/currentOrderSlice';
import { feedOrdersReducer } from './slices/feedOrdersSlice';
import { orderDetailsReducer } from './slices/orderDetailsSlice';
import { userReducer } from './slices/userSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { passwordReducer } from './slices/passwordSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentOrder: currentOrderReducer,
  feedOrders: feedOrdersReducer,
  orderDetails: orderDetailsReducer,
  userOrders: userOrdersReducer,
  user: userReducer,
  password: passwordReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
