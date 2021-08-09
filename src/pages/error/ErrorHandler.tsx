import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageNotFound from '@pages/error/PageNotFound';
import { RootState } from '@/store';
import Layout from '@store/modules/Layout';

// page 단위 에러 핸들러
const ErrorHandler = ({ children }: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const errorStatusCode = useSelector((root: RootState) => root.Layout.pageErrorStatusCode);

  // 사용자가 새 URL을 탐색할 때 마다 이 상태코드를 "제거" 해야한다. 그렇지 않을 경우 사용자는 오류 페이지에 영원히 "갇히게" 된다.
  React.useEffect(() => {
    // 현재 위치의 변경 사항을 하는 리스너
    const unlisten = history.listen(() => dispatch(Layout.actions.setErrorStatusCode(200)));
    // unmount될 때 리스너 제거
    return unlisten;
  }, [history, dispatch]);

  if (errorStatusCode === 404) {
    return <PageNotFound />;
  }
  // ... 다른 HTTP 코드는 여기서 관리

  return children;
};

export default ErrorHandler;
