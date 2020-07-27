import React from 'react';
import BaseButton from './BaseButton';
import styled from 'styled-components';

type BottomButtonProps = {
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  message: string;
  loading?: boolean;
  active?: boolean;
  isShow?: boolean;
}

function BottomButton({
  message,
  loading = false,
  active = true,
  onClick,
  isShow = false
}: BottomButtonProps) {
  if (!isShow) {
    return null;
  }

  return (
    <S.Bottom>
      <BaseButton
        color='navy'
        size='full'
        message={message}
        active={active}
        loading={loading}
        onClick={onClick}
      />
    </S.Bottom>
  )
}

export default BottomButton;

const S : {
  Bottom: any;
} = {
  Bottom: styled.div`
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: calc(100% - 4rem);
    height: 5.5rem;
  `
};
