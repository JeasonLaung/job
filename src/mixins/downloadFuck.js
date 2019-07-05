import {promisify} from '@/utils'
import cookie from '@/utils/cookie'
import {DOWNLOAD_COOKIE} from '@/config'
export default {
  methods: {
    downloadFile ({url, open, title}) {
      // title: '个体工商户名称预先核准申请书.docx',
      this.$Toast({
        content: '文件下载中',
        duration: 0
      })
      promisify(wx.downloadFile)({
        url
      }).then(({tempFilePath, filePath}) => {
        this.$Toast({
          content: '文件下载成功'
        })
        if (open !== false) {
          promisify(wx.openDocument)({
            filePath: tempFilePath
          }).then(() => {
            // 保存下载文件的地址
            let docs = cookie.get(DOWNLOAD_COOKIE)
            let timestamp = new Date().getTime()
            if (docs) {
              docs.push({title, url, timestamp})
              cookie.set(DOWNLOAD_COOKIE, docs)
            } else {
              cookie.set(DOWNLOAD_COOKIE, [{url, title, timestamp}])
            }
          })
        }
      }).catch(() => {
        this.$Toast({
          content: '下载文件失败'
        })
      })
    }
  }
}
