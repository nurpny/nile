import React, { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutForm'
import ShippingForm from './ShippingForm'
import CheckoutSubTotals from './CheckoutSubTotals'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { StyledFlexContainer, StyledContainer } from '../themes/StyledContainer'



const StyledLeftContainer = styled.section`
min-width: 60%;
max-width: 100%;
margin: 10px 25px 10px 20px;
`

const stripePromise = loadStripe('pk_test_L3Vq2Zgcq1RdL3ss2kPjQfwv000PVzD9jp');


const Checkout = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [showStripe, setShowStripe] = useState(false);

  return (
    <StyledFlexContainer>
      <StyledLeftContainer>
        <StyledContainer>
          <ShippingForm showStripe={() => setShowStripe(true)} history={props.history} />
        </StyledContainer>
        <StyledContainer>
          {showStripe &&
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        </StyledContainer>
      </StyledLeftContainer>
      <CheckoutSubTotals />
    </StyledFlexContainer>

  )
}

export default Checkout


