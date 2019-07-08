<template>
  <div v-if="one" @click="$go('/pages/newsDetail/main?id='+one.id)">
    <!-- 多图 -->
    <div 
    class="s-news"
    v-if="photos.length >= 3 || photos.length === 0">
      <!-- 标题 -->
      <div class="s-news__title">
        {{one.post_title}}
      </div>

      <!-- 图片集 -->
      <div class="s-news__photos">
        <img 
        v-for="(item,index) in photos"
        :key="index"
        lazy-load
        :src="item"
        mode="aspectFill"
        class="s-news__photos_item"
        >
      </div>

      <!-- 脚 -->
      <div class="s-news__footer">
        <div class="s-news__footer_type">
          <span v-if="one.post_keywords">{{one.post_keywords}}</span>
        </div>
        <div>
          {{create_time}}
        </div>
      </div>
    </div>

    <!-- 少于两图 -->
    <div 
    class="s-news"
    style="display:flex;"
    v-else>
      <div class="s-news-left">
        <!-- 标题 -->
        <div class="s-news__title">
          {{one.post_title}}
        </div>
        <!-- 脚 -->
        <div class="s-news__footer">
          <div class="s-news__footer_type">
            <span v-if="one.post_keywords">{{one.post_keywords}}</span>
          </div>
          <div>
            {{create_time}}
          </div>
        </div>
      </div>
      
      <!-- 图片 -->
      <div class="s-news__photos">
        <img 
        :src="photos[0]"
        mode="aspectFill"
        lazy-load
        class="s-news__photos_item"
        >
      </div>
    </div> 
  </div>
</template>

<script>
import {wxtime} from '@/utils'
export default {
  props: ['one'],
  data () {
    return {
      photos: []
    }
  },
  mounted () {
    if (this.one.thumbnail) {
      this.photos = [this.one.thumbnail]
    } else if (this.one.photos) {
      let tmp = []
      for (let i in this.one.photos) {
        tmp.push(this.one.photos[i].url)
      }
      this.photos = tmp
    } else {
      this.photos = []
    }
  },
  computed: {
    create_time () {
      return wxtime(this.one.create_time)
    }
  }
}
</script>

<style>
.s-news{
  color: #444;
  padding: 30rpx 30rpx 30rpx;
  position: relative;
}
.s-news::after{
  position: absolute;
  content: "";
  display: block;
  bottom: 0;
  left: 30rpx;
  right: 0rpx;
  border-bottom: 1rpx solid #eee;
}
.s-news:active{
  background-color: #f2f2f2;
}

.s-news-left{
  margin-right: 20rpx;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.s-news-left .s-news__photos{
  margin: 0;
}

.s-news__title{
  font-size: 35rpx;
}
/* 图片集 */
.s-news__photos{
  margin: 20rpx 0;
  display: flex;
}
.s-news__photos_item{
  width: 220rpx;
  height: 128rpx;
  margin-right: 20rpx;
}


/* 脚 */
.s-news__footer{
  line-height: 40rpx;
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  color: #aaa;
  font-size: 25rpx;
}
.s-news__footer_type{
  text-align: center;
  padding: 0 20rpx;
  min-width: 90rpx;
  color: #40B1F0;
  border-radius: 45rpx;
  border: 1rpx solid #40B1F0;
  font-size: 30rpx;
  margin-right: 40rpx;
}

</style>
