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
          <div v-if="form.position.length > 0"  @click="form.position=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill"  size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input expect-place-input">
          <div class="weui-cell__hd">
            <div class="weui-label">期望城市</div></div>
          <div class="weui-cell__bd">
            <picker mode="region" fields="city" @change="bindRegionChange">
              <div class="picker-inner">
                <span class="placeholder" v-if="!form.area_id">请选择期望城市</span>
                  <span class="place" wx:else>{{form.area_name}}</span>
                    <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">期望月薪</div></div>
          <div class="weui-cell__bd">
            <picker mode="multiSelector" :range="salaryRange" @change="bindSalaryChange" @columnchange="columnchange">
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
    <fixedBtn
    @click="save"
    title="完成"
    />
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import {qqmapsdk} from '@/utils/mapsdk'
import fixedBtn from '@/components/fixedBtn'
import {readMyResume} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      salaryRange: [],
      salaryIndex: [],
      form: {
        position: '',
        work_date: '',
        area_id: '',
        area_name: '',
        salary_lowest: '',
        salary_highest: ''
      }
    }
  },
  methods: {
    save () {
    },
    columnchange (e) {
      let max = []
      let salaryRange = JSON.parse(JSON.stringify(this.salaryRange))
      if (e.target.column === 0) {
        for (var i = e.target.value; i < 20 + e.target.value; i++) {
          max.push(i)
        }
        salaryRange[1] = max
        this.salaryRange = salaryRange
      }
    },
    bindSalaryChange (e) {
      this.form.salary_lowest = e.target.value[0]
      this.form.salary_highest = this.salaryRange[1][e.target.value[1]]
    },
    bindRegionChange (e) {
      this.form.area_id = e.target.value[e.target.value.length - 1]
      this.form.area_name = e.target.value[e.target.value.length - 1]
    }
  },
  onLoad () {
    let min = []
    let _this = this
    for (var i = 0; i < 20; i++) {
      min.push(i)
    }
    this.salaryRange = [min, min]
    readMyResume().then(data => {
      this.form.position = data.position
      this.form.work_date = data.work_date
      this.form.area_id = data.area_id
      this.form.area_name = data.area_name
      this.form.salary_lowest = data.salary_lowest
      this.form.salary_highest = data.salary_highest
      console.log(data.area_name, data.area_name)
      if (!data.area_name) {
        qqmapsdk.reverseGeocoder({
          success (e) {
            console.log(e)
            _this.form.area_name = e.result.ad_info.district
            _this.form.area_id = e.result.ad_info.adcode
          }
        })
      }
    })
  }
}
</script>

<style>
</style>
