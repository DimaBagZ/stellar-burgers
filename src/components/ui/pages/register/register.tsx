import { FC, useState, useCallback } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { RegisterUIProps } from './type';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName
}) => {
  // Мемоизация обработчиков событий
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  // Добавить валидацию полей
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: userName.length < 2 ? 'Имя должно содержать минимум 2 символа' : '',
      email: !email.includes('@') ? 'Введите корректный email' : '',
      password:
        password.length < 6 ? 'Пароль должен содержать минимум 6 символов' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='register'
          onSubmit={handleSubmit}
        >
          <>
            <div className='pb-6'>
              <Input
                type='text'
                placeholder='Имя'
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name='name'
                error={false}
                errorText=''
                size='default'
              />
            </div>
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='E-mail'
                onChange={handleEmailChange}
                value={email}
                name='email'
                error={false}
                errorText=''
                size='default'
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={handlePasswordChange}
                value={password}
                name='password'
              />
            </div>
            <div className={`pb-6 ${styles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Зарегистрироваться
              </Button>
            </div>
            {errorText && (
              <p className={`${styles.error} text text_type_main-default pb-6`}>
                {errorText}
              </p>
            )}
          </>
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div className={styles.modal} onClick={onClose}>
    <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
