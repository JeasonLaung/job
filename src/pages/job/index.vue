<template>
  <div>
    <div class="page">
      <div
      v-if="api == 'readJob'">
        <form report-submit @submit="$collect">
          <div style="background-color:#fff;border-bottom:1rpx solid #eee">
            <button form-type="submit" @click="$go('/pages/job/search/main?type=job')" class="init iibtn">搜索/筛选</button>
          </div>
        </form>
        <m-load
        height="calc(100vh - 200rpx)"
        :firstLoad="firstLoads['readJob']"
        :noMore="noMores['readJob']"
        :empty="emptys['readJob']"
        @new="handleNew('readJob')"
        @more="handleMore('readJob')">
          <div>
            <job 
            @click="handleClickJob($event, item.id)"
            :one="item"
            v-for="(item, index) in results['readJob']"
            :key="index"></job>
          </div>
        </m-load>
      </div>
      <div
      v-else-if="api == 'seekerNews'">
        <m-load
        height="calc(100vh - 100rpx)"
        :firstLoad="firstLoads['seekerNews']"
        :noMore="noMores['seekerNews']"
        :empty="emptys['seekerNews']"
        @new="handleNew('seekerNews')"
        @more="handleMore('seekerNews')">
          <div>
            <news 
            @click="handleClickJob($event, item.id)"
            :one="item"
            v-for="(item, index) in results['seekerNews']"
            :key="index"></news>
          </div>
        </m-load>
      </div>
      <div
      v-else-if="api == 'readSeeker'">
        <form report-submit @submit="$collect">
          <div style="background-color:#fff;border-bottom:1rpx solid #eee">
            <button form-type="submit" @click="$go('/pages/job/search/main?type=seeker')" class="init iibtn">搜索/筛选</button>
          </div>
        </form>
        <m-load
        height="calc(100vh - 100rpx)"
        :firstLoad="firstLoads['readSeeker']"
        :noMore="noMores['readSeeker']"
        :empty="emptys['readSeeker']"
        @new="handleNew('readSeeker')"
        @more="handleMore('readSeeker')">
          <div>
            <seeker
            border
            @click="$go('/pages/job/seekerDetail/main?id='+item.id)"
            :one="item"
            v-for="(item, index) in results['readSeeker']"
            :key="index"></seeker>
          </div>
        </m-load>
      </div>
      <div
      v-else-if="api == 'companyNews'">
        <m-load
        height="calc(100vh - 100rpx)"
        :firstLoad="firstLoads['companyNews']"
        :noMore="noMores['companyNews']"
        :empty="emptys['companyNews']"
        @new="handleNew('companyNews')"
        @more="handleMore('companyNews')">
          <div>
            <news 
            :one="item"
            v-for="(item, index) in results['companyNews']"
            :key="index"></news>
          </div>
        </m-load>
      </div>
      <div
      v-else-if="api == 'readCompany'">
        <form report-submit @submit="$collect">
          <div style="background-color:#fff;border-bottom:1rpx solid #eee">
            <button form-type="submit" @click="$go('/pages/job/search/main?type=company')" class="init iibtn">搜索/筛选</button>
          </div>
        </form>
        <m-load
        height="calc(100vh - 200rpx)"
        :firstLoad="firstLoads['readCompany']"
        :noMore="noMores['readCompany']"
        :empty="emptys['readCompany']"
        @new="handleNew('readCompany')"
        @more="handleMore('readCompany')">
          <div
          v-for="(item, index) in results['readCompany']"
          :key="index"
          style="border-bottom:1rpx solid #eee"
          >
            <company 
            :avatar="item.logo"
            :title="item.company"
            :one="item"
            @click="$go('/pages/job/companyDetail/main?id='+item.id)"
            >
            </company>
          </div>
        </m-load>
      </div>
      <div
      class="person"
      v-else-if="api == 'person'"
      >
        <div class="mine-wrap">
        <!-- 头部区域 -->
          <div class="head-area">
            <div class="avator-box" @click="handleAuth">
                <img class="avator-img" :src="userInfo.avatar || '/static/images/person-default.png'"/>
                <div class="name" v-if="userInfo.real_name">{{userInfo.real_name}}</div>
                <div v-else>
                  <open-data type="userNickName" class="name"></open-data>
                </div>
            </div>
            <div class="authen-box">     
              <div class="authen-yg authen-btn" v-if="userInfo.role === 'company'">
                <i class="iconfont icon-verify" style="display: inline;"></i>企业员工
              </div>
               <div class="authen-yg authen-btn" v-else-if="userInfo.role && userInfo.role !== 'company'">
                <i class="iconfont icon-verify" style="display: inline;"></i>求职者
              </div>
              <button form-type="submit" open-type="getUserInfo" @click="handleAuth" class="authen-yg authen-btn init" v-else>
                我要实名
              </button>              
            </div>
          </div>
          
          <!-- 垂直栏目  -->
          <div class="content-area">
             <div class="weui-panel">
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_small-appmsg">
                        <div class="weui-cells weui-cells_in-small-appmsg">
                            <form class="form-id" @submit='$collect' report-submit="true" data-url="./seeker/resume/main?pageType=mine">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/Group1.png" /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>个人档案</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                            <form class="form-id" @submit='$collect' report-submit="true" data-url="./seeker/application/main">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/Group2.png"  /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>求职记录</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                            <form class="form-id" @submit='$collect' report-submit="true" data-url="./seeker/collect/main">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/Group3.png" /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>我的收藏</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                             <form class="form-id" @submit='$collect' report-submit="true">
                              <div class="weui-cell weui-cell_access weui-contact">
                                  <div class="weui-cell__hd"><img src="/static/images/icon-contact2.png" /></div>
                                  <div class="weui-cell__bd weui-cell_primary">                             
                                      <button class="btn-contact" open-type='contact' session-from="weapp" form-type='submit'>
                                        客服中心
                                      </button>                          
                                  </div>
                                  <div class="arrow-right"></div>
                              </div>  
                            </form> 
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div
      class="person"
      v-else-if="api == 'hr'"
      >
        <div class="mine-wrap">
        <!-- 头部区域 -->
          <div class="head-area">
            <div class="avator-box" @click="handleAuth">
                <img class="avator-img" :src="userInfo.avatar || '/static/images/person-default.png'"></img> 
                <div class="name" v-if="userInfo.real_name">{{userInfo.real_name}}</div>
                <div v-else>
                  <open-data type="userNickName" class="name"></open-data>
                </div>
            </div>
            <div class="authen-box">     
              <div class="authen-yg authen-btn" v-if="userInfo.role === 'company'">
                <i class="iconfont icon-verify" style="display: inline;"></i>企业员工
              </div>
               <div class="authen-yg authen-btn" v-else-if="userInfo.role && userInfo.role !== 'company'">
                <i class="iconfont icon-verify" style="display: inline;"></i>求职者
              </div>
              <button form-type="submit" open-type="getUserInfo" @click="handleAuth" class="authen-yg authen-btn init" v-else>
                我要实名
              </button>              
            </div>
          </div>
          
          <!-- 垂直栏目  -->
          <div class="content-area">
             <div class="weui-panel">
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_small-appmsg">
                        <div class="weui-cells weui-cells_in-small-appmsg">
                          <form class="form-id" @submit='$collect' report-submit="true" data-url="./company/publishJob/main">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/position.png"  /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>我司职位</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                            <form class="form-id" @submit='$collect' report-submit="true" data-url="./company/application/main">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/Group2.png"  /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>求职申请</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                            <form class="form-id" @submit='$collect' report-submit="true" data-url="./company/invite/main">
                              <button class="btn-formId" form-type='submit'>
                                <a class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd"><img src="/static/images/Group3.png" /></div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <div>我的邀请</div>
                                    </div>
                                    <div class="arrow-right"></div>
                                </a>
                              </button>
                            </form>
                             <form class="form-id" @submit='$collect' report-submit="true">
                              <div class="weui-cell weui-cell_access weui-contact">
                                  <div class="weui-cell__hd"><img src="/static/images/icon-contact2.png" /></div>
                                  <div class="weui-cell__bd weui-cell_primary">                             
                                      <button class="btn-contact" open-type='contact' session-from="weapp" form-type='submit'>
                                        客服中心
                                      </button>                          
                                  </div>
                                  <div class="arrow-right"></div>
                              </div>  
                            </form> 
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>


    


    <i-tab-bar :current="api" @change="handleChange" fixed color="#40B1F0">
      <i-tab-bar-item key="readJob" icon="job" current-icon="job" title="岗位"></i-tab-bar-item>
      <i-tab-bar-item key="readCompany" icon="company" current-icon="company" title="企业"></i-tab-bar-item>
      <i-tab-bar-item key="readSeeker" icon="position" current-icon="position" title="人才"></i-tab-bar-item>
      <i-tab-bar-item key="seekerNews" icon="news" current-icon="news" title="资讯"></i-tab-bar-item>
      <i-tab-bar-item key="person" icon="person" current-icon="person" title="我的"></i-tab-bar-item>
      <i-tab-bar-item key="hr" icon="person" current-icon="person" title="我的"></i-tab-bar-item>
    </i-tab-bar>
    <i-message id="message"></i-message>
    <i-toast id="toast"></i-toast>
  </div>
