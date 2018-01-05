import { combineReducers } from 'redux';
import books from './bookReducers'
import calc from './calcReducers'
import workout from './workoutReducers'

export default combineReducers({
  books: books,
  calc: calc,
  workout: workout,
  // More reducers if there are
  // can go here
});
