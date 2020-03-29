import Home from '@/views/Home.vue'
import Join from '@/views/JoinChat.vue'
import Room from '@/views/Room.vue'

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/join', name: 'join', component: Join },
  { path: '/room', name: 'room', component: Room },
  { path: '*', name: 'error', redirect: '/' }
]
