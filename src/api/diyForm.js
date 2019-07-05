import axios from '@/utils/axios'
import {REQUEST_HOST} from '@/config'

export const readForm = (data = {}) => {
  return axios({
    absolute: true,
    url: REQUEST_HOST + '/form/mp/' + (data['id'] || ''),
    data
  })
}

export const saveForm = (data = {}) => {
  return axios({
    absolute: true,
    url: REQUEST_HOST + '/form/mp/save/id/' + (data['id'] || ''),
    data,
    method: 'POST'
  })
}
