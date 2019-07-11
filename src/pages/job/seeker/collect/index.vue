<template>
  <div>
    <i-tabs :current="api" @change="handleChange">
      <i-tab key="myCollectCompany" title="公司"></i-tab>
      <i-tab key="myCollectJob" title="职位"></i-tab>
    </i-tabs>
    <m-load
    height="calc(100vh - 42px)"
    v-if="'myCollectCompany' == api"
    :firstLoad="firstLoads['myCollectCompany']"
    :noMore="noMores['myCollectCompany']"
    :empty="emptys['myCollectCompany']"
    @new="handleNew('myCollectCompany')"
    @more="handlMore('myCollectCompany')"
    >
      <company
      border
      @click="$go('/pages/job/companyDetail/main?id='+item.id)"
      v-for="(item, index) in results['myCollectCompany']"
      :key='index'
      :one="item"
      />
    </m-load>

    <m-load
    height="calc(100vh - 42px)"
    v-if="'myCollectJob' == api"
    :firstLoad="firstLoads['myCollectJob']"
    :noMore="noMores['myCollectJob']"
    :empty="emptys['myCollectJob']"
    @new="handleNew('myCollectJob')"
    @more="handlMore('myCollectJob')"
    >
      <job
      @click="$go('/pages/job/jobDetail/main?id='+item.id)"
      v-for="(item, index) in results['myCollectJob']"
      :key='index'
      :one="item"
      />
    </m-load>
  </div>
</template>

<script>
import {myCollectJob, myCollectCompany} from '@/api/job'
import company from '@/components/job/company'
import job from '@/components/job/job'
import sLoadFuck from '@/mixins/sLoadFuck'
export default {
  components: {
    job,
    company
  },
  mixins: [sLoadFuck],
  methods: {
    myCollectJob,
    myCollectCompany,
    handleChange (e) {
      this.api = e.mp.detail.key
      // this.handleNew(this.api)
    }
  },
  onLoad () {
    this.api = 'myCollectCompany'
    this.handleNew(this.api)
  },
  data () {
    return {
      api: ''
    }
  }
}
</script>

<style>
</style>
