<template>
  <div>
    <i-tab-bar :current="current" @change="handleChange" fixed>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="Home"></i-tab-bar-item>
      <i-tab-bar-item key="group" icon="group" current-icon="group_fill" title="Friends"></i-tab-bar-item>
      <i-tab-bar-item key="remind" icon="remind" current-icon="remind_fill" count="3" title="Notice"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="My"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
import loadFuck from '@/mixins/loadFuck'
export default {
  mixins: [loadFuck],
  components: {
  },

  data () {
    return {
    }
  },

  onLoad () {
  }
}
</script>

<style>


/* 宫格 */
.grid{
}
.grid__item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  margin-bottom: 24rpx;
}
.grid__item_img{
  display: block;
  margin: 0 auto 10rpx;
  width: 110rpx;
  height: 110rpx;
}
.grid__item_text{
  text-align: center;
}

.custom-load-more{
  margin-bottom: 0!important;
}
</style>
