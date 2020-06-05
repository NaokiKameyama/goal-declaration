export default {
	getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.userId)
  }
}