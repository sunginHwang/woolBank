import React from 'react';
import styled from 'styled-components';

import BaseButton from '@components/common/BaseButton';

export interface BottomButtonProps {
  message: string;
  loading?: boolean;
  // 버튼 활성화 여부
  active?: boolean;
  // 버튼 디스플레이 여부
  isShow?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
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
        name='bottomButton'
        color='red'
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
    bottom: calc(constant(safe-area-inset-bottom) + 2rem);
    bottom: calc(env(safe-area-inset-bottom) + 2rem);
    left: 2rem;
    width: calc(100% - 4rem);
    height: 5.5rem;
  `
};
