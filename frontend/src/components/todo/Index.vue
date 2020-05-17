<template>
  <div>
    <h1 class="goal-list-title">- みんなの目標一覧 -</h1>
    <table class="goal-list-table">
      <tr v-for="todo in this.todos" :key="todo.id" class="goal-list">
        <td>
          <li>{{ todo.name }}</li>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "todoIndex",
  data: function() {
    return {
      db: null,
      todos: []
    };
  },
  created: function() {
    this.db = firebase.firestore();

    var _this = this;
    this.db.collection("todos").onSnapshot(function(querySnapshot) {
      _this.todos = [];
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        data.id = doc.id;
        _this.todos.push(data);
      });
    });
  }
};
</script>

<style>
.goal-list-title {
  margin: 50px auto 50px auto;
  font-size: 30px;
  color: #606266;
  text-align: center;
}

.goal-list-table {
  margin: 50px auto 50px auto;
}

.goal-list {
  text-align: left;
  font-size: 20px;
}
</style>