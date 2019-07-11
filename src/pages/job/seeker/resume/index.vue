<template>

<div class="edit-prediv" :class=" [options.pageType == 'mine' ? 'mine-edit-prediv' : '']">
  <!-- 基本信息  -->
  <div class="base-info section">
    <div class="avatar-box">
      <!-- <open-data type="userAvatarUrl" class="avatar-img"></open-data>  -->
       <img class="avatar-img" v-if="basic.avatar" :src="basic.avatar" ></img> 
       <img class="avatar-img" v-else src="/static/images/default_avatar2.png" ></img> 
    </div>
    <div class="info-box">
      <div class="" v-if="basic.name">
        <div class="name-sex">
          <span class="name font-36">{{basic.name}}</span>
          <i style="display:inline" class="icon-sexm iconfont" v-if="basic.sex == 1" />
          <i style="display:inline" class="icon-sexw iconfont" v-else-if="basic.sex == 2" />
        </div>
        <!-- <div class="motto ell font-gray-26">{{basic.motto ? basic.motto : ''}}</div> -->
        <div class="phone">
          <i style="display:inline" class="icon-phone iconfont" />
          <span class="font-gray-26">{{basic.mobile}}</span>
        </div>
        <div class="email">
          <i style="display:inline" class="icon-aite iconfont" />
          <span class="font-gray-26">{{basic.user_email}}</span>
        </div>
      </div>
      <div class="no-basic" v-else>
        <span>请完善基础信息</span>
      </div>
      <i class="iconfont icon-edit" data-page="basic" @click.stop="goResumeEdit"></i>
    </div>
  </div>
  <!-- 自我介绍  -->
  <div class="introduce section">
    <div class="hd">
      <span class="font-34">自我介绍</span>
      <i class="iconfont icon-edit" data-page="introduce" @click.stop="goResumeEdit"></i>
    </div>
    <div class="bd">
      <div class="desc-wrap" v-if="resume.description">{{resume.description}}</div>
      <div class="desc-wrap no-desc" v-else>还没有自我介绍，快去点击右上角编辑吧！</div>
    </div>
  </div>
  <!-- 工作经历 -->
  <div class="work-experience section">
    <div class="hd"><span class="title font-34">工作经历</span></div>
    <div class="bd">
      <div class="exp-list" v-if="resume && resume.experience_list.length > 0">
        <div class="exp-item" v-for="(item, index) in resume.experience_list" :key="index">
          <div class="img-box"><img src="/static/images/company2.png"></img></div>
          <div class="info">
            <div class="info-name font-34">{{item.company_name}}</div>
            <div class="info-position font-gray-26">{{item.position}}</div>
            <div class="info-date font-gray-26">{{item.in_time + " 至 " + (item.out_time || '今')}}</div>
          </div>
            <i class="iconfont icon-edit" :data-id="item.id" data-page="experience" @click.stop="goResumeEdit"></i>
        </div>
      </div>
      <div class="add-btn" data-page="experience" @click="goResumeEdit">
        <div class="icon-cross"></div>
        <span class="word">新增工作经历</span>
      </div>
    </div>
  </div>
   <!-- 教育经历 -->
  <div class="education-experience section">
    <div class="hd"><span class="title font-34">教育经历</span></div>
    <div class="bd">
      <div class="exp-list" v-if="resume && resume.education_list.length > 0">
        <div class="exp-item" v-for="(item, index) in resume.education_list" :key="index">
          <div class="edu-main">
            <div class="img-box"><img src="/static/images/edu.png"></img></div>
            <div class="info">
              <div class="info-name font-34">{{item.school_name}}</div>
              <div class="info-position font-gray-26">{{item.education_name}} {{item.subject}}</div>
              <div class="info-date font-gray-26">{{item.in_time + " 至 " + (item.out_time || '今')}}</div>
            </div>
            <i class="iconfont icon-edit" data-page="education" :data-id="item.id" @click.stop="goResumeEdit"></i>
          </div>
          <div class="desc-wrap">教育描述：{{item.description ? item.description : ''}}</div>
        </div>

      </div>
      <div class="add-btn" data-page="education" @click="goResumeEdit">
        <div class="icon-cross"></div>
        <span class="word">新增教育经历</span>
      </div>
    </div>
  </div>
   <!-- 项目经验 -->
  <div class="project-experience section">
    <div class="hd"><span class="title font-34">项目经验</span></div>
    <div class="bd">
      <div class="exp-list" v-if="resume && resume.project_list.length > 0">
        <div class="exp-item" v-for="(item, index) in projectList" :key="index">
          <div class="info">
            <div class="info-name font-34">{{item.project_name}}</div>
            <div class="info-date font-gray-26">{{item.in_time + " 至 " + (item.out_time || '今')}}</div>
          </div>
          <i class="iconfont icon-edit" :data-id="item.id" data-page="project" @click.stop="goResumeEdit"></i>
        </div>
      </div>
      <div class="add-btn" data-page="project" @click="goResumeEdit">
        <div class="icon-cross"></div>
        <span class="word">新增项目经验</span>
      </div>
    </div>
  </div>
  <!-- 语言 -->
  <div class="language section">
     <div class="hd">
      <span class="font-34">语言</span>
      <i class="iconfont icon-edit" data-page="language" @click.stop="goResumeEdit"></i>
    </div>
    <div class="bd">
      <div class="lang-box" v-for="(item, index) in lang" :key="index" v-if="lang">
        <span class="circle"></span>
        <span class="lang font-34">{{item.title}}</span>
        <span class="font-gray-24">{{item.level_name}}</span>
      </div>
    </div>
  </div>
  <!-- 技能 -->
  <div class="skills section">
     <div class="hd">
      <span class="font-34">技能</span>
      <i class="iconfont icon-edit" data-page="skill" @click.stop="goResumeEdit"></i>
    </div>
    <div class="bd">
      <div class="list" v-if="skill && skill.length > 0">
        <span class="item" v-for="(item, index) in skill" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
  <!-- 证书 -->
  <div class="certificate section">
     <div class="hd">
      <span class="font-34">证书</span>
      <i class="iconfont icon-edit" data-page="cert" @click.stop="goResumeEdit"></i>
    </div>
    <div class="bd">
      <div class="list"  v-if="cert && cert.length > 0">
        <span class="item" v-for="(item, index) in cert" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
  <!-- 获得奖项 -->
  <div class="awards language section">
     <div class="hd">
      <span class="font-34">获得奖项</span>
      <i class="iconfont icon-edit" data-page="prize" @click.stop="goResumeEdit"></i>
    </div>
    <div class="bd">
       <div class="lang-box" v-for="(item, index) in prizeList" :key="index">
        <span class="lang font-34">{{item.title}}</span>
        <span class="font-gray-24">{{item.time}}</span>
      </div>
    </div>
  </div>
  <!-- 个人链接 -->
  <div class="self-link section">
     <div class="hd">
      <span class="font-34">个人链接</span>
      <i class="iconfont icon-edit" data-page="url" @click.stop="goResumeEdit"></i>

    </div>
    <div class="bd">
      <div class="link" v-if="resume.link || resume.link_desc">{{resume.link}}</div>
      <div class="desc font-gray-26" v-if="resume.link || resume.link_desc"><span>描述：</span><span>{{resume.link_desc}}</span></div>
      <div class="no-desc" v-else>快去编辑你的个人链接吧</div>
    </div>
  </div>
  <!-- 求职意愿 -->
  <div class="job-want section">
     <div class="hd">
      <span class="font-34">求职意愿<span class="cue">(仅hr可见)</span></span>
      <i class="iconfont icon-edit" data-page="expect" @click.stop="goResumeEdit"></i>
      
    </div>
    <div class="bd">
      <div class="want font-34">
        <span class="key">期望职能</span>
        <span class="value" v-if="resume.position">{{resume.position}}</span>
        <span class="value unselected" v-else>未填写</span>
      </div>
      <!-- <div class="want font-34">
        <span class="key">工作类型</span>
        <span class="value" v-if="jobpref.workType > 0">{{jobpref.workType== 1 ? '全职' : jobpref.workType == 2 ? '兼职' : '实习'}}</span>
        <span class="value unselected" v-else>未选择</span>
      </div> -->
      <div class="want font-34">
        <span class="key">期望地点</span>
        <span class="value" v-if="resume.area_name">{{resume.area_name}}</span>
        <span class="value unselected" v-else>未选择</span>
      </div>
      <div class="want font-34">
        <span class="key">期望月薪</span>
        <span class="value" v-if="resume.salary_lowest && resume.salary_highest">{{resume.salary_lowest}}K - {{resume.salary_highest}}K</span>
        <span class="value unselected" v-else>未选择</span>
      </div>
    </div>
  </div>
   <!--  -->
   <!-- <form class="form-id" bindsubmit='goDelivery' report-submit="true"  v-if="options.pageType != 'mine'">
     <button class="btn-formId delivery-btn" form-type='submit' >立即投递</button>
  </form> -->
