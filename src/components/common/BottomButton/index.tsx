import React from 'react';
import styled from 'styled-components';

import Button from '@components/atoms/Button';

interface IProps {
  // 버튼 메세지
  message: string;
  // 버튼 로딩중 여부
  loading?: boolean;
  // 버튼 활성화 여부
  active?: boolean;
  // 버튼 디스플레이 여부
  isShow?: boolean;
  // 버튼 클릭
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

/**
 * 하단 고정 버튼
 * @component
 */

function ButtonBottom(props: IProps) {
  const {
    message,
    loading = false,
    active = true,
    isShow = false,
    onClick
  } = props;

  if (!isShow) {
    return null;
  }

  return (
    <S.Bottom>
      <Button
        name='bottomButton'
        color='red'
        size='wideFull'
        message={message}
        active={active}
        loading={loading}
        onClick={onClick}
      />
    </S.Bottom>
  )
}

export default ButtonBottom;

const S = {
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
