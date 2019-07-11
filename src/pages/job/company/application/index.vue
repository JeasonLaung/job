<template>
  <div>
    <i-tabs :current="api" @change="handleChange">
      <i-tab key="getApplicationNotDone" title="未处理"></i-tab>
      <i-tab key="getApplicationDone" title="已处理"></i-tab>
      <i-tab key="getApplication" title="全部"></i-tab>
    </i-tabs>
    <m-load
    height="calc(100vh - 42px)"
    v-for="(item, index) in list"
    :key="index"
    v-if="item.api === api"
    :firstLoad="firstLoads[item.api]"
    :noMore="noMores[item.api]"
    :empty="emptys[item.api]"
    @new="handleNew(item.api)"
    @more="handleMore(item.api)"
    >
      <seeker
      border
      @click="handleDone(i, ind)"
      v-for="(i, ind) in results[item.api]"
      :key='ind'
      :one="i"
      />
    </m-load>
  </div>
</template>

<script>
import {getApplication, getApplicationDone, getApplicationNotDone, seeSeeker, readPhone, resolveApplication, rejectApplication} from '@/api/job'
import seeker from '@/components/job/seeker-getSend'
import sLoadFuck from '@/mixins/sLoadFuck'
import common from '@/mixins/common'
export default {
  components: {
    seeker
  },
  mixins: [sLoadFuck, common],
  methods: {
    getApplication,
    getApplicationDone,
    getApplicationNotDone,
    handleChange (e) {
      Object.assign(this, this.$options.data())
      this.api = e.target.key
    },
    handleDone (item, index) {
      // if (this.) {
      // }
      let _this = this
      let itemList = []
      switch (item.status) {
        case '被查看':
        case '未查看':
          itemList = ['拨打电话', '查看简历', '同意申请', '拒绝申请']
          break
        case '有意向':
        case '不合适':
        default:
          itemList = ['拨打电话', '查看简历']
          break
      }
      mpvue.showActionSheet({
        itemList,
        success ({tapIndex}) {
          switch (tapIndex) {
            case 0:
              readPhone({id: item.resume_id, type: 'seeker'}).then(data => {
                _this.makePhoneCall(data.mobile)
              })
              break
            case 1:
              if (item.status === '未查看') {
                seeSeeker({id: item.id})
                _this.results[_this.api][index].status = '被查看'
              }
              _this.$go('/pages/job/seekerDetail/main?id=' + item.resume_id)
              break
            case 2:
              mpvue.showModal({
                title: '是否同意申请？',
                success ({confirm}) {
                  if (confirm) {
                    resolveApplication({id: item.id}).then(data => {
                      if (_this.api === 'getApplicationNotDone') {
                        _this.results[this.api].splice(index, 1)
                      }
                      _this.$Message({
                        content: '操作成功',
                        type: 'success'
                      })
                    })
                  }
                }
              })
              break
            case 3:
              mpvue.showModal({
                title: '是否拒绝申请？',
                success ({confirm}) {
                  if (confirm) {
                    rejectApplication({id: item.id}).then(data => {
                      if (_this.api === 'getApplicationNotDone') {
                        _this.results[_this.api].splice(index, 1)
                      }
                      _this.$Message({
                        content: '拒绝成功'
                      })
                    })
                  }
                }
              })
              break
          }
        }
      })
    }
  },
  data () {
    return {
      list: [
        {
          title: '未处理',
          api: 'getApplicationNotDone'
        },
        {
          title: '已处理',
          api: 'getApplicationDone'
        },
        {
          title: '全部',
          api: 'getApplication'
        }
      ]
    }
  },
  onLoad () {
    this.api = 'getApplicationNotDone'
    this.handleNew(this.api)
  }
}
</script>

<style>
</style>
