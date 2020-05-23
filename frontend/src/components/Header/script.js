import firebase from 'firebase'

export default {
  data: function () {
    return {
      email: ''
    };
  },
  created: function () {
    this.email = localStorage.getItem('email')
  },
  methods: {
    goBack() {
      console.log('go back');
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
};