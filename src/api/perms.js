import request from '@/utils/request'

export function permsListDisplay() {
  return request({
    url: '/rbac/permslist/',
    method: 'get'
  })
}

export function modelPermsList() {
  return request({
    url: '/oper/model/perms',
    method: 'get'
  })
}
