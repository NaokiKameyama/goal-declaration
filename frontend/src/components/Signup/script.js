import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then( () => {
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              console.log(displayName)
              console.log(email)
              console.log(emailVerified)
              console.log(photoURL)
              console.log(isAnonymous)
              console.log(uid)
              console.log(providerData)
              localStorage.setItem('email', email)
              localStorage.setItem('uid', uid)
              // ...
            } else {
              // User is signed out.
              // ...
            }
          });
          // alert('Create account: ', user.email)
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
          alert("すでに登録されているメールアドレスです。")
        })
    }
  }
}