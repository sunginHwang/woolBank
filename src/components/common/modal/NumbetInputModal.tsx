import React, { useCallback } from 'react';
import styled from 'styled-components';

import BottomModal from '@components/common/modal/BottomModal';
import AmountInput from '@components/common/AmountInput';
import { useNumberAmount } from '@support/hooks/useNumberAmount';
import palette from '@style/palette';
import IcoCloseCircle from '@components/atoms/icon/IcoCloseCircle';

export interface IProps {
  title: string;
  visible: boolean;
  currentAmount: number;
  oncloseModal: () => void;
  onComplete: (amount: number) => void;
}

/**
 * 미니 금액 입력 모달
 * @component
 */

function NumberInputModal(props: IProps) {
  const { title, visible, currentAmount, oncloseModal, onComplete } = props;
  const { displayAmount, amount, onAddAmount, onBackAmount, onInitAmount } = useNumberAmount({ currentAmount });

  const onCompleteClick = useCallback(() => {
    onComplete(amount);
  }, [amount, onComplete]);

  return (
    <BottomModal title={title} visible={visible} oncloseModal={oncloseModal}>
      <S.AmountDisplay>
        <S.Amount>{displayAmount}</S.Amount>
        <i onClick={onInitAmount}>
          <IcoCloseCircle width={20} height={20} fill={palette.greyL3} />
        </i>
      </S.AmountDisplay>
      <AmountInput
        useCompleteBtn
        isZeroAmount={amount === 0}
        onNumberClick={onAddAmount}
        onBackNumberClick={onBackAmount}
        onRightBottomClick={onCompleteClick}
      />
    </BottomModal>
  );
}

/* 트랜지션 효과 연구중
function TransitionArray({ values } : { values: number;}) {
  const [items, setItems] = useState(converArray(values));

  useEffect(() => {
    console.log('왜>');
    console.log(converArray(values));
    console.log('e');
    setItems(converArray(values));
  }, [values]);

  const transitions = useTransition(items, {
    keys: item => item.key,
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  });

  return (
    <div style={{ display: 'flex', fontSize: '1.4rem' }}>
      {transitions((styles, item, a) => {

        return (
          <S.Amount>
            <animated.div style={styles} >
              {item.value}
            </animated.div>
          </S.Amount>
        );
      })}
    </div>
  )
}

function converArray(values: string) {
  const result = values === 0 ? [] : Array.from(String(values), num => num);
  return result.map((item, index)=> ({ key: index, value: item }));
}
*/

const S: {
  AmountDisplay: any;
  Amount: any;
} = {
  AmountDisplay: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5rem 2rem 5rem;
  `,
  Amount: styled.p`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    text-align: left;
    font-size: 2.8rem;
  `
};

export default React.memo(NumberInputModal);
