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
      deadline: '',
      color: '',
      my: false,
      todoList: []
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    myTodos () {
      return this.$store.getters.getMyTodos
    }
  },
  mounted() {
    console.log(this.todos)
    this.todoList = this.todos
  },
  watch: {
    todos: function (val) {
      this.todoList = val
    }
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
        userId: this.$store.state.userId,
        deadline: this.deadline,
        color: this.color
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
      if (Number(date - new Date()) < 0) return 0
      return Number(date - new Date())
    },
    sort(){
      this.$store.dispatch('init', 'deadline');
    },
    showMyTodos(){
      console.log(this.myTodos)
      console.log(this.todos)
      this.todoList = this.myTodos
    },
    showTodos(){
      this.todoList = this.todos
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