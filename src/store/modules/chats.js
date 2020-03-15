import axios from '@/axios'

const state = {
  chatrooms: [],
  isLoading: false
}

const mutations = {
  'INIT_TOURNAMENTS' (state, tournaments) {
    state.tournaments = []
    for (let keyItem in tournaments) {
      tournaments[keyItem].id = keyItem
      state.tournaments.push(tournaments[keyItem])
    }
  }
}

const actions = {
  initTournaments ({ commit }) {
    state.isLoading = true
    axios.get('/tournaments.json')
      .then(response => { commit('INIT_TOURNAMENTS', response.data) })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        state.isLoading = false
      })
  }
}

const getters = {
  tournaments (state) {
    return state.tournaments.sort(function (a, b) {
      return a.season - b.season > 0
    })
  },
  tournament: state => id => {
    return state.tournaments.filter(x => {
      return x.id === id
    })[0] || null
  },
  isTournamentsLoading (state) {
    return state.isLoading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
