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
      deadline: '',
      color: '',
      my: false,
      myTodoFlag: false,
      sortDeadlineFlag: false
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
      if(this.myTodoFlag){
        console.log(this.myTodoFlag)
        this.myTodos = _.sortBy(this.myTodos, 'deadline');
      }else{
        this.$store.dispatch('init', 'deadline');
      }
    },
    sortCreated(){
      this.sortDeadlineFlag = false
      if(this.myTodoFlag){
        console.log(this.myTodoFlag)
        this.myTodos = _.sortBy(this.myTodos, 'created');
      }else{
        this.$store.dispatch('init', 'created');
      }
    },
    showMyTodos(){
      this.$store.dispatch('switchTodos', false);
    },
    showTodos(){
      this.$store.dispatch('switchTodos', true)
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