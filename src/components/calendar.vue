<template>
  <div id="calendar" >
    <div id="days" class="clearfix">
        <div class="day" v-for="(item, index) in week" :key="index">
        {{item}}
        </div>

    </div>
    <div id="dates" class="clearfix">
      <div class="date-block"  v-for="(date, index) in getDaysOfMonth" :key="index" 
      :class="{'empty': date == null}" @dblclick.capture="openPanel($event, index, date)">
        <div class="date">{{date}}</div>
        <events :event="item" :date="date" v-for="(item, index) in orderevent" :key=index 
        ></events>

      </div>
    </div>

 </div>
</template>

<script>
import events from './events'

export default {
  name: "calendar",
  props: {
  },
  components: {
    events
  },
  data(){
    return{
      week:['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      monthTitle:[]

    };
  },

  computed:{
    getDaysOfMonth() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      // 這個月有幾天
      var days = new Date(year, month, 0).getDate();

      // calculatee paddings

      // 本月1號是星期幾? (0~6)
      let firstDateOfTheMonth = new Date(year, month-1, 1).getDay();

      // 本月最後一天是星期幾? (0~6)
      let lastDateOfTheMonth = new Date(year, month-1, days).getDay();
      // calendar 要填的 padding
      let frontPaddings = firstDateOfTheMonth;
      let backPaddings = 6 - lastDateOfTheMonth;

      let front = [];
      let totalday= [];
      let back = [];
      let dates = [];

      // 填1號前面的空格
      for (let i=0; i < frontPaddings; i++) {
        front[i] = null;
        }
      // 填 1-31
      for (let i=0; i < days; i++) {
        totalday[i] = i+1;
        }
      // 填 後面的 padding
      for (let i=0; i < backPaddings; i++) {
        back[i] = null;
        }
      dates = front.concat(totalday, back);

      return dates;

    },
    orderevent() {
      function compare(a,b) {
        const A = a.start_time.split(':');
        const B = b.start_time.split(':');

        let comparsion = [];
        if ( A[0] > B[0] || (A[0] == B[0] && A[1] > B[1]) ) {
          comparsion = 1;
        }
        else {
          comparsion = -1;
        }
        return comparsion ;
      }

      let order = this.$store.state.eventData.slice().sort(compare);
      return order;
    },  
  },
  methods:{
    openPanel($event, index, date) {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      let day = new Date(year, month-1, 1).getDay();
      
      if (date!=null) {
        this.$emit("isOpen", {right:true, xpos:$event.pageX, ypos:$event.pageY, id:index-day+1});
        this.$store.commit('newPanel');
      }
    },
    // ajax call -- read data
    // fetchAlldata() {
    //   axios.post('http://localhost:8080/demo_hw/vue_calendar/event/read.php',
      
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     console.log(response.data)
    //     this.$store.state.eventData = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });

    // }
  },
  created() {
    this.$store.dispatch('fetchAllData')
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#calendar {
    margin: 0 auto;
    width: 90%;
}


.day, .date-block {
    float: left;
    width: calc(100% / 7);
}


#dates {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.date-block {
    padding: 4px;
    border-top:1px solid #ccc;
    border-left: 1px solid #ccc;
    height: 15vh;
    overflow: auto;
}

.date-block.empty {
    background-color: #eee;
}




</style>
