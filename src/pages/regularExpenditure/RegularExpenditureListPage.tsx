import React from 'react';
import { useHistory } from 'react-router';

import RegularExpenditureListContainer from '@containers/regularExpenditure/list/RegularExpenditureList';
import PageTemplate from '@components/layout/PageTemplate';
import AddButton from '@components/common/AddButton';

function RegularExpenditureListPage() {
  const history = useHistory();

  /**
   * 정기지출 등록 페이지 이동
   **/
  const goRegisterPage = () => {
    history.push('/regular-expenditure/save');
  };

  return (
    <PageTemplate useHeader useBackButton={false} title='정기지출'>
      <RegularExpenditureListContainer />
      <AddButton icon='+' onClick={goRegisterPage} />
    </PageTemplate>
  );
}

export default RegularExpenditureListPage;
