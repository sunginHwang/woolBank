import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import palette from '@style/palette';

type colorSchemeType = {
  bgColor: string;
  color: string;
};

type sizeSchemeType = {
  width: string;
  height: string;
};

export interface BaseButtonProps {
  dataType?: string;
  message: string;
  color: 'red';
  size: 'full';
  active?: boolean;
  loading?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

function BaseButton({ dataType, message, color, size, loading = false, active = true, onClick }: BaseButtonProps) {
  const colorScheme: colorSchemeType = useMemo(() => {
    const result = { bgColor: '', color: '' };

    if (color === 'red') {
      result.bgColor = palette.mainColor;
      result.color = palette.white;
    }

    return result;
  }, [color]);

  const sizeScheme: sizeSchemeType = useMemo(() => {
    const result = { width: '100%', height: '100%', fontSize: '1.2rem' };

    if (size === 'full') {
      result.width = '100%';
      result.height = '100%';
      result.fontSize = '';
    }

    return result;
  }, [size]);

  const onButtonClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // 로딩중 && 비활성화 상태 일시 버튼 클릭  안되도록
    if (!loading && active && onClick) {
      onClick(e);
    }
  };

  return (
    <S.BaseButton
      onClick={onButtonClick}
      data-type={dataType}
      active={active}
      colorScheme={colorScheme}
      sizeScheme={sizeScheme}
    >
      {loading ? <ClipLoader color={palette.white} size={20} /> : message}
    </S.BaseButton>
  );
}

const S: {
  BaseButton: any;
} = {
  BaseButton: styled.button<{
    sizeScheme: sizeSchemeType;
    colorScheme: colorSchemeType;
    active: boolean;
  }>`
    border-radius: 0.8rem;
    width: ${({ sizeScheme }) => (sizeScheme ? sizeScheme.width : '10rem')};
    height: ${({ sizeScheme }) => (sizeScheme ? sizeScheme.height : '5rem')};
    background-color: ${({ colorScheme }) => colorScheme.bgColor};
    color: ${({ colorScheme }) => colorScheme.color};
    opacity: ${({ active }) => (active ? 1 : 0.5)};
  `
};

console.log(S);

export default BaseButton;
