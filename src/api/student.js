import axios from '@/utils/axios'
export const saveResume = (data) => {
  return axios({
    url: '/workstu/resume/edit_post',
    data,
    method: 'POST'
  })
}

export const readResume = (data) => {
  return axios({
    url: '/workstu/resume/info',
    data
  })
}

export const getPhoneByOrder = (data) => {
  return axios({
    url: '/workstu/order/get_mobile',
    data
  })
}
