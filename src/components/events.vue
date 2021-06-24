<template>
        <!-- 將eventData以v-for(event, index)呈現，並將個別資料的date放置相對應的日期 -->
        <div class="events clearfix flex-fill" v-if="event.date == date" @dblclick="updatePanel(event)">
            <div class="title">{{event.title}}</div>
            <div class="from">{{event.start_time}}</div>
        </div>
</template>

<script>
export default {
  name: "events",
  props: ['event','date'],
  data() {
    return {
      
    };

  },
  methods: {
    updatePanel(event) {
      this.$store.state.eventInfo = Object.assign({}, event);
      this.$store.state.currentEventIndex = this.$store.state.eventData.findIndex(item=> item.id === event.id);
      this.$store.state.currentId = event.id;
      console.log(event.id);
      console.log(this.$store.state.currentEventIndex);
      this.$store.commit('updatePanel');


    },




  },



};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.events {
    margin-bottom: 2px;
    background: orange;
    color:white;
    padding: 0 6px;
    border-radius: 12px;
    flex-grow: inherit;
}

.events .title {
    float: left;
    font-size: 10px;

}

.events .from {
    float: right;
    font-size: 10px;
}

</style>
