<template>
    {{nowmonth}}
</template>

<script>
export default {
  name: "time",
  props: {

    msg: String,
  },
  data() {
    return {
      nowmonth:''

    };

  },
  methods: {
    timeformate() {
      let newdate = new Date();
      let year = newdate.getFullYear();
      let month = newdate.getMonth() + 1;
      this.nowmonth = year + "年" + month + "月"
    }

  },
  created() {
    this.timeformate()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
