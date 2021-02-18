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
    padding: 0.5rem 1.2rem;
    max-width: 7.2rem;
   
    background-color: ${({ theme }) => theme.colors.greyL2};
    
    p {
      font-size: 1.2rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 7rem;
      color: ${({ theme }) => theme.colors.greyD3};
    }
    
    span {
      color: ${({ theme }) => theme.colors.mainColor};
      font-size: 1rem;
      text-align: right;
    }
  `
};

export default OneWeekAgoItem;
