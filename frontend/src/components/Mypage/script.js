import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      displayName: ''
    }
  },
  created() {
    this.displayName = "aaa"
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}