import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  ingredientsToDown,
  ingredientsToUp,
  removeIngredient
} from '../../services/slices/burgerConstructorSlice';

/**
 * Компонент для отображения элемента в конструкторе бургера
 * Позволяет перемещать и удалять ингредиенты в конструкторе
 */
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    /**
     * Обработчик перемещения ингредиента вниз
     * Диспатчит действие перемещения ингредиента вниз в Redux store
     */
    const handleMoveDown = () => {
      dispatch(ingredientsToDown(index));
    };

    /**
     * Обработчик перемещения ингредиента вверх
     * Диспатчит действие перемещения ингредиента вверх в Redux store
     */
    const handleMoveUp = () => {
      dispatch(ingredientsToUp(index));
    };

    /**
     * Обработчик удаления ингредиента
     * Диспатчит действие удаления ингредиента из Redux store
     */
    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
