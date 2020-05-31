import GoalTweet from "@/components/GoalTweet/Index.vue"
import Top from "@/components/Top/Index.vue"
import Signup from "@/components/Signup/Index.vue"
import Signin from "@/components/Signin/Index.vue"
import Mypage from "@/components/Mypage/Index.vue"

export default [
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