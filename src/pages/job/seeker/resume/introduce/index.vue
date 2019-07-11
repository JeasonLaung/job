<template>
  <div>
    <div class="edit-introduce"
    v-if="form.id">
      <div class="form-title">我们很确信，你拥有独特的个性</div>
      <div class="weui-cells weui-cells_after-title textarea-weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="编辑自我介绍，告诉别人你是不同的" maxlength="1000" style="height: 3.3em" @input="form.description = $event.target.value" :value="form.description"/> 
            <div class="weui-textarea-counter">{{form.description.length}}/1000</div>
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
import fixedBtn from '@/components/fixedBtn'
import {saveResumeIntroduce, readMyResume} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      form: {
        id: '',
        description: ''
      }
    }
  },
  methods: {
    save () {
      saveResumeIntroduce(this.form).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onLoad () {
    readMyResume().then(data => {
      this.form.description = data.description || ''
      this.form.id = data.id
    })
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
}
</style>