</div>
</template>

<script>
import store from '@/store'
import {readMyResume, readMyBasic} from '@/api/job'
export default {
  components: {
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    },
    lang () {
      let res = []
      try {
        res = JSON.parse(this.resume.lang)
      } catch (e) {
        res = []
      }
      return res
    },
    skill () {
      let res = []
      try {
        res = this.resume.skill.split(',')
      } catch (e) {
        res = false
      }
      return res
    },
    cert () {
      let res = []
      try {
        res = this.resume.certificate.split(',')
      } catch (e) {
        res = []
      }
      return res
    },
    prizeList () {
      let res = []
      try {
        res = JSON.parse(this.resume.award)
      } catch (e) {
        res = []
      }
      return res
    }
  },
  data () {
    return {
      basic: {},
      options: {
      },
      resume: {
        id: 1,
        user_id: 5,
        description: '',
        lang: [],
        skill: '',
        certificate: '',
        award: [],
        link: '',
        link_desc: '',
        position: '',
        method: '',
        area_id: 400606,
        salary_lowest: 0,
        salary_highest: 0,
        work_date: 0,
        update_time: 0,
        create_time: 0,
        close_seach: 0,
        experience_list: [
          {
            id: 2,
            user_id: 5,
            resume_id: 1,
            company_name: '葡萄找车',
            position: '人力资源助理',
            in_time: '2019-01',
            out_time: '2019-10',
            description: '负责招人，培训，分配岗位',
            ban_company: 0
          }
        ],
        education_list: [
          {
            id: 1,
            user_id: 5,
            resume_id: 1,
            school_name: '北滘中学',
            subject: '搬砖与和水泥',
            education_id: 2,
            in_time: '2019-01',
            out_time: '2019-10',
            description: '在学校我曾经打过架，杀过人，还泡过妞'
          }
        ],
        project_list: []
      }
    }
  },
  methods: {
    goResumeEdit (e) {
      let id = e.mp.target.dataset.id || false
      let path = './' + e.mp.target.dataset.page + '/main' + (id ? ('?id=' + id) : '')
      this.$go(path)
    }
  },
  onShow () {
    readMyResume().then(data => {
      this.resume = data
    })
    readMyBasic().then(data => {
      this.basic = data
    })
  },
  onLoad (options) {
    this.options = options
  }
}
</script>

