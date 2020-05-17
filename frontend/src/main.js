import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCwxehxtUMXq-QYbIwiAH4WPcyIDl1m3GE",
  authDomain: "goal-declaration.firebaseapp.com",
  databaseURL: "https://goal-declaration.firebaseio.com",
  projectId: "goal-declaration",
  storageBucket: "goal-declaration.appspot.com",
  messagingSenderId: "767489090630",
  appId: "1:767489090630:web:06c80c23b3fc1cf3a6d647",
  measurementId: "G-0RLMGQKS8K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App),
}).$mount('#app')
