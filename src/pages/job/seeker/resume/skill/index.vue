<template>
  <div>
    <div class="edit-skill">
      <div class="form-title">这不是炫技，是你天生的能力</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell skill-box">
          <div class="skill" v-for="(item, index) in skills" :key="index">
            {{item}} 
            <i style="display:inline-block;color:#fff" class="iconfont icon-close-fill" size="15" @click.stop="delSkill(index)" />
          </div>
          <div class="btn-add" @click.stop="showModal = true">+ 添加</div>
        </div>
      </div>
      <fixedBtn
      title="完成"
      @click="handleSave"
      />
    </div>
    <modal
    v-if="showModal"
    title="添加技能"
    @confirm="skills.push(tmpSkill);tmpSkill = '';showModal=false"
    @cancel="tmpSkill = '';showModal=false">
      <input type="text" maxlength="15" style="border-bottom: 1rpx solid #aaa" :focus="showModal" @input="tmpSkill = $event.target.value">
    </modal>
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import fixedBtn from '@/components/fixedBtn'
import {readResumeSkill, saveResumeUnion} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      showModal: false,
      skills: [],
      tmpSkill: ''
    }
  },
  methods: {
    delSkill (index) {
      this.skills.splice(index, 1)
    },
    handleSave () {
      saveResumeUnion({skill: this.skills.join(',')}).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onLoad () {
    readResumeSkill().then(data => {
      this.skills = data.list || []
    })
  }
}
</script>

<style>
.skill-box{
  display: flex;
  flex-wrap:wrap;
  padding-bottom: 0;
  padding-top:28rpx;
}
.skill-box .skill{
  position: relative;
  height: 60rpx;
  line-height: 60rpx;
  padding-left:30rpx;
  padding-right: 30rpx;
  margin-right:18rpx;
  margin-bottom: 28rpx;
  font-size:26rpx;
  color:#ffffff;
  background-color:#53C68B;
  overflow: visible;
  border-radius: 6rpx;
}
.skill-box .skill .icon{
  position: absolute;
  top:-7.5px;
  right:-7.5px;
  width:15px;
  height: 15px;
  background-color:#fff;
  border-radius:50%;
}
.skill-box .btn-add{
  height: 60rpx;
  line-height: 60rpx;
  padding-left:30rpx;
  padding-right: 30rpx;
  margin-right:18rpx;
  margin-bottom: 28rpx;
  font-size:26rpx;
  color:#BFBFBF;
  border-radius: 6rpx;
  border:1rpx dashed #ccc;
}
.save-btn{
  margin-top:60rpx;
}
</style>
