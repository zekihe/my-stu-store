import React , { Component,Fragment } from 'react';
import TodoItem from '../../components/todoItem/todoItem.js';


class Index extends Component {
  render (){
    return (
      <Fragment>
        <section>
          <ul>
            <TodoItem />
          </ul>
        </section>
      </Fragment>
    )
  }
}

export default Index;