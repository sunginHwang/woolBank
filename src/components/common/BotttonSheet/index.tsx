import React, { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';

const bodyEl = document.querySelector('body');

interface IProps {
  // 시트 열기 닫기
  isOpen?: boolean;
  // 시트 닫기
  onClose: () => void;
  children: ReactNode;
  // customHeader태그
  header?: ReactNode;
  // 올라오는 phase 정하기
  snapPhase?: number;
  // 딤처리 사용여부
  useDeem?: boolean;
}

function BottomSheet(props: IProps) {
  const { isOpen = false, snapPhase = 0, useDeem = true, header, onClose, children } = props;
  const MAX_Y = window.innerHeight - 140; // 바텀시트가 최소로 내려갔을 때의 y 값

  React.useEffect(() => {
    if (!bodyEl) {
      return;
    }

    if (!useDeem) {
      return;
    }

    isOpen ? (bodyEl.style.overflow = 'hidden') : bodyEl.style.removeProperty('overflow');
  }, [isOpen, useDeem]);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[MAX_Y, 600, 400, 300, 100, 0]}
      initialSnap={snapPhase}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
    >
      <>
        <Sheet.Container>
          {header || <Sheet.Header />}
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        {useDeem && (
          <div onClick={onClose}>
            <Sheet.Backdrop />
          </div>
        )}
      </>
    </Sheet>
  );
}

export default BottomSheet;
