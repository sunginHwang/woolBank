import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import palette from '@style/palette';
import hexToRgb from '@support/util/hexToRgb';

type colorSchemeType = {
  bgColor: string;
  color: string;
  disableColor: string;
};

type sizeSchemeType = {
  width: string;
  height: string;
  padding?: string;
  fontSize?: string;
  radius?: string;
};

interface IProps {
  // data attribute
  dataType?: string;
  // name attribute
  name?: string;
  // 버튼 텍스트
  message: string;
  // 컬러
  color: 'red' | 'white';
  // 버튼 사이즈
  size: 'full' | 'wideFull' | 'sm' | 'small';
  // 버튼 활성화 유무 (@todo disable 로 바꾸기)
  active?: boolean;
  // 버튼 로딩 스피너 사용 여부
  loading?: boolean;
  // 버튼 클릭 이벤트
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

/**
 * 기본 버튼 이벤트
 * @component
 */

function Button(props: IProps) {
  const {
    dataType,
    message,
    color,
    size,
    name,
    loading = false,
    active = true,
    onClick
  } = props;

  const colorScheme: colorSchemeType = useMemo(() => {
    const result = { bgColor: '', color: '', disableColor: '' };

    if (color === 'red') {
      result.bgColor = palette.mainColor;
      result.color = palette.white;
      result.disableColor = palette.subColor3;
    }

    if (color === 'white') {
      result.bgColor = palette.white;
      result.color = palette.blackL1;
      result.disableColor = palette.white;
    }

    return result;
  }, [color]);

  const sizeScheme: sizeSchemeType = useMemo(() => {
    const result: any = { fontSize: '1.3rem' };

    if (size === 'full') {
      result.width = '100%';
      result.height = '4.8rem';
      result.fontSize = '1.5rem';
    }

    if (size === 'wideFull') {
      result.width = '100%';
      result.height = '5.6rem';
      result.fontSize = '1.6rem';
      result.radius = '1.3rem';
    }

    if (size === 'sm') {
      result.padding = '1rem 2rem';
    }

    if (size === 'small') {
      result.padding = '.7rem 1rem';
      result.fontSize = '1.2rem';
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
      data-cy={name}
      name={name}
      data-type={dataType}
      active={active}
      disabled={!active}
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
    border-radius: ${({ sizeScheme }) => sizeScheme.radius || '0.8rem'};
    width: ${({ sizeScheme }) => (sizeScheme ? sizeScheme.width : '')};
    height: ${({ sizeScheme }) => (sizeScheme ? sizeScheme.height : '')};
    padding: ${({ sizeScheme }) => sizeScheme.padding && sizeScheme.padding};
    font-size: ${({ sizeScheme }) => sizeScheme.fontSize && sizeScheme.fontSize};
    background-color: ${({ colorScheme, active }) => active ? colorScheme.bgColor : colorScheme.disableColor};
    color: ${({ colorScheme, active }) => {
      const opacity = active ? 1 : 0.5;
      return `rgba(${hexToRgb(colorScheme.color)}, ${opacity})`;
    }};
  `
};

export default Button;
