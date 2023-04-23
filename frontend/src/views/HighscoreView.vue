<template>
  <div class="view h-screen w-screen">
    <div class="px-auto absolute left-[30vw] top-[12vh] h-[40vw] w-[40vw] rounded-full border-[1vw] border-blue bg-circle/50">
      <p class="mt-[10%] text-center text-[100px]">Highscore</p>
      <div class="w-1/2 mx-[25%] overflow-auto rounded-lg border border-blue">
        <table class="w-full text-center">
          <thead class="bg-circle text-slate-100 drop-shadow-xl drop-red-xl">
            <th v-for="item in cols" :key="item" :class="`px-4 py-2 ${item.center ? 'text-center' : 'text-start' }`">{{ item.name }}</th>
          </thead>
          <tbody class="">
            <tr v-for="item in rankingList" :key="item" :class="`${ rankingList.indexOf(item) % 2 == 1 ? 'bg-circle/25' : '' }${ rankingList.indexOf(item) + 1 == rankingList.length ? 'bg-circle' : ''}`">
              <td class="whitespace-nowrap px-4 py-2">{{ rankingList.indexOf(item) + 1  }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-start">{{ item.name }}</td>
              <td class="whitespace-nowrap px-4 py-2">{{ item.ponits }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-link :to="{ name: 'Home' }" class="my-[5px]">
      <div class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-red px-1 py-1 text-[35px] text-red">HOME</div>
    </router-link>
  </div>
</template>

<script setup>
const cols = [
  { name: "Rank", center: true },
  { name: "Name", center: false },
  { name: "Points", center: true },
];

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
    name: "Maisamshdfihsfsfdsjf",
    ponits: 150,
  },
  {
    name: "Maisam",
    ponits: 234,
  },
  {
    name: "Rana",
    ponits: 200,
  },
  {
    name: "Maisamshdfihsfsfdsjf",
    ponits: 150,
  },
  {
    name: "Maisam",
    ponits: 234,
  },
  {
    name: "Rana",
    ponits: 200,
  },
  {
    name: "Maisamshdfihsfsfdsjf",
    ponits: 150,
  },
  {
    name: "Maisamshdfihsfsfdsjf",
    ponits: 150,
  },
  {
    name: "You",
    ponits: 150,
  },
];
</script>

<style scoped>
.view {
  background-image: url("../assets/images/background.png");
  background-size: cover;
}
p {
  font-family: title;
}
</style>
