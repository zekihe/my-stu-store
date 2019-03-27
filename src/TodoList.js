import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [
        'learn react',
        'learn english'
      ],
      inputValue: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  render() {
    return (
      //jsx语法
      <Fragment>
        <div>
          <input value={this.state.inputValue } onChange={this.handleInputChange}/>
          <button className="red-btn" onClick={this.handleBtnClick}>add</button>
        </div>
        <ul>{this.getTodoItems()}</ul> 
      </Fragment>
    );
  }
  //列表拆分成函数获取
  getTodoItems(){
    return (
      this.state.list.map((item,idx) => {
        return (
            <TodoItem 
              delete={this.handleDelete }
              key={idx} 
              index={idx} 
              content={item}/>
        );
        // return <li key={idx} onClick={this.handleItemClick.bind(this,idx)}>{item}</li>
      })
    )
  }
  handleBtnClick(){
    if(!this.state.inputValue)return;
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  //父组件通过属性的形式给子组件传递参数
  //子组件通过props接受父组件传递过来的参数
  handleDelete(idx){
    const list = [...this.state.list];
    list.splice(idx,1); 
    this.setState({
      list
    })
  }

  handleItemClick(idx){
    const list = [...this.state.list];
    list.splice(idx,1); 
    this.setState({
      list
    })
  }
}

export default TodoList;
