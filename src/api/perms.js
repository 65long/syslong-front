import request from '@/utils/request'

export function permsListDisplay() {
  return request({
    url: '/rbac/permslist/',
    method: 'get'
  })
}

export function modelPermsList(queryInfo) {
  return request({
    url: '/oper/model/perms',
    method: 'get',
    params: queryInfo
  })
}

export function getWebResList(queryInfo) {
  return request({
    url: '/oper/web/res',
    method: 'get',
    params: queryInfo
  })
}
