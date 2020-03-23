import request from '@/utils/request'

export function permsListDisplay() {
  return request({
    url: '/rbac/permslist/',
    method: 'get'
  })
}
