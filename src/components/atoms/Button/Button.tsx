import { ButtonHTMLAttributes } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { blackL1, mainColor, subColor3, white } from '@/style';
import hexToRgb from '@/support/util/hexToRgb';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type ButtonColor = 'white' | 'red';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 버튼 텍스트
  message: string;
  // 컬러
  color: ButtonColor;
  // 버튼 사이즈
  size: ButtonSize;
  // 버튼 로딩 스피너 사용 여부
  loading?: boolean;
  // 풀로 채울지 여부
  fill?: boolean;
}

function Button({ loading, name, message, fill, disabled = false, onClick, ...props }: IProps) {
  const onButtonClick = (e: any) => {
    // 로딩중 && 비활성화 상태 일시 버튼 클릭  안되도록
    if (!loading && !disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton onClick={onButtonClick} data-cy={name} name={name} disabled={disabled} {...props}>
      {loading ? <ClipLoader color={white} size={20} /> : message}
    </StyledButton>
  );
}

const buttonSize: Record<ButtonSize, string> = {
  xsmall: `
    padding: '.7rem 1rem';
    fontSize: '1.2rem';
  `,
  small: `
    padding: '1rem 2rem';
  `,
  medium: `
    height: '4.8rem';
    fontSize: '1.5rem;
  `,
  large: `
    height: '5.6rem';
    fontSize: '1.6rem;
  `
};

const getButtonColor = (color: ButtonColor, disabled?: boolean) => {
  switch (color) {
    case 'red':
      return `
        color: ${disabled ? `rgba(${hexToRgb(white)}, 0.5)` : white};
        background-color: ${disabled ? subColor3 : mainColor};
      `;
    case 'white':
      return `
        color: ${disabled ? `rgba(${hexToRgb(blackL1)}, 0.5)` : blackL1};
        background-color: ${white};
      `;
    default:
      break;
  }
};

type StyledButtonProps = Pick<IProps, 'size' | 'disabled' | 'color' | 'fill'>;

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 1.3rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${({ size }) => buttonSize[size]}
  ${({ color, disabled }) => getButtonColor(color, disabled)}
  ${({ fill }) => fill && 'width: 100%;'}
`;

export default Button;
