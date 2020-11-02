import category from '../db/category.js'


export default {
  state: {
    category
  },
  mutations: {
    disqualify(state, userID){
      const currentUserNumber = +state.category.nodes.athletesInfo.find(user => userID === user.userId).number
      state.category.nodes.laps = state.category.nodes.laps[currentUserNumber-1].map(lap => {
        if(lap.opponent !== currentUserNumber){
          return {...lap, winner: lap.opponent}
        }
      })
    },
    updateNote(state, data){
      const {
        selectedWinner, 
        score, 
        time, 
        lapIndex,
        cellIndex
      } = data
      const selectedWinnerNumber = state.category.nodes.athletesInfo.find(athlet => athlet.userId == selectedWinner).number
      state.category.nodes.laps[lapIndex][cellIndex] = {
        ...state.category.nodes.laps[lapIndex][cellIndex],
        winner: selectedWinnerNumber,
        score,
        time
      }
    }
  },
  actions: {
  },
  getters: {
    getCategory: state => state.category,
  }
}