import defaultSettings from '@/settings'
import { getUserInfo } from '@/utils/auth'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
const userInfo = getUserInfo()
const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: userInfo.tagsView,
  needShowAvatar: userInfo.needShowAvatar
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

