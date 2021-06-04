import { createStore } from 'vuex'

export default createStore({
  state: {
    open:false,
    isNew:true,

    eventId:[],
    dateId:[],

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
      state.eventInfo.date = state.dateId  //dateId代表每個事件的date日期
      state.eventId = state.eventData.length  //創建event時給予id
      state.eventData[state.eventId] = Object.assign({}, state.eventInfo);
      state.eventInfo = {
        date:null,
        title:null,
        start_time:null,
        end_time:null,
        description:null
  
      },

      console.log(state.eventData)

    },

    // Update(state) {

    // },

    newPanel (state) {
      state.isNew = true
      state.eventInfo = {
        date:null,
        title:null,
        start_time:null,
        end_time:null,
        description:null
  
      },
      console.log(state.eventData)

    },

    updatePanel (state) {
      state.isNew = false


    },

  },
  actions: {
  },
  modules: {
  }
})
