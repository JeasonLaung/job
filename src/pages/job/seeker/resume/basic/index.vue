<template>
  <div
  v-if="form.id">
    <div class="base-info">
      <div class="form-title">
        让我们更好的认识你吧
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              姓名
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名" name="name"
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
              生日
            </div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" fields="month" :value="form.birthday"
            start="1960-01" end="2018-12" @change="form.birthday = $event.target.value">
              <div class="birthday picker-inner">
                <span class="placeholder" v-if="!form.birthday">
                  请选择出生年月
                  </span>
                  <span class="date" wx:else>
                    {{form.birthday}}
                  </span>
                  <span class="arrow-right"></span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input sex-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              性别
            </div>
          </div>
          <div class="weui-cell__bd">
            <picker :value="sexIndex" :range="sexArr" range-key="name" @change="form.sex = $event.target.value">
              <div class="sex picker-inner">
                <span class="placeholder" v-if="form.sex != 1 && form.sex != 2">
                请选择性别
                </span>
                <span class="sex-val" wx:else>
                  {{sexArr[form.sex].name}}
                </span>
                <span class="arrow-right">
                </span>
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input email-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              邮箱
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input"
            placeholder="请输入邮箱"
            name="email" v-model="form.email" />
          </div>
          <div v-if="form.email.length > 0" @click="form.email=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input phone-input">
          <div class="weui-cell__hd">
            <div class="weui-label">
              手机号
            </div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" 
            placeholder="请输入手机号" 
            maxlength="11"
            name="phone"
            type="number"
            :value="form.mobile"
            @input="form.mobile=$event.target.value"
            />
          </div>
          <div v-if="form.mobile.length > 0" @click="form.mobile=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14" />
          </div>
        </div>
      </div>
      <fixedBtn
      title="完成"
      @click="save"
      />
    </div>
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import fixedBtn from '@/components/fixedBtn'
import {readResumeBasic, saveResumeBasic} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      form: {
        id: '',
        mobile: '',
        email: '',
        sex: 0,
        birthday: '',
        name: ''
      },
      sexArr: [
        {
          name: '不设置'
        },
        {
          name: '男'
        },
        {
          name: '女'
        }
      ]
    }
  },
  computed: {
    // legalEmail () {
    //   return !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.form.email)
    // },
    // legalPhone () {
    //   return !/^1[3-9]{1}\d{9}$/.test(this.form.mobile)
    // }
  },
  methods: {
    save () {
      saveResumeBasic(this.form).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onLoad () {
    readResumeBasic().then(data => {
      this.form = data
    })
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
}
</style>
