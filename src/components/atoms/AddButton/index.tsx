import React from 'react';
import { css } from '@emotion/react';
import { red200, safeAreaInsetBottom, white, zIndex } from '@/style';

const addButton = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  ${safeAreaInsetBottom('8rem')}
  right: 2rem;
  width: 5rem;
  height: 5rem;
  color: ${white};
  background-color: ${red200};
  border-radius: 100%;
  box-shadow: 0.2rem 0.2rem 0.5rem 0.2rem rgba(0, 0, 0, 0.16);
  z-index: ${zIndex.floatButton};

  > p {
    font-size: 2.4rem;
    font-weight: bold;
  }
`;

interface IProps {
  onClick: () => void;
}

/**
 * 추가버튼 -  우측 하단 고정
 * @component
 */

function AddButton({ onClick }: IProps) {
  return (
    <div css={addButton} data-cy='addButton' onClick={onClick}>
      <p>plus</p>
    </div>
  );
}

export default AddButton;
