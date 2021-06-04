<template>
  <div id="calendar" >
    <div id="header">
        <nowtime></nowtime>
    </div>
    <div id="days" class="clearfix">
        <div class="day" v-for="(item, index) in week" :key="index">
        {{item}}
        </div>

    </div>
    <div id="dates" class="clearfix">
      <div class="date-block"  v-for="(date, index) in getDaysOfMonth" :key="index" 
      :class="{'empty': date == null}" @dblclick.capture="openPanel($event, index)">
        <div class="date">{{date}}</div>
        <events :event="item" :date="date" v-for="(item, index) in $store.state.eventData" :key=index
        ></events>

      </div>
    </div>

 </div>
</template>

<script>
import nowtime from './nowtime.vue'
import events from './events'

export default {
  name: "calendar",
  props: {
    msg: String,
  },
  components: {
    nowtime,
    events
  },
  data(){
    return{
      week:['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],






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
      dates = front.concat(totalday, back)

      return dates;

    }
    

  },
  methods:{
    openPanel($event, index) {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      let pig = new Date(year, month-1, 1).getDay();
      this.$emit("isOpen", {right:true, xpos:$event.pageX, ypos:$event.pageY, id:index-pig+1})
      this.$store.commit('newPanel')

    },




    // record(index) {
    //   this.$store.state.dateId = index
    //   console.log(index)

    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#calendar {
    margin: 0 auto;
    width: 90%;
}

#header {
    font-size: 2.4rem;
    font-weight: bold;

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
