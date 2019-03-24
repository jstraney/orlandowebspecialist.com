// Thank you, chester, from opengameart
// https://opengameart.org/content/balloons
import balloonSpriteSheetURL from "./balloons.png"

import AnimatedSprite from '../sprite'

class Balloon extends AnimatedSprite {

  constructor (x, y) {

    const types = [
      'red', 'orange', 'green',
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    super(x, y, balloonSpriteSheetURL, {
      red    : {
        sx: 0,
        sy: 45,
        sw: 22,
        sh: 44,
        numFrames: 5,
        loop: true,
      },
      orange : {
        sx: 0,
        sy: 0,
        sw: 22,
        sh: 44,
        numFrames: 5,
        loop: true,
      },
      green  : {
        sx: 0,
        sy: 90,
        sw: 22,
        sh: 44,
        numFrames: 5,
        loop: true,
      },
    });

    this.wind = 0;

    this.play(type);

  }

  update (now) {

    this.y -= 1;
    this.x += .3 + .5 * Math.sin(now / 1000);

    super.update(now)

  }

} 

export default Balloon;
