import {
  moveSavePage,
  firstPhase,
  secondsPhase,
  thirdPhase,
  lastPhase
} from '../../action-test/account/saveAccount';

// eslint-disable-next-line no-undef
context('예적금 작성 페이지', () => {
  moveSavePage.actionTest()
  firstPhase.actionTest();
  secondsPhase.actionTest();
  thirdPhase.actionTest();
  lastPhase.actionTest();
});
