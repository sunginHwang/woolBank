import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import IcoCloseCircle from '../icon/IcoCloseCircle';

type BaseInputProps = {
  label: string;
  placeHolder?: string;
  value: string | number;
  name?: string;
  type?: 'text' | 'number' | 'date' | 'range';
  max?: number;
  useLengthInfo?: boolean;
  disable?: boolean;
  dataType?: string;
  onChange?: React.ChangeEventHandler;
  onClear?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onClick?: (e: React.ChangeEvent<HTMLDivElement>) => void;
};

function BaseInput({
  label,
  placeHolder,
  value,
  name,
  type = 'text',
  max = 999,
  useLengthInfo = false,
  dataType = '',
  disable = false,
  onChange,
  onClear,
  onClick,
  onFocusIn,
  onFocusOut
}: BaseInputProps) {
  const isExistInputValue = value !== '';

  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
    onFocusIn && onFocusIn();
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
    onFocusOut && onFocusOut();
  }, []);

  const onInputClear = (e: React.MouseEvent<HTMLLIElement>) => {
    onClear && onClear(e);
    e.stopPropagation();
  };

  const valueLength = String(value).length;

  return (
    <>
      <S.BaseInput focus={focus} onClick={onClick} data-type={dataType}>
        <label>{label}</label>
        <input
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          maxLength={max}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disable}
        />
        {isExistInputValue && (
          <i onClick={onInputClear} data-type={dataType}>
            <IcoCloseCircle width={28} height={32} fill='#958d9e' />
          </i>
        )}
      </S.BaseInput>
      {useLengthInfo && <S.ValueLength>{valueLength}/{max}자</S.ValueLength>}
    </>
  );
}

const S: any = {
  BaseInput: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1rem 0;
    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props: any) => (props.focus ? props.theme.colors.navyD1 : props.theme.colors.navyD1)};
      text-align: left;
      margin-bottom: 0.5rem;
    }

    input {
      background: transparent;
      border: none;
      border-bottom: 0.1rem solid
        ${(props: any) => (props.focus ? props.theme.colors.navyD1 : props.theme.colors.greyL1)};
      padding-right: 3rem;
      border-radius: 0;
      height: 4rem;
      color: #27173e;
      font-size: 1.4rem;
    }

    i {
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0.5;
    }
  `,
  ValueLength: styled.p`
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.greyL1};
  `
};

export default BaseInput;
