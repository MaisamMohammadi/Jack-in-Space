<template>
  <div class="container mx-auto text-center window">
    <NavbarComp></NavbarComp>
    <RouterView />
    <img src="./Spaceship_Model.png" alt="" :class="spaceship ">
  </div>
</template>
<script setup>
import { ref } from 'vue' 
import NavbarComp from '@/components/NavbarComp.vue';
import { RouterView } from 'vue-router';

const left = ref(50);
const right = ref(50);

</script>
<style>
.window{
  cursor: url(https://www.svgrepo.com/show/488688/space-shuttle.svg), auto !important;
}
.spaceship{
  width: 100px;
  height: 100px;
  left: 50px;
  top: 50px;
}
</style>