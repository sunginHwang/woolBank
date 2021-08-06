import { IAssetType } from '@models/component/IAssetType';

const options: {
  emptyMsg: {
    progress: string;
    complete: string;
  },
  title: string;
  tabs: IAssetType[];
} = {
  emptyMsg: {
    progress: '진행중인 예/적금 내역이 없습니다. :(',
    complete: '완료된 예/적금 내역이 없습니다. :('
  },
  title: '자산관리',
  tabs: [
    {
      type: 'progress',
      name: '진행중'
    },
    {
      type: 'complete',
      name: '완료'
    }
  ]
};

export default options;
