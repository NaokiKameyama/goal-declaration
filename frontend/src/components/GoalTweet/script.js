import "firebase/firestore";
import _ from 'lodash'
import Header from "@/components/Header/Index.vue";
import TodoCards from "@/components/TodoCards/Index.vue";

export default {
  name: "todoAdd",
  data: function () {
    return {
      name: "",
      word: "",
      deadline: '',
      priority: '1',
      urgent: '1',
      deleteFlag: false,
      achiveFlag: false,
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
    myTodos() {
      return this.$store.getters.getMyTodos
    },
    myTodos_with_achive() {
      return this.$store.getters.getMyTodos_with_achive
    },
    allTodos() {
      return {
        myTodos: this.$store.getters.getMyTodos
      }
    },
    todosFlag() {
      return this.$store.getters.getTodosFlag
    },
    uid() {
      return this.$store.getters.getUid
    }
  },
  mounted() {
    this.todoList = this.myTodos
  },
  watch: {
    allTodos: function (val) {
      this.todoList = val.myTodos
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
        message: text + "が入力されていません。",
        duration: 2000
      });
    },
    upDate() {
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
      this.$store.dispatch('upDate', {
          id: this.id,
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
        message: text + "が入力されていません。",
        duration: 2000
      });
    },
    // TODO: inputDataメソッドはモーダルコンポーネント側で実装する
    inputData(todo) {
      this.id = todo.id
      this.name = todo.name,
        // this.deadline = moment(todo.deadline.toDate()).format('YYYY/MM/DD HH:mm:ss'),
        this.deadline = todo.deadline.toDate(),
        this.priority = todo.priority,
        this.addTodoFlag = false
    },
    sortDeadline() {
      this.sortDeadlineFlag = true
      if (!this.todosFlag) {
        this.todoList = _.sortBy(this.myTodos, 'deadline');
      } else {
        this.$store.dispatch('init', 'deadline');
        this.todoList = this.todos
      }
    },
    sortCreated() {
      this.sortDeadlineFlag = false
      if (!this.todosFlag) {
        this.todoList = _.sortBy(this.myTodos, 'created');
      } else {
        this.$store.dispatch('init', 'created');
        this.todoList = this.todos
      }
    },
    // showMyTodos(){
    //   if(!this.uid){
    //     this.$router.push('Signup')
    //     return
    //   }
    //   this.$store.dispatch('switchTodos', false);
    //   this.todoList = this.myTodos
    // },
    // showTodos(){
    //   this.$store.dispatch('switchTodos', true)
    //   this.todoList = this.todos
    // },
    getTodosBySearch(word) {
      this.todoList = this.$store.getters.getTodosBySearch({
        word: word,
        todos: (!this.todosFlag) ? this.myTodos : this.todos
      })
    }
  },
  components: {
    Header,
    TodoCards
  }
};