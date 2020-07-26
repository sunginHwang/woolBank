import React, { useState } from 'react';
import styled from 'styled-components';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import CategoryItem from './CategoryItem';

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
      <label>카테고리</label>
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
    margin: 2rem 0;
    
    > label {
      font-size: 1.2rem;
      font-weight: 500;
      color: #515EC0;
      text-align: left;
    }
  `,
  CategoryList: styled.ul`
    display: flex;
    overflow-x: scroll;
    margin-top: 1.5rem;
    >span {
      font-size: 1.2rem;
    }
  `
};

export default React.memo(BucketListCategoryList);
