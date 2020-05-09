import axios from 'axios'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'

// Initial State
const defaultCart = []

// Action Creators
const addToCart = cartItem => ({type: ADD_TO_CART, cartItem: cartItem})
const getCart = cart => ({type: GET_CART, cart})



// Thunk Creators
export const addingToCart = (bookId, price, imageUrl, title, orderId) => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart/', {bookId, price, orderId})
    data.book = {imageUrl, title};
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const gettingCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}


// Reducer
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state.filter(cartItem => cartItem.bookId !== action.cartItem.bookId), action.cartItem]
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
