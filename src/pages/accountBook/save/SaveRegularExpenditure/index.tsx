import React from 'react';
import { useHistory } from 'react-router';
import PageTemplate from '@components/layout/PageTemplate';
import SaveRegularExpenditureForm from '@components/accountBook/regularExpenditure/SaveRegularExpenditureForm';

/**
 * 정기 지출 생성 페이지
 * @component
 */

function SaveRegularExpenditure() {
  const history = useHistory();

  /**
   * 뒤로가기 버튼 클릭
   **/
  const onBackClick = () => {
    history.push('/regular-expenditure');
  };

  return (
    <PageTemplate title='정기 지출 등록' onBackClick={onBackClick}>
      <SaveRegularExpenditureForm />
    </PageTemplate>
  );
}

export default SaveRegularExpenditure;
