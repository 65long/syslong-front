import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  const userInfo = getUserInfo()
  return {
    token: getToken(),
    name: userInfo.name,
    avatar: userInfo.avatar,
    role: userInfo.role,
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  ADD_ROLE: (state) => {
    state.roles.push(state.role)
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    const username = userInfo.username
    const password = userInfo.password
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then(data => {
        // const avatar = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.username)
        // commit('SET_AVATAR', data.username)
        commit('SET_AVATAR', data.head_img)
        commit('SET_ROLE', data.role)
        setToken(data.token)
        setUserInfo({ name: data.username, avatar: data.head_img, role: data.role, last_login: data.last_login,
          date_joined: data.date_joined, email: data.email, mobile: data.mobile, nickname: data.nickname })
        resolve()
      }).catch(error => {
        console.log('err', error)
        reject(error)
      })
    })
  },

  // get user info
  // getUserInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getuserinfo(state.token).then(data => {
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //
  //       // const { name, avatar } = data
  //       //
  //       // commit('SET_NAME', name)
  //       // commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        removeToken() // must remove  token  first
        removeUserInfo() // must remove  userInfo  first
        resetRouter()
        commit('RESET_STATE')
        // 删除已经浏览过的页签
        dispatch('tagsView/delAllVisitedViews', {}, { root: true })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // add role
  addRole({ commit }, role) {
    return new Promise(resolve => {
      commit('ADD_ROLE', role)
      resolve()
    })
  },
  // add role
  changeAvatar({ commit }, avatar) {
    return new Promise(resolve => {
      commit('SET_AVATAR', avatar)
      const userinfo = getUserInfo()
      userinfo.avatar = avatar
      setUserInfo(userinfo)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

