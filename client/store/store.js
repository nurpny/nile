import { createStore, combineReducers, applyMiddleware, compose }  from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import books from './books'
import genres from './genres'
import selectedBook from './singleBook'
import cart from './cart'
import order from './order'

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({user, books, selectedBook, cart, genres, order})
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store
