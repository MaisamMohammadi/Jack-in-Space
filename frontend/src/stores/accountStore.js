import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const useAccountStore = defineStore('accountStore', () => {
  // const currentUser = ref({})
  const currentUser = ref({})
  if (window.sessionStorage.getItem('currentUser')) {
    currentUser.value = JSON.parse(window.sessionStorage.getItem('currentUser'))
  }
  const lastLoginResponse = ref([])
  const lastRegisterResponse = ref([])
  const accountFeedback = ref('')
  // const invalidAccount = ref(false)

  // ;(async () => {
  //   const user = await axios.get(
  //     `http://localhost:5000/account/${currentUser.value.id}`
  //   )
  //   if (user.data.id !== currentUser.value.id) {
  //     currentUser.value = {}
  //     window.sessionStorage.removeItem('currentUser')
  //     invalidAccount.value = true
  //   }
  // })()

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
    currentUser.value = { id: user.data.id, username: user.data.username }
    window.sessionStorage.setItem(
      'currentUser',
      JSON.stringify(currentUser.value)
    )
    // invalidAccount.value = true
  }
  const logout = () => {
    currentUser.value = {}
    window.sessionStorage.removeItem('currentUser')
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
    currentUser.value = { id: user.data.id, username: user.data.username }
    window.sessionStorage.setItem(
      'currentUser',
      JSON.stringify(currentUser.value)
    )
    // invalidAccount.value = true
  }

  return {
    currentUser,
    lastLoginResponse,
    lastRegisterResponse,
    accountFeedback,
    // invalidAccount,
    login,
    logout,
    register
  }
})
