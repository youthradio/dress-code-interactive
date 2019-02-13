import Vue from 'vue'
import Vuex from 'vuex'
import { csvParse } from 'd3-dsv'
Vue.use(Vuex)



const state = {
  isLoading: false,
  schoolsData: null,
  outfitsData: null,
}
const actions = {
  fetchData ({ commit }) {
    commit('INTERACTIVE_DATA');
  }
}
const mutations = {
  async INTERACTIVE_DATA(state){
    state.isLoading = true;
    state.schoolsData  = await fetch('schools.csv')
      .then(res => res.text())
      .then(res => csvParse(res))
      .then(data => {
        delete data.columns;
        return data;
        })
    state.isLoading = false;
  }
}
export default new Vuex.Store({
  mutations,
  state,
  actions
})
//
// const QUERY = (id) => `
// query {
//   quiz: getQuizById( id: "${id}" ){
//     id
//     description
//     featureImage
//     questions {
//       id
//       questionOrder
//       questionText
//       featureImage
//       options{
//         id
//         optionText
//         resultText
//         correctOption
//       }
//     }
//   }
// }
// `
