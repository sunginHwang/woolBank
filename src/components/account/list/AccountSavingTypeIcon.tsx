import React from 'react';
import { SAVING_TYPE } from '@support/constants';
import IcoPiggyBank from '@components/icon/IcoPiggyBank';
import colors from '@style/theme';
import IcoCashUsd from '@components/icon/IcoCashUsd';
import IcoCurrencyUsdCircle from '@components/icon/IcoCurrencyUsdCircle';

export interface AccountSavingTypeIconProps {
  savingType: string;
};

function AccountSavingTypeIcon({ savingType }: AccountSavingTypeIconProps) {
  const size = 14;
  const color = colors.colors.greyD2;

  switch (savingType) {
    case SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS: {
      return <IcoPiggyBank height={size} width={size} fill={color} />;
    }
    case SAVING_TYPE.REGULAR_DEPOSIT: {
      return <IcoCashUsd height={size} width={size} fill={color} />;
    }
    case SAVING_TYPE.FREE_INSTALLMENT_SAVINGS: {
      return <IcoCurrencyUsdCircle height={size} width={size} fill={color} />;
    }
    default: {
      return null;
    }
  }
}

export default AccountSavingTypeIcon;
