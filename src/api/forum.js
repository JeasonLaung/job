import axios from '@/utils/axios'

export const unlikePost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/cancel_like',
    data
  })
}

export const likePost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/like',
    data
  })
}

export const seePost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/hit',
    data
  })
}

export const readPost = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/sharebbs/index/info',
      data
    })
  } else {
    return axios({
      url: '/sharebbs/index/index',
      data
    })
  }
}

export const myPost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/my',
    data
  })
}

export const deletePost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/delete',
    data
  })
}

export const savePost = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/sharebbs/index/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/sharebbs/index/add_post',
      method: 'POST',
      data
    })
  }
}

export const getTags = (data = {}) => {
  return axios({
    url: '/sharebbs/index/tag',
    data
  })
}

export const readPostComment = (data = {}) => {
  return axios({
    url: '/sharebbs/comment/index',
    data
  })
}

export const savePostComment = (data = {}) => {
  if (data['to_user_id']) {
    return axios({
      url: '/sharebbs/comment/add_reply',
      data,
      method: 'POST'
    })
  } else {
    return axios({
      url: '/sharebbs/comment/add_post',
      data,
      method: 'POST'
    })
  }
}

export const deletePostComment = (data = {}) => {
  return axios({
    url: '/sharebbs/comment/delete',
    data,
    method: 'POST'
  })
}

export const likePostComment = (data = {}) => {
  return axios({
    url: '/sharebbs/comment/like',
    data,
    method: 'POST'
  })
}
export const unlikePostComment = (data = {}) => {
  return axios({
    url: '/sharebbs/comment/cancel_like',
    data,
    method: 'POST'
  })
}

export const sharePost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/share',
    data
  })
}

export const personPost = (data = {}) => {
  return axios({
    url: '/sharebbs/index/person',
    data
  })
}