</template>

<script>
import company from '@/components/job/company'
import sLoadFuck from '@/mixins/sLoadFuck'
import card from '@/components/card'
import job from '@/components/job/job'
import seeker from '@/components/job/seeker'
import store from '@/store'
import news from '@/components/news'
import search from '@/components/job/search'
import {readJob, seekerNews, companyNews, readSeeker, readCompany} from '@/api/job'
// import cityStore from '@/pages/chooseCity/store'
// import {qqmapsdk} from '@/utils/mapsdk'
export default {
  mixins: [sLoadFuck],
  components: {
    card,
    job,
    search,
    news,
    company,
    seeker
  },

  data () {
    return {
      keywordTmp: {
        readCompany: ''
      },
      inCity: {id: '', name: ''},
      current: 'job',
      tabbarList: ['job', 'news', 'person'],
      duration: 500,
      companyCity: {
        id: '',
        name: ''
      }
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  onShow () {
    // let _this = this
    // if (!this.companyCity.id) {
    //   // 没有选中城市
    //   if (!cityStore.state.city.name) {
    //     // 还没有定位
    //     if (!cityStore.state.inCity.id) {
    //       qqmapsdk.reverseGeocoder({
    //         success (e) {
    //           _this.inCity['name'] = e.result.ad_info.city
    //           _this.inCity['id'] = e.result.ad_info.adcode.replace(/.{2}$/, '00')
    //           cityStore.commit('setInCity', _this.inCity)
    //           if (!_this.companyCity.id) {
    //             _this.companyCity = JSON.parse(JSON.stringify(_this.inCity))
    //           }
    //         }
    //       })
    //     } else {
    //       this.companyCity = cityStore.state.inCity
    //     }
    //   } else {
    //     this.companyCity = cityStore.state.city
    //   }
    // }
  },
  onLoad (options) {
    this.options = options
    this.api = 'readSeeker'
    this.handleNew('readSeeker')
  },
  methods: {
    readSeeker,
    readJob,
    seekerNews,
    companyNews,
    readCompany,
    handleClickJob (e, id) {
      this.$go('/pages/job/jobDetail/main?id=' + id)
    },
    handleClickNews () {
    },
    handleChange (e) {
      this.api = e.target.key
      console.log(this.api)
      // if (this.api !== 'person' || this.api !== 'hr') {
      //   this.handleNew(this.api)
      // }
    },
    handleAuth () {
      if (!this.userInfo.role) {
        this.$go('/pages/me-verify/main')
      }
    }
  }
}
</script>

<style scoped>
.kind{
  color: #666;
  display: flex;
}
.kind_item{
}
.kind_item::after{
  content: '|';
  display: inline-block;
  margin: 0 15rpx;
  color: #666;

}
.kind_item:last-child::after{
  content: '';
}

.iibtn{
  margin: 15rpx 30rpx;text-align:center;height:70rpx;background-color:#f2f2f2;color:#aaa;line-height:70rpx;border-radius:20rpx;
}
.person{
  min-height: 100vh;
  background-color: #f1f5f8;
}
.page{
  height: 100vh;
  width: 100vw;
}
.page-item{
  height: calc(100vh - 100rpx);
}
.mine-wrap{
  height: 100%;
}
.head-area{
  height: 350rpx;
  background-color: #fff;
  margin-bottom:30rpx;
}
.head-area .avator-box{
  display: flex;
  flex-direction:column;
  align-items: center; 
  text-align: center;
  margin-top: 40rpx;
  margin-bottom: 30rpx;
}
.head-area .avator-box .avator-img{
  width:164rpx;
  height: 164rpx;
  border-radius: 50%;
  margin-bottom: 22rpx;
  display: block;
  overflow: hidden;
}
.head-area .avator-box .name{
  font-size:36rpx;
  display: block
}
/* .head-area .authen-box .authen-btn{
  width:270rpx;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  margin:0 auto;
  border-radius: 35rpx;
  background-color:#5AA2E7;
  font-size:32rpx;
  color: #fff;
} */

.head-area .authen-box{
  text-align: center;
}
.head-area .authen-box .authen-btn{
  display: inline-block;
  font-size: 25rpx;
  border: 1rpx solid #40B1F0;
  border-radius: 10rpx;
  padding: 7rpx 20rpx;
  color: #40B1F0;
}
.head-area .authen-box .iconfont{
  font-size: 30rpx;
  color: #40B1F0;
}
.authen-yg .img{
  width:98rpx;
  height: 40rpx;
}
.authen-hunt .img{
  width:124rpx;
  height: 40rpx;
}
.authen-my .img{
  width:125rpx;
  height: 40rpx;
}
.btn-phone-number{
  position: relative;
  display: inline-block;
  padding:0;
  line-height: 1;
  background-color: #ffffff;
  width:125rpx;
  height: 40rpx;
  border-radius: 20rpx;
}

.weui-cell{
  align-items: center;
}
.weui-cell__hd{
  width:58rpx;
  height:58rpx;
  margin-right: 20rpx;
}
.weui-cell__hd image{
  width:100%;
  height:100%;
}
.weui-contact .weui-cell__hd{
  margin-right: 10rpx;
}
.btn-contact{
  display: block;
  background: transparent;
  padding:0;
  line-height: 1.5;
  font-size:34rpx;
  text-align: left;
  width:100%;
  color: #000;
}
.btn-contact::after{
  border:0;
}
.btn-formId{
  font-size:34rpx;
} 

.weui-cells .form-id{
  position: relative;
}
.weui-cells .form-id::before{
  content:" ";position:absolute;left:30rpx;top:0;right:0;height:2rpx;border-top:1rpx solid #e5e5e5;color:#d9d9d9;
}
.weui-cells .form-id:first-child::before{
  border-top:none;
} 
.weui-media-box::after,.weui-media-box::before{
  border:0;
}

</style>
