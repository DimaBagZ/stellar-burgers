import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation, useMatch } from 'react-router-dom';
import clsx from 'clsx';

/**
 * Компонент шапки приложения
 * Отображает навигационное меню с основными разделами приложения
 */
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  // Получаем текущий путь для определения активного пункта меню
  const location = useLocation();
  const currentLocation = location.pathname;

  // Проверяем соответствие текущего пути профильным разделам
  const profile = useMatch('/profile');
  const orders = useMatch('/profile/orders');
  const ordersNamber = useMatch('/profile/orders/:number');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        {/* Левая часть меню с основными разделами */}
        <div className={styles.menu_part_left}>
          {/* Кнопка конструктора бургера */}
          <>
            <Link
              className={clsx(
                styles.link,
                currentLocation === '/'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/'}
            >
              <BurgerIcon
                type={currentLocation === '/' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          {/* Кнопка ленты заказов */}
          <>
            <Link
              className={clsx(
                styles.link,
                currentLocation === '/feed'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/feed'}
            >
              <ListIcon
                type={currentLocation === '/feed' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>

        {/* Центральная часть с логотипом */}
        <div className={styles.logo}>
          <Logo className='' />
        </div>

        {/* Правая часть с профилем пользователя */}
        <div className={styles.link_position_last}>
          <ProfileIcon
            type={profile || orders || ordersNamber ? 'primary' : 'secondary'}
          />
          <Link
            className={clsx(
              profile || orders || ordersNamber
                ? [styles.link_active, styles.link]
                : styles.link
            )}
            to={'/profile'}
          >
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
