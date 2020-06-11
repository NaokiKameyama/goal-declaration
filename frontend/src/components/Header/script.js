export default {
  data: function () {
    return {};
  },
  methods: {
    signOut: function () {
      this.$store.dispatch('signOut');
      this.$router.push('/Signin');
      console.log("toridayo")
    }
  },
  computed: {
    uid() {
      return this.$store.getters.getUid
    },
    emailHead() {
      return this.$store.getters.getEmailHead
    }
  }
};