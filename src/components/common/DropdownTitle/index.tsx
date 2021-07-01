import React from 'react';
import styled from 'styled-components';
import IcoChevronDown from '@components/icon/IcoChevronDown';

interface IProps {
  onClick: () => void;
  title: string;
}
/**
 * 제목 + 드랍다운 아이콘
 * @component
 */

function DropdownTitle({ title, onClick }: IProps) {
  return (
    <S.Title onClick={onClick}>
      <p>{title}</p>
      <IcoChevronDown width={30} height={30} />
    </S.Title>
  )
}


const S: {
  Title: any;
} = {
  Title: styled.h2`
    display: flex;
    align-items: center;

    > p {
      font-size: 2rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.blackL1};
      margin-right: 0.5rem;
    }
  `,
};

export default DropdownTitle;
