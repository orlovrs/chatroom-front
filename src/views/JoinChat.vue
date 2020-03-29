<template>
  <div>
    <h1 class="my-3">Join to chat: {{ chat.name }}</h1>
    <b-form @submit.stop.prevent>
      <b-form-group>
        <b-input
          id="name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Username"
          v-model="username"
          :disabled="chat.status == 'ended'"
          :state="validate"
          @input="isModified = true"
        ></b-input>
        <b-form-invalid-feedback id="error" :state="validate">
          <p>This name is already taken <b-button-close @click="isModified = true"></b-button-close></p>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        @click="joinChat"
        :disabled="this.chat.status == 'ended' || this.username == ''"
        >Submit</b-button>
    </b-form>
    <b-modal
      id="delete"
      title="Delete chat"
      centered
      ok-only
      ok-title="Delete Chat Room"
      @ok="deleteChat">
      <p>This chat has ended. You can delete it</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      chatId: this.$route.query.id,
      chat: '',
      isModified: true
    }
  },
  computed: {
    validate() {
      if (this.isModified) return undefined
      if (!this.$store.getters.lastResponseError) return undefined
      return false
    }
  },
  methods: {
    joinChat() {
      this.$store.dispatch('joinChat', { chatId: this.chatId, username: this.username })
      .then(res => {
        if (res.status) {
          this.$router.push({ name: 'room', query: { id: this.chatId }})
        }
      })
      this.isModified = false
    },
    deleteChat() {
      this.$store.dispatch('deleteChat', this.chatId)
      .then(() => {
        this.$router.push('home')
      })
    }
  },
  async mounted() {
    this.chat = await this.$store.getters.getChat(this.$route.query.id)
    if (this.chat.status == 404) {
      this.$router.push('home')
    }

    let chatsJson = localStorage.getItem("chats")
    let chats = chatsJson ? JSON.parse(chatsJson) : []
    let connection = chats.filter(x => {
      return x.name == this.chat.name && x.uuid == this.chat.uuid && x.username
    })[0]

    if (this.chat.status == 'live' && connection) {
      this.$router.push({ name: 'room', query: { id: this.chatId }})
    }

    if (this.chat.status == 'ended') {
      this.$bvModal.show('delete')
    }
  }
}
</script>