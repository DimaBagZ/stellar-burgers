import { userReducer } from '../../services/slices/userSlice';
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchUpdateUser,
  fetchLogout
} from '../../services/slices/userSlice';

const initialState = {
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  },
  error: undefined,
  loginUserRequest: false
};

describe('user reducer', () => {
  it('should handle fetchRegisterUser.pending', () => {
    const action = { type: fetchRegisterUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeUndefined();
  });

  it('should handle fetchRegisterUser.fulfilled', () => {
    const action = {
      type: fetchRegisterUser.fulfilled.type,
      payload: {
        success: true,
        user: { email: 'test@test.com', name: 'Test User' }
      }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.data).toEqual({
      email: 'test@test.com',
      name: 'Test User'
    });
  });

  it('should handle fetchLoginUser.pending', () => {
    const action = { type: fetchLoginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeUndefined();
  });

  it('should handle fetchLoginUser.fulfilled', () => {
    const action = {
      type: fetchLoginUser.fulfilled.type,
      payload: {
        success: true,
        user: { email: 'test@test.com', name: 'Test User' }
      }
    };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.data).toEqual({
      email: 'test@test.com',
      name: 'Test User'
    });
  });

  it('should handle fetchUpdateUser.rejected', () => {
    const action = {
      type: fetchUpdateUser.rejected.type,
      error: { message: 'Произошла ошибка при обновлении данных пользователя' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(
      'Произошла ошибка при обновлении данных пользователя'
    );
  });

  it('should handle fetchLogout.rejected', () => {
    const action = {
      type: fetchLogout.rejected.type,
      error: { message: 'Произошла ошибка при выходе из системы' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe('Произошла ошибка при выходе из системы');
  });
});
