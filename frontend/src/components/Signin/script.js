import firebase from 'firebase'

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          console.log(user)
          alert('Success!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}