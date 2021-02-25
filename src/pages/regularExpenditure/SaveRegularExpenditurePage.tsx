import React from 'react';

import PageTemplate from '@components/layout/PageTemplate';
import SaveRegularExpenditureContainer from '@containers/regularExpenditure/add/SaveRegularExpenditureContainer';
import { useHistory } from 'react-router';

/**
 * 자동 이체 생성 페이지
 * @component
 */

function SaveRegularExpenditurePage() {
  const history = useHistory();

  /**
   * 뒤로가기 버튼 클릭
   **/
  const onBackClick = () => {
    history.push('/regular-expenditure');
  };

  return (
    <PageTemplate title='정기지출 등록' onBackClick={onBackClick}>
      <SaveRegularExpenditureContainer />
    </PageTemplate>
  );
}

export default SaveRegularExpenditurePage;
