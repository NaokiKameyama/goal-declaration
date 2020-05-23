import Vue from 'vue'
import Router from 'vue-router'
// import App from './components/App/Index.vue'
import Login from './components/Login/Index.vue'
import Login2 from './components/Login2/Index.vue'
import GoalTweet from './components/GoalTweet/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/GoalTweet',
    name: 'GoalTweet',
    componet: GoalTweet
  },
  {
    path: '/Login2',
    name: 'Login2',
    componet: Login2
  }]
})