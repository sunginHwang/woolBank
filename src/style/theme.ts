import { keyframes } from 'styled-components';
import palette from '@style/palette';

export default {
  colors: palette,
  zIndex: {
    navigationBar: 100,
    header: 100,
    phase: 300,
    floatButton: 400,
    layer: 450,
    modalDeem: 500,
    fullDeem: 510,
    notification: 600
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
