import React, { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';

export const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 140; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y; // 바텀시트의 세로 길이

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: ReactNode;
  snapPhase?: number;
}

function BottomSheet(props: IProps) {
  const { isOpen = false, snapPhase = 0, header, onClose, children } = props;

  React.useEffect(() => {
    const bodyEl = document.querySelector('body');

    if (!bodyEl) {
      return;
    }

    isOpen ? (bodyEl.style.overflow = 'hidden') : bodyEl.style.removeProperty('overflow');
  }, [isOpen]);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[MAX_Y, 600, 400, 100, 0]}
      initialSnap={snapPhase}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
      onSnap={(snapIndex) => console.log('> Current snap point index:', snapIndex)}
    >
      <Sheet.Container>
        {header || <Sheet.Header />}
        <Sheet.Content disableDrag>{children}</Sheet.Content>
      </Sheet.Container>
      <div onClick={onClose}>
        <Sheet.Backdrop />
      </div>
    </Sheet>
  );
}

export default BottomSheet;
