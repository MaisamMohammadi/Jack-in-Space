<template>
    <div>
  
    </div>
</template>
<script setup>
import { ref, computed } from 'vue' 
import { RouterView } from 'vue-router';
import Phaser from 'phaser';
import spaceship from '@/assets/images/spaceship_Modell.png';
import trash from '@/assets/images/trash_Modell.png';


class gameScene extends Phaser.Scene{
    constructor(){
      super('gameScene');
    }

    preload(){
        this.load.image('trash', trash);
        this.load.image('ship', spaceship);
    }

    create(){
        this.add.image(100, 200, 'ship');
        this.add.image(50, 50, 'trash');
    }
} 

const config = {
    width: 800,
    height: 800,
    backgroundColor: 0x000000,
    scene: [gameScene]
}
  
let game = new Phaser.Game(config);
  

</script>
<style>
</style>