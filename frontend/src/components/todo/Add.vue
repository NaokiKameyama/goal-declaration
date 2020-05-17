<template>
  <div>
    <div class="center-title">
      目標をつぶやこう
      <i class="el-icon-edit"></i>
    </div>
    <div class="input-container">
      <ul>
        <el-input placeholder="Please input" v-model="name"></el-input>
        <el-button type="primary" v-on:click="addTodo">つぶやく</el-button>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "todoAdd",
  data: function() {
    return {
      db: null,
      name: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
  },
  methods: {
    addTodo: function() {
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
          name: _this.name
        })
        .then(function() {
          // 追加に成功したら、name を空にする
          _this.name = "";
        })
        .catch(function() {
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
    }
  }
};
</script>

<style>
.center-title {
  margin: 50px auto 50px auto;
  font-size: 50px;
  text-align: center;
  color: #606266;
  font-weight: bold;
}

.input-container {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>