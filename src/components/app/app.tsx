import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import { fetchGetUser } from '../../services/slices/userSlice';
import { OrderInfoModal } from '../order-info';
import { IngredientDetailsModal } from '../ingredient-details';
import { getCookie } from '../../utils/cookie';

/**
 * Компонент роутера приложения
 * Управляет маршрутизацией и инициализацией данных
 */
const AppRouter = () => {
  // Получаем текущее местоположение и фоновое состояние для модальных окон
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Инициализация данных приложения
   * Загружает список ингредиентов и данные пользователя
   */
  useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookie('accessToken')) {
      dispatch(fetchGetUser());
    }
  }, []);

  return (
    <>
      <Routes location={background || location}>
        {/* Публичные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Маршруты, доступные только неавторизованным пользователям */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищенные маршруты, требующие авторизации */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
          <Route path='/profile/orders/:number' element={<OrderInfoModal />} />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  </BrowserRouter>
);

export default App;
