import "firebase/firestore";
import moment from "moment"
import VueCountdown from '@chenfengyuan/vue-countdown';
import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
  name: "todoAdd",
  data: function() {
    return {
      options: {
        animation: 300
      },
      name: "",
      word: "",
      deadline: '',
      color: '',
      my: false,
      myTodoFlag: false,
      sortDeadlineFlag: false,
      searchTodos: [],
      searchMyTodos: [],
      todoList: null
    }
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos
    },
    myTodos () {
      return this.$store.getters.getMyTodos
    },
    todosFlag(){
      return this.$store.getters.getTodosFlag
    },
    uid() {
      return this.$store.getters.getUid
    }
  },
  mounted(){
    console.log("Gola-uid ->" + this.uid)
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
      console.log("uid -> " + this.uid)
      this.$store.dispatch('addTodo', {
        name: this.name,
        uid: this.uid,
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
    inputData(todo) {
      console.log("method/inputData -> " + todo)
      console.log(todo)
      this.name = todo.name
      this.deadline = todo.deadline
      this.color = todo.color
    },
    diffTimeDeadlineToNow(date) {
      try {
        var convertDate = date.toDate()
        if (Number(convertDate - new Date()) < 0) return 0
        return Number(convertDate - new Date())
      } catch( e ) {
        return 0
      }
    },
    sortDeadline(){
      this.sortDeadlineFlag = true
      console.log(this.todosFlag)
      if(!this.todosFlag){
        console.log(this.myTodoFlag)
        this.todoList = _.sortBy(this.myTodos, 'deadline');
      }else{
        this.$store.dispatch('init', 'deadline');
        this.todoList = this.todos
      }
    },
    sortCreated(){
      console.log(this.todosFlag)
      this.sortDeadlineFlag = false
      if(!this.todosFlag){
        console.log(this.myTodoFlag)
        this.todoList = _.sortBy(this.myTodos, 'created');
      }else{
        this.$store.dispatch('init', 'created');
        this.todoList = this.todos
      }
    },
    showMyTodos(){
      this.$store.dispatch('switchTodos', false);
      console.log(this.myTodos)
      this.todoList = this.myTodos
    },
    showTodos(){
      this.$store.dispatch('switchTodos', true)
      this.todoList = this.todos
    },
    getTodosBySearch(word){
      if(!this.todosFlag){
        this.todoList = this.$store.getters.getMyTodosBySearch({word:word, myTodos: this.myTodos})
      }else{
        this.todoList = this.searchTodos = this.$store.getters.getTodosBySearch({word:word, todo: this.todos})
      }
    }
  },
  filters: {
    unixTime2Date: function(date) {
      try {
        var convertDate  = date.toDate()
        return moment(convertDate).format('YYYY/MM/DD HH:mm:ss')
      } catch( e ) {
        return 0
      }
    }
  },
  components: {
    countdown: VueCountdown,
    draggable
  }
};