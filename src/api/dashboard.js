import request from '@/utils/request'

export function getBarData() {
  return request({
    url: '/rbac/permslist/',
    method: 'get'
  })
}
export function getSysInfo() {
  return request({
    url: '/rbac/get/sysinfo/',
    method: 'get'
  })
}

