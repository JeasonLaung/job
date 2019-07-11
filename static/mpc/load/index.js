Component({
  externalClasses: ['i-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    height: {
      type: String,
      default: '100vh'
    },
    // 第一次加载成功后将不会有动画
    firstLoad: {
      type: Boolean,
      default: false
    },
    empty: Boolean,
    noMore: Boolean
  },
  data: {
    // 整体挂载
    loaded: false,
    // 是否最顶
    isTop: true,
    isMove: false,
    loadTimer: null,
    scrollTop: 0,
    // 开始
    sclientY: 0,
    // 结束
    eclientY: 0,
    // 刷新状态
    ingNew: false,
    ingMore: false
  },
  attached () {
    this.triggerEvent('new')
    this.setData({
      loaded: true
    })
  },
  methods: {
     fuckNew () {
      this.sclientY = 0
      this.eclientY = 0
      if (!this.data.isTop || this.data.ingNew) {
        return
      }
      this.setData({
        ingNew: true
      })
      this.triggerEvent('new')
      clearTimeout(this.data.loadTimer)
      this.data.loadTimer = setTimeout(() => {
        this.setData({
          ingNew: false
        })
      }, 2000)
    },
    _bindscrolltoupper (e) {
      // 当我到了最顶的时候，没有改变手移动但没有改变位置或者e.mp.detail.scrollTop < 0,此时为刷新
      this.data.isTop = true
    },
    _bindscrolltolower (e) {
      this.triggerEvent('more')
    },

    // 没有scroll时touchmove接管
    _bindtouchstart (e) {
      // 记录开始
      this.data.sclientY = e.touches[0].clientY
    },
    _bindtouchmove (e) {
      // 记录移动
      this.data.eclientY = e.touches[0].clientY
    },
    _bindtouchend (e) {
      if (this.data.sclientY - this.data.eclientY < -50) {
        this.fuckNew()
      }
    },
    _bindscroll (e) {
      if (e.detail.scrollTop <= 0) {
        this.data.isTop = true
      } else {
        this.data.isTop = false
      }
    }
  }
});
