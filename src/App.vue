<template>
  <calendar @isOpen="openPanel"></calendar>
  <panel v-if="$store.state.open" :pagex="xposition" :pagey="yposition"></panel>
</template>

<script>

import calendar from './components/calendar.vue'
import panel from './components/panel.vue'



export default {
  name: 'App',
  components: {
    calendar,
    panel,
  },
  data() {
    return{

      xposition:[],
      yposition:[]

    }

  },
  methods:{
    openPanel(val) {
      this.$store.state.open = val.right
      this.$store.state.dateId = val.id
      this.xposition = val.xpos
      this.yposition = val.ypos
      console.log(this.$store.state.dateId)
     

    // 設定兩種情況，如果是空物件or存在事件
      // if (this.$store.state.eventData[this.$store.state.eventId]) {
 
      //   this.$store.state.eventInfo = {
      //     date:null,
      //     title:null,
      //     start_time:null,
      //     end_time:null,
      //     description:null
      //   };
      // }
      // else {
      //   this.$store.state.eventInfo = Object.assign({}, this.$store.state.eventData[this.$store.state.eventId]);
      // }




    }
    

  }
}
</script>

<style>

</style>
