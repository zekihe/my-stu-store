import React from 'react';
import ReactDOM from 'react-dom';

import store from './store.js';
import { addTodoList, delTodoList }  from './actions/list-action';
import { Provider } from 'react-redux';

//App组件，大写字母开头 
import App from './containers/app.js';
// import TodoList from './components/todolist/todoList.js';


import './style.css';

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
// Add from List
store.dispatch(addTodoList('Learn VUE'));
store.dispatch(addTodoList('Learn French'));
store.dispatch(addTodoList('Learn Russian'));

// Delete from List
// store.dispatch(delTodoList('Coffee 500gm'));

unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 