import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import IcoDownCircle from '../icon/IcoDownCircle';
import colors from '../../style/colors';
import IcoUpCircle from '../icon/IcoUpCircle';

type DownSlideProps = {
  children: ReactNode;
}

function DownSlide({ children }: DownSlideProps) {
  const [isShow, setIsShow] = useState(false);
  const onSliderClick = () => {
    setIsShow(!isShow);
  };

  return (
    <S.DownSlide>
      <S.Slider onClick={onSliderClick}>
        <hr/>
        {
          isShow
            ? <IcoUpCircle fill={colors.colors.white}/>
            : <IcoDownCircle fill={colors.colors.white}/>
        }
      </S.Slider>
      <S.Content isShow={isShow}>
        {children}
      </S.Content>
    </S.DownSlide>
  );
}


const S: {
  DownSlide: any;
  Slider: any;
  Content: any;
} = {
  DownSlide: styled.div`
    
    color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    border-radius: 1.2rem;
    color: ${props => props.theme.colors.blackL1};
  `,
  Slider: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    >hr {
      flex: 1;
      width: calc(100% - 3.4rem);
      opacity: .5;
      border: .1rem dashed ${props => props.theme.colors.white};
    }
  `,
  Content: styled.div`
    margin:2rem 0;
    color: ${props => props.theme.colors.white};
    border-bottom: .1rem dashed ${props => props.theme.colors.white};
    display: ${(props: any) => props.isShow ? 'block' : 'none'};
  `
};

export default DownSlide;
