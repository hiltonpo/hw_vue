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
    // 創建event後建立ID，並將資料存在eventData陣列裡
    create(state) {
      if (state.eventInfo.start_time < state.eventInfo.end_time 
        && state.eventInfo.title!=null
        && state.eventInfo.start_time!=null  && state.eventInfo.end_time!=null) {
        state.eventInfo.date = state.dateId;  //dateId代表每個事件的date日期
        state.eventIndex = state.eventData.length;  //創建event時給予index
        state.eventData[state.eventIndex] = Object.assign({}, state.eventInfo);
             
      }

      console.log(state.eventData);

    },

    



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

    updateEvent(state) {
      if (state.eventInfo.start_time < state.eventInfo.end_time) {
        state.eventData[state.currentId] = Object.assign({}, state.eventInfo);
      }
      else {
        alert('error');
      }
      
    },

    removeEvent(state) {
      var result = confirm('Do you really want to delete?');
      if (result) {
        state.eventData.splice(state.currentEventIndex, 1);
      }
    },



  },
  actions: {
    // createAPI(context, state) {
    //   axios.post('http://localhost:8080/demo_hw/vue_calendar/event/create.php', {
    //       title: state.eventInfo.title,
    //       start_time: state.eventInfo.start_time,
    //       end_time: state.eventInfo.end_time,
    //       description: state.eventInfo.description,
    //       date: state.eventInfo.date,
    //     }, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //     .then(function() {
    //       //success
    //       // alert(response.output.message)
    //       context.commit('create')
    //       context.commit('closePanel')
    //     })
    //     .catch(function(error) {
    //       console.log(error.response)
    //     })
    // }

  },
  modules: {
  }
})
