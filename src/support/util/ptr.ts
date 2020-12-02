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

const $arrow = '<svg viewBox="0 0 30 72" style="color: rgb(107, 125, 140); transition-duration: 250ms; fill: currentcolor; height: 3.2rem; max-width: 100%" aria-label="Pull to refresh" ><g><path d="M28.414 38.586c-.78-.78-2.046-.78-2.828 0L17 47.172V22c0-1.106-.894-2-2-2s-2 .894-2 2v25.172l-8.586-8.586c-.78-.78-2.046-.78-2.828 0s-.78 2.046 0 2.828l12 12c.39.39.9.586 1.414.586s1.024-.196 1.414-.586l12-12c.78-.78.78-2.046 0-2.828z"></path></g></svg>';

const ptrState = {
  pending: 'pending', // 호출 전
  pulling: 'pulling', // 당기는 중
  releasing: 'releasing', // 놓으면 호출하는 단계
  refreshing: 'refreshing' // 리프레쉬 중
};

function screenY(e: any) {
  return e.targetTouches[0].screenY || 0;
}

export default (props: { $target: any; $header: any; onRefresh: any }) => {
  const app = {
    props: {
      $target: document.getElementsByTagName('body')[0],
      $header: document.getElementsByTagName('p')[0],
      startY: -100, // 시작 y 축 값
      maxPullHeight: 100, // pullRequest 영역 최대치 설정
      moveHeight: 0,
      state: ptrState.pending,
      animate: false,
      curStep: 0,
      onRefresh: (cb: any) => cb()
    },
    changeRefreshName: function (state: string) {
      const { $header } = app.props;
      if (state === ptrState.refreshing) {
        // @ts-ignore
        $header.removeChild($header.firstChild);
        $header.innerHTML = $arrow;
      }

      if (state === ptrState.pulling) {
        // @ts-ignore
        $header.firstElementChild && ($header.firstElementChild.style.transform = '');
      }

      if (state === ptrState.releasing) {
        // @ts-ignore
        $header.firstElementChild && ($header.firstElementChild.style.transform = 'rotate(180deg)');
      }
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
        app.changeRefreshName(ptrState.releasing);
        app.props.state = ptrState.releasing;
      } else {
        app.changeRefreshName(ptrState.pulling);
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
        app.changeRefreshName(ptrState.refreshing);

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
      app.props.$header.innerHTML = $arrow;
      app.changeRefreshName(ptrState.pulling);
    },
    init: function () {
      const { $target, $header } = app.props;
      $target.addEventListener('touchend', app._onTouchEnd, { passive: false });
      $target.addEventListener('touchstart', app._onTouchStart, { passive: false });
      $target.addEventListener('touchmove', app._onTouchMove, { passive: false });
      $header.innerHTML = $arrow;
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
