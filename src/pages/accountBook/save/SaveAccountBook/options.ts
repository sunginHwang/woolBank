import { IAssetType } from '@models/component/IAssetType';

const options: {
  tabs: IAssetType[];
} = {
  tabs: [{
    type: 'expenditure',
    name: '지출'
  }, {
    type: 'income',
    name: '소비'
  }]
}
