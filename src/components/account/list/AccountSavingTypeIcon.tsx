import React from 'react';
import { SAVING_TYPE } from '../../../support/constants';
import IcoPiggyBank from '../../icon/IcoPiggyBank';
import colors from '../../../style/colors';
import IcoCashUsd from '../../icon/IcoCashUsd';
import IcoCurrencyUsdCircle from '../../icon/IcoCurrencyUsdCircle';

type AccountSavingTypeIconProps = {
  savingType: string;
};

function AccountSavingTypeIcon({ savingType }: AccountSavingTypeIconProps) {
  const size = 14;
  const color = colors.colors.greyD2;

  if (savingType === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS) {
    return <IcoPiggyBank height={size} width={size} fill={color} />;
  }

  if (savingType === SAVING_TYPE.REGULAR_DEPOSIT) {
    return <IcoCashUsd height={size} width={size} fill={color} />;
  }

  if (savingType === SAVING_TYPE.FREE_INSTALLMENT_SAVINGS) {
    return <IcoCurrencyUsdCircle height={size} width={size} fill={color} />;
  }

  return null;
}

export default AccountSavingTypeIcon;
