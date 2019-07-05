import axios from '@/utils/axios'
import {UPLOAD_PATH} from '@/config'
export default {
  data () {
    return {
      photos: [],
      queueCount: '',
      queuePaths: []
    }
  },
  methods: {
    // 队列上传arr
    handleQueue (callback) {
      if (this.queueCount === '') {
        this.queueCount = this.photos.length
        console.log('初始化阶段')
      }
      if (this.queueCount > 0) {
        console.log('进入上传阶段')
        this.$Toast({
          content: '数据正在提交',
          type: 'loading',
          duration: 0
        })
        axios({
          absolute: true,
          url: UPLOAD_PATH,
          method: 'POST',
          name: 'file',
          upload: true,
          filePath: this.photos[this.queueCount - 1]
        }).then((data) => {
          this.queueCount--
          if (data.url) {
            this.queuePaths.push(data.url)
          }
          this.handleQueue()
        }).catch(() => {
          this.queueCount--
        })
      } else {
        console.log('搞定')
        this.$Toast.hide()
        if (callback) {
          callback(this.queuePaths)
        } else {
          this.handleSubmit(this.queuePaths)
        }
        this.queueCount = ''
        this.queuePaths = []
      }
    }
  }
}
