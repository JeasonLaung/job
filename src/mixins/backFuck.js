export default {
  data () {
    return {
      wait_timer: null
    }
  },
  methods: {
    back () {
      clearTimeout(this.wait_timer)
      this.wait_timer = setTimeout(() => {
        Object.assign(this, this.$options.data())
        mpvue.navigateBack()
      }, 1000)
    }
  }
}
