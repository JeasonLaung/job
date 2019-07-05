import axios from '@/utils/axios'
export const readActivity = (data) => {
  return axios({
    url: '/activity/index/info',
    data
  })
}
export const saveActivity = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/activity/index/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/activity/index/add_post',
      method: 'POST',
      data
    })
  }
}

export const cancelJoinActivity = (data = {}) => {
  return axios({
    url: '/activity/sign/sign_delete',
    data
  })
}

export const deleteActivity = (data = {}) => {
  return axios({
    url: '/activity/index/delete',
    data
  })
}

export const myActivity = (data = {}) => {
  return axios({
    url: '/activity/index/my',
    data: {
      ...data
    }
  })
}

export const myJoinActivity = (data = {}) => {
  return axios({
    url: '/activity/sign/my_sign',
    data
  })
}

export const commonActivity = (data = {}) => {
  return axios({
    url: '/activity/index/index',
    data: {
      type: 1,
      ...data
    }
  })
}

export const salonActivity = (data = {}) => {
  return axios({
    url: '/activity/index/index',
    data: {
      type: 2,
      ...data
    }
  })
}

export const hotActivity = (data = {}) => {
  return axios({
    url: '/activity/index/hot_index',
    data
  })
}

export const signActivity = (data = {}) => {
  return axios({
    url: '/activity/sign/sign',
    data
  })
}
