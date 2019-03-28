import React from 'react';
import ReactDOM from 'react-dom';

//App组件，大写字母开头 
import App from './containers/app.js';
// import TodoList from './components/todolist/todoList.js';

import './style.css';

ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 