import { createStore, combineReducers, applyMiddleware, compose }  from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({user})
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store
