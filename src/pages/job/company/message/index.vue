<template>
  <div>
    <!-- 轮播图 -->
    <swiper 
    class="banner"
    indicator-dots
    autoplay
    circular>
      <swiper-item 
      class="banner__item"
      v-for="(item,index) in banners"
      :key="index">
        <img :src="item.photo" mode="aspectFill" class="banner__item_img">
      </swiper-item>
    </swiper>

    <!-- 宫格 -->
    <i-row class="grid">
      <a
        v-for="(item,index) in grids"
        :key="index"
        :href="item.path"
      >
        <i-col 
        span="6" 
        i-class="grid__item"
        >
          <img :src="item.logo" mode="aspectFill" class="grid__item_img">
          <div class="grid__item_text">{{item.title}}</div>
        </i-col>
      </a>
    </i-row>

    <!-- 列表 -->
    <i-load-more :loading="false" i-class="custom-load-more" tip="热门企业" />
    <i-cell title="企业名称" is-link></i-cell>
    <i-cell title="企业名称" is-link></i-cell>
    <i-cell title="企业名称" is-link></i-cell>
    <i-cell title="企业名称" is-link></i-cell>
    <i-load-more :loading="false" i-class="custom-load-more" tip="关注职位" />
    <i-cell title="企业名称" is-link value="岗位"></i-cell>
    <i-cell title="企业名称" is-link value="岗位"></i-cell>
    <i-cell title="企业名称" is-link value="岗位"></i-cell>

  </div>
</template>

<script>
// import {banners} from '@/data'
import {banner} from '@/api'
export default {
  components: {
  },

  data () {
    return {
      banners: [],
      grids: [
        {
          'title': '找工作',
          'logo': 'https://i.52112.com/icon/256/20190524/40929/1934905.png',
          'path': '/pages/job-find/main'
        },
        {
          'title': '招人才',
          'logo': 'https://i.52112.com/icon/256/20190524/40929/1934905.png',
          'path': '/pages/job-recruit/main'
        },
        {
          'title': '招聘资讯',
          'logo': 'https://i.52112.com/icon/256/20190524/40929/1934905.png',
          'path': '/pages/job-news/main'
        },
        {
          'title': '求职功略',
          'logo': 'https://i.52112.com/icon/256/20190524/40929/1934905.png',
          'path': '/pages/job-guide/main'
        }
      ]
    }
  },

  onLoad () {
    banner({code: 'job'}).then(data => {
      this.banners = data
    })
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
