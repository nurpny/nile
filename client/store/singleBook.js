import axios from 'axios'

// Action Types
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'


// Initial State
const defaultBook = {}

// Action Creators
const getSingleBook = selectedBook => ({type: GET_SINGLE_BOOK, selectedBook})



// Thunk Creators
export const gettingSingleBook = (id) => async dispatch => {
  try {
    const res = await axios.get('/api/book/'+id)
    dispatch(getSingleBook(res.data))
  } catch (err) {
    console.error(err)
  }
}




// Reducer
export default function(state = defaultBook, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.selectedBook
    default:
      return state
  }
}
