import React, { useCallback } from 'react';
import ToggleTab from '@components/common/ToggleTab';
import options from './options';
import { IAssetType } from '@models/IAssetType';

const { selfTab, autoTab } = options;

interface ExpenditureTabsProps {
  useAutoExpenditure: boolean;
  onChangeSaveForm: (type: string, value: string | number | boolean) => void;
}

function ExpenditureTabs({ useAutoExpenditure, onChangeSaveForm }: ExpenditureTabsProps) {
  // 자동 이체 유무 변경
  const onChangeAutoExpenditure = useCallback((tab: IAssetType) => {
    const isAutoExpenditure = autoTab.type === tab.type;
    onChangeSaveForm('useAutoExpenditure', isAutoExpenditure);
  }, [onChangeSaveForm]);

  const tabs = [autoTab, selfTab];
  const activeTab = useAutoExpenditure ? autoTab : selfTab;

  return <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={onChangeAutoExpenditure} />;
}

export default ExpenditureTabs;
