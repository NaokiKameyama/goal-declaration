import Header from "@/components/Header/Index.vue";
import Footer from "@/components/Footer/Index.vue";
// import Index from "@/components/Todo/Index.vue";

export default {
  name: "app",
  created() {
    // ページアクセス時にFirebaseからデータを取得
    this.$store.dispatch('init');
  },
  components: {
    Header,
    Footer
  }
};