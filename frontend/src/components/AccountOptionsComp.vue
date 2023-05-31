<template>
  <div v-if="!dismissed">
    <div
      class="absolute w-[20vw] h-[20vh] right-4 top-4 flex flex-col items-center text-xl my-[5%] bg-circle rounded-xl border-[1vw] border-blue"
    >
      <div class="p-3">Account Options</div>
      <div
        @click="logout()"
        class="cursor-pointer w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-red text-[35px] text-red"
      >
        Log Out
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useAccountStore } from '../stores/accountStore'

const accountStore = useAccountStore()

const dismissed = ref(false)

const dismiss = () => {
  dismissed.value = true
}

const logout = () => {
  accountStore.logout()
  window.location.reload()
}
</script>

<style scoped></style>
