import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredients } from '../../services/slices/burgerConstructorSlice';

/**
 * Компонент для отображения отдельного ингредиента бургера
 * Отвечает за добавление ингредиента в конструктор и отображение его деталей
 */
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    // Получаем текущее местоположение для модального окна
    const location = useLocation();
    const dispatch = useDispatch();

    /**
     * Обработчик добавления ингредиента в конструктор
     * Диспатчит действие добавления ингредиента в Redux store
     */
    const handleAdd = () => {
      dispatch(addIngredients(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
