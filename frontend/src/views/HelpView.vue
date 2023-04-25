<template>
  <div class="view h-screen w-screen">
    <div id="container" class="flex">
      <div>
        <p>Mit Maus, kannst du den Spaceship bewegen</p>
        <p>Mit Rechtsclick, kannst du Laser feuern.</p>
        <p>Du muss die Mülls, die fallen, abschießen.</p>
      </div>
      <div>
        <img src="@/assets/images/Help.svg" class="w-[400px]" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.view {
  background-image: url("../assets/images/background.png");
  background-size: cover;
}
p {
  font-family: overwatch;
}
</style>
