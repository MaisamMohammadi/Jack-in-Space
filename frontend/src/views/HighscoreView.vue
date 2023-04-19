<template>
  <div class="w-screen h-screen view">
    <div class="w-[40vw] h-[40vw] bg-circle/50 absolute left-[30vw] top-[12vh] px-auto rounded-full border-[1vw] border-blue">
      <p class="text-center text-[100px] mt-[10%]">Highscore</p>
      <div class="relative left-[10vw] mt-[50px] w-[300px] h-[360px] border-[3px] border-blue rounded-md">
        <table class="w-[300px] h-[360px]">
          <thead class="bg-none">
            <tr class="">
              <th class="py-3">rank</th>
              <th class="py-3">name</th>
              <th class="py-3">ponits</th>
            </tr>
          </thead>
          <tbody class="bg-none">
            <tr v-for="el in rankingList" :key="el">
              <td class="px-3 py-3 text-center">
                {{ rankingList.indexOf(el) + 1 }}
              </td>
              <td class="px-3 py-3 text-center">{{ el.name }}</td>
              <td class="px-3 py-3 text-center">{{ el.ponits }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-link :to="{ name: 'Home' }" class="my-[5px]">
          <div class="absolute left-[2vw] bottom-[2vw] w-[15vw] h-[6vh] text-red px-1 py-1 flex justify-center items-center border-[3px] border-red text-[35px]">HOME</div>
    </router-link>
  </div>
  
</template>

<script setup>

const rankingList = [
  {
    name: "Maisam",
    ponits: 234,
  },
  {
    name: "Rana",
    ponits: 200,
  },
  {
    name: "Maisam",
    ponits: 150,
  },
];
</script>

<style scoped>
.view{
  background-image: url('../assets/images/background.png');
  background-size: cover;
}
p{
  font-family: title;
}
</style>
