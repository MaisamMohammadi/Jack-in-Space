<template>
  <div class="w-[50vw] h-[50vh] bg-blue absolute left-[25vw] top-[25vh] px-auto">
    <p class="text-center text-[50px]">Jack in Space</p>
    <div class="text-center text-xl mt-[5vh]">
      <router-link v-for="item in menuItems" :key="item" :to="{ name: item.link }"><div>{{item.title}}</div></router-link>
    </div>
  </div>
</template>

<script setup>
const menuItems = [
  {title: "Start", link: "Game"},
  {title: "Highscore", link: "Highscore"},
  {title: "Help", link: "Help"}
]
</script>
