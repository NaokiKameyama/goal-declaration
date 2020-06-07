export default {
	getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag )
  },
  getMyTodos_with_achive: state => {
    return state.todos.filter(x => x.uid === state.uid )
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
  getTodosBySearch: () => ({word, todos}) => {
    return todos.filter(todos => todos.name.includes(word))
  }
}