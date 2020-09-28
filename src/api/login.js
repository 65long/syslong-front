import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'login/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getuserinfo(token) {
  return request({
    url: 'get/menu/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // 暂未使用
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getMenus() {
  // 返回值为[{示例如下}, {}]
  // path: '/research',
  // component: Layout,
  // redirect: '/research/respage01',
  // name: 'Research',
  // alwaysShow: true,
  // meta: { title: '刘福龙', icon: 'wechat' },
  // children: []
  return request({
    url: '/get/menus/',
    method: 'get'
  })
}
