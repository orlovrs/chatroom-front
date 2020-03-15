<template>
  <div>
    <h1 class="my-3">Chat for people (and of course for experiment)</h1>
    <b-form @submit.stop.prevent>
      <b-form-group>
        <b-input
          id="chat-room-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Chat Room Name"
          :state="validation"
          :disabled="isLoading"
          v-model="chatRoom"
          @input="isModified = true"
        ></b-input>
        <b-form-invalid-feedback :state="validation" id="error">
          <p>This name is already taken <b-button-close @click="isModified = true"></b-button-close></p>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        :disabled="chatRoom == '' || isLoading"
        @click="createChat">Create chat room</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      isModified: true,
      isLoading: false,
      chatRoom: ''
    }
  },
  methods: {
    createChat() {
      this.isLoading = true
      axios.post('/chat', {
        name: this.chatRoom
      })
      .then(result => {
        this.isModified = result.status == 200
      })
      .catch(() => {
        this.isModified = false
      })
      .finally(() => {
        this.isLoading = false
      })
    }
  },
  computed: {
    validation() {
      if (this.isModified) return undefined
      return false
    }
  }
}
</script>