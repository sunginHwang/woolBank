const CY_SELECTOR = {
  title: '[data-cy=title]',
  addDepositButton: '[data-cy=addDepositButton]',
  completeNumberButton: '[data-cy=completeNumber]',
  numberOne: '[data-cy=number_1]',
  numberZero: '[data-cy=number_0]',
  icoDotHorizontal: '[data-cy=icoDotHorizontal]'
};

export const moveDetailPage = {
  action() {
    cy.visit('/accounts/37');
  },
  actionTest() {
    it('버킷리스트 상세 페이지 진입', () => this.action());
  }
};

export const checkInitRender = {
  action() {
    // 제목 체크
    cy
      .get(CY_SELECTOR.title)
      .its('length')
      .should('be.gt', 0);

    // 기본 렌더링 체크
    cy.contains('계좌정보');
    cy.contains('입금 내역');
    cy.contains('입금 내역');
    cy.contains('개설일');
    cy.contains('만기일');
    cy.contains('만기예상액');

    // 테스트 대상은 자유 적금
    cy.contains('자유적금');
  },
  actionTest() {
    it('예적금 상세 init 데이터 체크', () => this.action());
  }
};

export const addDeposit = {
  action() {
    // 입금버튼 클릭
    cy
      .get(CY_SELECTOR.addDepositButton)
      .click({ force: true });

    cy.wait(300);

    cy.contains('입금하실 금액을 입력해주세요.');
    cy.contains('0원');
    cy.get(CY_SELECTOR.completeNumberButton)
      .should('have.css', 'opacity', '0.5');

    // 금액 클릭 10원
    cy.get(CY_SELECTOR.numberOne)
      .click({ force: true });

    cy.get(CY_SELECTOR.numberZero)
      .click({ force: true });

    // 만원 적금액 정상 입력되었는지 체크
    cy.contains('10원');
    cy.contains('총 적금액 : 10원');

    cy.get(CY_SELECTOR.completeNumberButton)
      .should('have.css', 'opacity', '1');

    cy.get(CY_SELECTOR.completeNumberButton)
      .click();

    // 완료 처리 대기
    cy.wait(500);

    // 입금액 존재 확인
    cy.contains('10원');
  },
  actionTest() {
    it('예금 입력', () => this.action());
  }
};

export const checkBottomMenu = {
  action() {
    cy.get(CY_SELECTOR.icoDotHorizontal)
      .click({ force: true });

    cy.contains('작성하실 예/적금 종류를 선택해주세요.');
    cy.contains('이전 입금내역 추가');
    cy.contains('만기');
    cy.contains('삭제');
  },
  actionTest() {
    it('하단 메뉴 렌더링 체크', () => this.action());
  }
}
