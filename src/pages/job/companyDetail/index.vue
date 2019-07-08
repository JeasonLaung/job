<template>
  <div>
    <div>
    </div>
      <div class="company__header">
        <div class="photo-default company__header_logo">
          <img :src="company.logo" mode="aspectFill">
        </div>
        <icon 
        class="iconfont icon-edit company__header_edit iconfont-blue"
        v-if="isCompanyAdmin"
        @click="$go('/pages/editCompany/main?from=companyInfo&id=' + form.company_id)"
        ></icon>
      </div>

      <div class="company__content">
        <div class="company__content_name">{{company.company}}</div>
        <div class="company_tags">
          <i-tag i-class="custom-tag" color="green">{{company.type_name}}</i-tag>
          <i-tag i-class="custom-tag" color="blue" v-if="company.company_number">{{company.company_number}}人</i-tag>
          <i-tag i-class="custom-tag" color="" v-if="company.company_tel" @click="makePhoneCall(company.company_tel)"><i class="iconfont icon-phone" style="display:inline"></i>{{company.company_tel}}</i-tag>
        </div>
        <div 
        class="company__content_info"
        style="display:flex;color:#333;margin-top:30rpx;justify-content:center"
        v-if="company.address"
        @click="openLocation"
        >
          <i 
          style="color:#40B1F0;margin-right:30rpx"
          class="iconfont icon-location-fill"></i>
          {{company.address}} 
        </div>
        <div class="company__content_info">
          {{company.description}}
        </div>
      </div>

    <m-panel title="所有职位" m-class="custom-panel">
      <div>
        <job
        simple
        @click="$go('/pages/job/jobDetail/main?id=' + item.id)"
        v-for="(item, index) in result"
        :key="index" 
        :one="item"/>
      </div>
    </m-panel>
    <i-load-more
    i-class="custom-load-more"
    :loading="!noMore"
    tip="到底了"></i-load-more>
      
  </div>
</template>

<script>
// Use Vuex
import store from '@/store'
import job from '@/components/job/job'
import {readCompany} from '@/api/company'
import {readJob} from '@/api/job'
import common from '@/mixins/common'
import loadFuck from '@/mixins/loadFuck'
export default {
  mixins: [common, loadFuck],
  data () {
    return {
      options: {},
      company: {
        user_id: '',
        id: '',
        logo: '',
        name: '',
        contact_name: '',
        contact_phone: '',
        description: '',
        status: 1,
        address: '',
        lat: '',
        lng: ''
      },
      staff: [],
      form: {
        company_id: '',
        page: 0
      },
      noMore: false
    }
  },
  components: {
    job
  },
  computed: {
    isCompanyAdmin () {
      return store.state.userInfo.user_id === this.company.user_id
    }
  },
  onLoad (options) {
    options['id'] = options['id'] || store.state.userInfo.company_id || 1
    this.api = 'readJob'
    this.options = options
    this.form.company_id = options['id']
    readCompany(options).then(data => {
      this.company = data
    })
    this.handleNew()
  },
  onPullDownRefresh () {
    readCompany(this.options).then(data => {
      this.company = data
      mpvue.stopPullDownRefresh()
    }).catch(data => {
      mpvue.stopPullDownRefresh()
    })
    Object.assign(this.result, [])
    this.handleNew()
  },
  onReachBottom () {
    this.handleMore()
  },
  methods: {
    readJob,
    openLocation () {
      let {lat, lng} = this.company
      mpvue.openLocation({
        type: 'gcj02',
        latitude: Number(lat),
        longitude: Number(lng),
        scale: 18
      })
    }
  }
}
</script>

<style>
.company_tags{
  display: flex;
  justify-content: center;
}
.company__header{
  background-color: #fff;
  height:300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.company__header_edit{
  font-size: 45rpx;
  position: absolute;
  top: 40rpx;
  right: 40rpx;
}
.company__content{
  padding: 10rpx 40rpx 30rpx;
  background-color: #fff;
}
.company__content_info{
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #888;
}
.company__content_name{
  line-height: 60rpx;
  font-size: 40rpx;
  font-weight: bolder;
  text-align: center;
}
.company__header_logo{
  height: 230rpx;
  width:230rpx;
  border-radius: 115rpx;
  overflow: hidden;
  border: 1rpx solid #f8f8f8;
}



.custom-panel{
  background-color: #eee;
}

</style>
