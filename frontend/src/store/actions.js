import "firebase/firestore"
import _ from 'lodash'
import firebase from "firebase";

export default {
  // firestoreの初期化
  init(context, sortKey) {
    this.db = firebase.firestore();
    // DBに接続 (コネクションは張りっぱなし？)
    this.db.collection("todos").onSnapshot(function (querySnapshot) {
      var todos = [];
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        // firestoreの内のデータをtodosに格納
        todos.push(data);
      });
      // リストをcoud firestoerのcreatedをkeyにして昇順にソート
      console.log(sortKey)
      todos = _.sortBy(todos, sortKey);
      context.commit('todos', todos)
    });
  },
  // firestoreにデータを追加
  addTodo(context, { name, userInfo, deadline, color}) {
    this.db
      .collection("todos")
      .add({
        name: name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: userInfo,
        deadline: deadline,
        color: color
      })
      .then(function () {
        // 追加に成功したら、name を空にする
        name = "";
      })
      .catch(function () {
        // エラー時の処理
      });
  },
  //firestoreからデータを削除
  remove(context, id) {
    console.log(id)
    this.db.collection("todos").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
}