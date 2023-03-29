<template>
  <div>
  <router-link :to="{ name: 'Game'}"><span class="mr-4">Start</span></router-link>
  <router-link :to="{ name: 'Login'}"><span>Login</span></router-link>
    <RouterView></RouterView>
  </div>
</template>
<script setup>
// import { ref, computed } from 'vue' 
// import NavbarComp from '@/components/NavbarComp.vue';
import { RouterView } from 'vue-router';
// import GameView from '@/views/GameView.vue';

</script>
<style>
</style>