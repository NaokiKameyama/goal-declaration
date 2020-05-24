import firebase from "firebase";
import "firebase/firestore";
import moment from "moment"
import _ from 'lodash'
import { mapGetters } from "vuex";

export default {
  name: "todoAdd",
  data: function () {
    return {
      db: null,
      name: "",
      todos: [],
    };
  },
  computed: {
    count(){
      return this.$store.state.count;
      },
    todoget :function(){
      console.log('todoget ->' + this.$store.state.data)
      return this.$store.state.count;
    },
    // doublecount(){
    //   return this.$store.getters.doublecount;
    // }
    ...mapGetters(["doublecount"])
  },

  created: function () {
    this.db = firebase.firestore();
    var _this = this;
    this.db.collection("todos").onSnapshot(function (querySnapshot) {
      _this.todos = [];
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        _this.todos.push(data);
      });
      // リストをcoud firestoerのcreatedをkeyにして昇順にソート
      _this.todos = _.sortBy(_this.todos, 'created');
    });
  },
  methods: {
    addTodo: function () {
      var _this = this;
      if (!_this.name) {
        this.inputError();
        return;
      }
      this.inputSuccess();
      console.log(_this.name);
      // todos コレクションにドキュメントを追加
      this.db
        .collection("todos")
        .add({
          name: _this.name,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function () {
          // 追加に成功したら、name を空にする
          _this.name = "";
        })
        .catch(function () {
          // エラー時の処理
        });
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
      console.log(id)
      this.db.collection("todos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
  },
  filters:{
    unixTime2Date: function(date){
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
};