import "firebase/firestore";
import moment from "moment"
import VueCountdown from '@chenfengyuan/vue-countdown';
import draggable from 'vuedraggable'

export default {
  name: "todoAdd",
  data: function() {
    return {
      options: {
        animation: 300
      },
      name: "",
      deadline: ''
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  mounted() {
    var now = new Date();
    console.log(now)
  },
  methods: {
    addTodo() {
      console.log(this.deadline)
      if (!this.name) {
        this.inputError();
        return;
      }
      this.inputSuccess();
      console.log(this.$store.state.userInfo)
      this.$store.dispatch('addTodo', {
        name: this.name,
        userInfo: this.$store.state.userInfo,
        deadline: this.deadline
      });
      this.name = ""
      this.deadline = ""
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
        message: "目標を入力されていません。",
        duration: 2000
      });
    },
    remove(id) {
      this.$store.dispatch('remove', id);
    },
    diffTimeDeadlineToNow(date) {
      console.log(date)
      return date - new Date();
    }
  },
  filters: {
    unixTime2Date: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  components: {
    countdown: VueCountdown,
    draggable
  }
};