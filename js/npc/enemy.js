import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/ball1.png'
const ENEMY_IMG_SRC_2 = 'images/ball2.jpg'
const ENEMY_IMG_SRC_3 = 'images/ball3.jpg'
const ENEMY_IMG_SRC_CLOCK = 'images/clock.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed, type) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = -ENEMY_HEIGHT
    this.type = type;

    if (type == 2){
      this.img.src = ENEMY_IMG_SRC_2
    }
    if (type == 3){
      this.img.src = ENEMY_IMG_SRC_3
    }

    if (type == 10){
      this.img.src = ENEMY_IMG_SRC_CLOCK
    }

    this[__.speed] = speed


    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this[__.speed]
     // console.log(window.innerHeight)
    // 对象回收
    if ( this.y > window.innerHeight + this.height )
        //console.log(window.innerHeight)

        databus.removeEnemey(this)
  }

  doAction(databus){
    if (this.type >=1 && this.type <= 9){
      databus.score += this.type;
    }
    if (this.type == 10){
      databus.gameTime += 3
    }
  }
}
