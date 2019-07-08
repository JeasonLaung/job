<template>
  <form 
  @submit="$collect"
  report-submit
  >
    <button
    form-type="submit"
    @click.stop="$emit('click')"
    @getUserInfo="$getUserInfo"
    style="margin: 20rpx 30rpx 0;box-shadow: 0 0 20rpx rgba(161,175,201,.3)"
    class="init">
      <div class="m-job" 
      v-if="one.id">
        <div class="m-job__header">
          <div class="m-job__header_title">
            {{one.name}}
          </div>
          <div 
          v-if="one.salary_highest"
          class="m-job__header_salary"
          >
            {{one.salary_lowest}}-{{one.salary_highest}}k
          </div>
          <div
          v-else>
            <div 
            v-if="!one.salary_lowest && !one.salary_highest"
            class="m-job__header_salary"
            >
              面议
            </div>
            <div 
            v-else
            class="m-job__header_salary"
            >
              {{one.salary_lowest}}k+
            </div>
          </div>
        </div>
        <div class="m-job__header__middle">
          <div class="m-job__header_kind">
            <div class="m-job__header_kind_item"
            v-if="one.area_name">
              {{one.area_name}}
            </div>
            <div class="m-job__header_kind_item">
              {{one.experience_name || '经验不限'}}
            </div>
            <div class="m-job__header_kind_item">
              {{one.education_name || '学历不限'}}
            </div>
          </div>
          <div style="color:#999">
            {{create_time}}
          </div>
        </div>
        
        <div class="m-job__company" v-if="!simple">
          <div class="photo-default m-job__company_logo">
            <img 
            :src="one.logo" 
            mode="aspectFill"
            lazy-load>
          </div>

          <div class="m-job__company_info">
            <div class="m-job__company_info_title">
              {{one.company_name}}
            </div>
            <div class="m-job__company_info_content">
              <div class="tag"
              v-if="one.type_name">
                {{one.type_name}}
              </div>
              <div class="tag"
              v-if="one.industry_name !== '不限' && one.industry_name">
                {{one.industry_name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  </form>
  
</template>

<script>
import {wxtime} from '@/utils'
export default {
  props: {
    simple: {
      type: Boolean,
      default: false
    },
    one: {
      type: Object,
      default: {}
    }
  },
  computed: {
    create_time () {
      return wxtime(this.one.create_time)
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {}
}
</script>

<style scoped>
.tag{
  display: inline-block;
  border-radius: 10rpx;
  background-color: #40B1F0;
  color: #fff;
  padding: 7rpx 10rpx;
  margin-right: 20rpx
}
.m-job{
  padding: 30rpx 30rpx 0;
  font-size: 25rpx;
  background-color: #fff;
  border-radius: 5rpx;
  border: 1rpx solid #eee;
  /* font-weight: bold; */
}
.m-job:active{
  background-color: #f2f2f2;
}
.m-job__header{
  line-height: 37rpx;
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.m-job__header_title{
  font-size: 37rpx;
}
.m-job__header_salary{
  font-size: 30rpx;
  color: #e37859;
}
.m-job__header__middle{
  margin: 22rpx 0;
  display: flex;
  justify-content: space-between;
}
.m-job__header_kind{
  color: #666;
  display: flex;
}
.m-job__header_kind_item{
}
.m-job__header_kind_item::after{
  content: '|';
  display: inline-block;
  margin: 0 15rpx;
  color: #666;

}
.m-job__header_kind_item:last-child::after{
  content: '';
}
.m-job__company{
  height: 115rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #eee;
}
.m-job__company_logo{
  height: 80rpx;
  width: 80rpx;
}
.m-job__company_info{
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.m-job__company_info_title{
  font-size: 30rpx;
  margin-bottom: 12rpx;
}
.m-job__company_info_content{
  display: flex;
  font-size: 25rpx;
  color: #999;
}
</style>
