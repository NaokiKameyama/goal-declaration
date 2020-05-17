<template>
  <div>
    <h1>New TODO</h1>
    <div>
      <ul>
        <li><input v-model="name"></li>
        <li><button v-on:click="addTodo">Add</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore';

export default {
  name: 'todoAdd',
  data: function () {
    return {
      db: null,
      name: ''
    }
  },
  created: function() {
    this.db = firebase.firestore()
  },
  methods: {
    addTodo: function () {
      var _this = this

      // todos コレクションにドキュメントを追加
      this.db.collection('todos').add({
        name: _this.name
      })
      .then(function () {
        // 追加に成功したら、name を空にする
        _this.name = ''
      })
      .catch(function () {
        // エラー時の処理
      })
    }
  }
}
</script>