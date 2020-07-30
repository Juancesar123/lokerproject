import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      list: [],
    },
    mutations: {
      setLoker(state, data) {
        state.list = data.searchComplexCarier
      },
    },
  })
}

export default createStore
