<template>
  <div class="w-screen h-screen view">
    <div id="container"
      class="w-[40vw] h-[40vw] flex flex-col justify-center items-center bg-circle/50 absolute left-[30vw] top-[12vh] px-auto rounded-full border-[1vw] border-blue">
      <p class="text-center text-[100px] mt-[5%]">REGISTER</p>

      <div class="mt-10">
        <div class="sm:col-span-3">
          <label for="user-name" class="text-lg font-medium leading-6">User name</label>
          <div class="mt-2">
            <input type="text" name="user-name" id="user-name" v-model="data.username" autocomplete="given-name"
              class="block w-[300px] h-[40px] rounded-md border-0 px-1 py-1.5 text-black shadow-sm bg-white focus:bg-white/50" />
          </div>
        </div>

        <div class="mt-5">
          <label for="password" class="block text-lg font-medium leading-6">Password</label>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="data.password" autocomplete="password"
              class="block w-[300px] h-[40px] rounded-md border-0 px-1 py-1.5 text-black shadow-sm bg-white focus:bg-white/50" />
          </div>
        </div>

        <div class="mt-5">
          <label for="birthdate" class="block text-lg font-medium leading-6">birthdate</label>
          <div class="mt-2">
            <input id="birthdate" name="birthdate" type="date" v-model="data.birthdate" autocomplete="password"
              class="block w-[300px] h-[40px] rounded-md border-0 px-1 py-1.5 text-black shadow-sm bg-white focus:bg-white/50" />
          </div>
        </div>

      </div>

      <router-link :to="{ name: 'Login' }">
        <div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center text-[25px]">Login</div>
      </router-link>


      <div
        class="cursor-pointer w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px]"
        @click="getResult">Register</div>


    </div>
    <router-link :to="{ name: 'Home' }" class="my-[5px]">
      <div
        class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red">
        HOME</div>
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
  password: '',
  birthdate: '',
})

const getResult = async () => {
  console.log(data.value)
  const salt = bcrypt.genSaltSync(10)
  data.value.password = bcrypt.hashSync(data.value.password, salt)
  let result
  try {
    result = await axios.post('http://localhost:5000/account', data.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    alert(JSON.parse(error.request.response).message)
  }
  if (result?.request.status === 201) {
    alert(`Welcome to Jack-In-Space, ${result.data[0].username}!\n - Jack from space`)
    console.log(result)
    router.push({ name: 'Login' })
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