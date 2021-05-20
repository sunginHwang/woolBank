import { IAssetType } from '@models/IAssetType';

const options: {
  tabs: IAssetType[];
} = {
  tabs: [{
    type: 'expenditure',
    name: '지출',
  },{
    type: 'income',
    name: '소비',
  }]
}
