import React from 'react';
import styled from 'styled-components';

export interface AddDepositButtonProps {
  onClick: () => void;
};

function AddDepositButton({ onClick }: AddDepositButtonProps) {
  return (
    <S.AddDepositButton data-cy='addDepositButton' onClick={onClick}>
      <p>+</p>
    </S.AddDepositButton>
  );
}

const S: {
  AddDepositButton: any;
} = {
  AddDepositButton: styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 5rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mainColor};
    border-radius: 100%;
    box-shadow: .2rem .2rem .5rem .2rem rgba(0,0,0,0.16);
    
    >p {
      font-size: 2.4rem;
      font-weight: bold;
    }
  `
}

export default AddDepositButton;
