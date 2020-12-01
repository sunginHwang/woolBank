import { disableScroll, enableScroll, isTopArea } from '@support/util/dom';

const easings = {
  elastic: function (t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
  },
  noeasing: function (t: number, b: number, c: number, d: number) {
    t /= d;
    return b + c * t;
  }
};

const ptrState = {
  pending: 'pending', // 호출 전
  pulling: 'pulling', // 당기는 중
  releasing: 'releasing', // 놓으면 호출하는 단계
  refreshing: 'refreshing' // 리프레쉬 중
};

function screenY(e: any) {
  return e.targetTouches[0].screenY || 0;
}

export default (props: { $target: any; $refresh: any; onRefresh: any }) => {
  const app = {
    props: {
      $target: document.getElementsByTagName('body')[0],
      $refresh: document.getElementsByTagName('p'),
      startY: -100, // 시작 y 축 값
      maxPullHeight: 16 * 10, // pullRequest 영역 최대치 설정
      moveHeight: 0,
      state: ptrState.pending,
      animate: false,
      curStep: 0,
      onRefresh: (cb: any) => cb()
    },
    changeRefreshName: function (name: string) {
      // @ts-ignore
      app.props.$refresh.innerText = name;
    },
    changeTargetHeight: function (height: number | null) {
      if (typeof height === 'number') {
        app.props.$target.style.transform = `translate3d(0px, ${height}px,0px)`;
      } else {
        app.props.$target.style.transform = '';
      }
    },
    // 슬라이드 시작
    _onTouchStart: function (e: any) {
      if (isTopArea()) {
        return;
      }

      // 터치 시작 상태 변경
      app.props.state = ptrState.pulling;
      // 시작 y축 위치 설정
      app.props.startY = screenY(e);
    },
    _onTouchMove: function (e: any) {
      if (isTopArea()) {
        return;
      }

      const { startY, maxPullHeight } = app.props;

      // 시작위치 이상 드래그 할수 없도록
      if (startY > screenY(e)) {
        return;
      }
      // 브라우저 다른 드래그 이벤트와 겹치지 않도록 강제 disalbe 처리
      disableScroll();

      // 얼마나 y축을 드래그 해서 내릴지 계산하기 (0.5는 가중치)
      const currentY = Math.abs(startY - screenY(e)) * 0.5;
      // 움직일수 있는 최대치 설정
      const moveHeight = currentY > maxPullHeight ? maxPullHeight : currentY;
      app.props.moveHeight = moveHeight;
      // 드래그를 위한 translate y축 변경
      app.changeTargetHeight(moveHeight);

      // 드래그를 70% 이상 하면 새로고침 시키기 아니면 당기기 모드로 변경
      if (moveHeight > maxPullHeight * 0.7) {
        app.changeRefreshName('새로고침 하시겠습니까?');
        app.props.state = ptrState.releasing;
      } else {
        app.changeRefreshName('새로고침을 원하면 아래로 드래그 하세요.');
        app.props.state = ptrState.pulling;
      }
    },
    _onTouchEnd: function (e: any) {
      if (isTopArea()) {
        return;
      }

      // 애니메이션 중이면 동작  ㅌ
      if (app.props.animate) {
        return;
      }
      // 애니메이션 스텝 초기화
      app.props.curStep = 0;

      app._onAnimate();

      // 새로고침 요청
      if (app.props.state === ptrState.releasing) {
        // 새로고침 중 mode 로 변경 refreshing  후 refreshing 아이콘까지 스크롤업 애니메이션
        app.props.state = ptrState.refreshing;
        app.changeRefreshName('새로고침중');

        app.props.onRefresh(() => {
          // 새로고침 완료 콜백 초기화 작업
          app.props.curStep = 0;
          app.props.state = ptrState.pulling;
        });
      }
    },
    _onAnimate: function () {
      const frame = 1000 / 60;
      const releaseTime = app.props.state === ptrState.refreshing ? 250 : 900;
      const steps = Math.floor(releaseTime / frame);

      app.props.curStep++;

      const minHeight = app.props.state === ptrState.refreshing ? 50 : 0;
      let topY =
        app.props.state === ptrState.refreshing
          ? easings.noeasing(app.props.curStep, app.props.moveHeight, minHeight - app.props.moveHeight, steps)
          : easings.elastic(app.props.curStep, app.props.moveHeight, minHeight - app.props.moveHeight, steps);

      // 새로 고침중일때는 최소 높이 고정
      if (app.props.state === ptrState.refreshing && topY < minHeight) {
        topY = minHeight;
      }

      app.changeTargetHeight(topY);

      if (app.props.curStep > steps && app.props.state === ptrState.pulling) {
        app.props.animate = false;
        app._onReset();
        return;
      }

      requestAnimationFrame(app._onAnimate);
    },
    _onReset: function () {
      console.log('onReset');
      enableScroll();
      // @ts-ignore
      app.props.$target.style.transform = null;
      app.props.startY = 0;
      app.props.moveHeight = 0;
      app.changeRefreshName('당기기');
    },
    init: function () {
      const { $target } = app.props;
      $target.addEventListener('touchend', app._onTouchEnd, { passive: false });
      $target.addEventListener('touchstart', app._onTouchStart, { passive: false });
      $target.addEventListener('touchmove', app._onTouchMove, { passive: false });
    },
    destroy: function () {
      const { $target } = app.props;
      $target.removeEventListener('touchend', app._onTouchEnd);
      $target.removeEventListener('touchstart', app._onTouchStart);
      $target.removeEventListener('touchmove', app._onTouchMove);
    }
  };

  app.props = Object.assign({}, app.props, props);

  return app;
};
