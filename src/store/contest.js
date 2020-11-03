import contest from '../db/contest.js'


export default {
  state: {
    ...contest
  },
  mutations: {
    
  },
  actions: {
  },
  getters: {
    getContest: state => state,
  }
}