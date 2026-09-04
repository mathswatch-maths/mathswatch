(function () {
  const boardEl = document.getElementById('board');
  const movesEl = document.getElementById('moves');
  const pairsEl = document.getElementById('pairs');
  const overlay = document.getElementById('overlay');
  const overlayMsg = document.getElementById('overlay-msg');

  const icons = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍋', '🥝', '🍓'];

  let cards, flipped, matchedCount, moves, locked;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function reset() {
    const deck = shuffle([...icons, ...icons]).map((icon, i) => ({
      id: i,
      icon,
      matched: false,
    }));
    cards = deck;
    flipped = [];
    matchedCount = 0;
    moves = 0;
    locked = false;
    movesEl.textContent = 0;
    pairsEl.textContent = 0;
    overlay.classList.add('hidden');
    render();
  }

  function render() {
    boardEl.innerHTML = '';
    cards.forEach((card) => {
      const div = document.createElement('div');
      const isOpen = card.matched || flipped.includes(card.id);
      div.className = 'mem-card' + (card.matched ? ' matched' : '') + (!isOpen ? ' hidden-face' : '');
      div.textContent = isOpen ? card.icon : '?';
      div.addEventListener('click', () => handleClick(card.id));
      boardEl.appendChild(div);
    });
  }

  function handleClick(id) {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (card.matched || flipped.includes(id)) return;

    flipped.push(id);
    render();

    if (flipped.length === 2) {
      moves++;
      movesEl.textContent = moves;
      locked = true;
      const [a, b] = flipped.map((fid) => cards.find((c) => c.id === fid));
      if (a.icon === b.icon) {
        a.matched = true;
        b.matched = true;
        matchedCount++;
        pairsEl.textContent = matchedCount;
        flipped = [];
        locked = false;
        render();
        if (matchedCount === icons.length) {
          overlayMsg.textContent = `Finished in ${moves} moves.`;
          overlay.classList.remove('hidden');
        }
      } else {
        setTimeout(() => {
          flipped = [];
          locked = false;
          render();
        }, 700);
      }
    }
  }

  document.getElementById('restart').addEventListener('click', reset);
  document.getElementById('overlay-restart').addEventListener('click', reset);

  reset();
})();
