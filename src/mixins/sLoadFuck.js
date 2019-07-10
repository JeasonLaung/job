export default {
  data () {
    return {
      noMore: false,
      noMores: {},
      empty: false,
      emptys: {},
      form: {
        page: 0,
        limit: 10,
        keyword: ''
      },
      forms: {},
      result: [],
      results: {},
      api: '',
      firstLoad: false,
      firstLoads: {}
    }
  },
  methods: {
    handleNew (key = '', options = {}) {
      // if (this[this.api]) {
      //   console.warn('没有这个api，请在methods上添加')
      //   return mpvue.showModal({title: '没有api' + this.api})
      // }
      // if (!(this[this.api] instanceof Promise)) {
      //   console.warn('这个api不是一个Promise函数无法执行')
      //   return mpvue.showModal({title: 'api需要Promise'})
      // }

      if (key) {
        this.emptys[key] = false
        this.$set(this.forms, key, {page: 0, limit: 10, ...options})
        this[this.api](this.forms[key]).then(data => {
          if (!this.firstLoads[key]) {
            this.$set(this.firstLoads, key, true)
          }
          if (data.list.length < data.limit) {
            if (data.list.length === 0) {
              this.$set(this.emptys, key, true)
            }
            this.$set(this.noMores, key, true)
          } else {
            this.$set(this.noMores, key, false)
          }
          this.$set(this.results, key, data.list)
        }).catch(data => {
          this.$set(this.emptys, key, true)
        })
      } else {
        this.empty = false
        this.$set(this, 'form', {...this.form, ...options})
        this[this.api](this.form).then(data => {
          if (!this.firstLoad) {
            this.firstLoad = true
          }
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
          this.empty = true
        })
      }
    },
    handleMore (key = '') {
      if (key) {
        if (this.noMores[key] || !this.firstLoads[key]) {
          return false
        }
        this.forms[key].page++
        this[this.api](this.forms[key]).then(data => {
          if (data.list.length < data.limit) {
            this.$set(this.noMores, key, true)
          } else {
            this.$set(this.noMores, key, false)
          }
          this.$set(this.results, key, [...this.results[key], ...data.list])
        }).catch(data => {
          this.$set(this.noMores, key, true)
        })
      } else {
        if (this.noMore || !this.firstLoad) {
          return false
        }
        this[this.api](this.form).then(data => {
          if (data.list.length < data.limit) {
            this.noMore = true
          }
          this.result = this.result.concat(data.list)
        }).catch(() => {
          this.noMore = true
        })
      }
    }
  }
}
