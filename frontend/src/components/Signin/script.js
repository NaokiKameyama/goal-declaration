export default {
  name: 'signIn',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async signIn() {
      this.$store.dispatch('signIn', {
        username: this.username,
        password: this.password
      });
      this.$router.push('/GoalTweet')
    },
    async signIn_a() {
      this.$store.dispatch('signIn', {
        username: "a@a.com",
        password: "123456"
      });
      this.$router.push('/GoalTweet')
    },
    async signIn_b() {
      this.$store.dispatch('signIn', {
        username: "b@b.com",
        password: "123456"
      });
      this.$router.push('/GoalTweet')
    }
  },


}