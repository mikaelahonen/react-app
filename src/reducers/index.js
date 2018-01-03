import { combineReducers } from 'redux';
import books from './bookReducers'
import calc from './calcReducers'

export default combineReducers({
  books: books,
  calc: calc,
  // More reducers if there are
  // can go here
});
