async function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  const response = await fetch(`lang/${lang}.json`);
  const strings = await response.json();

  document.title = strings.title;

  for (const key in strings) {
    const element = document.querySelector(`[data-lang="${key}"]`);
    if (element) {
      if (Array.isArray(strings[key])) {
        element.innerHTML = strings[key].map(item => `<li>${item}</li>`).join('');
      } else {
        element.textContent = strings[key];
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ru";
  setLanguage(savedLang);

  const faders = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Мини-игра "Отбей мяч" без конца
  const canvas = document.getElementById('pong');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const paddleWidth = 100, paddleHeight = 10;
    let playerX = canvas.width / 2 - paddleWidth / 2;
    let robotX = canvas.width / 2 - paddleWidth / 2;
    const ball = { x: canvas.width / 2, y: 200, radius: 7, dx: 4, dy: 4 };
    let keys = {}, score = 0;

    function drawPaddle(x, y) {
      ctx.fillStyle = "#00C9A7";
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
    }

    function movePaddles() {
      if (keys['ArrowLeft'] && playerX > 0) playerX -= 6;
      if (keys['ArrowRight'] && playerX < canvas.width - paddleWidth) playerX += 6;
      if (robotX + paddleWidth / 2 < ball.x) robotX += 3;
      else if (robotX + paddleWidth / 2 > ball.x) robotX -= 3;
    }

    function moveBall() {
      ball.x += ball.dx;
      ball.y += ball.dy;
      document.getElementById('scoreboard').textContent = `Счёт: ${score}`;

      // Стены
      if (ball.x <= 0 || ball.x >= canvas.width) ball.dx *= -1;

      // Верх и низ — просто отражение
      if (ball.y <= paddleHeight && ball.x >= robotX && ball.x <= robotX + paddleWidth) {
        ball.dy *= -1;
        score++;
      } else if (ball.y <= 0) {
        ball.dy *= -1;
      }

      if (ball.y >= canvas.height - paddleHeight &&
          ball.x >= playerX && ball.x <= playerX + paddleWidth) {
        ball.dy *= -1;
        score++;
      } else if (ball.y >= canvas.height) {
        ball.dy *= -1;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaddle(playerX, canvas.height - paddleHeight);
      drawPaddle(robotX, 0);
      drawBall();
      movePaddles();
      moveBall();
      requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", e => keys[e.key] = true);
    document.addEventListener("keyup", e => keys[e.key] = false);
    draw();
  }
});
