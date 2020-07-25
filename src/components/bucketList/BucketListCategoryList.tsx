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
    <>
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
    </>
  );
}

const S: {
  CategoryList: any;
} = {
  CategoryList: styled.ul`
    padding: 2rem;
    border: .1rem solid ${(props: any) => props.isActive ? props.theme.colors.greyL1 : props.theme.colors.navyD1};
    
    >span {
      font-size: 1.2rem;
    }
  `
};

export default React.memo(BucketListCategoryList);
