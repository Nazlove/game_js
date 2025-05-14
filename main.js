const box = document.getElementById("box");
    const pipeTop = document.getElementById("pipeTop");
    const pipeBottom = document.getElementById("pipeBottom");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    const startBtn = document.getElementById("startBtn");

    let gravity = 2;
    let velocity = 0;
    let gameLoop;
    let movePipeLoop;
    let score = 0;

    function jump() {
      velocity = -12;
    }

    function resetPipes() {
      const gap = 150;
      const minHeight = 50;
      const maxTopHeight = gameArea.clientHeight - gap - minHeight;

      const topHeight = Math.floor(Math.random() * maxTopHeight) + minHeight;
      const bottomHeight = gameArea.clientHeight - gap - topHeight;

      pipeTop.style.height = topHeight + "px";
      pipeBottom.style.height = bottomHeight + "px";
    }

    function startGame() {
      box.style.top = "150px";
      velocity = 0;
      score = 0;
      scoreDisplay.textContent = 0; 

      pipeTop.style.left = "500px";
      pipeBottom.style.left = "500px";

      resetPipes();

      clearInterval(gameLoop);
      clearInterval(movePipeLoop);

      gameLoop = setInterval(() => {
        velocity += gravity;
        let boxTop = parseInt(box.style.top);
        boxTop += velocity;

        if (boxTop < 0) boxTop = 0;
        if (boxTop > gameArea.clientHeight - box.offsetHeight) {
          endGame();
        }

        box.style.top = boxTop + "px";
      }, 30);

      movePipeLoop = setInterval(() => {
        let pipeLeft = parseInt(pipeTop.style.left);
        pipeLeft -= 3;

        if (pipeLeft < -40) {
          pipeLeft = 500;
          resetPipes();
          score++;
          scoreDisplay.textContent = score;
        }

        pipeTop.style.left = pipeLeft + "px";
        pipeBottom.style.left = pipeLeft + "px";

        // Cek tabrakan
        const boxRect = box.getBoundingClientRect();
        const topRect = pipeTop.getBoundingClientRect();
        const bottomRect = pipeBottom.getBoundingClientRect();

        if (
          (boxRect.left < topRect.right && boxRect.right > topRect.left &&
           boxRect.top < topRect.bottom) ||
          (boxRect.left < bottomRect.right && boxRect.right > bottomRect.left &&
           boxRect.bottom > bottomRect.top)
        ) {
          endGame();
        }
      }, 30);
    }

    function endGame() {
      clearInterval(gameLoop);
      clearInterval(movePipeLoop);
      alert("Game Over! Skor kamu: " + score);
    }

    startBtn.addEventListener("click", startGame);
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") jump();
    });
    window.addEventListener("mousedown", jump);