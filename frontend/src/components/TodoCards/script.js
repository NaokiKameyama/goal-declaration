import "firebase/firestore";
import moment from "moment"
import VueCountdown from '@chenfengyuan/vue-countdown';
import draggable from 'vuedraggable'

export default {
  props: ['message'],
  data: function() {
    return {
      options: {
        animation: 300
      }
    }
  },
  computed: {
    uid() {
      return this.$store.getters.getUid
    }
  },
  methods: {
    remove(id) {
      this.$store.dispatch('remove', id);
    },
    achive(id) {
      this.$store.dispatch('achive', id)
    },
    diffTimeDeadlineToNow(date) {
      try {
        var convertDate = date.toDate()
        if (Number(convertDate - new Date()) < 0) return 0
        return Number(convertDate - new Date())
      } catch( e ) {
        return 0
      }
    },
    console(todo) { 
      console.log(todo.id)
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
    },
    priority2Color: function(priority) {
      if(priority == "1") return ""
      if(priority == "2") return "#B2EBF2"
      if(priority == "3") return "#B3E5FC"
    }
  },
  components: {
    countdown: VueCountdown,
    draggable
  }
};