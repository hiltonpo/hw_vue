import { createStore } from 'vuex'

export default createStore({
  state: {
    open:false,
    isNew:true,

    eventId:[],
    dateId:[],
    currentId:[],


    eventData:[],
    eventInfo:{
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
      if (state.eventInfo.start_time < state.eventInfo.end_time) {
        state.eventInfo.date = state.dateId;  //dateId代表每個事件的date日期
        state.eventId = state.eventData.length;  //創建event時給予id
        state.eventData[state.eventId] = Object.assign({}, state.eventInfo);
        state.eventInfo = {
          date:null,
          title:null,
          start_time:null,
          end_time:null,
          description:null
        };
      }

      else {
        alert('error');
      }

      console.log(state.eventData);

    },

    // Update(state) {

    // },

    newPanel (state) {
      state.isNew = true;
      state.eventInfo = {
        date:null,
        title:null,
        start_time:null,
        end_time:null,
        description:null
  
      };
      console.log(state.eventData);

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
        state.eventData.splice(state.currentId, 1);
      }
    },



  },
  actions: {
  },
  modules: {
  }
})
