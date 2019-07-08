<template>
  <div class="jobDetail" style="min-height: 100vh">
    <div class="job_header">
      <div class="job_header_first">
        <div class="job_title">{{one.name}}</div>
        <div 
        v-if="one.salary_highest"
        class="job_salary"
        >
          {{one.salary_lowest}}-{{one.salary_highest}}k
        </div>
        <div
        v-else>
          <div 
          v-if="!one.salary_lowest && !one.salary_highest"
          class="job_salary"
          >
            面议
          </div>
          <div 
          v-else
          class="job_salary"
          >
            {{one.salary_lowest}}k+
          </div>
        </div>
      </div>
      <div class="job_header_middle">
        <div class="kinds">
          <div 
          class="kind"
          v-if="one.area_name">
              {{one.area_name}}
          </div>
          <div class="kind">
            {{one.experience_name || '经验不限'}}
          </div>
          <div class="kind">
            {{one.education_name || '学历不限'}}
          </div>
        </div>
        <div class="time">{{create_time}}</div>
      </div>
    </div>
    <linkman
    type="company"
    @click="$go('/pages/job/companyDetail/main?id=' + one.company_id)"
    :avatar="one.company_logo"
    :title="one.company_name"
    border
    is-link>
      <div slot="content">
        <div class="tag" v-if="one.industry_name && one.industry_name!='不限'">{{one.industry_name}}</div>
      </div>
    </linkman>
    <m-panel
    title="岗位职责">
      <div class="description">
        <div class="tag" v-if="one.type_name">{{one.type_name}}</div>
        <div v-html="description"></div>
      </div>
    </m-panel>
    <m-panel
    title="岗位福利"
    v-if="one.welfare">
      <div class="description">
        <div v-html="one.welfare"></div>
      </div>
    </m-panel>
    <m-panel
    title="相似岗位"
    v-if="relatives.length > 0">
      <job
      @click="$go('/pages/job/jobDetail/main?id=' + item.id)"
      :one="item"
      :key="index"
      v-for="(item, index) in relatives" />
    </m-panel>

    <div style="height: 150rpx;"></div>
    <form
    report-submit
    @submit="$collect">
      <div class="fixed-tool">
        <button form-type="submit" style="display: flex;overflow: visible;" @click="getHrPhone" class="init">
          <div
          class="hr-logo">
            <img :src="one.company_logo" mode="aspectFill">
          </div>
          <div>
            <div class="hr-title">{{one.contact}}</div>
          </div>
        </button>
        
        <div class="btn-group">
          <button form-type="submit" @click="handleShare" open-type="share" class="init">
            <i class="iconfont icon-share"></i>
            分享
          </button>
          <button form-type="submit" @click="handleCollect" class="init">
            <i class="iconfont" :style="{color: !isCollect ? '#333333' : '#DD5043'}" :class="['icon-heart' + (isCollect ? '-fill' : '')]"></i>
            收藏
          </button>
          <button 
          form-type="submit" 
          open-type="getPhoneNumber"
          v-if="!isSend"
          @click="handleSend"
          @getPhoneNumber="getPhoneNumber" class="init">
            <i class="iconfont" :style="{color: !isSend ? '#333333' : '#40B1F0'}" :class="['icon-plane' + (isSend ? '-fill' : '')]"></i>
            {{!isSend ? '投递' : '已投递'}}
          </button>
        </div>
      </div>
    </form>
    <i-toast id='toast'></i-toast>
    <i-message id='message'></i-message>
  </div>
</template>

<script>
import linkman from '@/components/linkman'
import job from '@/components/job/job'
import {readJob, collectJob, sendJob, relativeJob, readPhone} from '@/api/job'
import {wxtime} from '@/utils'
import store from '@/store'
import common from '@/mixins/common'
export default {
  components: {
    linkman,
    job
  },
  mixins: [common],
  methods: {
    getHrPhone () {
      if (store.state.userInfo.role) {
        let id = this.one.user_id
        readPhone({id}).then(data => {
          this.makePhoneCall(data.mobile)
        })
      } else {
        mpvue.showModal({
          title: '实名认证后可获取HR联系方式',
          confirmText: '前往',
          confirmColor: '#40B1F0',
          success ({confirm}) {
            if (confirm) {
              this.$go('/pages/me-verify/main')
            }
          }
        })
      }
    },
    handleShare () {
      console.log('share')
    },
    handleCollect () {
      collectJob()
      console.log('collect')
      this.isCollect = !this.isCollect
    },
    handleSend () {
      sendJob()
      console.log('send')
    },
    getPhoneNumber () {
      console.log('send')
    }
  },
  data () {
    return {
      isSend: false,
      isCollect: false,
      one: {
        id: 1
      },
      relatives: [],
      options: {}
    }
  },
  onShareAppMessage () {
    return {
      path: '/pages/job/jobDetail/main?id=' + this.one.id
    }
  },
  computed: {
    description () {
      if (!this.one.description) {
        return ''
      }
      return this.one.description.replace(/\n|\\n|\\\\n/g, '<br>')
    },
    create_time () {
      return wxtime(this.one.create_time)
    }
  },
  onLoad (options) {
    let id = options['id'] || 18
    this.options = options
    readJob({id}).then(data => {
      this.one = data
      relativeJob({type_id: data.type_id, area_id: data.area_id, industry_id: data.industry_id, limit: 5}).then(data => {
        this.relatives = data.list
      }).catch(() => {
        this.relatives = []
      })
    })
  }
}
</script>

<style scoped>
.hr-title{
  font-weight: bolder;
  margin-top: 20rpx;
  font-size: 35rpx;
}
.description{
  padding: 30rpx;
  font-size: 30rpx;
}
.hr-logo{
  height: 120rpx;
  width: 120rpx;
  border-radius: 60rpx;
  overflow: hidden;
  border: 1rpx solid #ccc;
  margin: -30rpx 30rpx 30rpx 30rpx;
}
.fixed-tool .init{
  font-size: 25rpx;
}
.btn-group{
  min-width: 400rpx;
  display: flex;
  justify-content: space-between;
}
.init .iconfont{
  font-size: 50rpx;
  margin-bottom: 10rpx;
}
.fixed-tool{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  display: flex;
  justify-content: space-between;
}
.jobDetail{
  background-color: #f2f2f2;
}
.job_header{
  background-color: #fff;
  padding: 40rpx 30rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}
.job_header_first{
  line-height: 50rpx;
  font-weight: bolder;
  font-size: 37rpx;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 20rpx
}
.job_salary{
  color: #e37859;
}
.job_header_middle{
  display: flex;
  justify-content: space-between;

}
.kinds{
  display: flex;
}
.kind::after{
  content: '|';
  display: inline-block;
  margin: 0 15rpx;
  color: #666;

}
.kind:last-child::after{
  content: '';
}
.tag{
  display: inline-block;
  border-radius: 10rpx;
  background-color: #40B1F0;
  color: #fff;
  padding: 10rpx 10rpx;
  margin-right: 20rpx
}
</style>
