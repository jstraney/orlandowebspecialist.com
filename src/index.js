import Balloon from './balloon';

// originally thought about doing react, but this is just
// too much for what the page accomplishes.
window.onload = () => {

  // event listeners which create a no-op on inteveral
  // defined below. prevents page from being flooded with
  // ballons when its not in use
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

  // reset canvas width + height on resize
  window.addEventListener('resize', resize);

  // do resize once
  resize();

  // animation clock
  let
  then = Date.now(),
  now  = then;

  // all balloons
  const balloons = [];

  window.setInterval(() => {

    // if tab is not focused, do nothing
    if (!windowFocused) return;

    // create random x, y for balloon generation
    const
    x = Math.random() * (canvas.width + 32),
    y = canvas.height + 32; 

    // remove balloon if 100 is exceeded
    if (balloons.length > 100)
      balloons.shift();

    // push on new balloon
    balloons.push(new Balloon(x, y));

  }, 800);

  const main = () => {

    now = Date.now() - then;

    // clear the animation frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // update and render all balloons
    balloons.forEach((balloon) => {

      balloon.update(now);
      balloon.render(ctx);

    });

    window.requestAnimationFrame(main);

  };

  window.requestAnimationFrame && 
    main();


};
