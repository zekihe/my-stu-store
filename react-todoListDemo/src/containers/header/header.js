import React, { Component } from 'react';
import AddTodo from '../../components/addTodo/addTodo.js'
import './header.css';

class Header extends Component {
  render (){
    return (
        <header>
          <section>
            <label>TodoList</label>
            <AddTodo/>
          </section>
        </header>
    )
  }
}

export default Header;