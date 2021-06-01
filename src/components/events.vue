<template>
        <!-- 將eventData以v-for(event, index)呈現，並將個別資料的date放置相對應的日期 -->
        <div class="events clearfix" v-if="event.date == date">
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
}

.events .title {
    float: left;
}

.events .from {
    float: right;
}

</style>
