import React,{ Component ,Fragment } from 'react';
import store from '../../store.js';
import { connect } from 'react-redux';
import { delTodoList }  from '../../actions/list-action.js';

import './todoItem.css'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.list = this.props.data.list;
    store.subscribe(() => {
      const state = store.getState();
      this.list = state.todoList.list;
      console.log(state);
    })
  }
  //子组件要向父组件通信，子组件要调用父组件传递过来的方法 
  render() {
    //ES6解构赋值
    const { content } = this.props;
    const { list } = this.props.data;
    return (
      <Fragment>
        <ul id='todolist'>
          {
            list.map((item,idx) => {
              return (
                <li key={idx} onClick={this.handleDelete.bind(this,idx)}>{item}</li>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }
  handleDelete(idx){
    console.log(this.list)
    this.props.delTodo(this.list[idx]);
  }
}
const mapStateToProps=(state)=>{
	return{
		data:state.todoList
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		delTodo:(data)=>{
			dispatch(delTodoList(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoItem);