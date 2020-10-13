const CY_SELECTOR = {
  title: '[data-cy=title]',
  detail: '[data-cy=detail]',
  completeDate: '[data-cy=completeDate]',
  calendar: '.react-calendar__viewContainer',
  calendarDate: '.react-calendar__month-view__days__day',
  icoPlus: '[data-cy=icoPlus]',
  todoInput: '[data-cy=todoInput]',
  bottomButton: '[data-cy=bottomButton]',
  phaseTwo: '[data-cy=phaseTwo]'
};

export const moveSavePage = {
  action() {
    cy.visit('/bucket-list/save');
  },
  actionTest() {
    it('버킷리스트 작성 페이지 진입', () => this.action());
  }
};

export const firstPhase = {
  action() {
    // 첫번째 페이즈 (기본 정보 작성) 정상 init 체크
    cy.contains('기본 정보 작성');
    cy.contains('1/4');
    cy.contains('어떤 것을 이루고 싶으신가요?');

    const titleInputValue = '버킷리스트 제목';
    const detailInputValue = '버킷리스트 상세';

    // 제목 작성
    cy.get(CY_SELECTOR.title)
      .type(titleInputValue, { force: true })
      .should('have.value', titleInputValue);

    // 상세 작성
    cy.get(CY_SELECTOR.detail)
      .type(detailInputValue, { force: true })
      .should('have.value', detailInputValue);

    // 페이즈 2단계 진입
    cy.contains('다음단계')
      .click();
  },
  actionTest() {
    it('첫화면 진입시 영역 정상 렌더링 체크', () => {
      this.action();
      secondsPhase.actionTest();
    });
  }
};

export const secondsPhase = {
  action() {
    // 첫번째 페이즈 (기본 정보 작성) 정상 init 체크
    cy.contains('목표일 설정');
    cy.contains('2/4');
    cy.contains('언제 목표를 달성할 계획인지 알려주세요.');

    // 캘린더 클릭
    cy.get(CY_SELECTOR.completeDate)
      .click({ force: true });

    // 날짜 선택
    cy.get(CY_SELECTOR.calendarDate)
      .last()
      .click();

    cy.get(CY_SELECTOR.bottomButton)
      .eq(1)
      .click();
  },
  actionTest() {
    it('두번째 단계(목표일 설정) 액션 진행', () => this.action());
  }
};

export const thirdPhase = {
  action() {
    // 세번쨰 페이즈 (이미지 설정) 정상 init 체크
    cy.contains('이미지 설정');
    cy.contains('3/4');
    cy.contains('이루고 싶은 목표가 연상되는 사진을 넣어보세요.');
    cy.contains('눈으로 보는 목표야 말로 가장 큰 원동력이 될 수 있습니다.');

    // 이미지 설정은 pass
    cy.contains('다음단계')
      .click({ force: true });
  },
  actionTest() {
    it('세번째(이미지) 단계 스킵 액션 진행', () => this.action());
  }
};

export const lastPhase = {
  action() {
    const todoInputValue = 'todo 작성';
    // 세번쨰 페이즈 (이미지 설정) 정상 init 체크
    cy.contains('할일 작성');
    cy.contains('4/4');
    cy.contains('목표를 달성하기 위해 해야할 일들을 정해보세요.');
    cy.contains('목표를 빠르게 달성하기 위해서');
    cy.contains('필요한 일들을 순차적으로 나열하는것도 좋은 방법입니다.');

    // 추가 아이콘 클릭
    cy.get(CY_SELECTOR.icoPlus)
      .click({ force: true });

    // 할일 작성
    cy.get(CY_SELECTOR.todoInput)
      .type(todoInputValue, { force: true })
      .should('have.value', todoInputValue)
      .type('{enter}');

    // 작성한 할일 존재여부 체크
    cy.contains(todoInputValue);

    // 버킷리스트 작성 처리
    cy.contains('버킷리스트 작성')
      .click({ force: true });

  },
  actionTest() {
    it('마지막 할일 작성 및 버킷리스트 생성', () => this.action());
  }
};
