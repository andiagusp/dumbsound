import axios from 'axios'

const server = axios.create({ baseURL: 'http://192.168.1.12:5000/api/v1'})

const setTokenHeaders = (token) => {
  if (token) {
    server.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete server.defaults.headers.common['Authorization']
  }
}

export { server, setTokenHeaders }
