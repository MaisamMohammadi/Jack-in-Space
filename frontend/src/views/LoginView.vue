<template>
  <div class="w-screen h-screen view">
    <div id="container"
      class="px-auto absolute left-[30vw] top-[12vh] flex h-[40vw] w-[40vw] flex-col items-center justify-center rounded-full border-[1vw] border-blue bg-circle/50">
      <p class="mt-[5%] text-center text-[100px]">Login</p>

      <div class="mt-10">
        <div class="sm:col-span-3">
          <label for="user-name" class="text-lg font-medium leading-6">User name</label>
          <div class="mt-2">
            <input type="text" name="user-name" id="user-name" v-model="data.username" autocomplete="given-name"
              class="block h-[40px] w-[300px] rounded-md border-0 bg-white px-1 py-1.5 text-black shadow-sm focus:bg-white/50" />
          </div>
        </div>

        <!-- <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" name="email" type="email" v-model="email" autocomplete="email" class="block w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->

        <div class="mt-5">
          <label for="password" class="block text-lg font-medium leading-6">Password</label>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="data.password" autocomplete="password"
              class="block h-[40px] w-[300px] rounded-md border-0 bg-white px-1 py-1.5 text-black shadow-sm focus:bg-white/50" />
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'Register' }">
        <div class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center px-1 py-1 text-[25px]">
          Register
        </div>
      </router-link>

      <div
        class="cursor-pointer my-[15px] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px]"
        @click="getResult">
        LOGIN
      </div>
    </div>
    <router-link :to="{ name: 'Home' }" class="my-[5px]">
      <div
        class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red">
        HOME
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '../router/index.js'
import bcrypt from 'bcryptjs'

const data = ref({
  username: '',
  password: ''
})

const getResult = async () => {
  // console.log(data.value)
  let result
  try {
    const user = await axios.get(`http://localhost:5000/account/${data.value.username}`)
    // console.log(user)
    const requestBody = {
      username: data.value.username,
      password: bcrypt.hashSync(data.value.password, user.data.salt)
    }
    result = await axios.patch('http://localhost:5000/account/authenticate', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    // console.log(error)
    alert(JSON.parse(error.request.response).message)
  }
  if (result?.request.status === 200) {
    alert(`Nice to see you again, ${data.value.username}!\n - Jack from space`)
    // console.log(result)
    // TODO: idk token something Copilot
    // localStorage.setItem('token', result.data.token)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.view {
  background-image: url('../assets/images/background.png');
  background-size: cover;
}

p {
  font-family: title;
}
</style>
