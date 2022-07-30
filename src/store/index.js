import { createStore } from "vuex";

export default createStore({
  state: {
    allDogs: null,
    currentDog: null,
  },
  getters: {
    allDogs(state) {
      return state.allDogs;
    },
    currentDog(state) {
      return state.currentDog;
    },
  },
  mutations: {
    SET_DOGS(state, dogs) {
      state.allDogs = dogs;
    },
    SET_CURRENT_DOG(state, dog) {
      state.currentDog = dog;
    },
  },
  actions: {
    storeDogs({ commit }, dogs) {
      commit("SET_DOGS", dogs);
    },
    storeCurrentDog({ commit }, dog) {
      commit("SET_CURRENT_DOG", dog);
    },
  },
});
