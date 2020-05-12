import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import {completingOrder} from '../../store/order'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#969A97',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '12px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#969A97',
      },
      '::placeholder': {
        color: '#969A97',
      },
    },
    invalid: {
      iconColor: '#F05D5E',
      color: '#F05D5E',
    },
  },
};

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      alert('[error]', error);
    } else {
      // complete order
      await props.onSubmitOrder(props.order.id);
      props.history.push('/ordercomplete');
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};


const mapStateToProps = (state) => ({
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitOrder: (orderId) => dispatch(completingOrder(orderId))

})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
