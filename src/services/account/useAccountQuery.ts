import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addDeposit, expirationAccount, fetchAccount, removeAccount } from '@support/api/accountApi';
import { IAccount } from '@models/account/IAccount';
import { useToast } from '@support/hooks/useToast';
import { useConfirm } from '@components/common/Confirm/ConfirmService';
import { useHistory } from 'react-router';
import { addComma } from '@support/util/String';
import { useAlert } from '@support/hooks/useAlert';

type AddDeposit = {
  amount: number;
  depositDate: Date;
  remainDepositAmount: number;
  onSuccessCB?: () => void;
};
const initData: IAccount = {
  id: -999,
  title: '',
  taxType: '',
  rate: 0,
  amount: 9,
  currentAmount: 9,
  userId: -1,
  savingTypeId: 0,
  isExpiration: false,
  savingType: {
    type: '', name: ''
  },
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

export const createKey = (id: number) => ['account', id];

function useAccountQuery(accountId: number) {
  const { data = initData, isLoading } = useQuery<IAccount>(createKey(accountId), () => fetchAccount(accountId));

  return {
    account: data,
    isLoading,
    isEmpty: data.id === initData.id
  };
}

export function useAccountQuerySetter(accountId: number) {
  const onToast = useToast();
  const [onAlert] = useAlert();
  const history = useHistory();
  const { openConfirm, setConfirmLoading } = useConfirm();
  const queryClient = useQueryClient();
  const removeMutation = useMutation(removeAccount);
  const expireAccountMutation = useMutation(expirationAccount);
  const addDepositMutation = useMutation((props: {
    accountId: number;
    amount: number;
    depositDate?: Date;
  }) => addDeposit(props));

  const onError = () => onToast('다시 시도해 주세요.');
  const onSettled = () => setConfirmLoading(false);

  const onRemove = async () => {
    const isConfirm = await openConfirm({ message: '한번 삭제 이후 다시 복원이 불가능 합니다. 정말 삭제하시겠습니까?', useAutoClose: false })

    if (isConfirm) {
      setConfirmLoading(true);
      removeMutation.mutate(accountId, {
        onSuccess: () => {
          queryClient.setQueryData(createKey(accountId), initData);
          queryClient.setQueryData<IAccount[] | undefined>('accountList', prev => {
            if (!prev) {
              return prev;
            }
            return prev.filter((item: IAccount) => item.id !== accountId)
          });
          onToast('삭제되었습니다.');
          history.push('/accounts');
        },
        onError,
        onSettled
      })
    }
  };

  const onExpiration = async () => {
    const isConfirm = await openConfirm({ message: '만기처리 진행 후 다시 변경이 불가능 합니다. 정말 만기처리 하시겠습니까?', useAutoClose: false })

    if (isConfirm) {
      setConfirmLoading(true);
      expireAccountMutation.mutate(accountId, {
        onSuccess: () => {
          queryClient.setQueryData<IAccount | undefined>(createKey(accountId), prev => {
            if (prev) {
              prev.isExpiration = true;
            }
            return prev;
          });
          queryClient.setQueryData<IAccount[] | undefined>('accountList', (prev) => {
            if (!prev) {
              return prev;
            }
            return prev.map((item: IAccount) => {
              if (item.id === accountId) {
                item.isExpiration = true;
              }
              return item;
            });
          });
          onToast('만기처리가 완료되었습니다.');
        },
        onError,
        onSettled
      })
    }
  };

  const onAddDeposit = ({ amount, depositDate, remainDepositAmount }: AddDeposit) => {
    if (amount > remainDepositAmount) {
      onAlert(`최대 입금 가능 금액은 ${addComma(remainDepositAmount)} 입니다.`);
      return;
    }

    addDepositMutation.mutate({
      accountId, depositDate, amount
    }, {
      onSuccess: () => {
        queryClient.setQueryData<IAccount | undefined>(createKey(accountId), prev => {
          // todo 입금내역 최신화 시키기 (api 레벨 수정 필요)
          return prev;
        });
        onToast('입금이 완료되었습니다.');
        history.goBack();
      },
      onError
    })
  };

  return {
    onAddDeposit,
    onExpiration,
    onRemove,
    isAddDepositLoading: addDepositMutation.isLoading
  };
}

export default useAccountQuery;
