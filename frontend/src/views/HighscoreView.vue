<template>
  <div class="absolute left-[35vw] top-[25vh]">
    <router-link :to="{ name: 'Home' }" class="px-[10px] py-[10px] bg-yellow"><span class="my-[10px]">back</span></router-link>
    <table class="w-[30vw] mt-[30px] table-auto">
      <thead class="bg-blue">
        <tr class="">
          <th class="py-3">rank</th>
          <th class="py-3">name</th>
          <th class="py-3">ponits</th>
        </tr>
      </thead>
      <tbody class="bg-yellow">
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

<style lang="scss" scoped></style>
