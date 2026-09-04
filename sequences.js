<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Powers of Two - MathsWatch</title>
<link rel="stylesheet" href="../../style.css">
<style>
  .g2048-wrap {
    display: grid;
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
    gap: 10px;
    background: #171b2e;
    border: 2px solid #2a3050;
    border-radius: 12px;
    padding: 10px;
  }
  .g2048-cell {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    background: #1c2138;
    color: #eef0fb;
    transition: background 0.1s;
  }
</style>
</head>
<body>
  <header class="site-header">
    <div class="brand">Maths<span>Watch</span></div>
    <a class="back-link" href="../../index.html">&larr; All topics</a>
  </header>

  <main class="game-page">
    <h1>Powers of Two</h1>
    <div class="hud">
      <div>Score: <b id="score">0</b></div>
      <div>Best: <b id="best">0</b></div>
    </div>
    <div class="g2048-wrap" id="board"></div>
    <p class="controls-hint">Arrow keys or WASD to slide tiles. Swipe on mobile.</p>
    <button class="btn secondary" id="restart">Restart</button>
  </main>

  <div class="overlay hidden" id="overlay">
    <h2 id="overlay-title">Game Over</h2>
    <p id="overlay-msg"></p>
    <button class="btn" id="overlay-restart">Play Again</button>
  </div>

  <script src="powers.js"></script>
</body>
</html>
