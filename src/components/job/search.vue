<template>
  <div class="m-search" :class="{'m-search-fixed':fixed}">
    <div class="m-search-header">
      <slot name="left"></slot>
    </div>
    <div class="m-search-body">
      <input 
      type="text" 
      @confirm="$emit('confirm', $event.target.value)"
      @input="$emit('change', $event.target.value);value = $event.target.value"
      @focus="focus = true"
      @blur="focus = false"
      placeholder="输入关键字搜索" 
      :value="value"/>
    </div>
    <div
    class="m-search-footer"
    v-show="value">
      <div @click="value='';$emit('change', '');$emit('confirm', '')">
        取消
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    fixed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      focus: false
    }
  },
  mixins: [],
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.m-search-fixed{
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  z-index: 99;
}
.m-search{
  background:#fff;
  display:flex;
  line-height:70rpx;
  padding:15rpx;
  border-bottom:1rpx solid #eee;
}
.m-search-body{
  flex:1;
}
.m-search-body input{
  width:calc(100% - 60rpx);
  height: 70rpx;
  background:#eee;
  border-radius:40rpx;
  padding:0 30rpx;
  font-size:35rpx;
}

.m-search-footer{
  min-width:100rpx;
  transition: width .5s;
  text-align:center;
}
.m-search-header{
  text-align:center;
  min-width: 140rpx;
  max-width:140rpx;
  overflow:hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
</style>
