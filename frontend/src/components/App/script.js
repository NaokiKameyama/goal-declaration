import Top from "@/components/Top/Index.vue";
import Header from "@/components/Header/Index.vue";
import Footer from "@/components/Footer/Index.vue";
// import Index from "@/components/Todo/Index.vue";

export default {
  name: "app",
  created() {
    this.$store.dispatch('init');
  },
  components: {
    Top,
    Header,
    Footer
  }
};