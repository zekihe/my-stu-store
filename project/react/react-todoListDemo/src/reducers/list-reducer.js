import { combineReducers } from 'redux';
import { ADD_TODO_LIST , DEL_TODO_LIST } from '../actions/list-action.js'

const initialState = {
  list: [  
    'learn react',
    'learn english'
  ]
}

export default function(state=initialState, action) {
  switch(action.type){
    case ADD_TODO_LIST: {
      return {
        ...state,
        list: [...state.list, action.data]
      }
    }
    case DEL_TODO_LIST: {
      return {
        ...state,
        list: state.list.filter(item => item !== action.data)
      }
    }
    default: 
      return state;
  }
  return state;
}




// export default function(state = 0, action){
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }