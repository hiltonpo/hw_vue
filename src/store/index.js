// import { includes } from 'core-js/core/array';
import { createStore } from 'vuex'
// import axios from 'axios'


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
  },
  mutations: {


    // 關閉panel
    closePanel(state) {
      state.open = !open

    },

    // create(state) {
    //   if (state.eventInfo.start_time < state.eventInfo.end_time 
    //     && state.eventInfo.title!=null
    //     && state.eventInfo.start_time!=null  && state.eventInfo.end_time!=null) {
    //     state.eventInfo.date = state.dateId;  
    //     state.eventIndex = state.eventData.length;  
    //     // state.eventData[state.eventIndex] = Object.assign({}, state.eventInfo);
             
    //   }

    //   console.log(state.eventData);

    // },

    newPanel (state) {
      state.isNew = true;
      state.eventInfo = {
        id:null,
        date:null,
        title:null,
        start_time:null,
        end_time:null,
        description:null
  
      };


    },

    updatePanel (state) {
      state.isNew = false
    },

    // updateEvent(state) {
    //   if (state.eventInfo.start_time < state.eventInfo.end_time
    //     && state.eventInfo.title!=null
    //     && state.eventInfo.start_time!=null  && state.eventInfo.end_time!=null) {
    //     state.eventData[state.currentEventIndex] = Object.assign({}, state.eventInfo);
    //   }


      
    // },

    // removeEvent(state) {
    //   var result = confirm('Do you really want to delete?');
    //   if (result) {
    //     state.eventData.splice(state.currentEventIndex, 1);
    //   }
    // },



  },
  actions: {

  },
  modules: {
  }
})
