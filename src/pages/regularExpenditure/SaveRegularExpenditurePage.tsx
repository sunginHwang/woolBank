import React from 'react';

import PageTemplate from '@components/layout/PageTemplate';
import SaveRegularExpenditureContainer from '@containers/regularExpenditure/add/SaveRegularExpenditureContainer';

/**
 * 자동 이체 생성 페이지
 * @component
 */

function SaveRegularExpenditurePage() {
  return (
    <PageTemplate title='정기지출 등록'>
      <SaveRegularExpenditureContainer />
    </PageTemplate>
  );
}

export default SaveRegularExpenditurePage;
