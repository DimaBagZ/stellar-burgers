import {
  passwordReducer,
  fetchForgotPassword,
  fetchResetPassword,
  clearErrorMessage
} from '../../services/slices/passwordSlice';

describe('password reducer', () => {
  const initialState = {
    error: undefined,
    isRequesting: false
  };

  const mockForgotPasswordData = {
    email: 'test@example.com'
  };

  const mockResetPasswordData = {
    password: 'newPassword',
    token: 'resetToken'
  };

  it('should return initial state', () => {
    expect(passwordReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchForgotPassword.pending', () => {
    const action = { type: fetchForgotPassword.pending.type };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(true);
  });

  it('should handle fetchForgotPassword.fulfilled', () => {
    const action = {
      type: fetchForgotPassword.fulfilled.type,
      payload: { success: true }
    };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
  });

  it('should handle fetchForgotPassword.rejected', () => {
    const action = {
      type: fetchForgotPassword.rejected.type,
      error: { message: 'Произошла ошибка при восстановлении пароля' }
    };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
    expect(state.error).toBe('Произошла ошибка при восстановлении пароля');
  });

  it('should handle fetchResetPassword.pending', () => {
    const action = { type: fetchResetPassword.pending.type };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(true);
  });

  it('should handle fetchResetPassword.fulfilled', () => {
    const action = {
      type: fetchResetPassword.fulfilled.type,
      payload: { success: true }
    };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
  });

  it('should handle fetchResetPassword.rejected', () => {
    const action = {
      type: fetchResetPassword.rejected.type,
      error: { message: 'Произошла ошибка при сбросе пароля' }
    };
    const state = passwordReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
    expect(state.error).toBe('Произошла ошибка при сбросе пароля');
  });

  it('should handle clearErrorMessage', () => {
    const stateWithError = {
      error: 'Some error',
      isRequesting: false
    };
    const action = { type: clearErrorMessage.type };
    const state = passwordReducer(stateWithError, action);
    expect(state.error).toBeUndefined();
  });
});
