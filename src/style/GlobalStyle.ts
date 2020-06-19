import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import colors from './colors';
const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  
  html,
  body {
    height: 100%;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    background-color: ${colors.colors.whiteL1};
  }
  
  ol, ul, li {
    list-style: none;
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }

`;

export default GlobalStyle