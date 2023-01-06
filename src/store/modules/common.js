const state = {
  loading: false,
}

const mutations = {
  SET_LOADING: (state, data) => {
    state.loading = data
  },
}

const actions = {
  setLoading({ commit }, data = true) {
    commit('SET_LOADING', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
