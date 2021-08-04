import { IBottomMenu } from '@models/component/IBottomMenu';

const options: {
  bottomMenu: {
    remove: IBottomMenu,
    expiration: IBottomMenu,
    migration: IBottomMenu
  }
} = {
  bottomMenu: {
    remove: { type: 'remove', value: '삭제' },
    migration: { type: 'migration', value: '이전 입금내역 추가' },
    expiration: { type: 'expiration', value: '만기' }
  }
};

export default options;
