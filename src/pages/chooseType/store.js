import Vue from 'vue'
import Vuex from 'vuex'
// import cookie from '@/utils/cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 长期，如搜索
    type: {id: '', name: ''},
    // 只做选择用，一次性，发布
    typeTemp: {id: '', name: ''}
  },
  mutations: {
    setType (state, data) {
      state.type = data
    },
    setTypeTemp (state, data) {
      state.typeTemp = data
    },
    clearType (state) {
      state.type = {id: '', name: ''}
    },
    clearTypeTemp (state) {
      state.typeTemp = {id: '', name: ''}
    }
  }
})
export default store
