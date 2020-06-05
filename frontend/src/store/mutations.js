export default {
  todos(state, todos) {
    state.todos = todos
  },
  userId(state, userId) {
    console.log("mm: "+userId)
    state.userId = userId
  },
  todosFlag(state, todosFlag){
    state.todosFlag = todosFlag
  }
}