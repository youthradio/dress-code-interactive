import Vue from "vue";
import Vuex from "vuex";
import { csvParse } from "d3-dsv";
Vue.use(Vuex);

const state = {
  isLoading: false,
  schoolsData: null,
  outfitsData: null
};
const actions = {
  fetchData({ commit }) {
    commit("INTERACTIVE_DATA");
  }
};
const mutations = {
  async INTERACTIVE_DATA(state) {
    state.isLoading = true;
    [state.schoolsData, state.outfitsData] = await Promise.all([
      fetch("schools.csv")
        .then(res => res.text())
        .then(res => csvParse(res))
        .then(data => {
          delete data.columns;
          return data.sort(() => 0.5 - Math.random());
        }),
      fetch("outfits.csv")
        .then(res => res.text())
        .then(res => csvParse(res))
        .then(data => {
          delete data.columns;
          return data;
        })
    ]);
    state.isLoading = false;
  }
};
export default new Vuex.Store({
  mutations,
  state,
  actions
});
