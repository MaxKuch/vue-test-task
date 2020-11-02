<template>
  <div class="modal" tabindex="-1" :id="id">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Информация о участнике соревнования - круговя система</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="form-group row">
              <label class="col-md-2 col-form-label">Номер</label>
              <div class="col-sm-10">
                <input v-model="selectedNumber" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 col-form-label">Участник</label>
              <div class="col-sm-10">
                <select v-model="selectedUser" v-if="users" class="form-control">
                  <option 
                    v-for="user in users" 
                    :key="user._id" 
                    :selected="user._id === currentUser ? 'selected' : ''"
                    :value="user._id"
                  >
                    {{user.name}}
                  </option>
                </select>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="disqalify" data-dismiss="modal">Дисквалифицировать</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    currentUser: {
      type: String
    }
  },
  data(){
    return {
      selectedNumber: null,
      selectedUser: null,
      users: window.users
    }
  },
  watch: {
    currentUser(){
      this.selectedUser = users.find(user => this.currentUser === user._id)._id
    }
  },
  methods: {
    disqalify(){
      this.$emit('disqualify', this.selectedUser)
    }
  },
  mounted(){
  },
  name: 'ModalDisqualify'
}
</script>