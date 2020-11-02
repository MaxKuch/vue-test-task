<template>
  <div id="app">
    <ModalDisqualify 
      id="modal-disqualify"
      :currentUser="currentUser"
      @disqualify="disqualify"
    />
    <ModalLapNote
      id="modal-lap-note"
      :currentCell="currentCell"
      @changeNote="changeNote"
    />
    <CategoryTableMatrix 
      :category="category"
      :contest="contest"
      name="Зилков Александр Евгеньевич"
      @selectInfo="openDisqualify"
      @selectCell="openInfo"
    />
    <router-view/>
  </div>
</template>

<script>
import CategoryTableMatrix from '@/components/CategoryTableMatrix'
import ModalDisqualify from '@/components/ModalDisqualify'
import ModalLapNote from '@/components/ModalLapNote'

export default {
  data(){
    return {
      category: this.$store.getters.getCategory,
      contest: this.$store.getters.getContest,
      currentUser: null,
      currentCell: null,
      currentOriginalLapIndex: null,
      currentCellIndex: null
    }
  },
  methods: {
    openDisqualify(originalInfo){
      this.currentUser = originalInfo.userId
      $('#modal-disqualify').modal('show')
    },
    openInfo(originalCell, cellIndex, originalLap, lapIndex){
      this.currentCell = originalCell
      this.currentOriginalLapIndex = lapIndex
      this.currentCellIndex = cellIndex
      this.lapIndex = lapIndex
      $('#modal-lap-note').modal('show')
    },
    disqualify(userID){
      this.$store.commit('disqualify', userId)
    },
    changeNote(selectedWinner, score, time){
      this.$store.commit('updateNote', {
        selectedWinner, 
        score, 
        time, 
        lapIndex: this.currentOriginalLapIndex, 
        cellIndex: this.currentCellIndex
      })
    }
  },
  components: {
    CategoryTableMatrix,
    ModalDisqualify,
    ModalLapNote
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
