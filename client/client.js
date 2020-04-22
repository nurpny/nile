import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import App from './app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './themes/globalStyles'
import {theme} from './themes/theme'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
