import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}