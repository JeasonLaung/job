<template>
  <div class="page">
    <div class="province">
      <scroll-view
      style="height:100vh"
      scroll-y>
        <div class="province-item" @click="nowProvince={id:'',name:''}" :class="[nowProvince.id === ''?'province-item-active': '']">常用</div>
        <div
        class="province-item"
        v-for="(item, index) in all"
        :key="index"
        :class="[nowProvince.name === item.name?'province-item-active': '']"
        @click="nowProvince = item;cities = item.list"
        >{{item.name}}</div>
      </scroll-view>
    </div>
    <div class="city">
      <scroll-view
      style="height:100vh"
      scroll-y>
        <div v-if="nowProvince.id === ''">
          <div class="h3">所在城市</div>
          <div class="city-item" @click="setCity(inCity)" :class="[nowCity.id == inCity.id ? 'city-item-active' : '']">
            <i class="iconfont icon-location-fill"
            style="color:#40B1F0;display: inline;"></i>
            {{inCity.name}}</div>
          <div class="h3">选择城市</div>
          <div class="cities">
            <div class="city-item city-item-active" v-if="nowCity.name">{{nowCity.name}}</div>
            <div class="city-item" @click="setCity({id:'',name:''})" :class="[!nowCity.id ? 'city-item-active' : '']">不限</div>
          </div>
          
          <!-- <div class="cities">
            <div class="city-item" v-for="(item, index) in hotCities" :key="index">{{item.name}}</div>
          </div> -->
        </div>
        <div v-else>
          <div class="h3">{{nowProvince.name}}</div>
          <div class="cities">
            <div @click="setCity(item)" class="city-item" v-for="(item, index) in cities" :key="index" :class="[nowCity.id == item.id ? 'city-item-active' : '']">{{item.name}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import {getCities} from '@/api'
import store from './store'
import {qqmapsdk} from '@/utils/mapsdk'
export default {
  components: {
  },
  methods: {
    setCity (item) {
      let {id, name} = item
      this.nowCity = {id, name}
      store.commit(this.temp ? 'setCityTemp' : 'setCity', {id, name})
      mpvue.navigateBack()
    }
  },
  data () {
    return {
      all: [],
      inCity: {id: '', name: ''},
      cities: [],
      nowProvince: {id: '', name: ''},
      nowCity: {id: '', name: ''},
      temp: false,
      options: {}
    }
  },
  onLoad (options) {
    let _this = this
    this.options = options
    getCities().then(data => {
      this.all = data
      if (options['type'] === 'temp') {
        store.state.cityTemp.id ? this.nowCity = store.state.cityTemp : this.nowCity = {id: '', name: ''}
      } else {
        store.state.city.id ? this.nowCity = store.state.city : this.nowCity = {id: '', name: ''}
      }
      qqmapsdk.reverseGeocoder({
        success (e) {
          _this.inCity['name'] = e.result.ad_info.city
          _this.inCity['id'] = e.result.ad_info.adcode.replace(/.{2}$/, '00')
        }
      })
    })
  },
  onUnload () {
    Object.assign(this, this.$options.data())
  }
}
</script>

<style>
.page{
  display: flex;
}
.city{
  flex:1;
}
.province{
  background: #f2f5f8;
  min-width: 250rpx;
  font-size: 35rpx;
}
.province-item{
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
}
.province-item-active{
  background: #fff;
}
.h3{
  font-size: 40rpx;
  font-weight: bold;
  line-height: 100rpx;
}
.city{
  padding-left: 30rpx;
}
.cities{
  display: flex;
  flex-wrap: wrap;
}
.city-item{
  border-radius: 10rpx;
  height: 70rpx;
  width: 200rpx;
  border: 1rpx solid #eee;
  text-align:center;
  line-height:70rpx;
  margin-right: 20rpx;
  overflow:hidden;
  text-overflow: ellipsis;
  margin-bottom:20rpx;
}
.city-item-active{
  background-color: #40B1F0;
  color: #fff;
}
.city-item-active .icon-location-fill{
  color: #fff!important;
}
</style>
