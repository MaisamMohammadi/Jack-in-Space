<template>
  <div
    class="absolute my-[5%] ml-[35vw] mt-[35vh] p-5 flex h-[30vh] w-[30vw] flex-col items-center justify-center rounded-xl bg-circle/50 text-xl"
  >
    <p>Score: {{ myStore.score }}</p>
    <div v-if="!accountStore.currentUser?.username">
      <p>
        Good job! Your progress wasn't saved though!<br />Log in or register to
        save your progress.
      </p>
    </div>
    <div v-else>
      <div v-if="myStore.newHighscoreAchieved" class="text-emerald-500">
        <p>New highscore! Your progress was saved.</p>
      </div>
      <div v-else>
        <p>Highscore: {{ highscore }}</p>
        <p>Nice attempt! Try beating your highscore.</p>
      </div>
    </div>
    <RouterLink :to="{ name: 'Game' }" @click="reload">
      <div
        class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue"
      >
        Retry
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'Home' }" @click="this.$emit('destroyGame')">
      <div
        class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue"
      >
        Quit
      </div>
    </RouterLink>
    <p>Note: To unhide your mouse cursor, press Esc or Q</p>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { gameStore } from '../stores/Store'
import { useAccountStore } from '../stores/accountStore'
import { defineEmits, ref } from 'vue'

const myStore = gameStore()
const accountStore = useAccountStore()
const highscore = ref(-1)

const reload = () => {
  myStore.showMenu = false
  location.reload()
}

;(async () => {
  highscore.value = await accountStore.getHighscore()
})()

defineEmits(['destroyGame'])
</script>

<style scoped>
p {
  font-family: overwatch;
}
</style>
