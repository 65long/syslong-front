import request from '@/utils/request'

export function getRoleListToUser() {
  return request({
    url: '/rbac/role-to-user/',
    method: 'get'
  })
}

export function changeRoleToUser(data) {
  return request({
    url: '/rbac/role-to-user/',
    method: 'post',
    data
  })
}

export function ChangeDataPermMode(data_obj) {
  return request({
    url: '/rbac/data-to-role/',
    method: 'post',
    data: data_obj
  })
}

export function dataPermsMode(data_obj) {
  return request({
    url: '/rbac/data-to-role/',
    method: 'get',
    params: data_obj
  })
}

export function roleList(queryInfo) {
  return request({
    url: '/rbac/roles/',
    method: 'get',
    params: queryInfo
  })
}

export function addRole(role_obj) {
  return request({
    url: '/rbac/roles/',
    method: 'post',
    data: role_obj
  })
}

export function delRole(id_int) {
  return request({
    url: `/rbac/roles/${id_int}/`,
    method: 'delete'
  })
}

export function editRole(id_int, data_obj) {
  return request({
    url: `/rbac/roles/${id_int}/`,
    method: 'delete',
    data: data_obj
  })
}

export function getPermsOfRole(data_obj) {
  return request({
    url: `/rbac/perms/`,
    method: 'get',
    params: data_obj
  })
}

export function delPermsOfRole(data_obj) {
  return request({
    url: `/rbac/perms/`,
    method: 'delete',
    data: data_obj
  })
}

export function addPermsForRole(data_obj) {
  return request({
    url: `/rbac/perms/`,
    method: 'post',
    data: data_obj
  })
}
