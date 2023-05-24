<template>
  <div class="w-screen h-screen view">
    <div
      class="px-auto absolute left-[30vw] top-[12vh] h-[40vw] w-[40vw] rounded-full border-[1vw] border-blue bg-circle/50"
    >
      <p class="mt-[10%] text-center text-[100px]">Highscore</p>
      <div class="w-1/2 mx-[25%] overflow-auto rounded-lg border border-blue">
        <table class="w-full text-center">
          <thead class="bg-circle text-slate-100 drop-shadow-xl drop-red-xl">
            <th
              v-for="item in cols"
              :key="item"
              :class="`px-4 py-2 ${item.center ? 'text-center' : 'text-start'}`"
            >
              {{ item.name }}
            </th>
          </thead>
          <tbody class="">
            <tr
              v-for="item in rankingList"
              :key="item"
              :class="`${
                rankingList.indexOf(item) % 2 === 1 ? 'bg-circle/25' : ''
              }${
                rankingList.indexOf(item) + 1 === rankingList.length
                  ? 'bg-circle'
                  : ''
              }`"
            >
              <td class="px-4 py-2 whitespace-nowrap">
                {{
                  rankingList.indexOf(item) + 1 === rankingList.length
                    ? rankingList.indexOf(
                        rankingList.find(
                          user =>
                            user.name === accountStore.currentUser.username
                        )
                      ) + 1
                    : rankingList.indexOf(item) + 1
                }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap text-start">
                {{ item.name }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap">{{ item.points }}</td>
            </tr>
          </tbody>
        </table>
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

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAccountStore } from '../stores/accountStore.js'

const accountStore = useAccountStore()

const cols = [
  { name: 'Rank', center: true },
  { name: 'Name', center: false },
  { name: 'Points', center: true }
]

const rankingList = ref([])

;(async () => {
  const response = await axios.get('http://localhost:5000/account')
  console.log(response)
  rankingList.value = response.data
    .map(item => {
      return {
        name: item.username,
        points: item.highscore
      }
    })
    .sort((a, b) => {
      return b.points - a.points
    })
  if (accountStore.currentUser.username) {
    const user = rankingList.value.find(
      item => item.name === accountStore.currentUser.username
    )
    rankingList.value.push({
      name: 'You',
      points: user.points
    })
  }
})()

// const rankingList = [
//   {
//     name: 'Maisam',
//     points: 234
//   },
//   {
//     name: 'Rana',
//     points: 200
//   },
//   {
//     name: 'Maisamshdfihsfsfdsjf',
//     points: 150
//   },
//   {
//     name: 'Maisam',
//     points: 234
//   },
//   {
//     name: 'Rana',
//     points: 200
//   },
//   {
//     name: 'Maisamshdfihsfsfdsjf',
//     points: 150
//   },
//   {
//     name: 'Maisam',
//     points: 234
//   },
//   {
//     name: 'Rana',
//     points: 200
//   },
//   {
//     name: 'Maisamshdfihsfsfdsjf',
//     points: 150
//   },
//   {
//     name: 'Maisamshdfihsfsfdsjf',
//     points: 150
//   },
//   {
//     name: 'You',
//     points: 150
//   }
// ]
</script>

<style scoped>
.view {
  background-image: url('../assets/images/background.png');
  background-size: cover;
}
p {
  font-family: title;
}
</style>
