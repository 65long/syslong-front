import request from '@/utils/request'

export function addUser(userObj) {
  return request({
    url: '/oper/user',
    method: 'post',
    data: userObj
  })
}

export function deleteUser(id) {
  return request({
    url: '/oper/user',
    method: 'delete',
    data: {id: id}
  })
}

export function editUser(id, userObj) {
  userObj['id'] = id
  return request({
    url: '/oper/user',
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

export function changeUserPwd(pwdInfo) {
  return request({
    url: '/rbac/chagepwd/',
    method: 'post',
    // queryInfo 为object
    data: pwdInfo
  })
}


export function getUserList(queryInfo) {
  return request({
    url: 'get/users/list',
    method: 'get',
    // queryInfo 为object
    params: queryInfo
  })
}
