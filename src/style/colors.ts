import { keyframes } from 'styled-components';

export default {
  colors: {
    mainThemeColor: '#6e827f',
    white: '#fff',
    customGrayColor: 'rgba(23, 42, 58, .1)',
    sideFontGrayColor: '#c2cab9',
    titleFontColor: '#6e827f',
    customBlackColor: '#585858',
    bottomLineColor: '#f2f5ee',
    SideBarSpaceColor: 'rgba(0,0,0,.3)',
    blackL1: '#4E4E4E',
    greyL1: '#958d9e',
    greyL2: '#eee',
    greyL3: '#ebebeb',
    greyL4: '#e8e8e8',
    greyL5: '#666',
    greyL6: '#DCDCE9',
    greyD1: '#383838',
    greyD2: '#868e96',
    cyanL1: '#56b6c2',
    whiteL1: '#F0F3F7',
    whiteL2: '#dfe2e5',
    whiteL3: '#f6f8fa',
    navyD1: '#515EC0',
    textColor: '#6e827f',
    markdownCodeColor: '#6e827f',
    imgOpacity: '1',
    headerColor: '#fff',
    contentColor: '#6e827f',
    deem: 'rgba(0,0,0,.75)',
    redL1: '#ed234b',
    loadingAnimationColor1: 'hsl(0,0%,89%)',
    loadingAnimationColor2: 'hsl(0,0%,85%)',
    loadingAnimationColor3: 'hsl(0,0%,89%)'
  },
  zIndex: {
    navigationBar: 100,
    header: 100,
    modalDeem: 500,
    phase: 300
  },
  animations: {
    loading: keyframes`
      0% {
        background-color: hsl(0,0%,89%);
      }
      50% {
        background-color: hsl(0,0%,85%);
      }
      100% {
        background-color: hsl(0,0%,89%);
      }
`
  }
};
