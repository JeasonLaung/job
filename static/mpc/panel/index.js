// components/m-panel/m-panel.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['m-class'],
  options:{
    multipleSlots: true,
  },
  properties: {
    title:{
      value: "标题",
      type: String
    },
    note: {
      value: "",
      type: String,
    },
    inner: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
