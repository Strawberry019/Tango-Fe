import request from '@/utils/request'
export function getList(s_url,query) {
  let url = s_url
  return request({
    url: url,
    method: 'get',
    params: query,
    baseURL: 'http://127.0.0.1:8000/api/'
  })
}

