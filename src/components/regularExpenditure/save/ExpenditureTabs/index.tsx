import React, { useCallback } from 'react';
import styled from 'styled-components';

import { IAssetType } from '@models/component/IAssetType';
import ToggleTab from '@components/common/ToggleTab';
import options from './options';

const { selfTab, autoTab } = options;

interface ExpenditureTabsProps {
  // 자동 이체 유무
  isAutoExpenditure: boolean;
  // 저장 폼 변경 이벤트
  onChangeSaveForm: (type: string, value: string | number | boolean) => void;
}

/**
 * 자동 이체 유무 선택 탭
 * @component
 */

function ExpenditureTabs({ isAutoExpenditure, onChangeSaveForm }: ExpenditureTabsProps) {
  // 자동 이체 유무 변경
  const onChangeAutoExpenditure = useCallback((tab: IAssetType) => {
    const isAutoExpenditure = autoTab.type === tab.type;
    onChangeSaveForm('isAutoExpenditure', isAutoExpenditure);
  }, [onChangeSaveForm]);

  const tabs = [autoTab, selfTab];
  const activeTab = isAutoExpenditure ? autoTab : selfTab;

  return (
    <S.ExpenditureTabs>
      <p>자동이체 여부</p>
      <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={onChangeAutoExpenditure} />
    </S.ExpenditureTabs>
  );
}

const S: {
  ExpenditureTabs: any;
} = {
  ExpenditureTabs: styled.div`
    margin-top: 4rem;
    
    p {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.greyD2};
      text-align: left;
      margin-bottom: 1.5rem;
    }
  `
}

export default ExpenditureTabs;
