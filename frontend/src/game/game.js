import Phaser from 'phaser';
import spaceship from '@/assets/images/Spaceship-2.svg';
import backgroundimage from '@/assets/images/background.png';
import laser from '@/assets/images/Laser_Model.png';
import trash from '@/assets/images/box-trash.svg';
import trash2 from '@/assets/images/camera-trash.svg';
import trash3 from '@/assets/images/panel-trash.svg';
import trash4 from '@/assets/images/panel-trash2.svg';

class gameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  preload() {
    this.load.image('trash', trash);
    this.load.image('trash2', trash2);
    this.load.image('trash3', trash3);
    this.load.image('trash4', trash4);
    this.load.image('spaceship', spaceship);
    this.load.image('laser', laser);
    this.load.image('background', backgroundimage);
  }

  create() {
    //background
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);

    //ship
    this.ship = this.physics.add.image(config.width / 2, config.height / 2, 'spaceship');

    this.input.mouse.disableContextMenu();

    this.input.on(
      'pointerdown',
      function () {
        this.input.mouse.requestPointerLock();
      },
      this,
    );
    
    
    this.input.on(
      'pointermove',
      function (pointer) {
        if (this.input.mouse.locked) {
          this.ship.x += pointer.movementX;
          this.ship.y += pointer.movementY;

          // Force the ship to stay on screen
          this.ship.x = Phaser.Math.Wrap(this.ship.x, 0, game.renderer.width);
          this.ship.y = Phaser.Math.Wrap(this.ship.y, 0, game.renderer.height);

          if (pointer.movementX > 0) {
            this.ship.setRotation(0.1);
          } else if (pointer.movementX < 0) {
            this.ship.setRotation(-0.1);
          } else {
            this.ship.setRotation(0);
          }

          this.updateLockText(true);
        }
      },
      this,
    );

    this.input.keyboard.on(
      'keydown-Q',
      function () {
        if (this.input.mouse.locked) {
          this.input.mouse.releasePointerLock();
        }
      },
      this,
    );

    //trashes 
    this.trash = this.physics.add.image(config.width - 500, config.height - 500, 'trash');
    this.trashtwo = this.physics.add.image(config.width - 800, config.height - 800, 'trash2');
    this.trashthree = this.physics.add.image(config.width - 1000, config.height - 1000, 'trash3');
    this.trashfour = this.physics.add.image(config.width - 300, config.height - 300, 'trash4');

    this.trash.setScale(0.8);
    this.trashtwo.setScale(0.8);
    this.trashthree.setScale(0.8);
    this.trashfour.setScale(0.8);
  }

  update() {
    this.moveTrash(this.trash, 2);
    this.moveTrash(this.trashtwo, 5);
    this.moveTrash(this.trashthree, 3);
    this.moveTrash(this.trashfour, 4);
  }

  moveTrash(trash, speed){
    if(trash.y > config.height)
      this.resetPosition(trash);
    trash.y += speed;
  }

  resetPosition(trash){
    trash.y = 0;
    trash.x = Phaser.Math.Between(100 , config.width - 100);
  }
} 


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  scene: [gameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};


export const game = new Phaser.Game(config);
