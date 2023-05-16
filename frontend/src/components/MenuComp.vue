<template>
    <div class="absolute w-[30vw] h-[30vh] ml-[35vw] mt-[35vh] flex flex-col justify-center items-center text-xl my-[5%] bg-circle/50 rounded-xl border-[1vw] border-blue">
        <RouterLink :to="{ name: 'Game'}" @click="reload"><div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px] text-blue">Retry</div></RouterLink>
        <RouterLink :to="{ name: 'Home'}" @click="this.$emit('destroyGame')"><div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px] text-blue">Quit</div></RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { gameStore } from '../stores/defaultStore';


const myStore = gameStore();

const reload = () => {
    myStore.showMenu = false;
    location.reload();
}

defineEmits(["destroyGame"]);

</script>

<style scoped>
</style>