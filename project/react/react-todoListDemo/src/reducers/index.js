import { combineReducers } from 'redux';
import listReducers from './list-reducer.js';

const allReducers = {
  todoList: listReducers
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;