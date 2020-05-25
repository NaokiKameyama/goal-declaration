import Vue from 'vue'
import VueRouter from "vue-router"
import GoalTweet from "@/components/GoalTweet/Index.vue"
import Top from "@/components/Top/Index.vue"
import Signup from "@/components/Signup/Index.vue"
import Signin from "@/components/Signin/Index.vue"
import Mypage from "@/components/Mypage/Index.vue"
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Top
  },
  {
    path: '/GoalTweet',
    component: GoalTweet
  },
  {
    path: '/Signup',
    component: Signup
  },
  {
    path: '/Signin',
    component: Signin
  },
  {
    path: '/Mypage',
    component: Mypage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})
export default router