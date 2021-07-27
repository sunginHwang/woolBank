import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  targetId: string;
  children: React.ReactNode;
}

/**
 * Portal 공통 사용 컴포넌트
 * @component
 */
function Portal({ targetId, children }: IProps) {
  const targetNode = document.getElementById(targetId);

  if (!targetNode) {
    return null;
  }

  return ReactDOM.createPortal(children, targetNode);
}

export default Portal;