<style scoped>
.edit-prediv{
  background-color: #f1f5f8;
}
.section{
  padding-left:30rpx;
  padding-right:30rpx;
  background-color: #ffffff;
  margin-bottom: 24rpx;
}
.job-want.section{
  margin-bottom: 0rpx;
}
.section .hd{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96rpx;
}
.icon-edit{
  width:32rpx;
  height:32rpx;
  color: #666;
  position: relative;
}
/* .icon-edit::before{
  content: '';
  position: absolute;
  top:-10rpx;
  bottom:-10rpx;
  right:-10rpx;
  left:-10rpx;
  
} */
.base-info .icon-edit{
  position: absolute;
  top:0;
  right:0;
}
.desc-wrap{
  padding:16rpx 20rpx;
  background-color: #F8F8F8;
  font-size:26rpx;
  line-height: 38rpx;
  color: #999;
  border:1rpx solid #EEEEEE;
  border-radius: 2px;
  word-break: break-all;
}
.add-btn{
  display: flex;
  align-items: center;
  height: 110rpx;
  border-top:1rpx solid #e5e5e5;
  color: #5AA2E7;
  font-size:32rpx;
}
.add-btn .icon-cross{
  margin-right:30rpx;
}
/* 有投递按钮时才设置 */
.footer{
  padding-bottom:144rpx;
} 
.delivery-btn{
  position: fixed;
  bottom:20rpx;
  left:40rpx;
  z-index: 1;
  width:670rpx;
  height: 94rpx;
  line-height: 94rpx;
  text-align: center;
  font-size: 36rpx;
  color: #fff;
  background-color:#5AA2E7;
  border-radius: 4rpx;
}
.mine-edit-preview .footer{
  padding-bottom:30rpx;
}

