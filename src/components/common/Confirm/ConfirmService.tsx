import * as React from 'react';
import Confirm, { IProps } from './index';

interface ConfirmServiceProps extends IProps{
  // 확인 버튼 누를시 자동 컴펌 종료 옵션
  useAutoClose?: boolean;
}

const ConfirmationServiceContext = React.createContext<{
  openConfirm: (options: ConfirmServiceProps) => Promise<boolean>;
  setConfirmLoading: (loading: boolean) => void;
}>({ openConfirm: Promise.resolve, setConfirmLoading : loading => {}});

export const useConfirm = () => React.useContext(ConfirmationServiceContext);

const initState: ConfirmServiceProps = {
  // 확인버튼 누를시 컨펌창 close
  useAutoClose: true,
  open: false,
  message: '',
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [confirmServiceState, setConfirmServiceState] = React.useState<ConfirmServiceProps>(initState);
  const awaitingPromiseRef = React.useRef<{ resolve: (value: boolean) => void }>();

  const openConfirm = (confirmProps: ConfirmServiceProps) => {
    setConfirmServiceState(prev => {
      return {
        ...prev,
        open: true,
        ...confirmProps,
      }
    });

    return new Promise<boolean>(resolve => {
      awaitingPromiseRef.current = { resolve };
    });
  };

  const onCancel = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(false);
    }

    setConfirmServiceState(initState);
  };

  const onConfirm = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(true);
    }

    if (confirmServiceState.useAutoClose) {
      setConfirmServiceState(initState);
    }
  };

  const setConfirmLoading = (loading: boolean) => {
    setConfirmServiceState(prev => Object.assign({}, prev, { loading }));

    if (!loading) {
      setConfirmServiceState(initState);
    }
  }

  const providerValue = {
    openConfirm, setConfirmLoading,
  }

  const { useAutoClose, ...confirmProps } = confirmServiceState;

  return (
    <>
      <ConfirmationServiceContext.Provider value={providerValue} children={children} />
      <Confirm
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...confirmProps}
      />
    </>
  );
}
