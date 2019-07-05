import cookie from './cookie.js'
import {REQUEST_API, SIGNATURE_NAME} from '@/config'
import {$Toast} from '@/../static/iview/base/index'

export default (params = {}) => {
  let BASE_URL = REQUEST_API
  let {
    url,
    data,
    header,
    method,
    dataType,
    responseType,

    // 自定义
    all,
    absolute, /* 绝对路径 */
    upload,
    name,
    error,
    filePath
  } = params

  if (!header) {
    header = {}
  }

  // 存在X-putao签名，带上头
  let sign = cookie.get(SIGNATURE_NAME)
  if (sign) {
    header[SIGNATURE_NAME] = sign
  }

  // 预留session为位
  if (method && method.toLowerCase() === 'POST') {
    header['Content-Type'] = 'application/json, text/plain, */*'
  }

  if (!upload) {
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: absolute ? url : BASE_URL + url,
        data,
        dataType,
        responseType,
        header: header,
        method: method || 'GET',
        success: (data) => {
          if (!all) {
            if (data.data.code === 1) {
              data.data.data !== undefined ? resolve(data.data.data) : resolve(data.data)
            } else {
              console.warn(data.data)
              if (error !== false) {
                try {
                  $Toast({
                    type: 'error',
                    content: data.data.msg || '异常信息！'
                  })
                } catch (e) {
                  console.warn('toast组件不能加载')
                }
              }
              reject(data.data)
            }
          } else {
            resolve(data)
          }
        },
        failed: (res) => {
          console.warn(res)
          try {
            $Toast({
              type: 'error',
              content: '网络异常！'
            })
          } catch (e) {
            console.warn('toast组件不能加载')
          }
          reject(res)
        },
        complete: () => {
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      mpvue.uploadFile({
        url: absolute ? url : BASE_URL + url,
        filePath,
        name: name || 'file',
        formData: data || {},
        header,
        success: (data) => {
          if (!all) {
            try {
              data = JSON.parse(data.data)
            } catch (e) {
              console.warn('返回数据不是json')
              try {
                $Toast({
                  type: 'error',
                  content: '后台异常！'
                })
              } catch (e) {
                console.warn('toast组件不能加载')
              }
            }
            if (data.code === 1) {
              data.data !== undefined ? resolve(data.data) : resolve(data)
            } else {
              console.warn(data)
              try {
                if (error !== false) {
                  $Toast({
                    type: 'error',
                    content: data.msg || '异常信息！'
                  })
                }
              } catch (e) {
                console.warn('toast组件不能加载')
              }
              reject(data)
            }
          } else {
            resolve(data)
          }
        },
        failed: (res) => {
          reject(res)
        },
        complete: () => {
        }
      })
    })
  }
}
