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
          @error="logoError = false"
          :src="one.avatar || '/static/images/default_avatar2.png'"
          mode="aspectFill"
          class="linkman-logo-img"
          lazy-load
          >
        </div>
        <div v-else class="linkman-logo" :class="['default-'+type]">
        </div>
        <div class="linkman-bd">
          <div class="linkman-title">
            <div>{{one.name}}</div>
            <div style="color:orangered;font-weight:bolder">{{one.salary_lowest}}k-{{one.salary_highest}}k</div>
          </div>
          <div class="linkman-info">
            <div class="kind" style="margin-bottom:10rpx;">
              <div class="kind_item" v-if="one.area_name"><i class="iconfont icon-location-fill" style="display:inline;color:#40B1F0"></i>{{one.area_name}}</div>
              <div class="kind_item" v-if="one.position">{{one.position}}</div>
            </div>
          </div>
          <div>
            <i-tag class="i-custom-tag" color="blue" v-if="one.education_name">{{one.education_name}}</i-tag>
            <i-tag color="blue" >{{one.experience_year ? (one.experience_year + '年经验') : '不足一年经验'}}</i-tag>
          </div>
        </div>
      </div>
    </button>
  </form>
</template>

<script>
export default {
  props: {
    one: {
      type: Object,
      default: {}
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

<style scoped>
.i-custom-tag{
  margin-right: 20rpx;
}
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
  padding: 20rpx 30rpx;
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
  display: flex;
  justify-content: space-between;
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
