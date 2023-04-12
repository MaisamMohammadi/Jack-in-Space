<template>
  <div class="w-[50vw] h-[50vh] bg-blue absolute left-[25vw] top-[25vh] px-auto">
    <p class="text-center text-[50px]">Jack in Space</p>
    <div class="flex flex-col items-center text-xl my-[25px]">
      <router-link v-for="item in menuItems" :key="item" :to="{ name: item.link }" class="my-[5px]">
        <div class="w-[250px] bg-yellow px-1 py-1 text-center">{{item.title}}</div>
      </router-link>
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
