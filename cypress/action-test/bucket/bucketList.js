import Color from 'color';

const haxToRGB = (haxColor) => {
  return Color(haxColor).toString();
};

const CY_SELECTOR = {
  tabs: 'tabs',
  completeTab: '완료',
  progressTab: '진행중',
  bucketItem: 'bucketItem',
  navigationBar: 'navigationBar',
  activeNavigationBar: '버킷리스트',
  addButton: 'addButton'
};

export const isSuccessRenderFistRendering = {
  action() {
    // 탭영역 진행중 영역 활성화 체크
    cy
      .get(`[data-cy=${CY_SELECTOR.tabs}]`)
      .find(`[data-cy=${CY_SELECTOR.progressTab}]`)
      .should('have.css', 'color', haxToRGB('#f25e5e'));

    // 하단 네이게이션 영역 진입 체크
    cy
      .get(`[data-cy=${CY_SELECTOR.navigationBar}]`)
      .find(`[data-cy=${CY_SELECTOR.activeNavigationBar}]`)
      .should('have.css', 'color', haxToRGB('#f25e5e'));

    // 추가 버튼 렌더링 체크
    cy
      .get(`[data-cy=${CY_SELECTOR.addButton}]`)
      .its('length')
      .should('be.gt', 0);

    // 리스트 존재여부 체크 (1 개 이상 있어야 한다.)
    cy
      .get(`[data-cy=${CY_SELECTOR.bucketItem}]`)
      .its('length')
      .should('be.gt', 0);
  },
  actionTest() {
    it('첫화면 진입시 영역 정상 렌더링 체크', () => this.action());
  }
};

export const isActiveCompleteTab = {
  action() {
    const completeTab = cy
      .get(`[data-cy=${CY_SELECTOR.tabs}]`)
      .find(`[data-cy=${CY_SELECTOR.completeTab}]`);

    completeTab.click();

    completeTab.should('have.css', 'color', haxToRGB('#f25e5e'));
  },
  actionTest() {
    it('완료탭 클릭시 정상 활성화 처리', () => this.action());
  }
};

export const isMoveAddPage = {
  action() {
    // 추가 버튼 렌더링 체크
    cy
      .get(`[data-cy=${CY_SELECTOR.addButton}]`)
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/bucket-list/save');
    })
  },
  actionTest() {
    it('추가 버튼 클릭시 생성 url 이동', () => this.action());
  }
};

export const isMoveDetailPage = {
  action() {
    // 추가 버튼 렌더링 체크
    cy
      .get(`[data-cy=${CY_SELECTOR.bucketItem}]`)
      .first()
      .then(bucket => {
        // 버킷리스트 아이템 클릭
        cy
          .get(`[data-cy=${CY_SELECTOR.bucketItem}]`)
          .first()
          .click();
        // todo 해당 no 를 파싱 하는것 찾기
        cy.location().should((location) => {
          expect(location.pathname).to.eq('/bucket-list/29');
        })
      });
  },
  actionTest() {
    it('버킷 리스트 아이템 클릭시 정상 상세 페이지 이동', () => this.action());
  }
};
