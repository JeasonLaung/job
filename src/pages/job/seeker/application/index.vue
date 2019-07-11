<template>
  <div>
    <i-tabs :current="api" @change="handleChange">
      <i-tab key="mySend" title="全部"></i-tab>
      <i-tab key="mySendDone" title="已处理"></i-tab>
      <i-tab key="mySendNotDone" title="未处理"></i-tab>
      <!-- <i-tab :key="item.api" v-for="item in list" :title="list.title"></i-tab> -->

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
      <job
      @click="$go('/pages/job/jobDetail/main?id='+i.id)"
      v-for="(i, ind) in results[item.api]"
      :key='ind'
      :one="i"
      />
    </m-load>
  </div>
</template>

<script>
import {mySend, mySendDone, mySendNotDone} from '@/api/job'
import job from '@/components/job/job-mySend'
import sLoadFuck from '@/mixins/sLoadFuck'
export default {
  components: {
    job
  },
  mixins: [sLoadFuck],
  methods: {
    mySendNotDone,
    mySendDone,
    mySend,
    handleChange (e) {
      this.api = e.target.key
    }
  },
  data () {
    return {
      list: [
        {
          title: '全部',
          api: 'mySend'
        },
        {
          title: '已处理',
          api: 'mySendDone'
        },
        {
          title: '未处理',
          api: 'mySendNotDone'
        }
      ]
    }
  },
  onLoad () {
    this.api = 'mySend'
    this.handleNew(this.api)
  }
}
</script>

<style>
</style>
