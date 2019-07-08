<template>
  <div class="work-history">
  <div class="form-title">每一次，都是全新的蜕变</div>
  <div class="add-work-wrap">
    <!-- 学校名称等 -->
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input work-company-input">
        <div class="weui-cell__hd">
          <div class="weui-label">公司名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入公司名称" v-model="experience.company_name" data-type="1" data-event="input"/>
        </div>
        <div v-if="experience.company_name.length > 0" @click="experience.school_name=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
        </div>
      </div>
      <div class="weui-cell weui-cell_input position-input">
        <div class="weui-cell__hd">
          <div class="weui-label">职位名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入职位名称" name="position" v-model="experience.position" data-type="2" data-event="input" />
        </div>
        <div v-if="experience.position.length > 0" @click="experience.position=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
        </div>
      </div>
    </div>
    <!-- 开始时间等 -->
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input start-date-input">
        <div class="weui-cell__hd">
          <div class="weui-label">入职时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" fields="month" :value="experience.in_time" start="1970-01-01" :end="beginDate" @change="experience.in_time = $event.target.value">
            <div class="start-date picker-inner">
              <span class="placeholder" v-if="!experience.in_time">请选择入职时间</span>
                <span class="date" wx:else>{{experience.in_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input end-date-input">
        <div class="weui-cell__hd">
          <div class="weui-label">离职时间</div></div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" fields="month" :value="experience.out_time" :start="experience.in_time" :end="endDate" :disabled="experience.out_time === '至今'" @change="experience.out_time = $event.target.value">
            <div class="end-date picker-inner">
              <span class="placeholder" v-if="!experience.out_time">请选择离职时间</span>
                <span class="date" wx:else>{{experience.out_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input ongoing">
        <div class="weui-cell__hd">
          <div class="weui-label">目前在职</div></div>
        <div class="weui-cell__bd" @click.stop="experience.out_time ==='至今' ? experience.out_time = '' : experience.out_time = '至今'">
          <label class="weui-cell weui-check__label">
            <checkbox-group>
              <checkbox :checked="experience.out_time==='至今'">是</checkbox>
            </checkbox-group>
          </label>
        </div>
      </div>
    </div>
    <!-- 描述 -->
    <div class="weui-cells weui-cells_after-title spanarea-weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="工作描述" maxlength="1000" style="height: 3.3em" v-model="experience.description" />
          <div class="weui-spanarea-counter">{{experience.description.length}}/1000</div></div>
      </div>
    </div>
    <!-- 其他 -->
    <button class="del-btn btn-w690" type="danger" style="color:#fff" @click="del" v-if="experience.id != 0">删除该条工作经验</button></div>
    <fixedBtn
    @click="handleSave"
    title="完成"
    />
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import fixedBtn from '@/components/fixedBtn'
import {readResumeExperience, saveResumeExperience, deleteResumeExperience} from '@/api/job'
import {date} from '@/utils'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      wordNumber: 0,
      experience: {
        id: 0,
        company_name: '',
        position: '',
        in_time: '',
        out_time: '',
        description: ''
      }
    }
  },
  methods: {
    del () {
      let id = this.options['id']
      deleteResumeExperience({id}).then(() => {
        mpvue.navigateBack()
      })
    },
    handleSave () {
      saveResumeExperience(this.experience).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  computed: {
    endDate () {
      let t = new Date()
      let y = t.getFullYear() + 4
      return `${y}-12-31`
    },
    beginDate () {
      let t = new Date()
      return date(t, 'yyyy-MM-dd')
    }
  },
  onLoad (options) {
    let id = options['id']
    this.options = options
    if (id) {
      readResumeExperience({id}).then(data => {
        this.experience = data
      })
    }
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
}
.weui-cells_after-title{
  margin-bottom: 24rpx;
}
.ongoing .weui-label::before{
  display: none;
}
.del-btn{
  margin-top:30rpx;
  background-color: #D64949!important;
}
.cue{
  font-size:22rpx;
  color:#FF19FC;
  span-align: center;
  margin-top:42rpx;
  margin-bottom: 70rpx;
}
</style>
