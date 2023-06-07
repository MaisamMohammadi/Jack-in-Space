import Phaser from 'phaser'

export class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'laser')
  }

  fire (x, y) {
    this.body.reset(x, y)

    this.setScale(0.5, 0.5)
    this.setActive(true)
    this.setVisible(true)

    this.setVelocityY(-600)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)

    if (this.y <= 0) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}

export class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser'
    })

    this.shootingaable = true
  }

  fireLaser (x, y) {
    if (this.shootingaable) {
      const laser = this.getFirstDead(true)
      if (laser) {
        laser.fire(x, y)
      }
    }
  }
}
