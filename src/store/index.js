// import { includes } from 'core-js/core/array';
import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    open:false,
    isNew:true,

    eventIndex:[],
    dateId:[],
    currentId:[],
    currentEventIndex:[],


    eventData:[],
    eventInfo:{
      id:null,
      date:null,
      title:null,
      start_time:null,
      end_time:null,
      description:null
    },
    errorMessage:'',
  },
  mutations: {

    // 開啟panel 
    openPanel(state, val) {
      state.open = val.right
      state.dateId = val.id
    },

    // 關閉panel
    closePanel(state) {
      state.open = !open
      state.errorMessage = ''  // clear errorMessage
    },

    // create(state) {
    //   if (state.eventInfo.start_time < state.eventInfo.end_time 
    //     && state.eventInfo.title!=null
    //     && state.eventInfo.start_time!=null  && state.eventInfo.end_time!=null) {
    //     state.eventInfo.date = state.dateId;  
    //     state.eventIndex = state.eventData.length;  
    //     // state.eventData[state.eventIndex] = Object.assign({}, state.eventInfo);         
    //   }

    // 開啟新panel
    newPanel (state) {
      state.isNew = true;
      state.eventInfo =  Object.assign({}, null);
    },
    // 切換至update model panel
    updatePanel (state, event) {
      state.isNew = false;
      state.eventInfo = Object.assign({}, event);
      state.currentEventIndex = state.eventData.findIndex(item=> item.id === event.id);
      state.currentId = event.id;
      console.log(event.id);
      console.log(state.currentEventIndex); 
    },
    
    // updateEvent(state) {
    //   if (state.eventInfo.start_time < state.eventInfo.end_time
    //     && state.eventInfo.title!=null
    //     && state.eventInfo.start_time!=null  && state.eventInfo.end_time!=null) {
    //     state.eventData[state.currentEventIndex] = Object.assign({}, state.eventInfo);
    //   }

    // removeEvent(state) {
    //   var result = confirm('Do you really want to delete?');
    //   if (result) {
    //     state.eventData.splice(state.currentEventIndex, 1);
    //   }
    // },
  },
  actions: {
    createEventUI({commit, state}) {
      // axios call create.php
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/create.php', {
        title: state.eventInfo.title,
        start_time: state.eventInfo.start_time,
        end_time: state.eventInfo.end_time,
        description: state.eventInfo.description,
        date: state.dateId,  //click .date-block save the date(dateId)
        }, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(response => {
          console.log(response)
          // if eventInfo is correct, then post event into eventData through Database
          state.eventIndex = state.eventData.length  // build index of each event 
          state.eventData[state.eventIndex] = Object.assign({}, response.data);  // post event into eventData[] array
          console.log(state.eventData);
          commit('closePanel')  // close panel
          })
        .catch(error => {
          state.errorMessage = error.response.data
          });
    },

    updateEventUI({commit, state}) {
      // axios call update.php
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/update.php', {
        id: state.currentId,
        title: state.eventInfo.title,
        start_time: state.eventInfo.start_time,
        end_time: state.eventInfo.end_time,
        description: state.eventInfo.description,
        date: state.eventInfo.date,
        }, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(response => {
          console.log(response)
          state.eventData[state.currentEventIndex] = Object.assign({}, state.eventInfo);
          commit('closePanel')
          })
        .catch(error => {
          state.errorMessage = error.response.data
          });
    },

    removeEventUI({commit, state}) {
      let id = state.currentId // confirm which event want to delete by event's id
      var result = confirm('Do you really want to delete?');

      if (result) {
        // axios call delete.php
        axios.post('http://localhost:8080/demo_hw/vue_calendar/event/delete.php', {id:id},
        {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
         .then(response => {
             state.eventData.splice(state.currentEventIndex, 1);  // remove event
             commit('closePanel');  //close panel
             console.log(response) 
           })
         .catch(error => {
           state.errorMessage = error.response.data
           });
      }
    },

    fetchAllData({state}) {
      // axios call read.php
      axios.post('http://localhost:8080/demo_hw/vue_calendar/event/read.php',     
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data)
        state.eventData = response.data
      })
      .catch(error => {
        console.log(error)
      });
    }

  },
  modules: {
  }
})
