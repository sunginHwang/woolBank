import { IBottomMenu } from '@models/component/IBottomMenu';

const options: {
  bottomMenus: IBottomMenu[]
} = {
  bottomMenus: [
    {
      type: 'remove',
      value: '삭제하기'
    },
    {
      type: 'edit',
      value: '수정하기'
    }
  ]
}

export default options;
