import {
  completeStateTodoItem,
  removeTodoItem,
  checkInitRender,
  moveDetailPage,
  addTodo,
  isWorkingMenuAction
} from '../../action-test/bucket/bucketDetail';

context('버킷리스트 상세 페이지', () => {
  moveDetailPage.actionTest();
  // 첫화면 렌더링 체크
  checkInitRender.actionTest();
  // 할일 추가
  addTodo.actionTest();
  // 할일 상태 변경
  completeStateTodoItem.actionTest();
  // 할일 삭제
  removeTodoItem.actionTest();
  // 메뉴 정상 작동 확인
  isWorkingMenuAction.actionTest();
});
