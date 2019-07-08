<template>
  <div class="work-history">
  <div class="form-title">有哪些有趣或牛逼的事情也说说吧</div>
  <div class="add-work-wrap">
    <!-- 学校名称等 -->
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input work-company-input">
        <div class="weui-cell__hd">
          <div class="weui-label">项目名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="你参加了什么项目？" v-model="project.title" data-type="1" data-event="input"/>
        </div>
        <div v-if="project.title.length > 0" @click="project.title=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
        </div>
      </div>
      <div class="weui-cell weui-cell_input position-input">
        <div class="weui-cell__hd">
          <div class="weui-label">项目职责</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入项目职责" name="position" v-model="project.duty" data-type="2" data-event="input" />
        </div>
        <div v-if="project.duty.length > 0" @click="project.duty=''">
          <i style="display:inline-block;color:#aaa"  class="iconfont icon-close-fill" size="14" /></i>
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
          <picker class="weui-btn" mode="date" fields="month" :value="project.begin_time" start="1970-01-01" :end="beginDate" @change="project.begin_time = $event.target.value">
            <div class="start-date picker-inner">
              <span class="placeholder" v-if="!project.begin_time">请选择开始时间</span>
                <span class="date" wx:else>{{project.begin_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input end-date-input">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div></div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" fields="month" :value="project.end_time" :start="project.end_time" :end="endDate" :disabled="project.end_time === '至今'" @change="project.end_time = $event.target.value">
            <div class="end-date picker-inner">
              <span class="placeholder" v-if="!project.end_time">请选择结束时间</span>
                <span class="date" wx:else>{{project.end_time}}</span>
                  <span class="arrow-right"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input ongoing">
        <div class="weui-cell__hd">
          <div class="weui-label">进行中</div></div>
        <div class="weui-cell__bd" @click.stop="project.end_time ==='至今' ? project.end_time = '' : project.end_time = '至今'">
          <label class="weui-cell weui-check__label">
            <checkbox-group>
              <checkbox :checked="project.end_time==='至今'">是</checkbox>
            </checkbox-group>
          </label>
        </div>
      </div>
    </div>
    <!-- 描述 -->
    <div class="weui-cells weui-cells_after-title spanarea-weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="项目描述" maxlength="1000" style="height: 3.3em" v-model="project.description" />
          <div class="weui-spanarea-counter">{{project.description.length}}/1000</div></div>
      </div>
    </div>
    <!-- 其他 -->
    <button class="del-btn btn-w690" type="danger" style="color:#fff" @click="del" v-if="project.id != 0">删除该条项目经验</button></div>
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
import {readResumeProject, saveResumeProject, deleteResumeProject} from '@/api/job'
import {date} from '@/utils'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      wordNumber: 0,
      project: {
        id: 0,
        duty: '',
        title: '',
        begin_time: '',
        end_time: '',
        description: ''
      }
    }
  },
  methods: {
    del () {
      let id = this.options['id']
      deleteResumeProject({id}).then(() => {
        mpvue.navigateBack()
      })
    },
    handleSave () {
      saveResumeProject(this.project).then(data => {
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
      readResumeProject({id}).then(data => {
        this.project = data
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
