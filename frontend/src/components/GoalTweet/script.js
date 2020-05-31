import "firebase/firestore";
import moment from "moment"
import Countdown from 'vuejs-countdown'

var today = new Date();
var day7 = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

export default {
  name: "todoAdd",
  data: function() {
    return {
      name: "",
     deadline: '',
     today: today,
     day7: day7
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
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
      } );
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
    deadlineCalc (date) {
      return date.toGMTString();
    }
  },
  filters:{
    unixTime2Date: function(date){
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  components: {
    'countdown' : Countdown
  }
};