(function () {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMsg = document.getElementById('overlay-msg');

  const PADDLE_W = 90;
  const PADDLE_H = 12;
  const BALL_R = 7;
  const ROWS = 5;
  const COLS = 8;
  const BRICK_W = 50;
  const BRICK_H = 18;
  const BRICK_GAP = 6;
  const BRICK_TOP = 40;
  const rowColors = ['#d63447', '#f5a623', '#00d1b2', '#6c5ce7', '#00b894'];

  let paddle, ball, bricks, score, lives, running, raf, launched;

  function buildBricks() {
    const totalW = COLS * (BRICK_W + BRICK_GAP) - BRICK_GAP;
    const offsetX = (W - totalW) / 2;
    const list = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        list.push({
          x: offsetX + c * (BRICK_W + BRICK_GAP),
          y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
          w: BRICK_W,
          h: BRICK_H,
          alive: true,
          color: rowColors[r % rowColors.length],
        });
      }
    }
    return list;
  }

  function resetBall() {
    launched = false;
    ball = {
      x: paddle.x + paddle.w / 2,
      y: paddle.y - BALL_R - 1,
      r: BALL_R,
      vx: 3.5,
      vy: -4,
    };
  }

  function reset() {
    paddle = { x: W / 2 - PADDLE_W / 2, y: H - 30, w: PADDLE_W, h: PADDLE_H };
    bricks = buildBricks();
    score = 0;
    lives = 3;
    scoreEl.textContent = score;
    livesEl.textContent = lives;
    running = true;
    overlay.classList.add('hidden');
    resetBall();
    if (!raf) loop();
  }

  function launch() {
    if (!launched && running) launched = true;
  }

  function update() {
    if (!running) return;

    if (!launched) {
      ball.x = paddle.x + paddle.w / 2;
      ball.y = paddle.y - ball.r - 1;
      return;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -1; }
    if (ball.x + ball.r > W) { ball.x = W - ball.r; ball.vx *= -1; }
    if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -1; }

    if (
      ball.y + ball.r > paddle.y &&
      ball.y + ball.r < paddle.y + paddle.h + 10 &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.w &&
      ball.vy > 0
    ) {
      const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      ball.vx = hit * 5;
      ball.vy = -Math.abs(ball.vy);
      ball.y = paddle.y - ball.r;
    }

    for (const b of bricks) {
      if (!b.alive) continue;
      if (
        ball.x + ball.r > b.x &&
        ball.x - ball.r < b.x + b.w &&
        ball.y + ball.r > b.y &&
        ball.y - ball.r < b.y + b.h
      ) {
        b.alive = false;
        score += 10;
        scoreEl.textContent = score;
        const overlapX = Math.min(ball.x + ball.r - b.x, b.x + b.w - (ball.x - ball.r));
        const overlapY = Math.min(ball.y + ball.r - b.y, b.y + b.h - (ball.y - ball.r));
        if (overlapX < overlapY) ball.vx *= -1;
        else ball.vy *= -1;
        break;
      }
    }

    if (bricks.every((b) => !b.alive)) {
      running = false;
      overlayTitle.textContent = 'You Win!';
      overlayMsg.textContent = `Score: ${score}`;
      overlay.classList.remove('hidden');
    }

    if (ball.y - ball.r > H) {
      lives--;
      livesEl.textContent = lives;
      if (lives <= 0) {
        running = false;
        overlayTitle.textContent = 'Game Over';
        overlayMsg.textContent = `Score: ${score}`;
        overlay.classList.remove('hidden');
      } else {
        resetBall();
      }
    }
  }

  function draw() {
    ctx.fillStyle = '#05060d';
    ctx.fillRect(0, 0, W, H);

    for (const b of bricks) {
      if (!b.alive) continue;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);
    }

    ctx.fillStyle = '#6c5ce7';
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    ctx.fillStyle = '#eef0fb';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    if (!launched && running) {
      ctx.fillStyle = '#9aa1c4';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click or press Space to launch', W / 2, H - 60);
    }
  }

  function loop() {
    update();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function movePaddleTo(x) {
    paddle.x = Math.max(0, Math.min(W - paddle.w, x - paddle.w / 2));
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    movePaddleTo((e.clientX - rect.left) * scaleX);
  });
  canvas.addEventListener('click', launch);

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const t = e.touches[0];
    movePaddleTo((t.clientX - rect.left) * scaleX);
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchstart', launch);

  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') { launch(); e.preventDefault(); }
  });
  window.addEventListener('keyup', (e) => { keys[e.key] = false; });
  setInterval(() => {
    if (keys.ArrowLeft) paddle.x = Math.max(0, paddle.x - 7);
    if (keys.ArrowRight) paddle.x = Math.min(W - paddle.w, paddle.x + 7);
  }, 16);

  document.getElementById('restart').addEventListener('click', reset);
  document.getElementById('overlay-restart').addEventListener('click', reset);

  reset();
})();
