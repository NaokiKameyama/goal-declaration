
export default {
  data: function () {
    return {
      email: ''
    };
  },
  computed: {
  uid() {
    return this.$store.getters.getUid
  }
  },
  mounted() {
    this.email = localStorage.getItem('email')
  }
};