import axios from '@/utils/axios'
export const readForumNewMsg = (data = {}) => {
  return axios({
    method: 'get',
    url: '/sharebbs/comment/my_new_msg'
  })
}

export const readForumPreMsg = (data = {}) => {
  return axios({
    method: 'get',
    url: '/sharebbs/comment/my_msg'
  })
}

export const readTuiSongMsg = (data = {}) => {
  return axios({
    method: 'get',
    url: '/tuisong/index/index'
  })
}