/* 基本信息 */
.base-info{
  display: flex;
  padding-top:24rpx;
  padding-bottom:24rpx;
}
.base-info .avatar-box{
  width:128rpx;
  height:128rpx;
  margin-right:26rpx;
  border-radius: 50%;
  overflow: hidden;
}
.base-info .avatar-box .avatar-img{
  width:100%;
  height:100%;
  border-radius: 50%;
  overflow: hidden;
  
}
.base-info .info-box{
  flex:1;
  position:relative;
}
.base-info .info-box .name-sex{
  position:relative;
  margin-bottom: 12rpx;
}
.base-info .info-box .name-sex .icon-sex{
  position: absolute;
  bottom:10rpx;
  width:28rpx;
  height: 28rpx;
  margin-left:10rpx;
}
.base-info .motto,.base-info .phone{
  margin-bottom: 14rpx;
}
.base-info .phone,.base-info .email{
  display: flex;
  align-items: center;
}
.base-info .phone image{
  width:30rpx;
  height:30rpx;
  margin-right:8rpx;
}
.base-info .email image{
  width:30rpx;
  height:22rpx;
  margin-right:8rpx;
}
.base-info .info-box .no-basic{
  display: flex;
  align-items: center;
  height: 128rpx;
  font-size:30rpx;
  color: #999;
}
/* 自我介绍 */
.introduce{
  padding-bottom: 20rpx;
}
.introduce .no-desc{
  text-align: center;
}
/* 工作、教育、项目经历 */
.work-experience .exp-item,.project-experience .exp-item{
  display: flex;
  position: relative;
  margin-top:30rpx;
  margin-bottom: 60rpx;
}
.education-experience .exp-item {
  margin-top:30rpx;
  margin-bottom: 60rpx;
}
.education-experience .exp-item:last-child{
  margin-bottom: 30rpx;
}
.education-experience .exp-item .edu-main{
  display: flex;
  margin-bottom: 20rpx;
}
.exp-item:last-child{
  margin-bottom: 30rpx;
}
.exp-item .img-box{
  display: flex;
  align-items: center;
  justify-content: center;
  width:120rpx;
  height:120rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20rpx;
  border:1rpx solid #e5e5e5;
}
.exp-item .img-box image{
  width:60rpx;
  height: 60rpx;
}
.exp-item .info{
  flex:1;
}
.project-experience .info-name{
  margin-bottom: 12rpx;
}
/* 语言、奖项 */
.language .lang-box{
  display: flex;
  align-items: center;
  height: 90rpx;
}
.language .lang-box .circle{
  width:20rpx;
  height:20rpx;
  border-radius: 50%;
  margin-right: 15rpx;
  background-color: #F5A623;
}
.language .lang-box .lang{
  margin-right:24rpx;
}
/* 技能、证书 */
.skills,.certificate{
  padding-bottom: 20rpx;
}
.skills .list,.certificate .list{
  display: flex;
  flex-wrap:wrap; 
  padding-top:20rpx;
}
.skills .list .item,.certificate .list .item{ 
  height: 45rpx;
  line-height: 45rpx;
  padding-left:8rpx;
  padding-right:8rpx;
  border-radius:5rpx;
  background-color: #53C68B;
  margin-right:8rpx;
  margin-bottom: 10rpx;
  font-size: 26rpx;
  color: #ffffff;
}
/* 个人链接  */

.self-link .bd{
  padding-top:30rpx;
  padding-bottom: 30rpx;
  border-top:1rpx solid #e5e5e5;
}
.self-link .link{
  font-size: 34rpx;
  color: #4A90E2;
  margin-bottom:15rpx;
}
.self-link .no-desc{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size:34rpx;
  color: #B2B2B2;
  /* border:1rpx solid #CCCCCC; */
}
/* 求职意愿  */
.job-want .hd .cue{
  font-size:26rpx;
  color:#B2B2B2;
  margin-left:20rpx;
}
.job-want .bd{
  padding-top:20rpx;
  padding-bottom: 20rpx;
}
.job-want .want{
  margin-bottom: 40rpx;
}
.job-want .want:last-child{
  margin-bottom: 0rpx;
}
.job-want .want .key{
  margin-right: 40rpx;
}
.job-want .want .unselected{
  color: #B2B2B2;
}

</style>
