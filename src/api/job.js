import axios from '@/axios'

// 职位选项
export const getJobType = () => {
  return axios({
    url: '/job/position/get_type'
  })
}

// 职位列表筛选
export const getSearchType = () => {
  return axios({
    url: '/job/position/search_type'
  })
}
// 添加编辑职位
export const saveJob = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/position/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/job/position/add_post',
      method: 'POST',
      data
    })
  }
}
export const deleteJob = (data = {}) => {
  return axios({
    url: '/job/position/delete',
    data
  })
}

export const readJob = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/position/position_info',
      data
    })
  } else {
    return axios({
      url: '/job/position/position_list',
      data
    })
  }
}