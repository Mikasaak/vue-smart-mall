import { getUserInfo, setUserInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      setUserInfo(payload)
    }
  },
  actions: {},
  getters: {
  }
}
