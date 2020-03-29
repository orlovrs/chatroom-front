import axios from '@/axios'

const state = {
  isLoading: false,
  lastResponseError: undefined
}

const mutations = {
  'SET_ERROR'(state, isError) {
    state.lastResponseError = isError
  },
  'DELETE_CHAT'(state, chatId) {
    let chatsJson = localStorage.getItem('chats')
    let chats = chatsJson ? JSON.parse(chatsJson) : []
    chats = chats.filter(x => +x.id != +chatId)
    localStorage.setItem('chats', JSON.stringify(chats))
  }
}

const actions = {
  createChat ({ commit }, chatName) {
    state.isLoading = true
    state.lastResponseError = undefined
    return axios.post('/chat', { name: chatName })
      .then(response => {
        let chatsJson = localStorage.getItem("chats")
        let chats = chatsJson ? JSON.parse(chatsJson) : []
        if (!chats.some(x => x.name === chatName && x.uuid === response.data.uuid)) {
          chats.push(response.data)
          localStorage.setItem("chats", JSON.stringify(chats))
        }
        commit('SET_ERROR', false)
        return response
      })
      .catch(error => {
        commit('SET_ERROR', true)
        console.log(error)
        return error
      })
      .finally(() => {
        state.isLoading = false
      })
  },
  deleteChat ({ commit }, chatId) {
    commit('DELETE_CHAT', chatId)
    return axios.delete(`/chat?id=${chatId}`)
    .then(result => { return result })
    .catch(error => {
      console.log(error)
      return error
    })
  },
  joinChat ({ commit }, { chatId, username }) {
    state.isLoading = true
    state.lastResponseError = undefined
    return axios.post(`/chat/join?id=${chatId}`, { name: username })
      .then(response => {
        let chatsJson = localStorage.getItem("chats")
        let chats = chatsJson ? JSON.parse(chatsJson) : []
        chats.filter(x => x.id == chatId)[0].username = username
        localStorage.setItem("chats", JSON.stringify(chats))
        commit('SET_ERROR', false)
        return response
      })
      .catch(error => {
        commit('SET_ERROR', true)
        console.log(error)
        return error
      })
      .finally(() => {
        state.isLoading = false
      })
  }
}

const getters = {
  chatIsCreating() {
    return state.isLoading
  },
  lastResponseError() {
    return state.lastResponseError
  },
  getChat: () => (chatId) => {
    state.isLoading = true
    return axios.get(`/chat?id=${chatId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        return error.response
      })
      .finally(() => {
        state.isLoading = false
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
