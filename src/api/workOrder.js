import axios from '@/utils/axios'
export const readWorkOrder = (data = {}) => {
  return axios({
    method: 'get',
    url: '/user/order/info',
    data
  })
}
export const deleteWorkOrder = (data = {}) => {
  return axios({
    method: 'post',
    url: '/user/order/delete',
    data
  })
}
export const endWorkOrder = (data = {}) => {
  return axios({
    method: 'get',
    url: '/user/order/index',
    data: {
      ...data,
      status: 1
    }
  })
}
export const allWorkOrder = (data = {}) => {
  return axios({
    method: 'get',
    url: '/user/order/index'
  })
}
export const ingWorkOrder = (data = {}) => {
  return axios({
    method: 'get',
    url: '/user/order/index',
    data: {
      ...data,
      status: 0
    }
  })
}
