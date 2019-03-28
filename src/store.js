import Vue from "vue";
import Vuex from "vuex";
import { csvParse } from "d3-dsv";
Vue.use(Vuex);

const state = {
  isLoading: false,
  schoolsData: null,
  reviewsData: null
};
const actions = {
  fetchData({ commit }) {
    commit("INTERACTIVE_DATA");
  }
};
const mutations = {
  async INTERACTIVE_DATA(state) {
    state.isLoading = true;
    [state.schoolsData, state.reviewsData] = await Promise.all([
      fetch("schools.csv")
        .then(res => res.text())
        .then(res => csvParse(res))
        .then(data => {
          delete data.columns;
          return data.sort(() => 0.5 - Math.random());
        }),
      fetch("outfits.csv")
        .then(res => res.text())
        .then(res =>
          csvParse(res, row => {
            const out = {
              outfit: {},
              schools: {}
            };
            for (let key in row) {
              if (key.includes("outfit")) {
                out["outfit"][key] = row[key];
              } else {
                out["schools"][key] = row[key]  ;
              }
            }
            return out;
          })
        )
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
