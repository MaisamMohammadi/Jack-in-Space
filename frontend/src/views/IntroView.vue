<template>
  <div class="view flex h-screen w-screen flex-col items-center justify-center">
    <div id="container" class="flex flex-row">
      <div class="text text-lg">
        <div class="titel text-[3rem]">
          <p class="mt-[10%] text-center text-[100px]">It started ever since ...</p>
        </div>
        <div id="container" class="flex flex-row mt-[5%]">
          <div class="text text-lg">
            <div class="container my-[2.5rem] px-[10rem] text-[1.5rem]">
              The year is 20XX. We have been traveling to the moon regularly now, but our progress
              has come to a sudden halt. Space junk has filled our orbit so much that it rains down
              on our civilization. <br />People are panicking and losing hope, but there is one
              person standing up against this major problem; and his name is Jack. He has
              manufactured a revolutionary machine to clean up our orbit, and now is the time for
              this plan to execute. Are you ready?
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'Home' }" class="my-[5px]">
        <div
          class="absolute left-[2vw] bottom-[2vw] flex h-[6vh] w-[15vw] items-center justify-center border-[3px] border-blue px-1 py-1 text-[35px] text-blue"
        >
          I'm ready!
        </div>
      </router-link>
    </div>
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
