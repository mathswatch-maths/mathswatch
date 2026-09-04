<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grids &amp; Lines - MathsWatch</title>
<link rel="stylesheet" href="../../style.css">
</head>
<body>
  <header class="site-header">
    <div class="brand">Maths<span>Watch</span></div>
    <a class="back-link" href="../../index.html">&larr; All topics</a>
  </header>

  <main class="game-page">
    <h1>Grids &amp; Lines</h1>
    <div class="hud">
      <div id="status">Your turn (X)</div>
    </div>
    <div class="ttt-board" id="board"></div>
    <div style="display:flex; gap:10px;">
      <button class="btn secondary" id="mode-toggle">Mode: vs CPU</button>
      <button class="btn secondary" id="restart">Restart</button>
    </div>
  </main>

  <script src="geometry.js"></script>
</body>
</html>
