import axios from 'axios'

// Action Types
const GET_GENRES = 'GET_GENRES'

// Initial State
const defaultGenres = []

// Action Creators
const getGenres = genres => ({type: GET_GENRES, genres})


// Thunk Creators
export const gettingGenres = () => async dispatch => {
  try {
    const res = await axios.get('/api/genres')
    dispatch(getGenres(res.data))
  } catch (err) {
    console.error(err)
  }
}


// Reducer
export default function(state = defaultGenres, action) {
  switch (action.type) {
    case GET_GENRES:
      return action.genres
    default:
      return state
  }
}
