<template>
  <div>
    <!-- 站位 -->
    <div style="height: 200rpx;"></div>
    <form report-submit @submit="$collect">
      <cover-view class="fixed-btn">
        <button
        class="init primary"
        form-type="submit"
        @click="$emit('click')">
          {{title || '提交'}}
        </button>
      </cover-view>
    </form>
    
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>
.fixed-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 30rpx 25rpx;
  border-top: 1rpx solid #eee;
  background-color: #fff;
}
button.init{
  background-color: inherit;
  font-size: inherit;
  color: inherit;
  border-radius: 0;
  margin: auto;
  padding: auto;
  line-height: 1;
  padding: 0;
  /* padding:inherit; */

}
button.init::after{
  border-radius: 0;
  border: none;
}

/* 组件样式 */
button.primary{
  width: 100%;
  background-color: #40B1F0;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 38rpx;
  border-radius: 15rpx;
}
button.primary::after{
  border: none;
}
button.primary:active{
  background-color: #2b85e4;
}
</style>
