const CY_SELECTOR = {
  title: '[data-cy=title]',
  description: '[data-cy=description]',
  todoListItem: '[data-cy=todoListItem]',
  icoPlus: '[data-cy=icoPlus]',
  todoInput: '[data-cy=todoInput]',
  icoBlankCircle: '[data-cy=icoBlankCircle]',
  icoCircleCheck: '[data-cy=icoCircleCheck]',
  icoTrashCan: '[data-cy=icoTrashCan]',
  icoConfirm: '[data-cy=icoConfirm]',
  icoDotHorizontal: '[data-cy=icoDotHorizontal]'
};

const VALUES = {
  todoInputTitle: '할일추가제목[테스트]'
}

export const moveDetailPage = {
  action() {
    cy.visit('/bucket-list/33');
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

    // 상세 정보 랜더 체크
    cy
      .get(CY_SELECTOR.description)
      .its('length')
      .should('be.gt', 0);

    // 기본 렌더링 체크
    cy.contains('할일목록');
    cy.contains('목표 달성일');

    cy
      .get(CY_SELECTOR.todoListItem)
      .its('length')
      .should('be.gt', 0);
  },
  actionTest() {
    it('버킷리스트 상세 init 데이터 체크', () => this.action());
  }
};

export const addTodo = {
  action() {
    const { todoInputTitle } = VALUES;
    // 추가 아이콘 클릭
    cy
      .get(CY_SELECTOR.icoPlus)
      .click({ force: true });

    // 할일 작성
    cy.get(CY_SELECTOR.todoInput)
      .type(todoInputTitle, { force: true })
      .should('have.value', todoInputTitle)
      .type('{enter}');

    // 작성중 기다리기
    cy.wait(500);

    // 작성된거 있는지 확인
    cy.contains(todoInputTitle);

  },
  actionTest() {
    it('할일 추가 하기', () => this.action());
  }
};

export const completeStateTodoItem = {
  action() {
    const { todoInputTitle } = VALUES;
    // 상태 변경 진행
    cy
      .contains(todoInputTitle)
      .get(CY_SELECTOR.icoBlankCircle)
      .last()
      .click({ force: true })

    // 상태 변경 체크 확인
    cy
      .contains(todoInputTitle)
      .get(CY_SELECTOR.icoCircleCheck)
      .its('length')
      .should('be.gt', 0);

  },
  actionTest() {
    it('추가한 할일 상태값 완료 처리', () => this.action());
  }
};

export const removeTodoItem = {
  action() {
    const { todoInputTitle } = VALUES;
    // 할일 삭제 클릭
    cy
      .contains(todoInputTitle)
      .get(CY_SELECTOR.icoTrashCan)
      .last()
      .click({ force: true });

    // 삭제 모달 확인
    cy.contains('정말 삭제하시겠습니까?');
    cy.contains('취소');
    cy.contains('확인');

    cy.get(CY_SELECTOR.icoConfirm)
      .last()
      .click({ force: true });

  },
  actionTest() {
    it('할일 삭제 하기', () => this.action());
  }
};

export const isWorkingMenuAction = {
  action() {
    // 할일 삭제 클릭
    cy
      .get(CY_SELECTOR.icoDotHorizontal)
      .click({ force: true });

    // 삭제 모달 확인
    cy.contains('원하시는 메뉴를 선택해 주세요.');
    cy.contains('삭제하기');
    cy.contains('수정하기');

  },
  actionTest() {
    it('메뉴 선택 하기 체크', () => this.action());
  }
};
