<template>
  <div class="view">
    <div class="text-[15px] text-blue">
      <RouterView></RouterView>
    </div>
  </div>
  
</template>
<script setup>
import { RouterView } from 'vue-router';

</script>
<style>
@font-face {
  font-family: overwatch;
  src: url(./assets/fonts/ConfigRoundedBold.ttf);
}

@font-face {
  font-family: title;
  src: url(./assets/fonts/SpaceGame-ywxX2.ttf);
}

.view{
  font-family: overwatch;
}

.cursor-pointer{
  cursor: pointer;
}
</style>