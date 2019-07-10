import axios from '@/utils/axios'
import cookie from '@/utils/cookie'

// 职位选项
export const getJobType = () => {
  return axios({
    url: '/job/position/get_type'
  })
}

// 职位列表筛选
export const getSearchType = () => {
  let c = cookie.get('search_type')
  return new Promise((resolve, reject) => {
    if (!c) {
      axios({
        url: '/job/position/search_type'
      }).then(data => {
        resolve(data)
      }).catch(data => {
        reject(data)
      })
    } else {
      resolve(c)
    }
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

export const readCompany = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/company/info',
      data
    })
  } else {
    return axios({
      url: '/job/company/index',
      data
    })
  }
}
export const readJob = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/position/position_info',
      data
    })
  } else if (data['company_id']) {
    return axios({
      url: '/job/position/company_position',
      data
    })
  } else {
    return axios({
      url: '/job/position/position_list',
      data
    })
  }
}
export const readPhone = (data = {}) => {
  return axios({
    error: false,
    url: '/job/index/get_phone',
    data
  })
}
// 投简历
export const relativeJob = (data = {}) => {
  return axios({
    error: false,
    url: '/job/position/relative',
    data
  })
}
// 投简历
export const sendJob = (data = {}) => {
  return axios({
    url: '/job/position/send',
    data
  })
}
// 投简历
export const collectJob = (data = {}) => {
  return axios({
    url: '/job/position/collect',
    data
  })
}

// 求职攻略
export const seekerNews = (data = {}) => {
  return axios({
    url: '/article/index/article_list',
    data: {
      ...data,
      id: 17
    }
  })
}
// 招聘资讯
export const companyNews = (data = {}) => {
  return axios({
    url: '/article/index/article_list',
    data: {
      ...data,
      id: 18
    }
  })
}

export const readSeeker = (data = {}) => {
  return axios({
    url: '/article/index/article_list',
    data: {
      ...data,
      id: 18
    }
  })
}

// 个人简历
export const readMyResume = (data = {}) => {
  return axios({
    url: '/job/resume/index',
    data
  })
}
// 求职者简历
export const readResume = (data = {}) => {
  return axios({
    url: '/job/resume/info',
    data
  })
}
// 求职者简历
export const readMyBasic = (data = {}) => {
  return axios({
    url: '/job/resume/base_info',
    data
  })
}
export const readResumeProject = (data = {}) => {
  return axios({
    url: '/job/project/info',
    data
  })
}
export const readResumeExperience = (data = {}) => {
  return axios({
    url: '/job/experience/info',
    data
  })
}
export const readResumeEducation = (data = {}) => {
  return axios({
    url: '/job/education/info',
    data
  })
}
export const deleteResumeExperience = (data = {}) => {
  return axios({
    url: '/job/experience/delete',
    data
  })
}
export const deleteResumeProject = (data = {}) => {
  return axios({
    url: '/job/project/delete',
    data
  })
}
export const deleteResumeEducation = (data = {}) => {
  return axios({
    url: '/job/education/delete',
    data
  })
}

export const readResumeLanguage = () => {
  return axios({
    url: '/job/resume/lang_info'
  })
}
export const readResumeSkill = () => {
  return axios({
    url: '/job/resume/skill_info'
  })
}
export const readResumeCert = () => {
  return axios({
    url: '/job/resume/cert_info'
  })
}
export const readResumePrize = () => {
  return axios({
    url: '/job/resume/award_info'
  })
}
// 求职者简历
export const readResumeBasic = (data = {}) => {
  return axios({
    url: '/job/resume/base_info',
    data
  })
}
export const saveResumeBasic = (data = {}) => {
  return axios({
    url: '/job/resume/base_info_post',
    data,
    method: 'POST'
  })
}
export const saveResumeExperience = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/experience/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/job/experience/add_post',
      method: 'POST',
      data
    })
  }
}
export const saveResumeProject = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/project/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/job/project/add_post',
      method: 'POST',
      data
    })
  }
}
export const saveResumeEducation = (data = {}) => {
  if (data['id']) {
    return axios({
      url: '/job/education/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/job/education/add_post',
      method: 'POST',
      data
    })
  }
}
export const saveResumeUrl = (data = {}) => {
  return axios({
    url: '/job/resume/link_post',
    method: 'POST',
    data
  })
}
export const saveResumeExpect = (data = {}) => {
  return axios({
    url: '/job/resume/wish_post',
    method: 'POST',
    data
  })
}

export const saveResumeIntroduce = (data = {}) => {
  return axios({
    url: '/job/resume/description_post',
    method: 'POST',
    data
  })
}
export const saveResumeUnion = (data = {}) => {
  return axios({
    url: '/job/resume/com_post',
    method: 'POST',
    data
  })
}
export const optionsEducation = () => {
  return axios({
    url: '/job/education/education_option'
  })
}

export const optionsJob = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/job/position/get_type'
    }).then(data => {
      cookie.set('education', data.educationList)
      cookie.set('experience', data.experienceList)
      resolve()
    }).catch(data => {
      reject(data)
    })
  })
}

export const educationType = () => {
  let c = cookie.get('education')
  return new Promise((resolve, reject) => {
    if (c) {
      resolve(c)
    } else {
      optionsJob().then(data => {
        resolve(cookie.get('education'))
      })
    }
  })
}
export const experienceType = () => {
  let c = cookie.get('experience')
  return new Promise((resolve, reject) => {
    if (c) {
      resolve(c)
    } else {
      optionsJob().then(data => {
        resolve(cookie.get('experience'))
      })
    }
  })
}
