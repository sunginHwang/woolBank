import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '@store/modules/Layout';

export const useToast = () => {
  const dispatch = useDispatch();

  const onToast = useCallback(
    (message: string) => {
      dispatch(Layout.actions.showToast(message));

      const hideAfter1Sec = setTimeout(() => {
        dispatch(Layout.actions.hideToast());
        clearTimeout(hideAfter1Sec);
      }, 1000);
    },
    [dispatch]
  );

  return onToast;
};
