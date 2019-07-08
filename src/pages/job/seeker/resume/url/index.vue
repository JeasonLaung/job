<template>
  <div>
    <div class="edit-link">
      <div class="form-title">我们想了解不止一面的你</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input link-input">
          <div class="weui-cell__hd">
            <div class="weui-label">网址</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请填写网站地址" data-event="input"v-model="form.link" />
          </div>
          <div v-if="form.link.length > 0"  @click="form.link=''">
            <i style="display:inline-block;color:#aaa" class="iconfont icon-close-fill" size="14"/>
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title textarea-weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="描述" maxlength="1000" style="height: 3.3em" v-model="form.link_desc" />
            <div class="weui-textarea-counter">{{form.link_desc.length}}/1000
            </div>
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
import fixedBtn from '@/components/fixedBtn'
import {saveResumeUrl, readMyResume} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      form: {
        link: '',
        link_desc: ''
      }
    }
  },
  methods: {
    save () {
      saveResumeUrl(this.form).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onLoad () {
    readMyResume().then(data => {
      this.form.link = data.link
      this.form.link_desc = data.link_desc
    })
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
}
</style>
