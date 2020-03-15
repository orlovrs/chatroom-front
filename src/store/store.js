import Vue from 'vue'
import Vuex from 'vuex'

import chats from '@/store/modules/chats'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chats
  }
})
