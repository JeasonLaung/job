<template>
  <div class="page">
    <search
    @confirm="handleConfirm"
    @change="keyword = $event;"
    :value="keyword"
    fixed
    >
      <div slot="left">
        <div @click="$go('/pages/chooseCity/main')">
          <i class="iconfont icon-location" style="display:inline"></i>{{city.name}}
        </div>
      </div>
    </search>

    <div
     v-if="mode === 2"
     class="filter">
      <!-- <div class="filter-item">
        职能
        <i class="iconfont icon-bottom"></i>
      </div> -->
      <div class="filter-item" :class="{'filter-item-active': showDemand}" @click="showDrawer('Demand')">
        要求
        <i class="iconfont" :class="[showDemand?'icon-top':'icon-bottom']"></i>
      </div>
      <div class="filter-item" :class="{'filter-item-active': showOrder}" @click="showDrawer('Order')">
        排序
        <i class="iconfont" :class="[showOrder?'icon-top':'icon-bottom']"></i>
      </div>
    </div>
    <!-- 站位 -->
    <div :style="{height: mode!==2 ? '100rpx' : '77px'}"></div>
    <div class="drawers">
      <i-drawer
      @close="hideDrawer"
      mode="top"
      :visible="showDemand">
        <div>
          <scroll-view scroll-y class="demand-drawer">
            <div class="list">
              <div class="list-title">薪酬</div>
              <div class="list-body">
                <div
                v-for="(item, index) in salaryList"
                :key="index"
                class="list-body-item"
                @click="item.id === demand.salary_id ? demand.salary_id = '': demand.salary_id = item.id"
                :class="{active:item.id === demand.salary_id}"
                >
                  {{item.name}}
                </div>
              </div>
            </div>
            <div class="list">
              <div class="list-title">工作经验</div>
              <div class="list-body">
                <div
                v-for="(item, index) in experienceList"
                :key="index"
                @click="setActive('experienceList', index)"
                :class="{active:item.active}"
                class="list-body-item">
                  {{item.name}}
                </div>
              </div>
            </div>
            <div class="list">
              <div class="list-title">学历要求</div>
              <div class="list-body">
                <div
                v-for="(item, index) in educationList"
                :key="index"
                @click="setActive('educationList', index)"
                :class="{active:item.active}"
                class="list-body-item">
                  {{item.name}}
                </div>
              </div>
            </div>
          </scroll-view>
          <form report-submit @submit="$collect">
            <div style="height: 90rpx;display: flex;">
              <button form-type="submit" class="init"  @click="clearDemand" style="background: #eee;flex: 1;line-height: 90rpx">重置</button>
              <button form-type="submit" class="init" style="flex: 2;background: #40B1F0;color: #fff;line-height: 90rpx" @click="setDemand">确定</button>
            </div>
          </form>
        </div>
      </i-drawer>
      <i-drawer
      @close="hideDrawer"
      mode="top"
      :visible="showOrder">
        <div 
        class="order-list-items" 
        >
          <div 
          v-for="(item, index) in orderList" 
          :key="index"
          class="order-list-item" 
          :class="{active: item.id === order_id}"
          @click="order_id = item.id;handleSearch()">
            {{item.name}}
            <i class="iconfont icon-tick" v-if="item.id === order_id"></i>
          </div>
        </div>
      </i-drawer>
    </div>
    <div v-if="mode !== 2">
      <div class="list" @click="$go('/pages/chooseType/main')">
        <div class="list-title active">按分类搜索</div>
      </div>
      <div class="list">
        <div class="list-title" style="display: flex;justify-content: space-between;padding-right: 30rpx">
          搜索历史
          <i class="iconfont icon-delete" @click="handleClearHistory"></i>
        </div>
        <div class="list-body">
          <div class="list-body-item" :key="index" v-for="(item, index) in history" @click="keyword = item.title;handleSearch()">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <m-load
      height="calc(100vh - 77px)"
      :noMore="noMore"
      :empty="empty"
      @new="handleSearch"
      @more="handleMore"
      :firstLoad="firstLoad">
        <div v-if="options.type === 'job'">
          <job
          v-for="(item, index) in result"
          :key="index"
          :one="item"
          @click="$go('/pages/job/jobDetail/main?id=' + item.id)"
          />
        </div>
      </m-load>
    </div>
  </div>
</template>

