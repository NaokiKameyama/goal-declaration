export default {
  name: 'Signup',
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async signUp() {
      this.$store.dispatch('signUp', {
        username: this.username,
        password: this.password
      });
      this.$router.push('/GoalTweet')
    }
  }
}