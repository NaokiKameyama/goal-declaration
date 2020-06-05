export default {
  todos(state, todos) {
    state.todos = todos
  },
  signInUp(state, {uid, email}) {
    console.log("mm: "+ uid)
    state.uid = uid
    state.email = email
    // context.commit('signInUp',{uid: user.uid, email: user.email})
  },
  todosFlag(state, todosFlag){
    state.todosFlag = todosFlag
  },
  signOut(state){
    state.uid = ""
    state.email = ""
  }
}