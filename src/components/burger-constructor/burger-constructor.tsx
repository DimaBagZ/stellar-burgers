import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBurger,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice';
import {
  fetchOrderBurgerApi,
  clearOrder,
  selectOrderIsLoading,
  selectOrder
} from '../../services/slices/currentOrderSlice';
import { BurgerConstructorUI } from '@ui';
import { Preloader } from '@ui';

/**
 * Компонент конструктора бургера
 * Управляет сборкой бургера, расчетом стоимости и оформлением заказа
 */
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector(selectConstructorBurger);
  const orderIsLoading = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrder);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Очищаем конструктор только после успешного получения заказа
  useEffect(() => {
    if (orderModalData && !orderIsLoading) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, orderIsLoading, dispatch]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }
    if (!constructorItems.bun) {
      return;
    }
    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(fetchOrderBurgerApi(orderData));
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrder());
    navigate('/');
  };

  const price = constructorItems.bun
    ? constructorItems.bun.price * 2 +
      constructorItems.ingredients.reduce((acc, item) => acc + item.price, 0)
    : 0;

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={constructorItems}
      orderRequest={orderIsLoading}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
