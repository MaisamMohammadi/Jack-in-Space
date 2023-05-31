<template>
  <div v-if="!dismissed">
    <div class="absolute w-full h-full bg-black opacity-50" />
    <div
      class="absolute w-[30vw] h-[40vh] ml-[35vw] mt-[30vh] flex flex-col justify-center items-center text-xl my-[5%] bg-circle rounded-xl border-[1vw] border-blue"
    >
      <div class="p-3">
        You are not logged in. Your score will not be saved.
      </div>
      <!-- <div
        @click="dismiss()"
        class="cursor-pointer w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px] text-blue"
      >
        Okay
      </div> -->
      <RouterLink :to="{ name: 'Game' }">
        <div
          class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px] text-blue"
        >
          Okay
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'Login' }">
        <div
          class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-emerald-500 text-[35px] text-emerald-500"
        >
          Login
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'Register' }">
        <div
          class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-emerald-600 text-[35px] text-emerald-600"
        >
          Register
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const dismissed = ref(false)

const dismiss = () => {
  dismissed.value = true
}
</script>

<style scoped></style>
