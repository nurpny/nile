import axios from 'axios'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// Initial State
const defaultCart = []

// Action Creators
const addToCart = cartItem => ({type: ADD_TO_CART, cartItem: cartItem})
const updateCart = cartItem => ({type: UPDATE_CART, cartItem: cartItem})
const getCart = cart => ({type: GET_CART, cart})
const deleteFromCart = bookId => ({type: DELETE_FROM_CART, bookId: bookId})

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

export const updatingCart = (orderId, bookId, currQuant, direction, imageUrl, title) => async dispatch => {
  try {
    if (currQuant === 1 && direction === "minus") {
      const {data} = await axios.delete('/api/cart/', { params: {bookId: bookId, orderId: orderId} })
      dispatch(deleteFromCart(bookId));
    } else {
      const {data} = await axios.put('/api/cart/', {bookId, orderId, direction});
      data.book = {imageUrl, title}
      dispatch(updateCart(data))
    }
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
    case UPDATE_CART:
      return [...state.filter(cartItem => cartItem.bookId !== action.cartItem.bookId), action.cartItem]
    case DELETE_FROM_CART:
      return [...state.filter(cartItem => cartItem.bookId !== action.bookId)]
    default:
      return state
  }
}
