export default {
  data () {
    return {
      touch_timer: null,
      touch_time: 0,
      // 返回状态，如果是1就已经返回了
      touch_status: 0
    }
  },
  methods: {
    xbindtouchstart () {
      this.touch_timer = setInterval(() => {
        this.touch_time++
        if (this.touch_status === 1) {
          clearInterval(this.touch_timer)
          this.touch_time = 0
        } else if (this.touch_time >= 3) {
          clearInterval(this.touch_timer)
          this.$emit('longpress')
          this.touch_time = 0
          this.touch_status = 1
        }
      }, 200)
    },
    xbindtouchmove () {
      clearInterval(this.touch_timer)
      this.touch_time = 0
      this.touch_status = 1
    },
    xbindtouchend () {
      if (this.touch_status === 1) {
        this.touch_status = 0
        return false
      }
      clearInterval(this.touch_timer)
      if (this.touch_time >= 5) {
        this.$emit('longpress')
      } else {
        this.$emit('click')
      }
      this.touch_time = 0
    }
  }
}
