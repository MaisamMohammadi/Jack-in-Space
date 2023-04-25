<template>
  <div class="w-screen h-screen view">
    <div id="container" class="w-[40vw] h-[40vw] flex flex-col justify-center items-center bg-circle/50 absolute left-[30vw] top-[12vh] px-auto rounded-full border-[1vw] border-blue">
          <p class="text-center text-[100px] mt-[5%]">Login</p>

          <div class="mt-10">
            <div class="sm:col-span-3">
              <label for="user-name" class="text-lg font-medium leading-6">User name</label>
              <div class="mt-2">
                <input type="text" name="user-name" id="user-name" v-model="data.username" autocomplete="given-name" class="block w-[300px] h-[40px] rounded-md border-0 px-1 py-1.5 text-black shadow-sm bg-white focus:bg-white/50" />
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
                <input id="password" name="password" type="password" v-model="data.password" autocomplete="password" class="block w-[300px] h-[40px] rounded-md border-0 px-1 py-1.5 text-black shadow-sm bg-white focus:bg-white/50" />
              </div>
            </div>

          </div>
          
          <div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center text-[25px]">Register</div>
          
        
          <div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px]" @click="getResult">LOGIN</div>
          
        
      </div>
      <router-link :to="{ name: 'Home' }" class="my-[5px]">
        <div class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red">HOME</div>
      </router-link>
  </div>
    

    

    
</template>

<script setup>
import { ref } from 'vue'

const data = ref({
  username : '',
  password : '',
})

const getResult = () => {
  console.log(data.value);
}

</script>

<style scoped>
.view{
  background-image: url('../assets/images/background.png');
  background-size: cover;
}
p{
  font-family: title;
}
</style>