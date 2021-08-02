import { IAssetType } from '@models/IAssetType';

const options: {
  emptyMsg: {
    progress: string;
    complete: string;
  },
  title: string;
  tabs: IAssetType[];
} = {
  emptyMsg: {
    progress: '진행중인 버킷리스트가 없습니다. :(',
    complete: '완료중인 버킷리스트가 없습니다. :('
  },
  title: '버킷리스트',
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
