<template>
  <form 
  @submit="$collect"
  report-submit
  >
    <button
    form-type="submit"
    @click.stop="$emit('click')"
    @getUserInfo="$getUserInfo"
    :style="{borderBottom: border ? '1rpx solid #eee' : ''}"
    class="init linkman">
      <div class="linkman-lf">
        <div class="linkman-logo" v-if="!logoError">
          <img 
          v-if="avatar"
          @error="logoError = false"
          :src="avatar"
          mode="aspectFill"
          class="linkman-logo-img"
          lazy-load
          >
        </div>
        <div v-else class="linkman-logo" :class="['default-'+type]">
        </div>
        <div class="linkman-bd">
          <div class="linkman-title">
            {{title}}
            <slot name="title" />
          </div>
          <div class="linkman-info">
            {{content}}
            <slot name="content" />
          </div>
        </div>
      </div>
      
      <div class="linkman-rt">
        <i 
        class="iconfont icon-right"
        v-if="isLink"></i>
        <slot name="footer"/>
      </div>
      
    </button>
  </form>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'avatar',
      type: String
    },
    avatar: String,
    path: String,
    title: String,
    content: String
  },
  methods: {
  },
  data () {
    return {
      logoError: false
    }
  }
}
</script>

<style>
.linkman{
  background-color: #fff!important;
  padding: 20rpx 30rpx!important;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 32rpx!important;
}
.linkman:active{
  background-color: #f2f2f2!important;
}
.linkman-lf{
  flex:1;
  display: flex;
}
.linkman-logo{
  overflow: hidden;
  height: 130rpx;
  width: 130rpx;
  min-width: 130rpx;
  margin-right: 24rpx;
}
.linkman-logo-img{
  width: 100%;
  height: 100%;
}

.linkman-bd{
  flex:1;
  display: flex;
  text-align: left;
  flex-direction: column;
}
.linkman-title{
  line-height: 50rpx;
  font-size: 35rpx;
  color: #000;
  margin-bottom: 20rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;

}
.linkman-info{
  color: #9b9b9b;
  white-space:nowrap;
  overflow-x:hidden;
  text-overflow:ellipsis;
  max-width:550rpx;
}

.linkman-rt{
  color: #c7c7cc;
}
</style>
