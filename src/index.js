import Balloon from './balloon';

const spriteSheet = new Image();

// originally thought about doing react, but this is just
// too much for what the page accomplishes.
window.onload = () => {

  const loader = {
    assets: {spriteSheet: false}
  }

  let windowFocused = true;

  window.addEventListener('blur', () => {

    windowFocused = false;
    
  });

  window.addEventListener('focus', () => {

    windowFocused = true;
    
  });

  const
  balloonContainer = document.getElementById('talents'),
  canvas             = document.createElement('canvas'),
  ctx                = canvas.getContext('2d');

  balloonContainer.appendChild(canvas);

  const resize = () => {

    canvas.width  = balloonContainer.offsetWidth;
    canvas.height = balloonContainer.offsetHeight;

  }

  window.addEventListener('resize', resize);

  resize();

  let
  then = Date.now(),
  now  = then;

  const balloons = [];

  window.setInterval(() => {

    if (!windowFocused) return;

    const
    x = Math.random() * (canvas.width + 32),
    y = canvas.height + 32; 

    // remove balloon
    if (balloons.length > 100)
      balloons.shift();

    balloons.push(new Balloon(x, y));

  }, 800);

  const main = () => {

    now = Date.now() - then;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    balloons.forEach((balloon) => {

      balloon.update(now);
      balloon.render(ctx);

    });

    window.requestAnimationFrame(main);

  };

  window.requestAnimationFrame && 
    main();

};
