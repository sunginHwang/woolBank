import React from 'react';
import styled from 'styled-components';
import BottomSheet from '@/components/common/BotttonSheet';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 가계부 통계 - 통계 bottomSheet
 * @component
 */

function CategoryBottomSheet({ isOpen, onClose }: IProps) {
  return (
    <BottomSheet useDeem isOpen={isOpen} onClose={onClose} snapPhase={3}>
      <S.CategoryBottomSheet>
        <S.Title>문화 / 데이트</S.Title>
        <S.List>
          {[...Array(40)].map((_, key) => (
            <S.Item key={key}>
              <div className='left'>
                <p>와우{key}</p>
                <span>07-21</span>
              </div>
              <span className='amount'>20,000원</span>
            </S.Item>
          ))}
        </S.List>
      </S.CategoryBottomSheet>
    </BottomSheet>
  );
}

export default CategoryBottomSheet;

const S = {
  CategoryBottomSheet: styled.div`
    padding: 0 2rem;
  `,
  Title: styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #f47560;
  `,
  List: styled.ul`
    margin-bottom: 2rem;

    & > * + * {
      margin-top: 1rem;
    }
  `,
  Item: styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${({ theme }) => theme.colors.blackL1};

    .left {
      display: flex;
      flex-direction: column;

      > p {
        font-size: 1.4rem;
      }

      > span {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.colors.greyL1};
      }
    }

    .amount {
      font-weight: bold;
      font-size: 1.6rem;
    }
  `
};
