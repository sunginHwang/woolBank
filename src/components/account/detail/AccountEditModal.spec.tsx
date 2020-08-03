import React from 'react';
import AccountEditModal from './AccountEditModal';
import withThemeRender from '../../../support/test/withThemeRender';
import { fireEvent } from '@testing-library/react';

describe('<AccountEditModal />', () => {
  it('기본 랜더링.', () => {
    const onEditClick = (edit: 'migration' | 'end' | 'remove') => console.log(edit);
    const oncloseModal = () => console.log('onClose');
    const { getByText } = withThemeRender(<AccountEditModal visible oncloseModal={oncloseModal} onEditClick={onEditClick} />);
    expect(getByText('이전 입금내역 추가'));
    expect(getByText('만기'));
    expect(getByText('삭제'));
  });

  it('visible 이 false 이면 모달이 안보여야 한다.', () => {
    const onEditClick = (edit: 'migration' | 'end' | 'remove') => console.log(edit);
    const oncloseModal = () => console.log('onClose');
    const { container } = withThemeRender(<AccountEditModal visible={false} oncloseModal={oncloseModal} onEditClick={onEditClick} />);
    expect(container.firstChild).toHaveStyle('visibility: hidden');
  });

  it('이전 입금내역 추가 클릭시  onEditClick 에서 migration 반환', () => {
    let result = '';
    const onEditClick = (edit: 'migration' | 'end' | 'remove') => result = edit;
    const oncloseModal = () => console.log('');
    const { getByText } = withThemeRender(<AccountEditModal visible oncloseModal={oncloseModal} onEditClick={onEditClick} />);
    const migrationButton = getByText('이전 입금내역 추가');
    // 외부에서 닫기 이벤트 요청
    fireEvent.click(migrationButton);

    expect(result).toBe('migration');
  });

  it('만기버튼 클릭시  onEditClick 에서 end 반환', () => {
    let result = '';
    const onEditClick = (edit: 'migration' | 'end' | 'remove') => result = edit;
    const oncloseModal = () => console.log('');
    const { getByText } = withThemeRender(<AccountEditModal visible oncloseModal={oncloseModal} onEditClick={onEditClick} />);
    const endButton = getByText('만기');
    // 외부에서 닫기 이벤트 요청
    fireEvent.click(endButton);

    expect(result).toBe('end');
  });

  it('삭제 클릭시  onEditClick 에서 remove 반환', () => {
    let result = '';
    const onEditClick = (edit: 'migration' | 'end' | 'remove') => result = edit;
    const oncloseModal = () => console.log('');
    const { getByText } = withThemeRender(<AccountEditModal visible oncloseModal={oncloseModal} onEditClick={onEditClick} />);
    const RemoveButton = getByText('삭제');
    // 외부에서 닫기 이벤트 요청
    fireEvent.click(RemoveButton);

    expect(result).toBe('remove');
  });
});
