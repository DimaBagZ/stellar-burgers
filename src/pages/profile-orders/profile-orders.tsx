import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUserOrders,
  selectUserOrdersIsLoading,
  fetchUserOrdersApi
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersApi());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
