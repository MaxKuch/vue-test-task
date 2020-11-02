<template>
  <div class="modal" tabindex="-1" :id="id">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Запись о схватке - круговая система</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="form-group row">
              <label class="col-md-2 col-form-label">Видео</label>
              <div class="col-sm-10">
                <button v-if="!isVideo" class="btn btn-outline-dark" @click="loadVideo">Обзор</button>
                <video v-else ref="video"></video>
                <input type="file" class="form-control-file" ref="file" style="opacity: 0; position: absolute;">  
              </div>
              
            </div>
            <div class="form-group row">
              <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Победитель</label>
              <div class="col-sm-10">
                <select v-model="selectedWinner" v-if="opponents.length" class="form-control">
                  <option 
                    v-for="opponent in opponents" 
                    :key="opponent.userId" 
                    :value="opponent.userId"
                  >
                    {{opponent.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Счет</label>
              <div class="col-sm-10">
                <input v-model="score" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Время</label>
              <div class="col-sm-10">
                <input v-model="time" class="form-control">
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="changeNote" data-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalLapNote',
  props: {
    id: {
      type: String
    },
    currentCell: {
      type: Object
    },
  },
  data(){
    return {
      category: this.$store.getters.getCategory,
      opponents: [],
      selectedWinner: null,
      score: null,
      time: null,
      isVideo: false,
      videoLink: ''
    }
  },
  watch: {
    currentCell(){
      this.score = this.currentCell.score
      this.time = this.currentCell.time
      this.videoLink = this.currentCell.videoLink
      this.opponents = [
        this.category.nodes.athletesInfo[this.currentCell.winner], 
        this.category.nodes.athletesInfo[this.currentCell.opponent - 1]
      ].map(opponent => {
        const name = window.users.find(user => user._id == opponent.userId).name
        return {
          ...opponent, name
        }
      })
      this.selectedWinner = this.opponents[0].userId
    }
  },
  methods: {
    changeNote(){
      this.$emit('changeNote', this.selectedWinner, this.score, this.time)
    },
    loadVideo(){
      this.isVideo = true
      let reader  = new FileReader();
      let video = this.$refs.file.files
      this.$refs.video.src = reader.readAsDataURL(video);
    }
  },
}
</script>