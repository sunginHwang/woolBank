import React from 'react';
import styled from 'styled-components';

import Button from '@components/atoms/Button';
import BottomModal from '@components/common/modal/BottomModal';
import CategorySaveForm from '@components/accountBook/CategorySaveForm';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { useToggle } from '@support/hooks/useToggle';
import useAccountBookCategories from '@/services/accountBook/useAccountBookCategories';

import AccountBookCategoryItem from './AccountBookCategoryItem';

export interface IProps {
  open: boolean;
  onClose: () => void;
  type: AccountBookCategoryType;
  selectCategoryId: number;
  onCategorySelect: (category: IAccountBookCategory) => void;
}
/**
 * 가계부 분류 선택 박스
 * @component
 */

function CategorySelectBox(props: IProps) {
  const { open, onClose, type, selectCategoryId, onCategorySelect } = props;
  const { accountBookCategories, saveAccountBookCategory, saveLoading } = useAccountBookCategories();
  const [isOpenSaveForm, onOpenSaveForm, onCloseSaveForm] = useToggle(false);

  const categories = accountBookCategories.filter(a => a.type === type);
  const titleMsg = `${type === 'income' ? '수입' : '지출'} 카테고리 추가`;

  return (
    <>
      <BottomModal title={titleMsg} visible={open} oncloseModal={onClose}>
        <S.CategorySelectBox>
          <S.CategoryList>
            {categories.map(c => {
              return (
                <AccountBookCategoryItem
                  key={c.id}
                  accountBookCategory={c}
                  isActive={c.id === selectCategoryId}
                  onSelect={onCategorySelect}
                />
              );
            })}
          </S.CategoryList>
          <S.Footer>
            <Button message={`+ ${titleMsg}`} color='red' size='full' onClick={onOpenSaveForm} />
          </S.Footer>
        </S.CategorySelectBox>
      </BottomModal>
      {isOpenSaveForm && (
        <CategorySaveForm
          type={type}
          isLoading={saveLoading}
          saveAccountBookCategory={saveAccountBookCategory}
          onClose={onCloseSaveForm}
        />
      )}
    </>
  );
}

const S: {
  CategorySelectBox: any;
  CategoryList: any;
  Footer: any;
} = {
  CategorySelectBox: styled.div`
    overflow-y: scroll;
    max-height: 45rem;
  `,
  CategoryList: styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-height: 40rem;
  `,
  Footer: styled.div`
    margin: 1.5rem 2rem 0 2rem;   
  `
};

export default CategorySelectBox;
