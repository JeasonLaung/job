<template>
  <div
  style="padding: 30rpx;color: #aaa">
    {{warning}}
    <div @click="makePhoneCall">客服电话：<span style="color: #40B1F0">{{hot_tel}}</span></div>
  </div>
</template>

<script>
import store from '@/store'
import common from '@/mixins/common'
export default {
  data () {
    return {
    }
  },
  mixins: [common]
  computed: {
    hot_tel () {
      return store.state.globalVar.hot_tel
    },
    warning () {
      return store.state.globalVar.warning
    }
  },
  methods: {
    readSeeker,
    readJob,
    seekerNews,
    companyNews,
    handleClickJob (e, id) {
      this.$go('/pages/job/jobDetail/main?id=' + id)
    },
    handleClickNews () {
    },
    handleChange (e) {
      this.current = e.target.key
      this.api = this.tabbarApi[this.current]
    }
  },
  onLoad (options) {
    this.api = options['pages'] || 'readJob'
    this.handleNew('job')
  }
}
</script>

<style scoped>

</style>
