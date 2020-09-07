import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../store/modules/Layout';

export const useNotification = () => {
  const dispatch = useDispatch();

  const onShowNotification = useCallback(
    (message: string) => {
      dispatch(Layout.actions.showNotification(message));

      const hideAfter1Sec = setTimeout(() => {
        dispatch(Layout.actions.hideNotification());
        clearTimeout(hideAfter1Sec);
      }, 1000);
    },
    [dispatch]
  );

  return [onShowNotification];
};
