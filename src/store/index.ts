import { createStore } from 'vuex'
import arrayData from '@/data/db.json'
import analysisData from '@/data/analysis.json'
import axios from "axios";

export default createStore({
  state: {
    data : arrayData.recordData[arrayData.recordData.length -1].data,
    analysis : analysisData.analysisData[analysisData.analysisData.length -1].data,
    updatePending: false
  },
  mutations: {
    modifyData (state) {
      state.updatePending = true;
    },
    exportData (state) {
      axios.post("http://localhost:3001/recordData", 
        {
          update: new Date(),
          data: state.data
        }
      );
    }
  },
  actions: {
  },
  modules: {
  }
})
