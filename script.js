console.log("JS LOADED");

const cover = document.getElementById("cover");
const countdown = document.getElementById("countdown");
const game = document.getElementById("game");
const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const timeBar = document.getElementById("time-bar");
const overlay = document.getElementById("overlayMessage");

let score = 0;
let time = 10;
let timerInterval = null;
let activeBlackIndices = [];
let pointValue = 10;
let pointInterval = null;
let gameActive = true;
let waitingForTap = false;
let tapIntroEl = document.getElementById("tapIntro");



cover.addEventListener("click", startGame);

function startGame() {
  cover.classList.add("hidden");
  countdown.classList.remove("hidden");
  startCountdown();
}

function showTapIntro() {
 
  waitingForTap = true;
  gameActive = false;

 
  board.style.pointerEvents = "none";


  if (tapIntroEl) {
    tapIntroEl.style.opacity = "1";
    tapIntroEl.style.transform = "translate(-50%, -50%) scale(1.03)";
  }

 
  const startOnTap = () => {
    document.removeEventListener("click", startOnTap);

  
    if (tapIntroEl) {
      tapIntroEl.style.opacity = "0";
      tapIntroEl.style.transform = "translate(-50%, -50%) scale(0.98)";
    }

    setTimeout(() => {
      waitingForTap = false;
      startActualGame(); 
    }, 350);
  };

 
  setTimeout(() => document.addEventListener("click", startOnTap), 0);
}


function startCountdown() {
  let count = 3;
  const countEl = document.getElementById("countNumber");
  countEl.textContent = count;

  const cd = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(cd);
      countdown.classList.add("hidden");
      game.classList.remove("hidden");

      initGame();      
      showTapIntro(); 

    } else {
      countEl.textContent = count;
    }
  }, 1000);
}


function startActualGame() {
  gameActive = true;
  board.style.pointerEvents = "auto";

  startTimer();

  startPointBar();
}


function initGame() {
  let savedHiScore = localStorage.getItem("hiScore");
  document.getElementById("hiScore").textContent = savedHiScore ? savedHiScore : 0;

  score = 0;
  time = 10;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  overlay.style.opacity = "0";
  overlay.textContent = "";

  createBoard();
  spawnBlackTile(); 
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.addEventListener("click", () => handleTileClick(i, tile));
    board.appendChild(tile);
  }
}

function spawnBlackTile() {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(t => {
    t.classList.remove("black", "green");
    t.textContent = "";
  });

  activeBlackIndices = [];

  while (activeBlackIndices.length < 3) {
    const rnd = Math.floor(Math.random() * 16);
    if (!activeBlackIndices.includes(rnd)) {
      activeBlackIndices.push(rnd);
    }
  }

  activeBlackIndices.forEach(i => {
    tiles[i].classList.add("black");
  });
}


function handleTileClick(index, tile) {
  if (!gameActive) return;

  if (!activeBlackIndices.includes(index)) {
  return; }
 
  clearInterval(pointInterval);

score += pointValue;
scoreEl.textContent = score;

tile.textContent = `+${pointValue}`;

  scoreEl.textContent = score;

  tile.classList.remove("black");
  tile.classList.add("green");
 
  setTimeout(() => {
  tile.classList.remove("green");
  tile.textContent = "";
}, 250);

  activeBlackIndices = activeBlackIndices.filter(i => i !== index);

  addOneBlackTile(index);
  startPointBar();

}


function startTimer() {
   timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;

   

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(pointInterval); 
  gameActive = false;


  let hiScore = localStorage.getItem("hiScore");
  hiScore = hiScore ? Number(hiScore) : 0;

  if (score > hiScore) {
  
    localStorage.setItem("hiScore", score);
    document.getElementById("hiScore").textContent = score;

    overlay.textContent = "🎉 New High Score!";
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1b1', '#f9bec7']
    });
 
  } else {
    overlay.textContent = "⏰ Time is up !⏰";
    document.getElementById("hiScore").textContent = hiScore;
  }

  overlay.style.opacity = "1";
  board.style.pointerEvents = "none";
  activeBlackIndices = []; 


  const heartbeatEl = document.getElementById("heartbeat");
  heartbeatEl.style.animation = "heartbeat 0.8s ease infinite"; 
}

function addOneBlackTile(oldIndex) {
  const tiles = document.querySelectorAll(".tile");

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 16);
  } while (
    activeBlackIndices.includes(newIndex) ||
    newIndex === oldIndex
  );

  activeBlackIndices.push(newIndex);
  tiles[newIndex].classList.add("black");
  startPointBar();

}


function startPointBar() {
  clearInterval(pointInterval);

  pointValue = 10;
  timeBar.style.width = "100%";

  pointInterval = setInterval(() => {
    pointValue--;

    const percent = (pointValue / 10) * 100;
    timeBar.style.width = percent + "%";

    if (pointValue <= 0) {
      clearInterval(pointInterval);
    }
  }, 100);
}

function restartGame() {
  clearInterval(timerInterval);
  clearInterval(pointInterval);
  
  score = 0;
  time = 10;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  board.innerHTML = "";
  activeBlackIndices = [];
  overlay.style.opacity = "0";
  overlay.textContent = "";

  const heartbeatEl = document.getElementById("heartbeat");
  heartbeatEl.style.animation = "";

  timeBar.style.width = "100%";

  createBoard();
  spawnBlackTile(); 
  showTapIntro(); 
  gameActive = false;
}

document.addEventListener("keydown", function(e) {
  if (e.key === "F5") {
    e.preventDefault(); 
    restartGame();
  }
});

