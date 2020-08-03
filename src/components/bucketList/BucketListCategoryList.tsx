import React from 'react';
import styled from 'styled-components';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import CategoryItem from './CategoryItem';
import LabelText from '../common/LabelText';

type BucketListCategoryListProps = {
  bucketListCategoryList: IBucketListCategory[];
  selectedCategory: IBucketListCategory;
  onChangeCategory: (category: IBucketListCategory) => void;
}

function BucketListCategoryList({
  bucketListCategoryList,
  selectedCategory,
  onChangeCategory
}: BucketListCategoryListProps) {
  return (
    <S.BucketListCategoryList>
      <LabelText>성취할 버킷리스트의 <br />카테고리를 정해주세요.</LabelText>
      <S.CategoryList>
        {
          bucketListCategoryList.map((bucketListCategory) => {
            return (
              <CategoryItem
                key={bucketListCategory.type}
                bucketListCategory={bucketListCategory}
                isSelected={selectedCategory.type === bucketListCategory.type}
                onSelectCategory={onChangeCategory}
              />
            );
          })
        }
      </S.CategoryList>
    </S.BucketListCategoryList>
  );
}

const S: {
  BucketListCategoryList: any;
  CategoryList: any;
} = {
  BucketListCategoryList: styled.div`
    margin: 4rem 0;
  `,
  CategoryList: styled.ul`
    display: flex;
    flex-wrap: wrap;

    > span {
      font-size: 1.2rem;
    }
  `
};

export default BucketListCategoryList;
