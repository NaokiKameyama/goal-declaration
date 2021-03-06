import moment from "moment"
import TodoCards from "@/components/TodoCards/Index.vue";

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      reverse: true,
      displayName: ''
    }
  },
  computed: {
    emailHead() {
      return this.$store.getters.getEmailHead
    },
    myTodos(){
      return this.$store.getters.getMyTodos_with_achive
    },
    achived_myTodos(){
      return this.$store.getters.getMyTodos_with_achive.filter(x => x.achiveFlag)
      }
  },
  created() {
    this.displayName = "aaa"
  },
  methods: {
    signOut: function () {
      this.$store.dispatch('signOut');
      this.$router.push('/')
    }
  },
  filters: {
    unixTime2Date: function(date) {
      try {
        var convertDate  = date.toDate()
        return moment(convertDate).format('YYYY/MM/DD HH:mm:ss')
      } catch( e ) {
        return 0
      }
    }
  },
  components: {
    TodoCards
  }
}