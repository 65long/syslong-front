import request from '@/utils/request'

export function getBarData() {
  return request({
    url: '/rbac/permslist/',
    method: 'get'
  })
}

