import axios from 'axios'

// Action Types
const UPDATE_ORDER = 'UPDATE_ORDER'

// Initial State
const defaultOrder = {}

// Action Creators
const updateOrder = order => ({type: UPDATE_ORDER, order})



// Thunk Creators
export const updatingGrossTot = (orderId, subtotal) => async dispatch => {
  try {
    const {data} = await axios.put('/api/order/grossCost', {orderId, subtotal})
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const updatingShipping = (orderId, address, city, state, zipCode) => async dispatch => {
  try {
    const {data} = await axios.put('/api/order/shipping', {orderId, address, city, state, zipCode})
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const completingOrder = (orderId) => async dispatch => {
  try {
    const {data} = await axios.put('/api/order/complete', {orderId})
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.order
    default:
      return state
  }
}
