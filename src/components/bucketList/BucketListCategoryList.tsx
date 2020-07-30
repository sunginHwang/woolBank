import React, { useState } from 'react';
import styled from 'styled-components';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import CategoryItem from './CategoryItem';
import LabelText from '../common/LabelText';

function BucketListCategoryList() {
  const categoryList: IBucketListCategory[] = [
    {
      type: 'health',
      name: '건강'
    },
    {
      type: 'work',
      name: '일'
    },
    {
      type: 'learning',
      name: '학습'
    },
    {
      type: 'travel',
      name: '여행'
    }
  ];

  const [activeCategory, setActiveCategory] = useState('travel');

  return (
    <S.BucketListCategoryList>
      <LabelText>성취할 버킷리스트의 <br />카테고리를 정해주세요.</LabelText>
      <S.CategoryList>
        {
          categoryList.map((bucketListCategory) => {
            return (
              <CategoryItem
                key={bucketListCategory.type}
                bucketListCategory={bucketListCategory}
                activeCategoryType={activeCategory}
                onSelect={setActiveCategory}
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

    >span {
      font-size: 1.2rem;
    }
  `
};

export default React.memo(BucketListCategoryList);
