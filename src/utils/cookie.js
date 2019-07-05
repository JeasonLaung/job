export default {
  set (name, value) {
    return wx.setStorageSync(name, value)
  },
  get (name) {
    return wx.getStorageSync(name)
  },
  clear () {
    return wx.clearStorageSync()
  },
  remove (name) {
    return wx.removeStorageSync(name)
  }
}
