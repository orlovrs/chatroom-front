import axios from 'axios'

const instance = axios.create({
  //baseURL: 'https://localhost:44308/api',
  baseURL: 'https://chatroom-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance