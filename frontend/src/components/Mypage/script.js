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
      this.$store.dispatch('signOut');
      this.$router.push('/')
    }
  }
}