<template>
    <div class="absolute left-[25vw] top-[25vh] border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Sign up</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">You can sign up here!</p>

        <div class="mt-10 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">User name</label>
            <div class="mt-2">
              <input type="text" name="first-name" id="first-name" v-model="username" autocomplete="given-name" class="block w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" v-model="email" autocomplete="email" class="block w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" v-model="password" autocomplete="email" class="block w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

        </div>
        <div class="mt-2 flex justify-end gap-x-6">
          <button type="button" class="w-[150px] bg-blue px-1 py-1 text-center">Cancel</button>
          <button type="submit" class="w-[150px] bg-blue px-1 py-1 text-center">Submit</button>
        </div>
      
    {{ username }}
    {{ email }}
    {{ password }}
    </div>

    

    
</template>

<script setup>
import { ref } from 'vue'

let username = ref("");
let password = ref("");

</script>

<style lang="scss" scoped>

</style>