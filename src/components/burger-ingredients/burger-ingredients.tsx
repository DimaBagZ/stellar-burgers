import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

/**
 * Компонент для отображения списка ингредиентов бургера
 * Включает в себя табы для разных типов ингредиентов (булки, начинки, соусы)
 * и автоматическую прокрутку к выбранному разделу
 */
export const BurgerIngredients: FC = () => {
  // Получаем список всех ингредиентов из Redux store
  const ingredients = useSelector(selectIngredients);

  // Мемоизируем фильтрацию ингредиентов по типам для оптимизации производительности
  const buns = useMemo(() => {
    const memoizedBuns = ingredients.filter(
      (ingredient) => ingredient.type === 'bun'
    );
    return memoizedBuns;
  }, [ingredients]);

  const mains = useMemo(() => {
    const memoizedMains = ingredients.filter(
      (ingredient) => ingredient.type === 'main'
    );
    return memoizedMains;
  }, [ingredients]);

  const sauces = useMemo(() => {
    const memoizedSauces = ingredients.filter(
      (ingredient) => ingredient.type === 'sauce'
    );
    return memoizedSauces;
  }, [ingredients]);

  // Состояние текущего активного таба
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Рефы для заголовков секций для прокрутки
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Хуки для отслеживания видимости секций
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  // Автоматическое переключение таба при прокрутке
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  /**
   * Обработчик клика по табу
   * Переключает активный таб и прокручивает к соответствующей секции
   */
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
