<template>
  <div>
    <h1 class="my-3">Hello, {{ chat.username }}. Welcome to chat {{ chat.name }}</h1>
    <b-button @click="send"></b-button>
  </div>
</template>

<script>
import signalR from '@/chat-hub'

export default {
  data() {
    return {
      chatId: this.$route.query.id,
      chat: ''
    }
  },
  methods: {
    send() {
      signalR.invoke('SendMessage', { chatId: 2, username: 'Roman', message: 'Message1' })
      .catch(error => console.log(error))
    }
  },
  mounted() {
    this.$store.getters.getChat(this.chatId)
    .then(res => {
      let chatsJson = localStorage.getItem("chats")
      let chats = chatsJson ? JSON.parse(chatsJson) : []
      let connection = chats.filter(x => x.id == this.chatId && x.uuid == res.uuid)[0]
      if (!connection) {
        this.$router.push('home')
      }
      if (!connection.username) {
        this.$router.push({ name: 'join', query: { id: this.chatId }})
      }

      if (res.status == 'ended') {
        // Модальное окно удаления
      }

      this.chat = connection
      
      signalR.start({ withCredentials: false })
      
      signalR.on('send', data => {
        console.log(data)
      })


      console.log(signalR)
    })
  }
}
</script>