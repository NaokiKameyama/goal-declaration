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
      priority: '',
      urgent: '',
      deleteFlag: false,
      achiveFlag: false,
      myTodoFlag: false,
      sortDeadlineFlag: false,
      searchTodos: [],
      searchMyTodos: [],
      todoList: null,
      addTodoFlag: true
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
    this.todoList = this.todos
  },
  watch: {
    todos: function (val) {
      this.todoList = val
    }
  },
  methods: {
    addTodo() {
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
        uid: this.uid,
        deadline: this.deadline,
        priority: this.priority,
        urgent: this.urgent,
        deleteFlag: this.deleteFlag,
        achiveFlag: this.achiveFlag
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
    upDate(){
      if (!this.name && !this.deadline) {
        this.updateError("目標と期日");
        return;
      }
      if (!this.name) {
        this.updateError("目標");
        return;
      }
      if (!this.deadline) {
        this.updateError("期日");
        return;
      }
      this.updateSuccess();
      this.addTodoFlag = true;
      this.$store.dispatch('upDate',{
        id : this.id,
        name: this.name,
        uid: this.uid,
        deadline: this.deadline,
        priority: this.priority,
        urgent: this.urgent,
        deleteFlag: this.deleteFlag,
        achiveFlag: this.achiveFlag,
      }),
      this.name = ""
      this.deadline = ""
    },
    updateSuccess() {
      this.$notify({
        title: "Success",
        message: "更新に成功しました。",
        type: "success",
        duration: 1000
      });
    },
    updateError(text) {
      this.$notify.error({
        title: "Error",
        message: text+"が入力されていません。",
        duration: 2000
      });
    },
    remove(id) {
      this.$store.dispatch('remove', id);
    },
    achive(id) {
      this.$store.dispatch('achive', id)
    },
    inputData(todo) {
      this.id = todo.id
      this.name = todo.name,
      // this.deadline = moment(todo.deadline.toDate()).format('YYYY/MM/DD HH:mm:ss'),
      this.deadline = todo.deadline.toDate(),
      this.priority = todo.priority,
      this.addTodoFlag = false
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
      if(!this.todosFlag){
        this.todoList = _.sortBy(this.myTodos, 'deadline');
      }else{
        this.$store.dispatch('init', 'deadline');
        this.todoList = this.todos
      }
    },
    sortCreated(){
      this.sortDeadlineFlag = false
      if(!this.todosFlag){
        this.todoList = _.sortBy(this.myTodos, 'created');
      }else{
        this.$store.dispatch('init', 'created');
        this.todoList = this.todos
      }
    },
    showMyTodos(){
      this.$store.dispatch('switchTodos', false);
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
    },
    console(todo) { 
      console.log(todo.id)
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
    },
    priority2Color: function(priority) {
      if(priority == "1") return ""
      if(priority == "2") return "#B2EBF2"
      if(priority == "3") return "#B3E5FC"
    }
  },
  components: {
    countdown: VueCountdown,
    draggable
  }
};