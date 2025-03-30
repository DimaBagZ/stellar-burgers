import React, { FC, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { ForgotPasswordUI } from '../../components/ui/pages';
import {
  fetchForgotPassword,
  selectError,
  clearErrorMessage
} from '../../services/slices/passwordSlice';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchForgotPassword({ email }))
      .unwrap()
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
