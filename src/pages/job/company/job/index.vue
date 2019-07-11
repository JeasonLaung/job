<template>
  <div>
    <m-load
    height="calc(100vh - 110rpx)"
    :firstLoad="firstLoad"
    :noMore="noMore"
    :empty="empty"
    @new="handleNew('', {id})"
    @more="handleMore">
      <div>
        <job 
        @click="handleClickJob(item, index)"
        :one="item"
        v-for="(item, index) in results['readJob']"
        :key="index"></job>
      </div>
    </m-load>
    <fixedBtn
    title="新增岗位"
    @click="$go('/pages/company/publishJob/main')"
    />
  </div>
</template>

<script>
import {readJob, deleteJob} from '@/api/job'
import sLoadFuck from '@/mixins/sLoadFuck'
import fixedBtn from '@/components/fixedBtn'
import job from '@/components/job/job'
import store from '@/store'
export default {
  components: {
    job,
    fixedBtn
  },
  mixins: [sLoadFuck],
  data () {
    return {
      id: ''
    }
  },
  methods: {
    readJob,
    handleClickJob (item, index) {
      let _this = this
      let itemList = ['编辑', '删除', '查看']
      mpvue.showActionSheet({
        itemList,
        success ({tapIndex}) {
          switch (tapIndex) {
            case 0:
              _this.$go('/pages/company/publishJob/main?id=' + item.id)
              break
            case 1:
              mpvue.showModal({
                title: '是否删除这个岗位？',
                success ({confirm}) {
                  if (confirm) {
                    deleteJob({id: item.id}).then(data => {
                      _this.$Message({
                        content: '删除成功'
                      })
                      _this.result.splice(index, 1)
                    })
                  }
                }
              })
              break
            case 2:
              _this.$go('/pages/jobDetail/main?id=' + item.id)
              break
          }
        }
      })
    }
  },
  onLoad () {
    let id = store.state.userInfo.company_id || 1
    this.api = 'readJob'
    this.form.id = id
  }
}
</script>

<style>
</style>
