import { haxToRGB } from '../../support/utils';

const CY_SELECTOR = {
  title: '[data-cy=title]',
  savingKind: '[data-cy=kind]',
  freeInstallmentSavings: '[data-cy=freeInstallmentSavings]', // 자유적금
  firstPhaseCompleteButton: '[data-cy=accountInfoCompleteButton]',
  completeNumberButton: '[data-cy=completeNumber]',
  startDate: '[data-cy=startDate]',
  assetMonth: '[data-cy=assetMonth]',
  rate: '[data-cy=rate]',
  rateComplete: '[data-cy=rateComplete]',
  calendarDate: '.react-calendar__month-view__days__day',
  numberOne: '[data-cy=number_1]',
  numberZero: '[data-cy=number_0]',
  saveAccountButton: '[data-cy=saveAccountButton]'
};

const INPUT_VALUE = {
  title: '예적금 제목'
}

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set
const changeRangeInputValue = $range => value => {
  nativeInputValueSetter.call($range[0], value)
  $range[0].dispatchEvent(new Event('change', { value, bubbles: true }))
}

export const moveSavePage = {
  action() {
    cy.visit('/accounts/save');
  },
  actionTest() {
    it('예적금 작성 페이지 진입', () => this.action());
  }
};

export const firstPhase = {
  action() {
    // 첫번째 페이즈 (기본 정보 작성) 정상 init 체크
    cy.contains('정보 작성하기');
    cy.get(CY_SELECTOR.firstPhaseCompleteButton)
      .should('have.css', 'opacity', '0.5');

    // 제목 작성
    cy.get(CY_SELECTOR.title)
      .type(INPUT_VALUE.title, { force: true })
      .should('have.value', INPUT_VALUE.title);

    // 예적금 종류 선택 클릭
    cy.get(CY_SELECTOR.savingKind)
      .click({ force: true });

    // 자유적금 선택
    cy.get(CY_SELECTOR.freeInstallmentSavings)
      .click();

    // 적금 시작일 선택
    cy.get(CY_SELECTOR.startDate)
      .click({ force: true });

    // 적금 시작일 날짜 선택
    cy.get(CY_SELECTOR.calendarDate)
      .last()
      .click();

    // slider 예적금 설정
    cy.get(CY_SELECTOR.assetMonth)
      .invoke('val', 25)
      .trigger('change', { force: true, data: 25 });

    // 다음단계 활성화 체크
    cy.get(CY_SELECTOR.firstPhaseCompleteButton)
      .should('have.css', 'opacity', '1');

    // 다음단계 이동
    cy.get(CY_SELECTOR.firstPhaseCompleteButton)
      .click();

  },
  actionTest() {
    it('예적금 기본 정보 입력', () => {
      this.action();
      secondsPhase.actionTest();
    });
  }
};

export const secondsPhase = {
  action() {
    // 금액 입력 페이즈 정상 init 체크
    cy.contains('금액을 입력해 주세요');
    cy.contains('만기 금액 설정');
    cy.contains('0원');
    cy.get(CY_SELECTOR.completeNumberButton)
      .should('have.css', 'opacity', '0.5');

    // 금액 클릭 10000원
    cy.get(CY_SELECTOR.numberOne)
      .click({ force: true });

    [...Array(4)].forEach(_ => {
      cy.get(CY_SELECTOR.numberZero)
        .click({ force: true });
    });

    // 만원 적금액 정상 입력되었는지 체크
    cy.contains('10,000원');
    cy.contains('총 적금액 : 1만원');

    cy.get(CY_SELECTOR.completeNumberButton)
      .should('have.css', 'opacity', '1');

    cy.get(CY_SELECTOR.completeNumberButton)
      .click();

  },
  actionTest() {
    it('금액 설정 (10,000원) 진행', () => this.action());
  }
};

export const thirdPhase = {
  action() {
    // 세번쨰 페이즈 (이율 설정) 정상 init 체크
    cy.contains('이율 설정');
    cy.contains('이율을 설정해 주세요.');

    // slider 이율 설정 (2%)
    cy.get(CY_SELECTOR.rate)
      .then(input => changeRangeInputValue(input)(200));

    // 2% 이율설정 확인
    cy.contains('2.00%');
    cy.contains('비과세');
    cy.contains('세금우대');
    cy.contains('일반과세')
      .should('have.css', 'color', haxToRGB('#f25e5e'));

    // 세금우대 클릭
    cy.contains('세금우대')
      .click();

    // 세금우대 클릭 여부 확인
    cy.contains('세금우대')
      .should('have.css', 'color', haxToRGB('#f25e5e'));

    // 마지막 확인단계 이동
    cy.get(CY_SELECTOR.rateComplete)
      .click();
  },
  actionTest() {
    it('이율설정 단계 (2%, 세금우대) 액션 진행', () => this.action());
  }
};

export const lastPhase = {
  action() {
    cy.contains('작성 정보 확인');
    // 적금명 일치 확인
    cy.contains(INPUT_VALUE.title);
    // 자유적금 종류 일치 확인
    cy.contains('자유적금');
    // 세금우대 종류 일치 확인
    cy.contains('세금우대');
    // 이율 2% 일치 확인
    cy.contains('2.00%');

    cy.get(CY_SELECTOR.saveAccountButton)
      .click();

  },
  actionTest() {
    it('작성 정보 확인 및 예/적금 생성', () => this.action());
  }
};
