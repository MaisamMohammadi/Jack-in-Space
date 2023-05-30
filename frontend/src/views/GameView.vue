<template>
  <div class="bg-none text-white">
    <MenuComp v-if="myStore.showMenu" @destroyGame="gameDestroyed"></MenuComp>
  </div>
</template>
<script setup>
// import { ref } from 'vue';
import MenuComp from '../components/MenuComp.vue';
import { config } from '../game/game.js';
import { gameStore } from '../stores/Store';
import Phaser from 'phaser';
// import { RouterView } from 'vue-router';

const game = new Phaser.Game(config);

const myStore = gameStore();

const gameDestroyed = () => {
  console.log('its deleted');
  myStore.showMenu = false;
  game.destroy(true);
};

window.addEventListener('popstate', () => {
  game.destroy(true);
});
</script>
<style></style>
