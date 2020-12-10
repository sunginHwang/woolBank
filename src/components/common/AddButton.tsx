import React from 'react';
import styled from 'styled-components';

export interface AddButtonProps {
  icon: string | React.ReactNode;
  onClick: () => void;
}

function AddButton({ icon, onClick }: AddButtonProps) {
  const isStringIcon = typeof icon === 'string';
  return (
    <S.AddButton data-cy='addButton' onClick={onClick}>
      {isStringIcon ? <p>{icon}</p> : icon}
    </S.AddButton>
  );
}

const S: {
  AddButton: any;
} = {
  AddButton: styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 8rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.redL2};
    border-radius: 100%;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.2rem rgba(0, 0, 0, 0.16);
    z-index: ${({ theme }) => theme.zIndex.floatButton};
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    
    
    > p {
      font-size: 2.4rem;
      font-weight: bold;
    }
  `
};

export default AddButton;
