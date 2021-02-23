import { IAssetType } from '@models/IAssetType';

const options: {
  autoTab: IAssetType;
  selfTab: IAssetType;
} = {
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
