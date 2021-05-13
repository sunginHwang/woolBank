
import { IAssetType } from '@models/IAssetType';

const expenditureTab:IAssetType = {
  type: 'expenditure',
  name: '지출',
};
const incomeTab:IAssetType = {
  type: 'income',
  name: '수입',
};



const options: {
  incomeTab: IAssetType;
  expenditureTab: IAssetType;
  tabs: IAssetType[];
} = {
  incomeTab,
  expenditureTab,
  tabs: [{...incomeTab}, {...expenditureTab}],
};

export default options;
