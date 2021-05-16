<template>
  <calendar></calendar>
  <panel></panel>
</template>

<script>

import calendar from './components/calendar.vue'
import panel from './components/panel.vue'



export default {
  name: 'App',
  components: {
    calendar,
    panel,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
