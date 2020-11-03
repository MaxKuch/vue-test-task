import category from '../db/category.js'


export default {
  state: {
    category
  },
  mutations: {
    disqualify(state, userID){
      const currentUserNumber = +state.category.nodes.athletesInfo.find(user => userID === user.userId).number
      state.category.nodes.laps = state.category.nodes.laps.map(lap => {
        return lap.map(cell => {
          if(cell.winner === currentUserNumber - 1){
            return {...cell, winner: cell.opponent - 1, opponent: cell.winner+1}
          }
          else{
            return cell
          }
        })
        
      })
      state.category = {...state.category}
    },
    updateNote(state, payload){
      const {
        selectedWinner, 
        score, 
        time, 
        lapIndex,
        cellIndex
      } = payload
      let selectedWinnerNumber = null
      if(selectedWinner){
        selectedWinnerNumber = state.category.nodes.athletesInfo.find(athlet => athlet.userId == selectedWinner).number
      }
      state.category.nodes.laps[lapIndex][cellIndex].winner = selectedWinnerNumber
      state.category.nodes.laps[lapIndex][cellIndex].score = score
      state.category.nodes.laps[lapIndex][cellIndex].time = time
      state.category = {...state.category}
    }
  },
  actions: {
  },
  getters: {
    getCategory: state => state.category,
  }
}