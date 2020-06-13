import firebase from 'firebase'

export default {
  computed: {
    uid() {
      return this.$store.getters.getUid
    },
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}