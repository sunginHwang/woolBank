import { IAssetType } from '@models/component/IAssetType';

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
