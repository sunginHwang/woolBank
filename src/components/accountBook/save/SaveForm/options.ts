import { IAssetType } from '@models/IAssetType';
import { IAccountForm } from '@models/IAccountForm';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';

const expenditureTab: IAssetType = {
  type: 'expenditure',
  name: '지출'
};
const incomeTab: IAssetType = {
  type: 'income',
  name: '수입'
};

const options: {
  // 수입탭
  incomeTab: IAssetType;
  // 지출탭
  expenditureTab: IAssetType;
  // 수입, 지출 탭 리스트
  tabs: IAssetType[];
  // 가계부 작성폼 기본값
  initForm: IAccountBookSaveForm;
} = {
  incomeTab,
  expenditureTab,
  tabs: [{ ...incomeTab }, { ...expenditureTab }],
  initForm: {
    title: '',
    amount: 0,
    category: {
      id: -1,
      name: '',
      type: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    registerDateTime: new Date(),
    type: 'expenditure',
    memo: ''
  }
};

export default options;
