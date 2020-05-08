import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import App from './app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './themes/globalStyles'
import {theme} from './themes/theme'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    {/* <Elements stripe={stripePromise}> */}
      <GlobalStyle/>
      <App />
    {/* </Elements> */}
    </ThemeProvider>

    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
