import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const useAccountStore = defineStore('accountStore', () => {
  // const currentUser = ref({})
  const currentUserHashed = ref({})
  if (window.sessionStorage.getItem('currentUser')) {
    currentUserHashed.value = JSON.parse(
      window.sessionStorage.getItem('currentUser')
    )
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
    currentUserHashed.value = {
      id: bcrypt.hashSync(user.data.id.toString(), user.data.salt),
      username: user.data.username
    }
    window.sessionStorage.setItem(
      'currentUser',
      JSON.stringify(currentUserHashed.value)
    )
    // invalidAccount.value = true
  }
  const logout = () => {
    currentUserHashed.value = {}
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
    // currentUserHashed.value = { id: user.data.id, username: user.data.username }
    currentUserHashed.value = {
      id: bcrypt.hashSync(user.data.id.toString(), user.data.salt),
      username: user.data.username
    }
    window.sessionStorage.setItem(
      'currentUserHashed',
      JSON.stringify(currentUserHashed.value)
    )
    // invalidAccount.value = true
  }
  const updateScore = async highscore => {
    const savedHashedID = currentUserHashed.value.id
    const user = await axios.get(`http://localhost:5000/account/${currentUserHashed.value.username}`)
    const { id } = user.data
    let hashedID
    try {
      hashedID = bcrypt.hashSync(id?.toString(), user.data.salt)
    } catch (error) {
      // console.error(error)
      return false
    }
    if (savedHashedID !== hashedID) {
      return false
    }
    const result = await axios.patch(`http://localhost:5000/account/${id}/highscore`, {
      highscore
    })
    console.log(result)
    return true
  }
  const getHighscore = async () => {
    if (!currentUserHashed.value.username) {
      return -1
    }
    const user = await axios.get(`http://localhost:5000/account/${currentUserHashed.value.username}`)
    return user.data.highscore
  }

  return {
    currentUser: currentUserHashed,
    lastLoginResponse,
    lastRegisterResponse,
    accountFeedback,
    // invalidAccount,
    login,
    logout,
    register,
    updateScore,
    getHighscore
  }
})
