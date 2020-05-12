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

  form {
    width: 100%;
  }
  a:link {
    color: ${props => props.theme.colors.grey};
  }

  a:visited {
    color: ${props => props.theme.colors.grey};
  }

  a:hover {
    color: ${props => props.theme.colors.grey};
  }

  a:active {
    color: ${props => props.theme.colors.grey};
  }

`;

