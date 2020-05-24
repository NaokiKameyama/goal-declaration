import "firebase/firestore";
import moment from "moment"

export default {
  name: "todoAdd",
  data: function () {
    return {
      name: ""
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    addTodo: function () {
      // var _this = this;
      if (!this.name) {
        this.inputError();
        return;
      }
      this.inputSuccess();
      this.$store.dispatch('addTodo', this.name);
    },
    inputSuccess() {
      this.$notify({
        title: "Success",
        message: "つぶやきに成功しました。",
        type: "success",
        duration: 1000
      });
    },
    inputError() {
      this.$notify.error({
        title: "Error",
        message: "何も入力されていません。",
        duration: 2000
      });
    },
    remove(id) {
    this.$store.dispatch('remove', id);
    }
  },
  filters:{
    unixTime2Date: function(date){
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
};