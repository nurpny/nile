import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  html {
    font: 400 16px Roboto, sans-serif;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font: 500 0.8rem Roboto, sans-serif;
    background-color: ${props => props.theme.colors.bg}
  }
`;

