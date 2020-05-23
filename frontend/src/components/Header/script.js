
export default {
  data: function () {
    return {
      email: ''
    };
  },
  mounted() {
    this.email = localStorage.getItem('email')
  }
};