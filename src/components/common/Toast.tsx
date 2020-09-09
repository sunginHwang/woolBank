import React from 'react';
import styled from 'styled-components';

type ToastProps = {
  visible: boolean;
  message: string;
};

function Toast({ visible, message }: ToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <S.Toast>
      <div>
        <p>{message}</p>
      </div>
    </S.Toast>
  );
}

const S: {
  Toast: any;
} = {
  Toast: styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      p {
        background-color: ${props => props.theme.colors.notificationColor};
        padding: 1rem 1.8rem;
        color: ${props => props.theme.colors.white};
        font-size: 1.4rem;
        border-radius: 6.5rem;
      }
     
    }
  `
};

export default Toast;
