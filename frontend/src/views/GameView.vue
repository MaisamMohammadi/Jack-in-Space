<template>
    <div>
  
    </div>
</template>
<script setup>
// import { ref, computed } from 'vue' 
// import { RouterView } from 'vue-router';
import Phaser from 'phaser';
import spaceship from '@/assets/images/spaceship_Modell.png';
import trash from '@/assets/images/trash_Modell.png';


class gameScene extends Phaser.Scene{
    constructor(){
      super('gameScene');
    }

    preload(){
        this.load.image('trash', trash);
        this.load.image('spaceship', spaceship);
    }

    create(){
        this.ship = this.add.image(100, 200, 'spaceship');
        this.trash1 = this.add.image(400, 50, 'trash');
    }

    update(){
        this.moveTrash(this.trash1);
        this.moveShip(this.ship);
    }

    moveShip(ship){
        let xPosition;
        let yPosition;
        addEventListener('mousemove', (event) => {
            ship.x = event.x;
            ship.y = event.y;
            console.log(xPosition, yPosition);
        });
        
    }

    moveTrash(trash){
        trash.y += 2;

        if(trash.y > config.height + 100)
            this.resetTrashPosition(trash)
    }

    resetTrashPosition(trash){
        trash.y = -50;
        trash.x = Phaser.Math.Between(50, config.width - 100);
    }
} 

const config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [gameScene]
}
  
// eslint-disable-next-line no-unused-vars
let game = new Phaser.Game(config);



</script>
<style>
</style>