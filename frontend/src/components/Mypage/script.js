import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}