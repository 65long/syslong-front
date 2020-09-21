import Cookies from 'js-cookie'

const TokenKey = 'syslong_token'
const UserInfoKey = 'syslong_userinfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  const userInfo = Cookies.get(UserInfoKey)
  if (!userInfo) {
    return {}
  }
  return JSON.parse(userInfo)
}

export function setUserInfo(data_obj) {
  return Cookies.set(UserInfoKey, JSON.stringify(data_obj))
}

export function updateUserInfo(key, val) {
  const userinfo = getUserInfo()
  userinfo[key] = val
  return setUserInfo(userinfo)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}

