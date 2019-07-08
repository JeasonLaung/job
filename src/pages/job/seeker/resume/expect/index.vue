<template>
  <div> 
    <div class="aspiration">
      <div class="form-title">告诉我们你更想成为的那个</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input expect-position-input">
          <div class="weui-cell__hd">
            <div class="weui-label">期望职能</div></div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请填写期望职能" v-model="form.position" /></div>
          <div class="weui-icon-clear" v-if="form.position.length > 0"  @click="form.position=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill"  size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input expect-place-input">
          <div class="weui-cell__hd">
            <div class="weui-label">期望城市</div></div>
          <!-- <div class="weui-cell__bd">
            <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
              <div class="picker-inner">
                <span class="placeholder" v-if="!form.area_id">请选择期望城市</span>
                  <span class="place" wx:else>{{region[0]}} {{region[1]}}</span>
                    <span class="arrow-right"></span>
              </div>
            </picker>
          </div> -->
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">期望月薪</div></div>
          <div class="weui-cell__bd">
            <picker mode="multiSelector" :range="salaryRange" :value="[form.salary_lowest, form.salary_highest]" @change="bindSalaryChange" @columnchange="columnchange">
              <div class="sex picker-inner">
                <span class="placeholder" v-if="!form.salary_lowest">请选择期望月薪范围</span>
                  <span class="sex-val" wx:else>{{form.salary_lowest}}k - {{form.salary_highest}}k</span>
                    <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
      </div>
    </div>
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import {readMyResume} from '@/api/job'
export default {
  components: {
  },

  data () {
    return {
      salaryRange: [],
      form: {
        position: '',
        work_date: '',
        area_id: '',
        salary_lowest: '',
        salary_highest: ''
      }
    }
  },
  methods: {
    columnchange (e) {
      console.log(e.target.column)
      console.log(e.target.value)
      let max = []
      let salaryRange = JSON.parse(JSON.stringify(this.salaryRange))
      if (e.target.column === 0) {
        for (var i = e.target.value; i < 20 + e.target.value; i++) {
          max.push(i)
          console.log(i)
        }
        console.log(max)
        salaryRange[1] = max
        this.salaryRange = salaryRange
      }
    },
    bindSalaryChange (e) {
      [this.form.salary_lowest, this.form.salary_highest] = e.target.value
    }
  },
  onLoad () {
    let min = []
    for (var i = 0; i < 20; i++) {
      min.push(i)
    }
    this.salaryRange = [min, min]
    readMyResume().then(data => {
    })
  }
}
</script>

<style>
</style>
