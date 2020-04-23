import axios from 'axios'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'


// Initial State
const defaultCart = {}

// Action Creators
const addToCart = cart => ({type: ADD_TO_CART, cart})



// Thunk Creators
export const addingToCart = (bookId, price) => async dispatch => {
  try {
    const res = await axios.post('/api/cart/', {bookId, price})
    dispatch(addToCart(res.data))
  } catch (err) {
    console.error(err)
  }
}


// Reducer
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
