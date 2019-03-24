class Animation {

  constructor (params) {

    const {
      sx,
      sy,
      sw,
      sh,
      name,
      loop,
      frameRate,
      numFrames,
      spriteSheet,
      pingPong
    } = params;

    this.sx           = sx;
    this.sy           = sy;
    this.sw           = sw;
    this.sh           = sh;
    this.loop         = loop;
    this.pingPong     = pingPong;
    this.numFrames    = numFrames;
    this.running      = false;
    this.ready        = false;
    this.frames       = [];
    this.frameRate    = frameRate || 1000 / 24;
    this.currentFrame = 0;
    this.spriteSheet  = spriteSheet;

    this.setUpFrames = this.setUpFrames.bind(this);
    this.render      = this.render.bind(this);
    this.update      = this.update.bind(this);

    spriteSheet.addEventListener('load', this.setUpFrames);

  }

  setUpFrames () {

    const ssh = this.spriteSheet.height;
    const ssw = this.spriteSheet.width;

    this.ssh = ssh;
    this.ssw = ssw;

    let {
      sx, sy, sw, sh
    } = this;

    let frameCount = 0;

    for (var i = sy; i < ssh; i += sh) {

      for (var j = sx; j < ssw; j += sw) {

        this.frames.push({
          sx: j,
          sy: i,
          sw: sw,
          sh: sh,
        });

        if (this.frames.length >= this.numFrames)
          break;

      }

      if (this.frames.length >= this.numFrames)
        break;

    }

    this.currentFrameIndex = 0;
    this.currentFrame      = frames[0];
    this.ready             = true;

  }

  start () {

    this.running = true;

  }

  update (now) {

    this.lastUpdate = this.lastUpdate || now;

    if (!this.ready || !this.running)
      return;

    if (now - this.lastUpdate < this.frameRate)
      return;

    // update the index
    this.currentFrameIndex = (
      this.currentFrameIndex < this.frames.length - 1?
      this.currentFrameIndex + 1 :
      0
    );

    this.currentFrame = this.frames[this.currentFrameIndex];

    this.lastUpdate = now;

  }

  render (ctx, x, y, w, h) {

    if (!this.ready || !this.running || !this.currentFrame)
      return;

    const {
      sx,
      sy,
      sw,
      sh
    } = this.currentFrame;

    w = w || sw;
    h = h || sh;

    ctx.drawImage(this.spriteSheet, sx, sy, sw, sh, x, y, w, h);

  }

}

class AnimatedSprite {

  constructor(x, y, spriteSheetURL, animations) {

    this.spriteSheet   = new Image();
    this.currAnimation = null;

    this.x = x;
    this.y = y;

    animations = animations || {};

    this.animations = Object.keys(animations).reduce((o, animName) => {

      o[animName] = new Animation(Object.assign({
        spriteSheet: this.spriteSheet,
        name : animName,
        frameRate: 1000 / 8
      }, animations[animName]));

      return o;
      
    }, {});

    this.spriteSheet.src  = spriteSheetURL;

  }

  play (name) {

    this.currAnimation = this.animations[name] || null;

    this.currAnimation.start();

  }

  update (now) {

    const currAnimation = this.currAnimation || null;

    if (!currAnimation)
      return

    currAnimation.update(now);

  }

  render (ctx) {

    const currAnimation = this.currAnimation || null;

    if (!currAnimation)
      return

    currAnimation.render(ctx, this.x, this.y);

  }

}

export default AnimatedSprite
