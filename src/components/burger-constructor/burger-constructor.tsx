import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBurger,
  ingredientsToDown,
  ingredientsToUp,
  removeIngredient,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';
import {
  selectOrderIsLoading,
  selectOrder,
  clearOrder,
  fetchOrderBurgerApi
} from '../../services/slices/currentOrderSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../services/slices/userSlice';

/**
 * Компонент конструктора бургера
 * Управляет сборкой бургера, расчетом стоимости и оформлением заказа
 */
export const BurgerConstructor: FC = () => {
  // Получаем данные из Redux store
  const items = useSelector(selectConstructorBurger).constructorItems;
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectUserData).name;

  /**
   * Обработчик оформления заказа
   * Проверяет авторизацию, наличие булки и отправляет заказ на сервер
   */
  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const { bun, ingredients } = items;
    if (!bun) {
      alert('Сначала соберите свой вкуснейший бургер!');
      return;
    }

    // Формируем массив ID ингредиентов для заказа
    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(fetchOrderBurgerApi(order));
  };

  /**
   * Обработчик закрытия модального окна заказа
   * Очищает данные заказа и конструктора
   */
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  /**
   * Расчет общей стоимости бургера
   * Учитывает удвоенную стоимость булки и стоимость всех ингредиентов
   */
  const price = useMemo(
    () =>
      (items.bun ? items.bun.price * 2 : 0) +
      items.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [items]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={items}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
