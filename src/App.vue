<template>
  <div id="header">{{monthTitle}}</div>
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
      monthTitle:[],
      xposition:[],
      yposition:[],

    }

  },
  methods:{
    openPanel(val) {
      this.$store.state.open = val.right
      this.$store.state.dateId = val.id
      this.xposition = val.xpos
      this.yposition = val.ypos
      console.log(this.$store.state.dateId)
     
    },
    timeformate() {
      let newdate = new Date();
      let year = newdate.getFullYear();
      let month = newdate.getMonth() + 1;
      this.monthTitle = year + "年" + month + "月"
    },
  },
  created() {
    this.timeformate()
  },
}
</script>

<style>
#header {
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;

}

</style>
