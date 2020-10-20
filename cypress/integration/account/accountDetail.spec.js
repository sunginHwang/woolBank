import {
  checkInitRender,
  moveDetailPage,
  addDeposit,
  checkBottomMenu
} from '../../action-test/account/accountDetail';

context('예/적금 상세 페이지', () => {
  moveDetailPage.actionTest();
  // 첫화면 렌더링 체크
  checkInitRender.actionTest();
  // 자유예금 추가
  addDeposit.actionTest();
  // 하단 메뉴 체크
  checkBottomMenu.actionTest();
});
