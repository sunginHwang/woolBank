import { greyD2, greyL2, greyL9, mainColor, subColor5 } from '@/style';
import React, { InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import IcoCloseCircle from '@components/atoms/icon/IcoCloseCircle';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isShowCloseBtn?: boolean;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onClear?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const iosNumberType = {
  inputmode: 'numeric',
  spattern: '[0-9]*'
};

/**
 * 공통 - Input 컴포넌트
 * @component
 */

export const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ label, type, isShowCloseBtn, onFocusIn, onFocusOut, onClear, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [focus, setFocus] = useState(false);
    const onInputClear = (e: React.MouseEvent<HTMLLIElement>) => {
      onClear?.(e);
      e.stopPropagation();
    };

    const onFocus = useCallback(() => {
      setFocus(true);
    }, []);

    const onBlur = useCallback(() => {
      setFocus(false);
      innerRef.current?.blur?.();
    }, []);

    // ios 는 number 타입 안먹기때문에 추가 option 처리
    const iosNumberTypeProps = type === 'number' ? iosNumberType : {};

    return (
      <StyledInput isFocus={focus} ref={innerRef} onFocus={onFocus} onBlur={onBlur}>
        {label && <label>{label}</label>}
        <input ref={ref} autoComplete='off' {...iosNumberTypeProps} {...props} />
        {isShowCloseBtn && (
          <i onClick={onInputClear} data-type={props.name}>
            <IcoCloseCircle width={24} height={28} fill='#958d9e' />
          </i>
        )}
      </StyledInput>
    );
  }
);

const StyledInput = styled.div < { isFocus: boolean } > `
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1rem 0;

  label {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ isFocus }) => (isFocus ? mainColor : greyD2)};
    text-align: left;
    margin-bottom: 0.8rem;
  }

  input {
    border: 0.1rem solid ${greyL2};
    background-color: ${({ isFocus }) => (isFocus ? subColor5 : greyL9)};
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
`;
