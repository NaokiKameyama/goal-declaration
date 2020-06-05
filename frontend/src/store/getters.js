export default {
	getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.uid)
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
  }
}