import request from '@/utils/request'

export function addUser(userObj) {
  return request({
    url: '/rbac/users/',
    method: 'post',
    data: userObj
  })
}

export function deleteUser(id) {
  return request({
    url: '/rbac/users/' + id + '/',
    method: 'delete'
  })
}

export function editUser(id, userObj) {
  return request({
    url: '/rbac/users/' + id + '/',
    method: 'put',
    data: userObj
  })
}

export function updatePasswd(id, data) {
  return request({
    url: '/rbac/users/' + id + '/change-passwd/',
    method: 'post',
    data
  })
}

export function getUserList(queryInfo) {
  return request({
    url: '/get/users',
    method: 'get',
    // queryInfo 为object
    params: queryInfo
  })
}

export function changeUserPwd(pwdInfo) {
  return request({
    url: '/rbac/chagepwd/',
    method: 'post',
    // queryInfo 为object
    data: pwdInfo
  })
}

