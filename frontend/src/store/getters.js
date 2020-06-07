export default {
	getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag )
  },
  getTodos: state => {
    return state.todos.filter(x => !x.achiveFlag )
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