export default {
  name: 'Signin',
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
      this.$router.push('/')
    }
  }
}