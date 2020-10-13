import {
  moveSavePage,
  firstPhase,
  secondsPhase,
  thirdPhase,
  lastPhase
} from '../../action-test/bucket/saveBucket';

context('버킷리스트 작성 페이지', () => {
  moveSavePage.actionTest()
  firstPhase.actionTest();
  secondsPhase.actionTest();
  thirdPhase.actionTest();
  lastPhase.actionTest();
});
