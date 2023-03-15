<template>
  <div class="field cursor-none" @mousemove="changingCoordination">
      <img src="./Spaceship_Model.png" alt="spaceship" class="w-[100px] h-[100px] absolute" 
      :style="{
        'left': x + 'px', 'top': y + 'px'}">
      <p>Horizontale Position: {{ x }} px</p>
      <p>Vertikale Position: {{ y }} px</p>
    <!-- <NavbarComp></NavbarComp>
    <RouterView /> -->
    
    
  </div>
</template>
<script setup>
import { ref, computed } from 'vue' 
import NavbarComp from '@/components/NavbarComp.vue';
import { RouterView } from 'vue-router';

let x = ref(0);
let y = ref(0);

const changingCoordination = (e) => {
  x.value = e.x;
  y.value = e.y;
}

</script>
<style>
.field{
  width: 100vw;
  height: 100vh;
}
</style>