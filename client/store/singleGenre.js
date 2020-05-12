import axios from 'axios'

// Action Types
const GET_SINGLE_GENRE = 'GET_SINGLE_GENRE'


// Initial State
const defaultGenre = {}

// Action Creators
export const getSingleGenre = (id, name)=> ({type: GET_SINGLE_GENRE, selectedGenre:{id, name}})


// Thunk Creators




// Reducer
export default function(state = defaultGenre, action) {
  switch (action.type) {
    case GET_SINGLE_GENRE:
      return action.selectedGenre
    default:
      return state
  }
}
