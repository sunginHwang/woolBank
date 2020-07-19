import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import { ClipLoader } from 'react-spinners';

type BaseButtonProps = {
  dataType?: string;
  message: string;
  color : 'navy';
  size: 'full';
  active?: boolean;
  loading?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

function BaseButton({
  dataType,
  message,
  color,
  size,
  loading = false,
  active = true,
  onClick
}: BaseButtonProps) {
  const colorScheme = useMemo(() => {
    const result = { bgColor: '', color: '' };

    if (color === 'navy') {
      result.bgColor = colors.colors.navyD1;
      result.color = colors.colors.white;
    }

    return result;
  }, [color]);

  const sizeScheme = useMemo(() => {
    const result = { width: '100%', height: '100%', fontSize: '1.2rem' };

    if (size === 'full') {
      result.width = '100%';
      result.height = '100%';
      result.fontSize = ''
    }

    return result;
  }, [size]);

  const onButtonClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // 로딩중에는 버튼 클릭 당연히 안되도록
    if (!loading && onClick) {
      onClick(e);
    }
  }

  return (
    <S.BaseButton
      onClick={onButtonClick}
      data-type={dataType}
      active={active}
      colorScheme={colorScheme}
      sizeScheme={sizeScheme}
    >
      {loading
        ? <ClipLoader color={colors.colors.white} size={20} />
        : message}
    </S.BaseButton>
  );
}

const S: {
  BaseButton: any;
} = {
  BaseButton: styled.button`
  border-radius: 0.8rem;  
  width: ${(props: any) => props.sizeScheme ? props.sizeScheme.width : '10rem'};
  height: ${(props: any) => props.sizeScheme ? props.sizeScheme.height : '5rem'};
  background-color: ${(props: any) => props.colorScheme.bgColor};
  color: ${(props: any) => props.colorScheme.color};
  opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

console.log(S);

export default BaseButton;
