import React from 'react';
import styled from 'styled-components';

export interface OneWeekAgoItemProps {}

// eslint-disable-next-line no-empty-pattern
function OneWeekAgoItem({}: OneWeekAgoItemProps) {
  return (
    <S.OneWeekAgoItem>
      <S.Content>
        <p>리스트</p>
        <span>3일전</span>
      </S.Content>
    </S.OneWeekAgoItem>
  );
}

const S: {
  OneWeekAgoItem: any;
  Content: any;
} = {
  OneWeekAgoItem: styled.li`
    margin-right: 1.5rem;
    display: inline-block;   
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1.3rem;
    padding: 1.5rem 1.2rem;
    width: 7.2rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
    
    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.blackL1};
      margin-bottom: .3rem;
    }
    
    span {
      padding: .2rem 1.5rem;
      background-color: ${({ theme }) => theme.colors.mainColor};
      border-radius: 1.3rem;
      color: ${({ theme }) => theme.colors.white};
      font-size: 1rem;
    }
  `
};

export default OneWeekAgoItem;
