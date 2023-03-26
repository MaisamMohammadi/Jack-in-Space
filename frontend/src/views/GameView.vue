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
import laser from '@/assets/images/Laser_Model.png';

class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'laser');
    }

    fire(x, y){
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-900);
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta);

        if(this.y <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'laser'
        })

        this.shootingaable = true;
    }

    fireLaser(x, y){
        if(this.shootingaable)
        {
            const laser = this.getFirstDead(false);
            if(laser){
                laser.fire(x, y);
            }
        }
        
    }
}

class Trash extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'trash');
    }

    move(){
        const coordinates = this.resetTrashPosition();
        this.body.reset(coordinates.x, coordinates.y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(200);
    }

    resetTrashPosition(){
        return { x: Phaser.Math.Between(50, config.width - 100), y: -50 };
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta);

        if(this.y > config.height + 100){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class TrashGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Trash,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: 'trash'
        })

    }

    createTrash(){
        const trash = this.getFirstDead(false);
        if(trash){
            trash.move();
        }
    }
}



class gameScene extends Phaser.Scene{
    constructor(){
      super('gameScene');
    }

    preload(){
        this.load.image('trash', trash);
        this.load.image('spaceship', spaceship);
        this.load.image('laser', laser);
    }

    create(){
        this.laserGroup = new LaserGroup(this);
        this.ship = this.physics.add.image(100, 200, 'spaceship');
        this.trashGroup = new TrashGroup(this);

        this.input.mouse.disableContextMenu();
        
        this.moveShip(this.ship);
        this.shootLaser(this.laserGroup, this.ship);

        this.physics.add.collider(this.trashGroup, this.laserGroup, function(trash, laser){
            trash.move();
            laser.destroy();
        });

        this.physics.add.collider(this.ship, this.trashGroup, function(ship, trash){
            game.scene.scenes[0].laserGroup.shootingaable = false;
            ship.destroy();
            trash.move();
        })
    }

    update(){
        this.fallTrash(this.trashGroup);
        
    }

    shootLaser(laserGroup, ship){
        this.input.on('pointerdown', function (pointer) {
            // ToDo: Shoud I decrease the y position - 20 or not?
            laserGroup.fireLaser(ship.x, ship.y);
        });
    }

    moveShip(ship){
        this.input.on('pointermove', function (pointer) {
            ship.x = pointer.x;
            ship.y = pointer.y;
        });
    }

    fallTrash(trashGroup){
        trashGroup.createTrash();
    }

    
} 



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [gameScene],
    physics:{
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
}
  
// eslint-disable-next-line no-unused-vars
let game = new Phaser.Game(config);



</script>
<style>
</style>