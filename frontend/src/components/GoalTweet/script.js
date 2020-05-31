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
      if (!this.name && !this.deadline) {
        this.inputError("目標と期日");
        return;
      }
      if (!this.name) {
        this.inputError("目標");
        return;
      }
      if (!this.deadline) {
        this.inputError("期日");
        return;
      }
      this.inputSuccess();
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
    inputError(text) {
      this.$notify.error({
        title: "Error",
        message: text+"が入力されていません。",
        duration: 2000
      });
    },
    remove(id) {
      this.$store.dispatch('remove', id);
    },
    diffTimeDeadlineToNow(date) {
      console.log(date)
      return date - new Date();
    },
    sort(){
      // todos = _.sortBy(todos, 'created');
      this.$store.dispatch('init', 'deadline');
      // this.$store.state.todos.forEach( function(todo){
      //   if(!todo.deadline){
      //     console.log(todo.deadline)
      //     todo.deadline = new Date(2017,9);
      //   }
      // })
      // console.log(this.todos)
      // this.$store.state.todos = _.sortBy(this.$store.state.todos, 'deadline');
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