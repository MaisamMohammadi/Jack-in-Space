<template>
  <div v-if="!dismissed">
    <div class="absolute w-full h-full bg-black opacity-50" />
    <div
      class="absolute w-[30vw] h-[30vh] ml-[35vw] mt-[35vh] flex flex-col justify-center items-center text-xl my-[5%] bg-circle rounded-xl border-[1vw] border-blue"
    >
      <div class="p-3">
        The currently logged on account no longer exists. It has been logged
        out.
      </div>
      <div
        @click="dismiss()"
        class="cursor-pointer w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px] text-blue"
      >
        Okay
      </div>
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
