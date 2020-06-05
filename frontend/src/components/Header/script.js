export default {
  data: function () {
    return {
    };
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