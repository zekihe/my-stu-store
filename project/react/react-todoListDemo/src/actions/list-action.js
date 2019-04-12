export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DEL_TODO_LIST = 'DEL_TODO_LIST';

export function addTodoList(data) {
  return {
    type: ADD_TODO_LIST,
    data
  }
}

export function delTodoList(data) {
  return {
    type: DEL_TODO_LIST,
    data
  }
}