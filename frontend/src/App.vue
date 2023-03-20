<template>
  <div>
    <GameView/>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue' 
import NavbarComp from '@/components/NavbarComp.vue';
import { RouterView } from 'vue-router';
import GameView from '@/views/GameView.vue';

</script>
<style>
</style>