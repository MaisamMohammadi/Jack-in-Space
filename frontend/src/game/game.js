import Phaser from 'phaser'
import { LaserGroup } from './laser.js'
import spaceship from '@/assets/images/Spaceship-2.svg'
import backgroundimage from '@/assets/images/background.png'
import laser from '@/assets/images/Laser.png'
import trash from '@/assets/images/box-trash.svg'
import trash2 from '@/assets/images/camera-trash.svg'
import trash3 from '@/assets/images/panel-trash.svg'
import trash4 from '@/assets/images/panel-trash2.svg'
import explosion from '@/assets/gifs/explosion.gif'
import backgroundmusic from '@/assets/audios/BackgroundMusic-Normal.mp3'
import laserAudio from '@/assets/audios/Laser.mp3'
import spaceshipDestroyedAudio from '@/assets/audios/spaceship-Hit.mp3'
import trashCollectedAudio from '@/assets/audios/CollectGrabage.mp3'
import { gameStore } from '../stores/Store'
import { useAccountStore } from '../stores/accountStore'

const accountStore = useAccountStore()
const myStore = gameStore()
myStore.score = 0

class gameScene extends Phaser.Scene {
  constructor () {
    super('gameScene')
  }

  preload () {
    this.load.image('trash', trash)
    this.load.image('trash2', trash2)
    this.load.image('trash3', trash3)
    this.load.image('trash4', trash4)
    this.load.image('spaceship', spaceship)
    this.load.image('laser', laser)
    this.load.image('background', backgroundimage)
    this.load.spritesheet('explosion', explosion, {
      frameWidth: 300,
      frameHeight: 300
    })

    this.load.audio('music', backgroundmusic)
    this.load.audio('laserAudio', laserAudio)
    this.load.audio('spaceshipDestroyedAudio', spaceshipDestroyedAudio)
    this.load.audio('trashCollectedAudio', trashCollectedAudio)
  }

  create () {
    // background
    this.background = this.add.image(0, 0, 'background')
    this.background.setOrigin(0, 0)

    // data
    this.score = 0

    // ship
    this.ship = this.physics.add.sprite(
      config.width / 2,
      config.height / 1.5,
      'spaceship'
    )

    // audios
    this.music = this.sound.add('music')
    this.musicconfig = {
      mute: false,
      volume: 0.25,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(this.musicconfig)

    this.laserSound = this.sound.add('laserAudio')
    this.trashSound = this.sound.add('trashCollectedAudio')
    this.shipSound = this.sound.add('spaceshipDestroyedAudio')

    // Laser

    this.laserGroup = new LaserGroup(this)

    this.input.mouse.disableContextMenu()

    this.input.on(
      'pointerdown',
      function () {
        this.input.mouse.requestPointerLock()
      },
      this
    )

    this.shootLaser(this.laserGroup, this.ship, this.laserSound)
      this.x = this.sound.add
    this.input.on(
      'pointermove',
      function (pointer) {
        if (this.input.mouse.locked) {
          if (
            this.ship.x + pointer.movementX < 0 ||
            this.ship.x + pointer.movementX > config.width
          ) {
            this.ship.x += 0
          } else {
            this.ship.x += pointer.movementX
          }

          if (
            this.ship.y + pointer.movementY < 0 ||
            this.ship.y + pointer.movementY > config.height
          ) {
            this.ship.y += 0
          } else this.ship.y += pointer.movementY

          // Force the ship to stay on screen
          // this.ship.x = Phaser.Math.Wrap(this.ship.x, 0, config.width);
          // this.ship.y = Phaser.Math.Wrap(this.ship.y, 0, config.height);

          if (pointer.movementX > 0) {
            this.ship.setRotation(0.1)
          } else if (pointer.movementX < 0) {
            this.ship.setRotation(-0.1)
          } else {
            this.ship.setRotation(0)
          }

          // this.updateLockText(true);
        }
      },
      this
    )

    this.input.keyboard.on(
      'keydown-Q',
      function () {
        if (this.input.mouse.locked) {
          this.input.mouse.releasePointerLock()
        }
      },
      this
    )

    // trashes
    this.trash = this.physics.add.sprite(
      config.width - 500,
      config.height - 500,
      'trash'
    )
    this.trashtwo = this.physics.add.sprite(
      config.width - 800,
      config.height - 800,
      'trash2'
    )
    this.trashthree = this.physics.add.sprite(
      config.width - 1000,
      config.height - 1000,
      'trash3'
    )
    this.trashfour = this.physics.add.sprite(
      config.width - 300,
      config.height - 300,
      'trash4'
    )

    this.trash.setScale(0.8)
    this.trashtwo.setScale(0.8)
    this.trashthree.setScale(0.8)
    this.trashfour.setScale(0.8)

    this.trashgroup = this.physics.add.group()

    this.trashgroup.add(this.trash)
    this.trashgroup.add(this.trashtwo)
    this.trashgroup.add(this.trashthree)
    this.trashgroup.add(this.trashfour)

    // label

    this.scoreLabel = this.add.text(100, 100, 'Score: ' + this.score)
    this.scoreLabel.setScale(1.5, 1.5)

    // physics
    this.physics.add.collider(
      this.ship,
      this.trashgroup,
      async function (ship, trash) {
        this.laserGroup.shootingaable = false
        ship.destroy()
        // ship.setTexture('explosion');
        // ship.play('exlpode');
        this.resetPosition(trash)

        this.shipSound.play({ volume: 0.5 })
        this.music.stop()

        this.input.mouse.releasePointerLock()
        myStore.score = this.score
        myStore.showMenu = true
        const highscore = await accountStore.getHighscore()
        if (highscore !== -1 && highscore < this.score) {
          await accountStore.updateScore(myStore.score)
          myStore.newHighscoreAchieved = true
        } else {
          myStore.newHighscoreAchieved = false
        }
      },
      null,
      this
    )

    this.physics.add.overlap(
      this.trashgroup,
      this.laserGroup,
      function (trash, laser) {
        this.resetPosition(trash)
        this.trashSound.play({ volume: 0.5 })
        laser.destroy()
        this.score += 1
        this.scoreLabel.text = 'Score: ' + this.score
      },
      null,
      this
    )

    // animation
    // this.explosion = this.add.sprite(300, 300, 'explosion');

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 14, // Set the desired frame rate
      repeat: 0, // Repeat the animation indefinitely
      hideOnComplete: true
    })
  }

  update () {
    const multiplier = 1 + this.score / 100
    this.moveTrash(this.trash, 1 * multiplier)
    this.moveTrash(this.trashtwo, 2 * multiplier)
    this.moveTrash(this.trashthree, 3 * multiplier)
    this.moveTrash(this.trashfour, 4 * multiplier)
  }

  shootLaser (laserGroup, ship, sound) {
    // eslint-disable-next-line no-unused-vars
    this.input.on('pointerdown', function (pointer) {
      // ToDo: Should I decrease the y position - 20 or not?

      laserGroup.fireLaser(ship.x, ship.y)
      sound.play({ volume: 0.5 })
    })
  }

  moveTrash (trash, speed) {
    if (trash.y > config.height) this.resetPosition(trash)
    trash.y += speed
  }

  resetPosition (trash) {
    trash.y = 0
    trash.x = Phaser.Math.Between(100, config.width - 100)
  }
}

export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  scene: [gameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

// export const game = new Phaser.Game(config);
