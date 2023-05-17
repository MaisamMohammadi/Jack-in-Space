<template>
  <div class="w-screen h-screen view">
    <router-link :to="{ name: 'Login' }" class="my-[5px]">
      <div class="absolute right-[2vw] top-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue">LOGIN</div>
    </router-link>
    <div class="w-[40vw] h-[40vw] bg-circle/50 absolute left-[30vw] top-[12vh] px-auto rounded-full">
      <p class="text-center text-[100px] mt-[10%]">Jack in Space</p>
      <div class="flex flex-col items-center text-xl my-[5%]">
        <!-- the menu -->
        <router-link v-for="item in menuItems" :key="item" :to="{ name: item.link }" class="my-[5px]">
          <div class="w-[15vw] h-[6vh] px-1 py-1 my-[15px] flex justify-center items-center border-[3px] border-blue text-[35px]">{{item.title}}</div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>

const menuItems = [
  {title: "START", link: "Game"},
  {title: "HIGHSCORE", link: "Highscore"},
  {title: "HELP", link: "Help"}
]
</script>

<style>
.view{
  background-image: url('../assets/images/background.png');
  background-size: cover;
}
p{
  font-family: title;
}
</style>
