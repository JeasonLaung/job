export default {
  data () {
    return {
      noMore: false,
      empty: false,
      form: {
        page: 0,
        limit: 10
      },
      result: [],
      api: '',
      firstLoad: true
    }
  },
  methods: {
    handleNew () {
      if (!this.api) {
        return mpvue.showToast({
          title: '没传入api地址【api】'
        })
      }
      this.empty = false
      this[this.api](this.form).then(data => {
        if (this.firstLoad) {
          this.firstLoad = false
        }
        mpvue.stopPullDownRefresh()
        if (data.list.length < data.limit) {
          if (data.list.length === 0) {
            this.empty = true
          }
          this.noMore = true
        } else {
          this.noMore = false
        }
        this.result = data.list
      }).catch(data => {
        this.noMore = true
      })
    },
    handleMore () {
      if (this.noMore) {
        return false
      }
      this.form.page++
      this[this.api](this.form).then(data => {
        mpvue.stopPullDownRefresh()
        if (data.list.length < data.limit) {
          this.noMore = true
        }
        this.result = this.result.concat(data.list)
      }).catch(() => {
        this.noMore = true
      })
    }
  },
  onPullDownRefresh () {
    this.handleNew()
  },
  onReachBottom () {
    this.handleMore()
  },
  onUnload () {
    Object.assign(this, this.$options.data())
  }
}
