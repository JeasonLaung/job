<template>
  <div class="work-history">
  <div class="form-title">那些年，总有说不完的故事</div>
  <div class="add-work-wrap">
    <!-- 学校名称等 -->
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input work-company-input">
        <div class="weui-cell__hd">
          <div class="weui-label">学校名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入学校名称" v-model="education.school_name" data-type="1" data-event="input"/>
        </div>
        <div v-if="education.school_name.length > 0" @click="education.school_name=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
        </div>
      </div>
      <div class="weui-cell weui-cell_input position-input">
        <div class="weui-cell__hd">
          <div class="weui-label">专业名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入专业名称" name="position" v-model="education.subject" data-type="2" data-event="input" />
        </div>
        <div v-if="education.subject.length > 0" @click="education.subject=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
        </div>
      </div>
      <div class="weui-cell weui-cell_input profess-input">
        <div class="weui-cell__hd">
          <div class="weui-label">学历</div></div>
        <div class="weui-cell__bd">
          <picker :value="professIndex" :range="professional" range-key="name" @change="professIndex=$event.target.value;education.education_id=professional[$event.target.value].id;">
            <div class="profess picker-inner">
              <span class="placeholder" v-if="education.education_id === null || education.education_id === ''">请选择学历</span>
                <span class="profess-val" v-else>{{professional[professIndex].name}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
    </div>
    <!-- 开始时间等 -->
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input start-date-input">
        <div class="weui-cell__hd">
          <div class="weui-label">开始时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" fields="month" :value="education.in_time" start="1970-01-01" :end="beginDate" @change="education.in_time = $event.target.value">
            <div class="start-date picker-inner">
              <span class="placeholder" v-if="!education.in_time">请选择开始时间</span>
                <span class="date" wx:else>{{education.in_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input end-date-input">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div></div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" fields="month" :value="education.out_time" :start="education.in_time" :end="endDate" :disabled="education.out_time === '至今'" @change="education.out_time = $event.target.value">
            <div class="end-date picker-inner">
              <span class="placeholder" v-if="!education.out_time">请选择结束时间</span>
                <span class="date" wx:else>{{education.out_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input ongoing">
        <div class="weui-cell__hd">
          <div class="weui-label">目前在读</div></div>
        <div class="weui-cell__bd" @click.stop="education.out_time ==='至今' ? education.out_time = '' : education.out_time = '至今'">
          <label class="weui-cell weui-check__label">
            <checkbox-group>
              <checkbox :checked="education.out_time==='至今'">是</checkbox>
            </checkbox-group>
          </label>
        </div>
      </div>
    </div>
    <!-- 描述 -->
    <div class="weui-cells weui-cells_after-title spanarea-weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="教育描述" maxlength="1000" style="height: 3.3em" v-model="education.description" />
          <div class="weui-spanarea-counter">{{education.description.length}}/1000</div></div>
      </div>
    </div>
    <!-- 其他 -->
    <button class="del-btn btn-w690" type="danger" style="color:#fff" @click="del" v-if="education.id != 0">删除该条教育经历</button></div>
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
import {readResumeEducation, saveResumeEducation, optionsEducation, deleteResumeEducation} from '@/api/job'
import {date} from '@/utils'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      wordNumber: 0,
      professional: [
        {
          id: 1,
          name: '初中及以下'
        },
        {
          id: 2,
          name: '中技/高中/中专'
        },
        {
          id: 3,
          name: '大专'
        },
        {
          id: 4,
          name: '本科'
        },
        {
          id: 5,
          name: '硕士'
        },
        {
          id: 6,
          name: '博士'
        },
        {
          id: 7,
          name: '其他'
        }
      ],
      professIndex: 0,
      education: {
        id: 0,
        school_name: '',
        subject: '',
        education_id: '', // 未选择学历默认为-1
        in_time: '',
        out_time: '',
        description: ''
      }
    }
  },
  methods: {
    del () {
      let id = this.options['id']
      deleteResumeEducation({id}).then(() => {
        mpvue.navigateBack()
      })
    },
    handleSave () {
      saveResumeEducation(this.education).then(data => {
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
    optionsEducation().then(data => {
      this.professional = data.list
    })
    if (id) {
      readResumeEducation({id}).then(data => {
        this.education = data
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