<script>
import job from '@/components/job/job'
import sLoadFuck from '@/mixins/sLoadFuck'
import cookie from '@/utils/cookie'
import {readJob, getSearchType} from '@/api/job'
import search from '@/components/job/search'
import typeStore from '@/pages/chooseType/store'
import cityStore from '@/pages/chooseCity/store'
import {qqmapsdk} from '@/utils/mapsdk'
export default {
  components: {
    search,
    job
  },
  mixins: [sLoadFuck],
  data () {
    return {
      mode: 1,
      showDemand: false,
      showOrder: false,
      options: {},
      history: [],
      type: {id: '', name: ''},
      city: {id: '', name: ''},
      searchType: {},
      salaryList: [],
      educationList: [],
      experienceList: [],
      orderList: [],

      keyword: '',
      location: {},
      order_id: 1,
      demand: {
        experience_id: [],
        education_id: [],
        salary_id: ''
      },
      form: {
        page: 0,
        limit: 10,
        keyword: '',
        education_id: '',
        experience_id: '',
        type_id: '',
        area_id: '',
        lat: '',
        lng: '',
        salary_id: ''
      }
    }
  },
  onShow () {
    let _this = this
    let typeId = typeStore.state.type.id
    let cityId = cityStore.state.city.id
    let cityName = cityStore.state.city.name
    if (typeId) {
      this.type = typeStore.state.type
      this.handleSearch()
    }
    if (cityId) {
      this.city = cityStore.state.city
      if (this.mode === 2) {
        this.handleSearch()
      }
    } else if (cityName === '不限') {
      this.city = {id: '', name: '全国'}
    } else {
      qqmapsdk.reverseGeocoder({
        success (e) {
          _this.city.id = e.result.ad_info.adcode.replace(/.{2}$/, '00')
          _this.city.name = e.result.ad_info.city.replace(/市/, '')
          _this.location = e.result.location
        }
      })
    }
  },
  methods: {
    readJob,
    handleClearHistory () {
      mpvue.showModal({
        title: '是否删除历史搜索',
        success ({confirm}) {
          if (confirm) {
            this.history = []
            cookie.set('history_search_type', [])
          }
        }
      })
    },
    setActive (type, index) {
      let tmp = JSON.parse(JSON.stringify(this[type]))
      tmp[index].active = !tmp[index].active
      this[type] = tmp
    },
    handleSearch () {
      if (this.mode !== 2) {
        this.mode = 2
      }
      this.form = {...this.demand, ...this.location, keyword: this.keyword, area_id: this.city.id, order_id: this.order_id, type_id: this.type.id}
      console.log(this.form)
      this.api = 'readJob'
      this.handleNew('', this.form)
      this.hideDrawer()
    },
    setDemand () {
      this.demand.experience_id = []
      this.demand.education_id = []
      for (let i in this.educationList) {
        if (this.educationList[i].active) {
          this.demand.education_id.push(this.educationList[i].id)
        }
      }
      for (let i in this.experienceList) {
        if (this.experienceList[i].active) {
          this.demand.experience_id.push(this.experienceList[i].id)
        }
      }
      this.handleSearch()
    },
    clearDemand () {
      this.demand = {
        experience_id: [],
        education_id: [],
        salary_id: ''
      }
      this.setList()
      this.showDemand = false
      this.handleSearch()
    },
    hideDrawer () {
      this.showDemand = false
      this.showOrder = false
    },
    showDrawer (target) {
      let tmp = this['show' + target]
      this.hideDrawer()
      this['show' + target] = !tmp
    },
    handleConfirm (e) {
      let type = this.options.type
      let hs = cookie.get('history_search_' + type)
      if (e) {
        if (!hs) {
          cookie.set('history_search_' + type, [{title: e, time: Date.now()}])
        } else {
          for (var i = 0; i < hs.length; i++) {
            if (hs[i].title === e) {
              hs.splice(i, 1)
            }
          }
          hs.unshift({title: e, time: Date.now()})
          hs.splice(0, 12)
          cookie.set('history_search_' + type, hs)
        }
      }
      this.handleSearch()
    },
    setList () {
      let data = JSON.parse(JSON.stringify(this.searchType))
      this.educationList = data.educationList
      this.experienceList = data.experienceList
      this.salaryList = data.salaryList
      this.orderList = data.orderList
    }
  },
  onLoad (options) {
    options['type'] = options['type'] || 'job'
    let type = options['type']
    this.options = options
    let hs = cookie.get('history_search_' + type)
    if (hs) {
      console.log(hs)
      this.history = hs
    }
    getSearchType().then(data => {
      this.searchType = data
      this.setList()
    })
  },
  onUnload () {
    cityStore.commit('clearCity')
    typeStore.commit('clearType')
    Object.assign(this, this.$options.data())
  }
}
</script>

<style>
.order-list-items{
  margin-top: 180rpx;
  width: 100vw;
  background-color: #fff;

}
.order-list-item{
  border-bottom: 1rpx solid #eee;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
.order-list-item.active{
  color:#40B1F0;
}
.order-list-item .iconfont{
  display: inline-block;
}
.demand-drawer{
  padding-left: 30rpx;
  height: 60vh;
  width: 100vw;
  margin-top: 180rpx;
  background-color: #fff;
}
.filter-item-active{
  color: #40B1F0
}
.page{
  background:#f2f4f8;
  min-height:100vh;
}
.filter{
  position: fixed;
  z-index:999;
  top: 101rpx;
  left:0;right:0;
  background:#fff;
  display:flex;
  height:80rpx;
  border-bottom:1rpx solid #eee;
}
.list-title.active:active{
  background-color: #f2f2f2
}
.list{
  background:#fff;
  padding-left: 30rpx;
  margin-bottom:20rpx;
}
.list-title{
  line-height:110rpx;
  font-size:35rpx;
  font-weight:bold;
}
.list-body{
  padding-bottom: 20rpx; 
}
.list-body-item{
  display: inline-block;
  border:1rpx solid #eee;
  padding:15rpx 20rpx;
  margin-right: 30rpx;
  margin-bottom: 20rpx
}
.list-body-item.active{
  background-color: #40B1F0;
  color: #fff;
}
.list-body-item:active{
  background-color: #f2f2f2;
  color: #fff;
}
.filter-item{
  flex:1;
  text-align:center;
  line-height:80rpx;
}
.filter .iconfont{
  display:inline
}
</style>
