import React from 'react';
import styled from 'styled-components';
import IcoNotebook from '../../icon/IcoNotebook';
import theme from '../../../style/colors';
import IcoCalendarMonthOutline from '../../icon/IcoCalendarMonthOutline';
type BucketListContentInfoProps = {
}

function BucketListContentInfo({ }: BucketListContentInfoProps) {
  return (
    <S.BucketListContentInfo>
      <S.ContentItem>
        <i>
          <IcoCalendarMonthOutline width={24} height={24} fill={theme.colors.greyD2} />
        </i>
        <p>2020-03-12 까지</p>
      </S.ContentItem>
      <S.ContentItem>
        <i>
          <IcoNotebook width={24} height={24} fill={theme.colors.greyD2} />
        </i>
        <p>Se quisermos transmitir uma ideia de contraste, usamos a conjunção coordenativa adversativa porém.   As conjunções coordenativas adversativas relacionam orações com a mesma função, mas transmitem uma ideia de contrário. Como exemplos de conjunções coordenativas adversativas temos: porém, mas, contudo, todavia, entretanto.</p>
      </S.ContentItem>
    </S.BucketListContentInfo>
  );
}

export default BucketListContentInfo;

const S :any = {
  BucketListContentInfo: styled.div`
    background-color: white;
`,
  ContentItem: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2rem;
    
    > p {
      margin-left: 2rem;
      font-size: 1.4rem;
      color: ${props => props.theme.colors.blackL1};
    }
  `
}
