/* PAGE SYSTEM */
let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* TYPEWRITER */
function startTyping(page) {
  const elements = page.querySelectorAll(".typewriter");
  elements.forEach(el => {
    const text = el.dataset.text;
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
  });
}

startTyping(pages[0]);

function nextPage() {
  if (!musicStarted) startMusic();
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
  startTyping(pages[currentPage]);
}

/* 🎵 MUSIC */
const music = document.getElementById("bg-music");
let musicStarted = false;
music.volume = 0;

function startMusic() {
  music.play().then(() => {
    musicStarted = true;
    fadeInMusic();
    document.getElementById("musicToggle").textContent = "⏸";
  });
}

function fadeInMusic() {
  let vol = 0;
  const fade = setInterval(() => {
    vol += 0.05;
    music.volume = Math.min(vol, 1);
    if (vol >= 1) clearInterval(fade);
  }, 100);
}

function toggleMusic() {
  const btn = document.getElementById("musicToggle");
  if (music.paused) {
    music.play();
    btn.textContent = "⏸";
  } else {
    music.pause();
    btn.textContent = "▶️";
  }
}

/* 🌙 MODE */
function toggleMode() {
  document.body.classList.toggle("night");
}

/* 🎁 GIFT */
function openGift() {
  document.getElementById("giftOverlay").classList.add("active");
}

function closeGift() {
  document.getElementById("giftOverlay").classList.remove("active");
}

/* 🌸 SAKURA */
const canvas = document.getElementById("sakura");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let petals = [];
for (let i = 0; i < 30; i++) {
  petals.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 2,
    d: Math.random() * 30
  });
}

let angle = 0;
setInterval(() => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(255,183,197,0.8)";
  petals.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.y += Math.cos(angle + p.d) + 1;
    p.x += Math.sin(angle) * 2;
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
  angle += 0.01;
}, 33);