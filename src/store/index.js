import { createStore } from "vuex";

export default createStore({
  state: {
    allDogs: null,
  },
  getters: {
    allDogs(state) {
      return state.allDogs;
    },
  },
  mutations: {
    SET_DOGS(state, dogs) {
      state.allDogs = dogs;
    },
  },
  actions: {
    storeDogs({ commit }, dogs) {
      commit("SET_DOGS", dogs);
    },
  },
});
