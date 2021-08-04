import NumberInputModal from '@components/common/modal/NumbetInputModal';
import React, { ComponentProps } from 'react';
import { addComma } from '@support/util/String';
import BaseInput from '@components/atoms/BaseInput';
import { useToggle } from '@support/hooks/useToggle';

// eslint-disable-next-line no-undef
interface IProps extends Omit<ComponentProps<typeof BaseInput>, 'value |disable | onClick | onClear'> {
  amount: number;
  onChangeAmount: (amount: number) => void;
}

/**
 * 금액 모달로 입력하는 인풋 (작은사이즈)
 * @component
 */

function MiniAmountInput(props: IProps) {
  const { amount, onChangeAmount, ...rest } = props;
  const [isOpenModal, onModal, offModal] = useToggle(false);

  const onClear = () => onChangeAmount(0);

  const onComplete = (amount: number) => {
    onChangeAmount(amount);
    offModal();
  };

  const inputProps = Object.assign({}, rest, {
    value: amount === 0 ? '' : `${addComma(amount)}원`,
    disable: true,
    onClick: onModal,
    onClear: onClear
  });

  return (
    <>
      <BaseInput {...inputProps} />
      <NumberInputModal
        title='금액 입력'
        visible={isOpenModal}
        currentAmount={amount}
        oncloseModal={offModal}
        onComplete={onComplete}
      />
    </>
  );
}

export default MiniAmountInput;
