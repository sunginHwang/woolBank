import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';

function RegularExpenditureList() {
  return (
    <PageTemplate useHeader useBackButton={false} title='정기지출'>
      <p>리스트 페이지</p>
    </PageTemplate>
  );
}

export default RegularExpenditureList;
