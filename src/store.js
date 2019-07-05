// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
// import cookie from '@/utils/cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      user_nickname: '',
      avatar: '',
      user_id: '',
      role: '',
      company: '',
      school: ''
    },
    account: {
      balance: '',
      grow_score: '',
      score: '',
      user_status: ''
    },
    diaryTmp: {
      id: '',
      action: '',
      like_count: '',
      comment_count: ''
    },
    globalVar: {
      hot_tel: ''
    }
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = {...state.userInfo, ...data}
    },
    setAccount (state, data) {
      state.account = {...state.account, ...data}
    },
    setDiaryTmp (state, data) {
      state.diaryTmp = {...state.diaryTmp, ...data}
    },
    setGlobalVar (state, data) {
      state.globalVar = {...state.globalVar, ...data}
    }
  }
})

export default store
