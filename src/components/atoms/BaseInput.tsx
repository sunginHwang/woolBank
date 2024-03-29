import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import IcoCloseCircle from '@components/atoms/icon/IcoCloseCircle';

export interface BaseInputProps {
  label?: string;
  placeHolder?: string;
  value?: string | number;
  name?: string;
  type?: 'text' | 'number' | 'date' | 'range';
  max?: number;
  useLengthInfo?: boolean;
  disable?: boolean;
  dataType?: string;
  isShowCloseBtn?: boolean;
  onChange?: React.ChangeEventHandler;
  onClear?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onKeyPressEnter?: () => void;
  onClick?: (e: React.ChangeEvent<HTMLDivElement>) => void;
}

/**
 * 공통 - 인풋 - 레거시
 * @component
 */

function BaseInput({
  label,
  placeHolder,
  value = '',
  name,
  type = 'text',
  max = 999,
  useLengthInfo = false,
  dataType = '',
  isShowCloseBtn = true,
  disable = false,
  onChange,
  onClear,
  onClick,
  onKeyPressEnter,
  onFocusIn,
  onFocusOut
}: BaseInputProps) {
  const isExistInputValue = value !== '' && isShowCloseBtn;
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
    onFocusIn && onFocusIn();
  }, [onFocusIn]);

  const onBlur = useCallback(() => {
    setFocus(false);
    inputRef.current && inputRef.current.blur();
    onFocusOut && onFocusOut();
  }, [onFocusOut]);

  const onInputClear = (e: React.MouseEvent<HTMLLIElement>) => {
    onClear && onClear(e);
    e.stopPropagation();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlur();
      onKeyPressEnter && onKeyPressEnter();
    }
  };

  const valueLength = String(value).length;

  // ios 는 number 타입 안먹기때문에 추가 option 처리
  const defaultProps =
    type === 'number'
      ? {
          inputmode: 'numeric',
          pattern: '[0-9]*'
        }
      : {};

  return (
    <>
      <S.BaseInput focus={focus} onClick={onClick} data-type={dataType === '' ? name : dataType}>
        {label && <label>{label}</label>}
        <input
          data-cy={name}
          ref={inputRef}
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          maxLength={max}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          autoComplete='off'
          onChange={onChange}
          disabled={disable}
          {...defaultProps}
        />
        {isExistInputValue && (
          <i onClick={onInputClear} data-type={dataType === '' ? name : dataType}>
            <IcoCloseCircle width={24} height={28} fill='#958d9e' />
          </i>
        )}
      </S.BaseInput>
      {useLengthInfo && (
        <S.ValueLength>
          {valueLength}/{max}자
        </S.ValueLength>
      )}
    </>
  );
}

const S: {
  BaseInput: any;
  ValueLength: any;
} = {
  BaseInput: styled.div<{ focus: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1rem 0;

    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${({ focus, theme }) => (focus ? theme.colors.mainColor : theme.colors.greyD2)};
      text-align: left;
      margin-bottom: 0.8rem;
    }

    input {
      border: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
      background-color: ${({ focus, theme }) => (focus ? theme.colors.subColor5 : theme.colors.greyL9)};
      border-radius: 0.8rem;
      padding: 0 1rem;
      height: 4rem;
      color: #27173e;
      font-size: 1.3rem;
    }

    i {
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 1.2rem;
      bottom: 0;
      opacity: 0.5;
    }
  `,
  ValueLength: styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.greyL1};
  `
};

export default React.memo(BaseInput);
