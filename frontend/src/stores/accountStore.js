import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const useAccountStore = defineStore('accountStore', () => {
  const data = ref([])
  const lastLoginResponse = ref([])
  const lastRegisterResponse = ref([])
  const accountFeedback = ref('')

  const login = async data => {
    const { username, password } = data
    let result
    try {
      const user = await axios.get(`http://localhost:5000/account/${username}`)
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
  }

  return {
    data,
    lastLoginResponse,
    lastRegisterResponse,
    accountFeedback,
    login
  }
})
