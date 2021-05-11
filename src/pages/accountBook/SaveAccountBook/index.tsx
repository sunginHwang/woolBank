import React from 'react';
import CategorySelectBox from '@components/accountBook/save/CategorySelectBox';
import PageTemplate from '@components/layout/PageTemplate';
import { useHistory } from 'react-router';
import SaveForm from '@components/accountBook/save/SaveForm';

function SaveAccountBook() {
  const history = useHistory();

  /**
   * 뒤로가기 버튼 클릭
   **/
  const onBackClick = () => {
    history.goBack();
  };

  return (
    <PageTemplate title='가계부 내역 추가' onBackClick={onBackClick}>
      <SaveForm />
    </PageTemplate>
  );
}

export default SaveAccountBook;
