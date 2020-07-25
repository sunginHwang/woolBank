import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import IcoDumbbell from '../icon/IcoDumbbell';
import IcoTravel from '../icon/Icotravel';
import IcoBook from '../icon/IcoBook';
import IcoBriefcase from '../icon/IcoBriefcase';
import colors from '../../style/colors';

type CategoryItemProps = {
  bucketListCategory: IBucketListCategory;
  activeCategoryType: string;
  onSelect: (type: string) => void;
}

function CategoryItem({
  bucketListCategory,
  activeCategoryType,
  onSelect
}: CategoryItemProps) {
  const isActive = activeCategoryType === bucketListCategory.type;
  const icoSize = 24;
  const icoColor = isActive ? colors.colors.navyD1 : colors.colors.greyL1;

  const onClick = (e: React.ChangeEvent<HTMLLIElement>) => {
    const selectType = e.currentTarget.dataset.type || '';
    onSelect(selectType);
  };

  return (
    <S.CategoryItem isActive={isActive} data-type={bucketListCategory.type} onClick={onClick}>
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
    padding: 2rem;
    border: .1rem solid ${(props: any) => props.isActive ? props.theme.colors.greyL1 : props.theme.colors.navyD1};
    
    >span {
      font-size: 1.2rem;
    }
  `
};

export default React.memo(CategoryItem);
