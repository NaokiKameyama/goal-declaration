import Vue from 'vue'
import VueRouter from "vue-router"
import GoalTweet from "@/components/GoalTweet/Index.vue"
import Top from "@/components/Top/Index.vue"

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Top },
    { path: '/GoalTweet', component: GoalTweet }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router