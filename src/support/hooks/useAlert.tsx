import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../store/modules/Layout';

export const useAlert = () => {
  const dispatch = useDispatch();

  const onAlert = useCallback(
    (message: string) => {
      dispatch(Layout.actions.showAlert(message));
    },
    [dispatch]
  );

  const offAlert = useCallback(() => {
    dispatch(Layout.actions.hideAlert());
  }, [dispatch]);

  return [onAlert, offAlert] as [typeof onAlert, typeof offAlert];
};
