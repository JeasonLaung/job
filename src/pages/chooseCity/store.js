import Vue from 'vue'
import Vuex from 'vuex'
// import cookie from '@/utils/cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    city: {id: '', name: ''},
    cityTemp: {id: '', name: ''},
    province: {id: '', name: ''},
    inCity: {id: '', name: ''}
  },
  mutations: {
    setCity (state, data) {
      state.city = data
    },
    setInCity (state, data) {
      state.inCity = data
    },
    clearCity (state, data) {
      state.city = {id: '', name: ''}
    },
    setProvince (state, data) {
      state.province = data
    },
    setCityTemp (state, data) {
      state.cityTemp = data
    },
    clearCityTemp (state, data) {
      state.cityTemp = {id: '', name: ''}
    }
  }
})
export default store
