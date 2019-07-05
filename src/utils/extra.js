// 此文件设置了eslint忽略，小心编写
// 操作页面
export const fuckPage = (delta = 1) => {
  let pages = getCurrentPages()
  return new Promise((resolve, reject) => {
    if (pages.length > delta) {
      resolve(pages[pages.length - delta - 1])
    } else {
      reject(pages[0])
    }
  })
}
