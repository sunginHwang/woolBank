import {
  isSuccessRenderFistRendering,
  isActiveCompleteTab,
  isMoveAddPage,
  isMoveDetailPage
} from '../../action-test/account/accountList';

context('자산관리 리스트 페이지', () => {
  beforeEach(() => {
    cy.visit('/accounts');
  });

  // 첫화면 렌더링 체크
  isSuccessRenderFistRendering.actionTest();
  // 완료탭 동작 체크
  isActiveCompleteTab.actionTest();
  // 추가버튼 동작 체크
  isMoveAddPage.actionTest();
  // 상세페이지 이동 체크
  isMoveDetailPage.actionTest();
});

