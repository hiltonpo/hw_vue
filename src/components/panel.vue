<template>
    <div id="info-panel" :style="position" :class="[$store.state.isNew? 'new' : 'update']">
      <div class="close" @click="closePanel">x</div>

      <form>
        <input type="hidden" name="id" />
        <div class="title">
          <label>evenet</label>
          <input type="text" name="title" v-model="$store.state.eventInfo.title"/>
        </div>
        <div class="error-msg" :class="[errorMessage ? 'open' : '']">
          <div class="alert alert-danger">{{errorMessage}}</div>
          
        </div>
        <div class="time-picker">
          <div class="selected-date">
            <span class="month">{{currentMonth}}</span>/<span class="date">{{currentDate}}</span>
            <input type="hidden" name="year" />
            <input type="hidden" name="month" />
            <input type="hidden" name="date" />
          </div>
          <div class="from">
            <label for="from">from</label><br />
            <input id="from" type="time" name="start_time" v-model="$store.state.eventInfo.start_time"/>
          </div>
          <div class="to">
            <label for="to">from</label><br />
            <input id="to" type="time" name="end_time" v-model="$store.state.eventInfo.end_time"/>
          </div>
        </div>
        <div class="description">
          <label>description</label><br />
          <textarea name="description" id="description" v-model="$store.state.eventInfo.description"></textarea>
        </div>
      </form>

      <div class="buttons clearfix">
        <button class="create" @click="createEvent">create</button>
        <button class="update" @click="updateEvent">update</button>
        <button class="cancel" @click="closePanel">cancel</button>
        <button class="delete" @click="removeEvent">delete</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios'


export default {  
  name: "panel",
  props: ['pagex','pagey'],
  data() {
    return{
      position: {
        left: this.pagex+'px',
        top: this.pagey+'px',

      },
      currentMonth:[],
      currentDate:this.$store.state.dateId,
      errorMessage:'',









    }
  },
  computed:{




  },

  methods:{
    timeformate() {
      let newdate = new Date();
      let month = newdate.getMonth() + 1;
      this.currentMonth = month 
      
    },

    createEvent() {
      this.$store.commit('create')

      // axios call create.php
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/create.php', {
        title: this.$store.state.eventInfo.title,
        start_time: this.$store.state.eventInfo.start_time,
        end_time: this.$store.state.eventInfo.end_time,
        description: this.$store.state.eventInfo.description,
        date: this.$store.state.eventInfo.date,
        }, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(response => {
          console.log(response)
          this.$store.state.eventData[this.$store.state.eventIndex].id = response.data['id']
          this.$store.commit('closePanel')
          })
        .catch(error => {
          this.errorMessage = error.response.data
          });
      

    },

    updateEvent() {
      this.$store.commit('updateEvent')
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/update.php', {
        title: this.$store.state.eventInfo.title,
        start_time: this.$store.state.eventInfo.start_time,
        end_time: this.$store.state.eventInfo.end_time,
        description: this.$store.state.eventInfo.description,
        date: this.$store.state.eventInfo.date,
        }, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(response => {
          console.log(response)
          this.$store.commit('closePanel')
          })
        .catch(error => {
          this.errorMessage = error.response.data
          });
    },

    closePanel() {
      this.$store.commit('closePanel')

    },

    removeEvent() {
      this.$store.commit('removeEvent')
      let id = this.$store.state.currentId
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/delete.php', {id:id},
       {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(response => {
          console.log(response)
          this.$store.commit('closePanel')
          })
        .catch(error => {
          this.errorMessage = error.response.data
          });

    },


  },
  created() {
    this.timeformate()
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info-panel {
    position: fixed;
    width: 280px;
    background: white;
    border: 1px solid #ccc;
}



#info-panel label {
    font-size: .8rem;
    color: #ccc;
}

#info-panel .close {
    position: relative;
    cursor: pointer;
    top: 10px;
    right: 10px;
}

#info-panel .title, #info-panel .time-picker {
    border-bottom: 1px solid #ccc;
}

#info-panel .title, #info-panel .time-picker, #info-panel .description {
    padding: 10px;
}

.error-msg {
    display: none;
}

.error-msg.open {
    display: block;
    text-align: center;
}

.selected-date {
    text-align: center;
    font-size: 1.4rem;
}

#description {
    width: 100%;
}

#info-panel button {
    display: none;
    border: none;
    padding: 10px;
    background: rgba(129, 127, 127, 0.747);
    color: white;
    cursor: pointer;
}

#info-panel.new button.create, #info-panel.new button.cancel {
    display: block;
    width: 50%;
    float: left;
}

#info-panel.update button.update, #info-panel.update button.cancel, #info-panel.update button.delete {
    display: block;
    width: 50%;
    float: left;
}

#info-panel.update button.delete {
    width: 100%;
    background: #c21717;
}

#info-panel.new button.create, #info-panel.update button.create, #info-panel.update button.update {
    background: #74be00;
}
</style>
