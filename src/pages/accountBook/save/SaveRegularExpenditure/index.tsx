import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import SaveRegularExpenditureForm from '@components/regularExpenditure/save/SaveRegularExpenditureForm';

/**
 * 정기 지출 생성 페이지
 * @component
 */

function SaveRegularExpenditure() {
  return (
    <PageTemplate title='정기 지출 등록'>
      <SaveRegularExpenditureForm />
    </PageTemplate>
  );
}

export default SaveRegularExpenditure;
