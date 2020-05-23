import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "todoAdd",
  data: function () {
    return {
      db: null,
      name: "",
      todos: []
    };
  },
  created: function () {
    this.db = firebase.firestore();
    var _this = this;
    this.db.collection("todos").onSnapshot(function (querySnapshot) {
      _this.todos = [];
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        console.log(data)
        _this.todos.push(data);
      });
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
    unixTime2Date(seconds) {
      return new Date(seconds * 1000).toLocaleDateString()
    }
  }
};