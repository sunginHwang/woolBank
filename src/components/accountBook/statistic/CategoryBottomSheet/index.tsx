import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import BottomSheet from '@/components/common/BotttonSheet';
import { IAccountBookStatisticListItem } from '@/models/accountBook/statistic/IAccountBookStatistic';
import { addComma } from '@/support/util/String';

interface IProps {
  title: string;
  titleColor: string;
  list: IAccountBookStatisticListItem[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 가계부 통계 - 통계 bottomSheet
 * @component
 */

function CategoryBottomSheet(props: IProps) {
  const { isOpen, title, titleColor, list, onClose } = props;
  return (
    <BottomSheet useDeem isOpen={isOpen} onClose={onClose} snapPhase={1}>
      <S.CategoryBottomSheet>
        <S.Title color={titleColor}>{title}</S.Title>
        <S.List>
          {list.map(({ title, amount, registerDateTime }, key) => (
            <S.Item key={key}>
              <div className='left'>
                <p>{title}</p>
                <span>{format(registerDateTime, 'MM-dd')}</span>
              </div>
              <span className='amount'>{addComma(amount)}원</span>
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
  Title: styled.h3<{ color: string }>`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: ${({ color }) => color};
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
