<template>
  <div
    class="absolute my-[5%] ml-[35vw] mt-[35vh] flex h-[30vh] w-[30vw] flex-col items-center justify-center rounded-xl bg-circle/50 text-xl"
  >

    <p>Score: {{ myStore.score }}</p>
    <RouterLink :to="{ name: 'Game' }" @click="reload"
      ><div
        class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue"
      >
        Retry
      </div></RouterLink
    >
    <RouterLink :to="{ name: 'Home' }" @click="this.$emit('destroyGame')"
      ><div
        class="my-[15px] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue"
      >
        Quit
      </div></RouterLink
    >
    <p>Tip: theres no mousecursor, press Q</p>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { gameStore } from '../stores/Store';

const myStore = gameStore();

const reload = () => {
  myStore.showMenu = false;
  location.reload();
};

defineEmits(['destroyGame']);
</script>

<style scoped>
p{
  font-family: overwatch;
}
</style>
