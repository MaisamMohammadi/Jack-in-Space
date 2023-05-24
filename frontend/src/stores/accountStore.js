import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const useAccountStore = defineStore('accountStore', () => {
  const currentUser = ref({})
  const lastLoginResponse = ref([])
  const lastRegisterResponse = ref([])
  const accountFeedback = ref('')

  const login = async data => {
    const { username, password } = data
    let user
    let result
    try {
      user = await axios.get(`http://localhost:5000/account/${username}`)
      result = await axios.patch('http://localhost:5000/account/authenticate', {
        username,
        password: bcrypt.hashSync(password, user.data.salt)
      })
    } catch (error) {
      lastLoginResponse.value = error.response
      // accountFeedback.value = JSON.parse(result.request.response).message
      accountFeedback.value = error.response.data.message
      return
    }
    lastLoginResponse.value = result
    accountFeedback.value = ''
    currentUser.value = user.data
  }
  const register = async data => {
    const { username, password, birthdate } = data
    let result
    try {
      const salt = bcrypt.genSaltSync(10)
      result = await axios.post('http://localhost:5000/account', {
        username,
        password: bcrypt.hashSync(password, salt),
        birthdate,
        salt
      })
    } catch (error) {
      lastRegisterResponse.value = error.response
      // accountFeedback.value = JSON.parse(result.request.response).message
      accountFeedback.value = error.response.data.message
      return
    }
    lastRegisterResponse.value = result
    accountFeedback.value = ''
    const user = await axios.get(`http://localhost:5000/account/${username}`)
    currentUser.value = user.data
  }

  return {
    currentUser,
    lastLoginResponse,
    lastRegisterResponse,
    accountFeedback,
    login,
    register
  }
})
