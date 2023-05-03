<template>
    <div class="text-white bg-none">
        <!-- <span v-if="playable" class="absolute left-[3vw] top-[5vh] text-[2rem] text-blue">
            Score: {{ points }}
        </span>
        <span v-else class="absolute left-[3vw] top-[5vh] text-[2rem] text-blue">
            refresh the website!
        </span> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { game } from '../game/game.js';
// import { RouterView } from 'vue-router';




window.addEventListener('popstate', () => {
  game.destroy(true);
});

</script>
<style>
</style>