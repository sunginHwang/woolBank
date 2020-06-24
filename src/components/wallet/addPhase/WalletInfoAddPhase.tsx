import React, { useState } from 'react';
import styled from 'styled-components';
import IcoChevronLeft from '../../icon/IcoChevronLeft';
import theme from '../../../style/colors';
import BaseInput from '../../common/BaseInput';
import WalletTypeAddModal from './WalletTypeAddModal';
import WalletDateModal from './WalletDateModal';

type WalletInfoAddPhaseProps = {};

function WalletInfoAddPhase({}: WalletInfoAddPhaseProps) {
  const [value, setValue] = useState('');
  const [menu, setMenu] = useState(false);
  const [menu2, setMenu2] = useState(false);

  const setWalletValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const clearWalletValue = () => setValue('');
  const onClick = () => setMenu(!menu);
  const onClick2 = () => setMenu2(!menu2);
  return (
    <S.WalletInfoAddPhase>
      <S.Header>
        <IcoChevronLeft width={26} height={26} fill={theme.colors.navyD1} />
        <p>예/적금 정보 작성하기</p>
      </S.Header>
      <S.Content>
        <BaseInput
          label='예/적금명'
          placeHolder='예/적금 명을 입력해 주세요.'
          value={value}
          onChange={setWalletValue}
          onClear={clearWalletValue}
        />
        <BaseInput
          label='예/적금 종류'
          placeHolder='예/적금 종류를 선택해 주세요.'
          onClick={onClick}
          value=''
          disable
        />
        <BaseInput
          label='만기일'
          placeHolder='만기일을 선택해 주세요.'
          onClick={onClick2}
          value=''
          disable
        />
      </S.Content>
      <WalletTypeAddModal visible={menu} oncloseModal={onClick} />
      <WalletDateModal
        visible={menu2}
        oncloseModal={onClick2}
        date={new Date()}
      />
    </S.WalletInfoAddPhase>
  );
}

const S: {
  WalletInfoAddPhase: any;
  Header: any;
  Content: any;
  Input: any;
  Menu: any;
} = {
  WalletInfoAddPhase: styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Menu: styled.div`
    display: flex;
    flex-direction: column;

    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }

    p {
      border-bottom: 0.1rem solid ${(props) => props.theme.colors.blackL1};
      padding-right: 3rem;
      border-radius: 0;
      height: 4rem;
      color: #27173e;
      font-size: 1.5rem;
    }
  `,
  Header: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `,
  Content: styled.div`
    margin-top: 2rem;
    padding: 0 2rem;
    > div + div {
      margin-top: 4rem;
    }
  `,
  Input: styled.div``
};

export default WalletInfoAddPhase;
