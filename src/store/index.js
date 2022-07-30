import { createStore } from "vuex";

export default createStore({
  state: {
    allDogs: null,
    currentDog: null,
    allBreeds: null,
  },
  getters: {
    allDogs(state) {
      return state.allDogs;
    },
    currentDog(state) {
      return state.currentDog;
    },
    allBreeds(state) {
      return state.allBreeds;
    },
  },
  mutations: {
    SET_DOGS(state, dogs) {
      state.allDogs = dogs;
    },
    SET_CURRENT_DOG(state, dog) {
      state.currentDog = dog;
    },
    SET_ALL_BREEDS(state, breeds) {
      state.allBreeds = breeds;
    },
  },
  actions: {
    storeDogs({ commit }, dogs) {
      commit("SET_DOGS", dogs);
    },
    storeCurrentDog({ commit }, dog) {
      commit("SET_CURRENT_DOG", dog);
    },
    storeBreeds({ commit }, breeds) {
      commit("SET_ALL_BREEDS", breeds);
    },
  },
});
