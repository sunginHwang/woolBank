import React from 'react';
import styled from 'styled-components';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import IcoDumbbell from '../icon/IcoDumbbell';
import IcoTravel from '../icon/Icotravel';
import IcoBook from '../icon/IcoBook';
import IcoBriefcase from '../icon/IcoBriefcase';
import colors from '../../style/colors';

type CategoryItemProps = {
  bucketListCategory: IBucketListCategory;
  isSelected: boolean;
  onSelectCategory: (category: IBucketListCategory) => void;
}

function CategoryItem({
  bucketListCategory,
  isSelected,
  onSelectCategory
}: CategoryItemProps) {
  const icoSize = 30;
  const icoColor = isSelected ? colors.colors.navyD1 : colors.colors.greyL1;

  // 카테고리 선택
  const onSelectCategoryClick = () => {
    onSelectCategory(bucketListCategory);
  };

  return (
    <S.CategoryItem isSelected={isSelected} data-type={bucketListCategory.type} onClick={onSelectCategoryClick}>
      <div>
        {bucketListCategory.type === 'health' && <IcoDumbbell width={icoSize} height={icoSize} fill={icoColor} />}
        {bucketListCategory.type === 'work' && <IcoBriefcase width={icoSize} height={icoSize} fill={icoColor} />}
        {bucketListCategory.type === 'learning' && <IcoBook width={icoSize} height={icoSize} fill={icoColor} />}
        {bucketListCategory.type === 'travel' && <IcoTravel width={icoSize} height={icoSize} fill={icoColor} />}
        <span>{bucketListCategory.name}</span>
      </div>
    </S.CategoryItem>
  );
}

const S: {
  CategoryItem: any;
} = {
  CategoryItem: styled.li`
    margin-top: 2rem;
    
    > div {
      border: .1rem solid ${(props: any) => props.isSelected ? props.theme.colors.navyD1 : props.theme.colors.greyL1};
      border-radius: 1.3rem;
      margin-right: 2rem;
      height: 4rem;
      display: flex;
      padding: 0 1rem;
      align-items: center;
      justify-content: flex-start;
      
      > span {
      margin-left: 1rem;
      font-size: 1.2rem;
      width: 100%;
    }
  }
  `
};

export default React.memo(CategoryItem);
