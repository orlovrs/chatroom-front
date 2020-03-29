<template>
  <div>
    <h1 class="my-3">Chat for people (and of course for experiment)</h1>
    <b-form @submit.stop.prevent>
      <b-form-group>
        <b-input
          id="chat-room-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Chat Room Name"
          v-model="chatName"
          :disabled="$store.getters.chatIsCreating"
          :state="validate"
          @input="isModified = true"
        ></b-input>
        <b-form-invalid-feedback id="error" :state="validate">
          <p>This name is already taken <b-button-close @click="closeMessage"></b-button-close></p>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        :disabled="chatName == '' || $store.getters.chatIsCreating"
        @click="createChat"
        >Create chat room</b-button>
    </b-form>
    <b-modal id="join" title="Join chat" hide-footer centered>
      <p>To join chat follow the link: </p>
      <router-link
        :to="{ path: '/join', query: { id: chatId }}"
        tag="a"
        >{{ joinLink }}</router-link>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatName: '',
      isModified: true,
      chatId: ''
    }
  },
  methods: {
    createChat() {
      this.$store.dispatch('createChat', this.chatName)
      .then(res => {
        if (res.data) {
          this.chatId = res.data.id
          this.$bvModal.show('join')
        }
      })
      this.isModified = false
    },
    closeMessage() {
      this.isModified = true
    }
  },
  computed: {
    joinLink() {
      return `${document.location.href}?id=` + this.chatId
    },
    validate() {
      if (this.isModified) return undefined
      if (!this.$store.getters.lastResponseError) return undefined
      return false
    }
  }
}
</script>