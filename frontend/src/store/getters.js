export default {
  getMyTodos: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag)
  },
  getMyTodos_with_achive: state => {
    return state.todos.filter(x => x.uid === state.uid)
  },
  getTodos: state => {
    return state.todos.filter(x => !x.achiveFlag)
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
  getTodosBySearch: () => ({
    word,
    todos
  }) => {
    return todos.filter(todos => todos.name.includes(word))
  },
  getTodos_p1_u1: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag && x.priority === "1" && x.urgent === "1")
  },
  getTodos_p1_u2: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag && x.priority === "1" && x.urgent >= "2")
  },
  getTodos_p2_u1: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag && x.priority >= "2" && x.urgent === "1")
  },
  getTodos_p2_u2: state => {
    return state.todos.filter(x => x.uid === state.uid && !x.achiveFlag && x.priority >= "2" && x.urgent >= "2")
  }

}