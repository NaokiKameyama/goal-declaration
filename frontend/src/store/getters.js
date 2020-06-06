export default {
	getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.uid)
  },
  getTodos: state => {
    return state.todos
  },
  getTodosFlag: state => {
    return state.todosFlag
  },
  getUid: state => {
    return state.uid
  },
  getEmailHead: state => {
    const emailHead = state.email.split("@")[0];
    return emailHead
  },
  getTodosBySearch: (state) => ({word}) => {
    return state.todos.filter(todo => todo.name.includes(word))
  },
  getMyTodosBySearch: () => ({word, myTodos}) => {
    return myTodos.filter(myTodos => myTodos.name.includes(word))
  }
}