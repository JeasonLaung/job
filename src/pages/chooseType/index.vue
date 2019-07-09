<template>
  <div class="page">
    <div class="province"
    >
      <scroll-view
      style="height:calc(100vh - 100rpx)"

      scroll-y>
        <div class="province-item" @click="typeFather={id:'',name:''}" :class="[typeFather.id === ''?'province-item-active': '']">常用</div>
        <div
        class="province-item"
        v-for="(item, index) in all"
        :key="index"
        :class="[typeFather.name === item.name?'province-item-active': '']"
        @click="typeFather = item;list = item.child"
        >{{item.name}}</div>
      </scroll-view>
    </div>
    <div class="city"
    >
      <scroll-view
      style="height:calc(100vh - 100rpx)"
      scroll-y>
        <div v-if="typeFather.id === ''">
          <div class="h3">选择类型</div>
          <div class="cities">
            <div class="city-item city-item-active" v-if="type.name">{{type.name}}</div>
            <div class="city-item" @click="setType({id:'',name:''})" :class="[!type.id ? 'city-item-active' : '']">不限</div>
          </div>
          
          <!-- <div class="cities">
            <div class="city-item" v-for="(item, index) in hotCities" :key="index">{{item.name}}</div>
          </div> -->
        </div>
        <div v-else>
          <div class="cities">
            <div @click="setType(item)" class="city-item" v-for="(item, index) in list" :key="index" :class="[type.id == item.id ? 'city-item-active' : '']">{{item.name}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <!-- <form report-submit @submit="$collect">
      <button class="ok-btn" @click="set" form-type="submit">完成</button>
    </form> -->
  </div>
</template>

<script>
import fixedBtn from '@/components/fixedBtn'
import {getTypes} from '@/api'
import store from './store'
export default {
  components: {
    fixedBtn
  },
  methods: {
    setType (item) {
      let {id, name} = item
      this.type = {id, name}
      store.commit(this.temp ? 'setTypeTemp' : 'setType', this.type)
      mpvue.navigateBack()
    }
  },
  data () {
    return {
      all: [],
      list: [],
      typeFather: {id: '', name: ''},
      type: {id: '', name: ''},
      temp: false
    }
  },
  onLoad (options) {
    this.options = options
    getTypes().then(data => {
      this.all = data
      if (options.type === 'temp') {
        this.temp = true
        store.state.typeTemp.id ? this.type = store.state.typeTemp : this.type = {id: '', name: ''}
      } else {
        this.temp = false
        store.state.type.id ? this.type = store.state.type : this.type = {id: '', name: ''}
      }
    })
  },
  onUnload () {
    Object.assign(this, this.$options.data())
  }
}
</script>

<style>
.ok-btn{
  height:100rpx;
  background:#40B1F0;
  color:#fff;
  border-radius: 0;
  position:fixed;
  bottom:0;
  left:0;
  right:0;
}
.ok-btn:after{
  border-radius:0;
  border:none
}
.page{
  display: flex;
}
.city{
  flex:1;
}
.province{
  background: #f2f5f8;
  min-width: 250rpx;
  font-size: 30rpx;
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
}
.city-item{
  border-radius: 20rpx;
  height: 70rpx;
  border-bottom: 1rpx solid #eee;
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
