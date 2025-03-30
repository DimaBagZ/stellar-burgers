import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

/**
 * Валидация данных регистрации
 */
const validateRegisterData = (data: TRegisterData): string | null => {
  if (!data.email || !data.password || !data.name) {
    return 'Пожалуйста, заполните все поля';
  }
  if (data.password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Пожалуйста, введите корректный email';
  }
  if (data.name.length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  return null;
};

/**
 * Валидация данных авторизации
 */
const validateLoginData = (data: TLoginData): string | null => {
  if (!data.email || !data.password) {
    return 'Пожалуйста, заполните все поля';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Пожалуйста, введите корректный email';
  }
  if (data.password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов';
  }
  return null;
};

/**
 * Асинхронный thunk для регистрации пользователя
 * Сохраняет токены в куки и localStorage
 */
export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    const validationError = validateRegisterData(data);
    if (validationError) {
      return rejectWithValue(validationError);
    }
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return rejectWithValue(
          'Пользователь с таким email уже зарегистрирован'
        );
      }
      return rejectWithValue(
        'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже'
      );
    }
  }
);

/**
 * Асинхронный thunk для авторизации пользователя
 * Сохраняет токены в куки и localStorage
 */
export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    const validationError = validateLoginData(data);
    if (validationError) {
      return rejectWithValue(validationError);
    }
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      if (error.message === 'email or password are incorrect') {
        return rejectWithValue('Неверный email или пароль');
      }
      return rejectWithValue(
        'Произошла ошибка при входе. Пожалуйста, попробуйте позже'
      );
    }
  }
);

/**
 * Асинхронный thunk для получения данных пользователя
 */
export const fetchGetUser = createAsyncThunk('user/get', async () =>
  getUserApi()
);

/**
 * Асинхронный thunk для обновления данных пользователя
 */
export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

/**
 * Асинхронный thunk для выхода пользователя
 * Удаляет токены из куки и localStorage
 */
export const fetchLogout = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

/**
 * Интерфейс состояния пользователя
 * @property isAuthenticated - Флаг аутентификации
 * @property data - Данные пользователя
 * @property error - Сообщение об ошибке
 * @property loginUserRequest - Флаг запроса авторизации
 */
interface TUserState {
  isAuthenticated: boolean;
  data: TUser;
  error: string | undefined;
  loginUserRequest: boolean;
}

/**
 * Начальное состояние пользователя
 */
const initialState: TUserState = {
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  },
  error: undefined,
  loginUserRequest: false
};

/**
 * Слайс для управления состоянием пользователя
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Очищает сообщение об ошибке
     */
    clearErrorMessage: (state) => {
      state.error = undefined;
    }
  },
  selectors: {
    /**
     * Селектор для получения данных пользователя
     */
    selectUserData: (state) => state.data,
    /**
     * Селектор для проверки аутентификации
     */
    selectIsAuthenticated: (state) => state.isAuthenticated,
    /**
     * Селектор для получения сообщения об ошибке
     */
    selectError: (state) => state.error,
    /**
     * Селектор для проверки состояния запроса авторизации
     */
    selectLoginRequest: (state) => state.loginUserRequest
  },
  extraReducers(builder) {
    builder
      //Регистрация
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = undefined;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error =
          (action.payload as string) || 'Произошла ошибка при регистрации';
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
        state.data.name = action.payload.user.name;
        state.error = undefined;
      })
      //Авторизация
      .addCase(fetchLoginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = undefined;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error =
          (action.payload as string) || 'Произошла ошибка при авторизации';
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.error = undefined;
      })
      //Получение данных юзера
      .addCase(fetchGetUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.error =
          action.error.message === 'You should be authorised'
            ? 'Пожалуйста, авторизуйтесь'
            : action.error.message === 'Invalid credentials provided'
              ? 'Неверные учетные данные'
              : action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })
      //Обновление данных пользователя
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = true;
        state.error =
          action.error.message === 'You should be authorised'
            ? 'Пожалуйста, авторизуйтесь'
            : action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })
      //Выход
      .addCase(fetchLogout.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.data = { name: '', email: '' };
        state.loginUserRequest = false;
      });
  }
});

export const { clearErrorMessage } = userSlice.actions;
export const {
  selectUserData,
  selectError,
  selectIsAuthenticated,
  selectLoginRequest
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
