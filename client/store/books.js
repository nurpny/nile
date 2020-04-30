import axios from 'axios'

// Action Types
const GET_BOOKS = 'GET_BOOKS'

// Initial State
const defaultBooks = []

// Action Creators
const getBooks = books => ({type: GET_BOOKS, books})


// Thunk Creators
export const gettingBooks = (genreId) => async dispatch => {
  try {
    let res;
    if (!genreId) {
      res = await axios.get('/api/books')
    } else {
      res = await axios.get('/api/books/' + genreId)
    }
    dispatch(getBooks(res.data))
  } catch (err) {
    console.error(err)
  }
}


// Reducer
export default function(state = defaultBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
