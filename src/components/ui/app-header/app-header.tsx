import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useMatch } from 'react-router-dom';

/**
 * Компонент шапки приложения
 * Отображает навигационное меню с основными разделами приложения
 */
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  // Проверяем соответствие текущего пути профильным разделам
  const profile = useMatch('/profile/*');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        {/* Левая часть меню с основными разделами */}
        <div className={styles.menu_part_left}>
          {/* Кнопка конструктора бургера */}
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            to={'/'}
            end
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          {/* Кнопка ленты заказов */}
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            to={'/feed'}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>

        {/* Центральная часть с логотипом */}
        <div className={styles.logo}>
          <Logo className='' />
        </div>

        {/* Правая часть с профилем пользователя */}
        <div className={styles.link_position_last}>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            to={'/profile'}
          >
            {({ isActive }) => (
              <>
                <ProfileIcon
                  type={isActive || profile ? 'primary' : 'secondary'}
                />
                <p className='text text_type_main-default ml-2'>
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
