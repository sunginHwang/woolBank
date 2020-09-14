import React from 'react';
import styled from 'styled-components';

type AddButtonProps = {
  icon: string | React.ReactNode;
  onClick: () => void;
};

function AddButton({ icon, onClick }: AddButtonProps) {
  const isStringIcon = typeof icon === 'string';
  return <S.AddDepositButton onClick={onClick}>{isStringIcon ? <p>{icon}</p> : icon}</S.AddDepositButton>;
}

const S: {
  AddDepositButton: any;
} = {
  AddDepositButton: styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 8rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.redL2};
    border-radius: 100%;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.2rem rgba(0, 0, 0, 0.16);

    > p {
      font-size: 2.4rem;
      font-weight: bold;
    }
  `
};

export default AddButton;
