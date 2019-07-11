<template>
  <div>
    <div>
      <div class="form-title">
        纳天下英才，创业界辉煌
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              岗位名称
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入岗位名称" name="name"
            v-model="form.name"
             />
          </div>
          <div v-if="form.name.length > 0" @click="form.name=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input birthday-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              岗位类型
            </div>
          </div>
          <div class="weui-cell__bd" @click="$go('/pages/chooseType/main?type=temp')">
            <div class="picker-inner">
              <span class="date" v-if="form.type_name">
                {{form.type_name}}
              </span>
              <span class="placeholder" wx:else>
                请选择类型
              </span>
              <span class="arrow-right"></span>
            </div>
          </div>
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              月薪
            </div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="multiSelector" :range="salaryRange" @change="bindSalaryChange" @columnchange="columnchange">
              <div class="sex picker-inner">
                <span class="placeholder" v-if="!form.salary_highest">请选择期望月薪范围</span>
                <span class="sex-val" wx:else>{{form.salary_lowest}}k - {{form.salary_highest}}k</span>
                <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              经验要求
            </div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="selector" :value="expIndex" :range="expArr" range-key="name" @change="form.experience_id=expArr[$event.target.value].id;expIndex=$event.target.value">
              <div class="sex picker-inner">
                <span class="placeholder" v-if="!form.experience_id">请选择经验要求</span>
                <span class="sex-val" wx:else>{{expArr[expIndex].name}}</span>
                <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              学历要求
            </div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="selector" :value="eduIndex" :range="eduArr" range-key="name" @change="form.education_id=eduArr[$event.target.value].id;eduIndex=$event.target.value">
              <div class="sex picker-inner">
                <span class="placeholder" v-if="!form.education_id">请选择学历要求</span>
                <span class="sex-val" wx:else>{{eduArr[eduIndex].name}}</span>
                <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input salary-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              工作地点
            </div>
          </div>
          <div class="weui-cell__bd" @click="chooseLocation">
            <div class="picker-inner">
              <span class="date" v-if="form.address" style="white-space: nowrap">
                {{form.address}}
              </span>
              <span class="placeholder" wx:else>
                请选择工作地点
              </span>
              <span class="arrow-right"></span>
            </div>
          </div>
        </div>
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              招聘人数
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入招聘人数" name="work_number"
            v-model="form.work_number"
             />
          </div>
          <div v-if="form.work_number.length > 0" @click="form.work_number=1">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              电话
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入电话（不填默认本机）" name="mobile"
            v-model="form.phone"
             />
          </div>
          <div v-if="form.phone.length > 0" @click="form.phone=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              联系人
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入联系人（不填默认自己）" name="name"
            v-model="form.contact"
             />
          </div>
          <div v-if="form.contact.length > 0" @click="form.contact=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入岗位职责" maxlength="1000" style="height: 3.3em" v-model="form.description" /> 
            <div class="weui-textarea-counter">{{form.description.length}}/1000</div>
          </div>
        </div>
      </div>
    </div>
    <fixedBtn
    title="完成"
    @click="save"
    />
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import {readJob, educationType, experienceType, saveJob} from '@/api/job'
import {qqmapsdk} from '@/utils/mapsdk'
import typeStore from '@/pages/chooseType/store'
import cityStore from '@/pages/chooseCity/store'
import fixedBtn from '@/components/fixedBtn'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      expIndex: 0,
      eduIndex: 0,

      options: {},
      salaryRange: [],
      form: {
        type_id: '',
        area_id: '',
        experience_id: '',
        education_id: '',
        name: '',
        work_number: 1,
        lat: '',
        lng: '',
        address: '',
        description: '',
        salary_lowest: '',
        salary_highest: '',
        phone: '',
        contact: ''
      },
      eduArr: [],
      expArr: []
    }
  },
  methods: {
    chooseLocation () {
      let _this = this
      mpvue.chooseLocation({
        success ({latitude, longitude}) {
          qqmapsdk.reverseGeocoder({
            location: `${latitude},${longitude}`,
            success (e) {
              _this.form.area_id = e.result.ad_info.adcode
              _this.form.lat = latitude
              _this.form.lng = longitude
              _this.form.address = e.result.address
            }
          })
        }
      })
    },
    bindSalaryChange (e) {
      this.form.salary_lowest = this.salaryRange[0][e.target.value[0]]
      this.form.salary_highest = this.salaryRange[1][e.target.value[1]]
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
    save () {
      saveJob(this.form).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onShow () {
    if (!this.loaded) {
      return false
    }
    let typeId = typeStore.state.typeTemp.id
    let typeName = typeStore.state.typeTemp.name
    if (typeId) {
      this.form.type_id = typeId
      this.form.type_name = typeName
    }
  },
  onLoad (options) {
    let min = []
    for (var i = 0; i < 20; i++) {
      min.push(i)
    }
    this.loaded = true
    this.options = options
    this.salaryRange = [min, min]
    if (options['id']) {
      readJob(options).then(data => {
        this.form = data
      })
    }
    educationType().then(data => {
      this.eduArr = data
    })
    experienceType().then(data => {
      this.expArr = data
    })
  },
  onUnload () {
    typeStore.commit('clearTypeTemp')
    cityStore.commit('clearCityTemp')
    Object.assign(this, this.$options.data())
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
  text-overflow: ellipsis;
}
</style>
