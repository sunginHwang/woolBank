import { IRegularExpenditureForm } from '@models/regularExpenditre/IRegularExpenditureForm';
import { IAssetType } from '@models/IAssetType';

const options: {
  initForm: IRegularExpenditureForm;
  autoTab: IAssetType;
  selfTab: IAssetType;
} = {
  initForm: {
    title: '',
    regularDate: 0,
    amount: 0,
    isAutoExpenditure: false,
    category: {
      id: -1,
      name: '',
      type: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  autoTab: {
    type: 'autoExpenditure',
    name: '자동이체'
  },
  selfTab: {
    type: 'selfExpenditure',
    name: '수동이체'
  }
};

export default options;
