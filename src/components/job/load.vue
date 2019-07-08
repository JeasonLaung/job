<template>
  <div
  class="window"
  :style="{height}">
    <scroll-view
    v-if="loaded"
    scroll-y
    :enable-back-to-top="true"
    @scrolltoupper="_bindscrolltoupper"
    @scrolltolower="_bindscrolltolower"
    @touchstart="_bindtouchstart"
    @touchmove="_bindtouchmove"
    @touchend="_bindtouchend"
    @scroll="_bindscroll"
    class="page">
      <div class='loading' :style="{height: (ingNew ? 70 : 0) + 'rpx'}">{{ingNew ? '正在刷新' : '刷新成功'}}</div>
      <div style="height: 100%;">
        <slot />
      </div>
      <div class="beforeLoaded" v-if="!firstLoad">
        <img src="/static/images/going.gif" class="beforeLoaded-img">
      </div>
    </scroll-view>
    <div
    v-else
    class="beforeLoaded">
      <img src="/static/images/going.gif" class="beforeLoaded-img">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '100vh'
    },
    // 第一次加载成功后将不会有动画
    firstLoad: {
      type: Boolean,
      default: false
    },
    empty: Boolean,
    noMore: Boolean
  },
  data () {
    return {
      // 整体挂载
      loaded: false,
      // 是否最顶
      isTop: true,
      isMove: false,
      loadTimer: null,
      scrollTop: 0,
      // 开始
      sclientY: 0,
      // 结束
      eclientY: 0,
      // 刷新状态
      ingNew: false,
      ingMore: false
    }
  },
  mounted () {
    this.$emit('new')
    this.loaded = true
  },
  methods: {
    fuckNew () {
      this.eclientY = 0
      if (!this.isTop || this.ingNew) {
        return
      }
      this.ingNew = true
      this.$emit('new')
      clearTimeout(this.loadTimer)
      this.loadTimer = setTimeout(() => {
        this.ingNew = false
      }, 2000)
    },
    _bindscrolltoupper (e) {
      // 当我到了最顶的时候，没有改变手移动但没有改变位置或者e.mp.detail.scrollTop < 0,此时为刷新
      this.isTop = true
    },
    _bindscrolltolower (e) {
      this.$emit('more')
    },

    // 没有scroll时touchmove接管
    _bindtouchstart (e) {
      // 记录开始
      this.sclientY = e.clientY
    },
    _bindtouchmove (e) {
      // 记录移动
      this.eclientY = e.clientY
    },
    _bindtouchend (e) {
      if (this.sclientY - this.eclientY < 0) {
        this.fuckNew()
      }
    },
    _bindscroll (e) {
      if (e.mp.detail.scrollTop <= 0) {
        this.isTop = true
      } else {
        this.isTop = false
      }
    }
  }
}
</script>

<style scoped>
.window{
  background-color: #fff;
}
.loading{
  background-color: #40B1F0;
  text-align: center;
  color: #fff;
  font-size: 27rpx;
  line-height: 70rpx;
  transition: height .5s;
}
.page{
  height: 100%;
}
.beforeLoaded{
  height: 100%;
  width: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.beforeLoaded-img{
  height: 207rpx;
  width: 140rpx;
}
</style>
