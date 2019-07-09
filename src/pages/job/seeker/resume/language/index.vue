<template>
  <div>
    <div class="language-wrap">
      <div class="form-title">沟通也是门手艺</div>
      <div class="weui-cells weui-cells_after-title" v-for="(item, index) in model" :key="index">
        <div class="weui-cell weui-cell_input name-input">
          <div class="weui-cell__hd">
              <div class="weui-label">语种</div>
          </div> 
          <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请填写语种名称" name="languageSkill" :value="item.title" @input="model[index].title=$event.target.value" />
          </div>
          <div v-if="item.title.length > 0" @click="model[index].title=''">
            <i class="iconfont icon-close-fill" style="color:#aaa"></i>
          </div>
        </div>
         <div class="weui-cell weui-cell_input level-input">
             <div class="weui-cell__hd">
                <div class="weui-label">掌握程度</div>
            </div> 
            <div class="weui-cell__bd">
                <picker :value="item.levelIndex" :range="langLevels" range-key="level_name" @change="model[index].level_name=langLevels[$event.target.value].level_name;model[index].levelIndex=$event.target.value">
                    <div class="level picker-inner">
                      <span class="level-val">{{langLevels[item.levelIndex].level_name}}</span>
                      <span class="arrow-right"></span>
                    </div> 
                </picker>
            </div>
        </div>
        <div class="weui-cell weui-cell_input delete">
          <div class="weui-cell__bd">
              <div class="weui-input" @click="model.splice(index, 1)">删除</div>
          </div>  
        </div>
      </div>
      <div class="add-btn" @click="model.push({levelIndex: 0,title:'',level_name:0})">
        <div class="icon-cross"></div>
        <span class="word" >添加一条语言</span>
      </div>
      <fixedBtn
      title="完成"
      @click="handleSave"
      />
  </div>
    <i-toast id="toast"></i-toast>
    <i-message id="message"></i-message>
  </div>
</template>

<script>
import fixedBtn from '@/components/fixedBtn'
import {readResumeLanguage, saveResumeUnion} from '@/api/job'
export default {
  components: {
    fixedBtn
  },

  data () {
    return {
      fansId: '',
      langLevels: [
        {
          level_name: '初级(入门)',
          level_id: 1
        },
        {
          level_name: '中级(日常会话)',
          level_id: 2
        },
        {
          level_name: '中高级(商务会话)',
          level_id: 3
        },
        {
          level_name: '高级(无障碍商务沟通)',
          level_id: 4
        }
      ],
      model: [] // languageSkill:技能; levelIndex: 数组langLevels的索引值
    }
  },
  methods: {
    handleSave () {
      for (let i in this.model) {
        if (!this.model[i].title) {
          return this.$Toast({
            content: '语种名称不能为空'
          })
        }
      }
      saveResumeUnion({lang: JSON.stringify(this.model)}).then(data => {
        mpvue.navigateBack()
      })
    }
  },
  onLoad () {
    readResumeLanguage().then(data => {
      try {
        this.model = JSON.parse(data)
      } catch (e) {
        this.model = []
      }
    })
  }
}
</script>

<style>
page{
  background-color: #f1f5f8;
}
.weui-cells{
  margin-bottom: 24rpx;
}
.level-input .weui-label::before{
  display: none;
}
.delete{
  font-size: 34rpx;
  color: #F96868;
}
.add-btn{
  display: flex;
  align-items: center;
  height: 110rpx;
  padding-left:25rpx;
  margin-top:24rpx;
  background-color: #ffffff;
  border-top:1rpx solid #e5e5e5;
  border-bottom:1rpx solid #e5e5e5;
  color: #5AA2E7;
  font-size:32rpx;
 
}
.add-btn .icon-cross{
  margin-right:30rpx;
}
</style>
