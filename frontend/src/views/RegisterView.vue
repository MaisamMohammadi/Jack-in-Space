<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '../router/index.js'
import bcrypt from 'bcryptjs'
import { useAccountStore } from '../stores/accountStore.js'

const accountStore = useAccountStore()
const data = ref({
  username: '',
  password: '',
  birthdate: ''
})
const registerFeedback = ref('')

const isDateValid = d => {
  return d instanceof Date && !isNaN(d)
}

const getResult = async () => {
  await accountStore.register(data.value)
  registerFeedback.value = accountStore.accountFeedback
  if (accountStore.lastRegisterResponse.status === 201) {
    registerFeedback.value = `Welcome to Jack-In-Space, ${data.value.username}!`
    setTimeout(() => {
      router.push({ name: 'Home' })
    }, 1000)
  }

  // console.log(data.value)
  // const salt = bcrypt.genSaltSync(10)
  // const requestBody = {
  //   username: data.value.username,
  //   password: bcrypt.hashSync(data.value.password, salt),
  //   birthdate: data.value.birthdate,
  //   salt
  // }
  // let result
  // try {
  //   result = await axios.post('http://localhost:5000/account', requestBody, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // } catch (error) {
  //   registerFeedback.value = JSON.parse(error.request.response).message
  // }
  // if (result?.request.status === 201) {
  //   registerFeedback.value = `Welcome to Jack-In-Space, ${data.value.username}!`
  //   setTimeout(() => {
  //     router.push({ name: 'Login' })
  //   }, 1000)
  // }
}
</script>

<template>
  <div class="w-screen h-screen view">
    <div
      id="container"
      class="px-auto absolute left-[30vw] top-[12vh] flex h-[40vw] w-[40vw] flex-col items-center justify-center rounded-full border-[1vw] border-blue bg-circle/50"
    >
      <p class="mt-[-2%] text-center text-[100px]">REGISTER</p>

      <div class="mt-10">
        <div class="sm:col-span-3">
          <label for="user-name" class="text-lg font-medium leading-6"
            >Username</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="user-name"
              id="user-name"
              v-model="data.username"
              autocomplete="given-name"
              class="block h-[40px] w-[300px] rounded-md border-0 bg-white px-1 py-1.5 text-black shadow-sm focus:bg-white/50"
            />
          </div>
        </div>

        <div class="mt-5">
          <label for="password" class="block text-lg font-medium leading-6"
            >Password</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="data.password"
              autocomplete="password"
              class="block h-[40px] w-[300px] rounded-md border-0 bg-white px-1 py-1.5 text-black shadow-sm focus:bg-white/50"
            />
          </div>
        </div>

        <div class="mt-5">
          <label for="birthdate" class="block text-lg font-medium leading-6"
            >Birthdate</label
          >
          <div class="mt-2">
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              v-model="data.birthdate"
              class="block h-[40px] w-[300px] rounded-md border-0 bg-white px-1 py-1.5 text-black shadow-sm focus:bg-white/50"
            />
          </div>
        </div>
      </div>

      <!-- <router-link :to="{ name: 'Login' }">
        <div
          class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center px-1 py-1 text-[25px]"
        >
          Login
        </div>
      </router-link> -->

      <div class="mt-[15px] flex h-[5vh] w-[15vw] items-center px-1 py-1">
        <span> Already have an account? </span>
        <router-link :to="{ name: 'Login' }">
          <span class="ml-5 text-[1.5em] underline">Login</span>
        </router-link>
      </div>

      <div
        id="birthdate-warning"
        class="my-[4px] text-[1.25em] flex h-[5vh] w-[26vw] items-center justify-center px-1 py-1"
        v-if="!isDateValid(new Date(data.birthdate))"
      >
        <span> &#9888; Birthdate currently is not valid &#x26A0; </span>
      </div>

      <div
        :class="
          registerFeedback.includes('Welcome') ? 'text-emerald-500' : 'text-red'
        "
        class="my-[8px] text-[1.75em] flex h-[5vh] w-[26vw] items-center justify-center px-1 py-1"
      >
        <span> {{ registerFeedback }} </span>
      </div>

      <div
        class="my-[15px] flex h-[6vh] w-[15vw] cursor-pointer items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px]"
        @click="getResult"
      >
        Register
      </div>
    </div>

    <router-link :to="{ name: 'Home' }" class="my-[5px]">
      <div
        class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red"
      >
        HOME
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.view {
  background-image: url('../assets/images/background.png');
  background-size: cover;
}

p {
  font-family: title;
}

#birthdate-warning {
  color: yellow;
}
</style>
