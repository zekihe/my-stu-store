import React,{ Component ,Fragment } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  //子组件要向父组件通信，子组件要调用父组件传递过来的方法 
  render() {
    //ES6解构赋值
    const { content } = this.props;
    return (
      <Fragment>
        <li onClick={this.handleDelete}>{this.props.content}</li>
      </Fragment>
        
    )
  }
  handleDelete(){
    this.props.delete(this.props.index)
  }
}

export default TodoItem;