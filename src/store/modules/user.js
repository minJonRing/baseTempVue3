import { ajax } from '@/api/ajax'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { resetRouter } from '@/router/index.js'

const state = {
  token: getToken(),
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data
  },
  SET_ROLES: (state, data) => {
    state.roles = data || []
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  },
}

const actions = {
  // // user login
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      ajax({
        url: "/learning/api/login/password",
        method: 'post',
        data
      }).then(({ data }) => {
        const { token } = data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      ajax({
        url: "/learning/api/user/me"
      }).then(({ data }) => {
        if (!data) {
          reject('用户信息获取失败')
        }
        const { roles } = data
        commit('SET_USERINFO', data)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
