import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from '../ui/ingredient-details/ingredient-details.module.css';
import { Modal } from '@components';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const { id } = useParams();
  const location = useLocation();
  const isModalView = location.state?.background;

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  // Если это модальное окно, рендерим без заголовка и дополнительных стилей
  if (isModalView) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  // Если это отдельная страница, добавляем заголовок и стили центрирования
  return (
    <div className={`${styles.content} ${styles.standalone}`}>
      <h2 className='text text_type_main-large mb-5'>Детали ингредиента</h2>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};

export const IngredientDetailsModal: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <Modal
      title={'Детали ингредиента'}
      onClose={() => {
        if (background) {
          navigate(-1);
        } else {
          navigate('/');
        }
      }}
      isIngredient
    >
      <IngredientDetails />
    </Modal>
  );
};
