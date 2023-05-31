<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen view">
    <div class="text-[5rem] titel">
      <p class="text-center text-[100px] mt-[10%]">HELP</p>
    </div>
    <div id="container" class="flex flex-row">
      <div class="text-lg text">
        <div class="my-[2.5rem]">
          <span class="px-3 py-2 ml-2 mr-2 rounded-full bg-circle">1</span>
          <!-- Mit Maus, kannst du den Spaceship steuern. -->
          Move your mouse to move your spaceship!
        </div>
        <div class="my-[2.5rem]">
          <span class="px-3 py-2 ml-2 mr-2 rounded-full bg-circle">2</span>
          <!-- Mit Linksclick, kannst du Laser feuern. -->
          Left click to fire!
        </div>
        <div class="my-[2.5rem]">
          <span class="px-3 py-2 ml-2 mr-2 rounded-full bg-circle">3</span>
          <!-- Du muss die Mülls, die fallen, abschießen, um Punkte zu bekommen. -->
          Shoot the trash to get points!
        </div>
      </div>
      <div>
        <img src="@/assets/images/Help.svg" class="w-[400px]" alt="" />
      </div>
    </div>
    <router-link :to="{ name: 'Home' }" class="my-[5px]">
      <div
        class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red"
      >
        HOME
      </div>
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.view {
  background-image: url('../assets/images/background.png');
  background-size: cover;
}
p {
  font-family: title;
}
</style>
