/* =========================================================================
   CONFIGURACIÓN — editá todo esto para personalizar el regalo.
   No hace falta tocar el resto del archivo para cambiar fotos/videos/textos.
   ========================================================================= */
const CONFIG = {
  friendName: "Agus",

  intro: {
    photo: "assets/images/fotoinicio.jpeg",
    caption: "nosotros :)"
  },

  // fondo del mapa: queda fijo (no se mueve con la cámara), ver .game-viewport en style.css
  background: "assets/images/fondo.png",

  // Las 7 "gemas doradas" que vas encontrando en el mapa, en orden. Cada una desbloquea un recuerdo.
  // "icon" es el dibujito que se ve flotando en el mapa (reemplaza al rombo 🔶).
  // "src" es la foto/video real que se muestra al abrir el recuerdo.
  rewards: [
    {
      id: "r1",
      type: "image",
      icon: "assets/images/recuerdo1.png",
      src: "assets/images/fotorecuerdo1.jpeg",
      caption: "JODIDOS",
      message: "Una de nuestras primeras aventuras, donde no todo salió como esperabamos"
    },
    {
      id: "r2",
      type: "image",
      icon: "assets/images/recuerdo2.png",
      src: "assets/images/fotorecuerdo2.jpeg",
      caption: "VINITO",
      message: "Tomando un vinito, no digamos donde..."
    },
    {
      id: "r3",
      type: "image",
      icon: "assets/images/recuerdo3.png",
      src: "assets/images/fotorecuerdo3.jpeg",
      caption: "BARI BARI QUE?",
      message: "Re contenta con el Mickey paquero"
    },
    {
      id: "r4",
      type: "image",
      icon: "assets/images/recuerdo4.png",
      src: "assets/images/fotorecuerdo4.jpeg",
      caption: "ARGENTINA CARAJO",
      message: "Un día que sufrimos mucho, pero al final estuvimos felices"
    },
    {
      id: "r5",
      type: "image",
      icon: "assets/images/recuerdo5.png",
      src: "assets/images/fotorecuerdo5.jpeg",
      caption: "THE GOAT",
      message: "Un día cualquiera con la cabra"
    },
    {
      id: "r6",
      type: "image",
      icon: "assets/images/recuerdo6.png",
      src: "assets/images/fotorecuerdo6.jpeg",
      caption: "MALDITO ASCENSOR",
      message: "Un poquito apretados en tu ascensor (Como de costumbre)"
    },
    {
      id: "r7",
      type: "video",
      icon: "assets/images/recuerdo7.png",
      src: "assets/videos/videorecuerdo7.mp4",
      caption: "PEINADITA",
      message: "Un día que estabas muy contenta (peinada sobretodo)"
    }
  ],

  // sprites del personaje (4 estados). Si el archivo no existe todavía, se usa un personaje de reemplazo.
  characterSprites: {
    quieto: "assets/images/character/quieto.png",
    caminando: "assets/images/character/caminando.png",
    corriendo: "assets/images/character/corriendo.png",
    saltando: "assets/images/character/saltando.png"
  },

  finale: {
    heading: "Tu corcho de recuerdos",
    subheading: "Todo lo que fuiste desbloqueando queda clavado acá para siempre",
    finalMessage: {
      type: "video",
      src: "assets/videos/videorecuerdofinal.mp4",
      text: "Feliz cumple, Agus. Sabes todo lo que te queremos y valoramos como amiga, gracias por siempre estar para nosotros (darnos comida sobre todo), y sabe que siempre vamos estar para lo que sea que necesites porque sos muy importante para nosotros. Te amamos.\n-Manu y Pedrito"
    }
  }
};

/* =========================================================================
   NIVEL — geometría del mapa 2D. Coordenadas en px de "mundo" (no de pantalla).
   y = 0 es arriba de todo, el mundo mide WORLD_H de alto.
   ========================================================================= */
const WORLD_W = 3850;
const WORLD_H = 300;
const CHAR_W = 38;
const CHAR_H = 38;
const GROUND_Y = 260; // y de las plataformas "piso"

const PLATFORMS = [
  { x: 0,    y: GROUND_Y, w: 420, h: 40 },
  { x: 480,  y: GROUND_Y, w: 260, h: 40 },
  { x: 800,  y: 195,      w: 160, h: 40 },
  { x: 1020, y: GROUND_Y, w: 300, h: 40 },
  { x: 1380, y: 220,      w: 140, h: 40 },
  { x: 1580, y: GROUND_Y, w: 200, h: 40 },
  // plataforma alta grande: solo se llega con el trampolín
  { x: 1780, y: 70,       w: 260, h: 40 },
  { x: 2060, y: GROUND_Y, w: 300, h: 40 },
  { x: 2360, y: GROUND_Y, w: 240, h: 40 },
  // segunda mitad del recorrido (nivel más largo)
  { x: 2660, y: GROUND_Y, w: 240, h: 40 },
  { x: 2960, y: 200,      w: 140, h: 40 },
  { x: 3160, y: GROUND_Y, w: 260, h: 40 },
  { x: 3480, y: GROUND_Y, w: 370, h: 40 },
  // cajón decorativo: también es plataforma sólida
  { x: 250,  y: GROUND_Y - 34, w: 34, h: 34, crate: true }
];

// x,y son la esquina superior izquierda del triángulo (que mide 22px de ancho x 20px de alto)
const SPIKES = [
  { x: 1150, y: GROUND_Y - 20 },
  { x: 1690, y: GROUND_Y - 20 },
  { x: 2760, y: GROUND_Y - 20 }
];

// trampolines: al tocarlos, lanzan al personaje bien alto automáticamente (sin apretar nada)
const TRAMPOLINES = [
  { x: 1720, y: GROUND_Y - 18, w: 40, h: 18 }
];

const CLOUDS = [
  { x: 120, y: 30 }, { x: 500, y: 55 }, { x: 950, y: 25 }, { x: 1400, y: 45 },
  { x: 1900, y: 30 }, { x: 2150, y: 50 }, { x: 2450, y: 30 },
  { x: 2800, y: 40 }, { x: 3150, y: 25 }, { x: 3500, y: 50 }
];

const GEMS = [
  { id: "g1", x: 150, y: 225 }, { id: "g2", x: 330, y: 225 },
  { id: "g3", x: 540, y: 225 }, { id: "g4", x: 850, y: 160 },
  { id: "g5", x: 1080, y: 225 }, { id: "g6", x: 1420, y: 185 },
  { id: "g7", x: 1610, y: 225 }, { id: "g8", x: 1900, y: 30 },
  { id: "g9", x: 2120, y: 225 }, { id: "g10", x: 2300, y: 225 },
  { id: "g11", x: 2420, y: 225 }, { id: "g12", x: 600, y: 225 },
  { id: "g13", x: 2830, y: 225 }, { id: "g14", x: 2990, y: 165 },
  { id: "g15", x: 3220, y: 225 }, { id: "g16", x: 3560, y: 225 },
  { id: "g17", x: 3700, y: 225 }
];

// posiciones de las gemas doradas (recompensas), deben matchear CONFIG.rewards por índice
const REWARD_GEMS = [
  { rewardId: "r1", x: 600,  y: 224 },
  { rewardId: "r2", x: 1080, y: 220 },
  { rewardId: "r3", x: 1590, y: 220 },
  { rewardId: "r4", x: 2200, y: 220 },
  { rewardId: "r5", x: 2680, y: 220 },
  { rewardId: "r6", x: 3300, y: 220 },
  { rewardId: "r7", x: 3620, y: 220 }
];

const FLAG = { x: 3760, y: GROUND_Y - 60, w: 40, h: 60 };

/* =========================================================================
   ESTADO / PERSISTENCIA
   ========================================================================= */
const STORAGE_KEY = "regaloAgusProgress_v2";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { gems: {}, rewards: {} }; }
  catch (e) { return { gems: {}, rewards: {} }; }
}
function saveProgress() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ } }
let progress = loadProgress();
if (!progress.gems) progress.gems = {};
if (!progress.rewards) progress.rewards = {};

function $(sel) { return document.querySelector(sel); }
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $("#" + id).classList.remove("hidden");
  window.scrollTo(0, 0);
}

/* ---- media placeholder helper ---- */
function renderMedia(container, type, src, altLabel) {
  container.innerHTML = "";
  if (type === "video") {
    const v = document.createElement("video");
    v.controls = true;
    v.playsInline = true;
    v.addEventListener("error", () => showPlaceholder("🎬", altLabel || "Reemplazá este video"), { once: true });
    v.src = src;
    container.appendChild(v);
  } else {
    const img = document.createElement("img");
    img.alt = altLabel || "";
    img.addEventListener("error", () => showPlaceholder("📷", altLabel || "Reemplazá esta foto"), { once: true });
    img.src = src;
    container.appendChild(img);
  }
  function showPlaceholder(emoji, text) {
    container.innerHTML = "";
    const ph = el("div", "media-placeholder");
    ph.innerHTML = `<span class="emoji">${emoji}</span><span>${text}<br><small>${src}</small></span>`;
    container.appendChild(ph);
  }
}

/* ---- INTRO ---- */
function initIntro() {
  $("#friend-name-title").textContent = CONFIG.friendName;
  renderMedia($("#screen-intro .photo-slot"), "image", CONFIG.intro.photo, "Foto de portada");
  $("#screen-intro .polaroid-caption").textContent = CONFIG.intro.caption;
  // fondo fijo del juego: no se mueve con la cámara (ver .game-viewport)
  $("#game-viewport").style.backgroundImage = `url('${CONFIG.background}')`;
  // ícono del cartel "Ayuda al Porrito...": usa el sprite de "corriendo"
  const howtoIcon = $("#howto-icon");
  const howtoImg = $("#howto-icon-img");
  howtoImg.addEventListener("error", () => howtoIcon.classList.add("sprite-missing"), { once: true });
  howtoImg.src = CONFIG.characterSprites.corriendo;
  $("#btn-start").addEventListener("click", () => { showScreen("screen-game"); openGame(); });
}
$("#btn-game-exit").addEventListener("click", () => { stopGame(); showScreen("screen-intro"); });
$("#btn-finale-replay").addEventListener("click", () => { showScreen("screen-game"); openGame(); });

// pantalla previa "Ayuda al Porrito..." antes de que arranque a correr
function openGame() {
  startGame(); // arma el mundo y deja el personaje quieto, listo para arrancar
  $("#howto-overlay").classList.remove("hidden");
}
$("#btn-howto-start").addEventListener("click", () => {
  $("#howto-overlay").classList.add("hidden");
  runLoop();
});

/* =========================================================================
   JUEGO 2D
   ========================================================================= */
let gameEls = null;   // referencias a nodos DOM del mundo
let gameState = null; // estado físico
let rafId = null;

function buildWorld() {
  const world = $("#game-world");
  world.innerHTML = "";
  world.style.width = WORLD_W + "px";
  world.style.height = WORLD_H + "px";
  // el fondo va fijo en #game-viewport (ver style.css), acá el mundo queda transparente
  // para que el fondo no se mueva con la cámara mientras el personaje corre.

  CLOUDS.forEach(c => {
    const d = el("div", "cloud", "☁️");
    d.style.left = c.x + "px"; d.style.top = c.y + "px";
    world.appendChild(d);
  });

  PLATFORMS.forEach(p => {
    if (p.crate) {
      const d = el("div", "crate", "📦");
      d.style.left = p.x + "px"; d.style.top = p.y + "px";
      world.appendChild(d);
    } else {
      const d = el("div", "platform");
      d.style.left = p.x + "px"; d.style.top = p.y + "px";
      d.style.width = p.w + "px"; d.style.height = p.h + "px";
      world.appendChild(d);
    }
  });

  SPIKES.forEach(s => {
    const d = el("div", "spike");
    d.style.left = s.x + "px"; d.style.top = s.y + "px";
    world.appendChild(d);
  });

  TRAMPOLINES.forEach(t => {
    const d = el("div", "trampoline");
    d.style.left = t.x + "px"; d.style.top = t.y + "px";
    d.style.width = t.w + "px"; d.style.height = t.h + "px";
    world.appendChild(d);
  });

  const gemEls = {};
  GEMS.forEach(g => {
    const d = el("div", "gem" + (progress.gems[g.id] ? " collected" : ""), "💎");
    d.style.left = g.x + "px"; d.style.top = g.y + "px";
    world.appendChild(d);
    gemEls[g.id] = d;
  });

  const rewardGemEls = {};
  REWARD_GEMS.forEach(rg => {
    const collected = !!progress.rewards[rg.rewardId];
    const d = el("div", "reward-gem" + (collected ? " collected" : ""));
    d.style.left = rg.x + "px"; d.style.top = rg.y + "px";
    const reward = CONFIG.rewards.find(r => r.id === rg.rewardId);
    const iconSrc = reward && reward.icon;
    if (iconSrc) {
      const img = el("img", "reward-gem-icon");
      img.alt = "";
      img.addEventListener("error", () => { d.classList.add("icon-missing"); }, { once: true });
      img.src = iconSrc;
      d.appendChild(img);
      const fallbackText = el("span", "reward-gem-fallback", "🔶");
      d.appendChild(fallbackText);
    } else {
      d.textContent = "🔶";
    }
    world.appendChild(d);
    rewardGemEls[rg.rewardId] = d;
  });

  const flagEl = el("div", "flag", "🏁");
  flagEl.style.left = FLAG.x + "px"; flagEl.style.top = FLAG.y + "px";
  world.appendChild(flagEl);

  const charEl = el("div", "character");
  const spriteImg = el("img", "character-sprite");
  spriteImg.alt = "";
  // ojo: onerror/onload se reasignan cada vez que cambia el estado (ver render()),
  // así una imagen que sí carga bien no queda tapada para siempre por otra que falló antes.
  const fallback = el("div", "character-fallback");
  charEl.appendChild(spriteImg);
  charEl.appendChild(fallback);
  world.appendChild(charEl);

  return { world, gemEls, rewardGemEls, flagEl, charEl, spriteImg, spriteState: null };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function startGame() {
  gameEls = buildWorld();
  gameState = {
    x: 20, y: GROUND_Y - CHAR_H,
    vx: 0, vy: 0,
    onGround: true,
    finished: false,
    lost: false
  };
  updateGemCounter();
  // dibuja un primer cuadro quieto (el personaje arranca a correr recién con btn-howto-start)
  render($("#game-viewport").clientWidth);
}

function runLoop() {
  const viewport = $("#game-viewport");
  let last = performance.now();
  function frame(now) {
    let dt = (now - last) / 1000;
    if (dt > 0.05) dt = 0.05;
    last = now;
    stepPhysics(dt, viewport.clientWidth);
    render(viewport.clientWidth);
    rafId = requestAnimationFrame(frame);
  }
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(frame);
}

function stopGame() {
  cancelAnimationFrame(rafId);
  rafId = null;
}

function showLose(reason) {
  $("#lose-message").textContent = reason === "pincho"
    ? "Te clavaste con un pincho. Los recuerdos que ya desbloqueaste siguen guardados."
    : "Te caíste del camino. Los recuerdos que ya desbloqueaste siguen guardados.";
  $("#lose-overlay").classList.remove("hidden");
}
$("#btn-lose-retry").addEventListener("click", () => {
  $("#lose-overlay").classList.add("hidden");
  gameState.x = 20;
  gameState.y = GROUND_Y - CHAR_H;
  gameState.vx = 0;
  gameState.vy = 0;
  gameState.onGround = false;
  gameState.lost = false;
  runLoop();
});

const GRAVITY = 1800;
const MOVE_SPEED = 165;
const JUMP_VEL = -620;
const TRAMPOLINE_VEL = -820;
const MAX_FALL = 900;

function stepPhysics(dt, viewportW) {
  const s = gameState;
  if (!s || s.finished || s.lost) return;
  if ($("#reward-overlay").classList.contains("hidden") === false) return; // paused while overlay open

  // el personaje corre solo, siempre para adelante
  s.vx = MOVE_SPEED;
  s.x += s.vx * dt;
  s.x = Math.max(0, Math.min(WORLD_W - CHAR_W, s.x));

  // vertical
  s.vy += GRAVITY * dt;
  if (s.vy > MAX_FALL) s.vy = MAX_FALL;
  const prevBottom = s.y + CHAR_H;
  s.y += s.vy * dt;
  s.onGround = false;

  const charRect = { x: s.x, y: s.y, w: CHAR_W, h: CHAR_H };
  PLATFORMS.forEach(p => {
    const newBottom = s.y + CHAR_H;
    const horizOverlap = s.x + CHAR_W > p.x && s.x < p.x + p.w;
    if (horizOverlap && s.vy >= 0 && prevBottom <= p.y + 1 && newBottom >= p.y) {
      s.y = p.y - CHAR_H;
      s.vy = 0;
      s.onGround = true;
    }
  });

  // trampolines: lanzan bien alto automáticamente apenas los toca, sin apretar nada
  TRAMPOLINES.forEach(t => {
    const rect = { x: t.x, y: t.y, w: t.w, h: t.h };
    if (rectsOverlap({ x: s.x, y: s.y, w: CHAR_W, h: CHAR_H }, rect) && s.vy > -400) {
      s.y = t.y - CHAR_H;
      s.vy = TRAMPOLINE_VEL;
      s.onGround = false;
    }
  });

  if (s.y > WORLD_H + 150 && !s.lost) {
    // se cayó a un pozo: se pierde la partida y hay que reintentar (evita quedar en bucle)
    s.lost = true;
    stopGame();
    showLose("caida");
    return;
  }

  // pinches: hay que saltarlos sí o sí, si los toca pierde
  // (hitbox más chica que el triángulo dibujado, para que sea justo con el salto)
  if (!s.lost) {
    for (const sp of SPIKES) {
      const spikeRect = { x: sp.x + 5, y: sp.y + 6, w: 12, h: 12 };
      if (rectsOverlap({ x: s.x, y: s.y, w: CHAR_W, h: CHAR_H }, spikeRect)) {
        s.lost = true;
        stopGame();
        showLose("pincho");
        return;
      }
    }
  }

  // gems
  GEMS.forEach(g => {
    if (progress.gems[g.id]) return;
    const gemRect = { x: g.x, y: g.y, w: 22, h: 22 };
    if (rectsOverlap({ x: s.x, y: s.y, w: CHAR_W, h: CHAR_H }, gemRect)) {
      progress.gems[g.id] = true;
      saveProgress();
      gameEls.gemEls[g.id].classList.add("collected");
      updateGemCounter();
    }
  });

  // reward gems
  REWARD_GEMS.forEach(rg => {
    if (progress.rewards[rg.rewardId]) return;
    const rect = { x: rg.x, y: rg.y, w: 44, h: 44 };
    if (rectsOverlap({ x: s.x, y: s.y, w: CHAR_W, h: CHAR_H }, rect)) {
      progress.rewards[rg.rewardId] = true;
      saveProgress();
      const gemEl = gameEls.rewardGemEls[rg.rewardId];
      const originRect = gemEl.getBoundingClientRect();
      gemEl.classList.add("collected");
      updateGemCounter();
      const reward = CONFIG.rewards.find(r => r.id === rg.rewardId);
      if (reward) flyIconToReward(originRect, reward);
    }
  });

  // flag
  if (!s.finished) {
    const flagRect = { x: FLAG.x, y: FLAG.y, w: FLAG.w, h: FLAG.h };
    if (rectsOverlap({ x: s.x, y: s.y, w: CHAR_W, h: CHAR_H }, flagRect)) {
      s.finished = true;
      stopGame();
      setTimeout(() => { renderFinale(); showScreen("screen-finale"); }, 400);
    }
  }
}

function render(viewportW) {
  const s = gameState;
  if (!s || !gameEls) return;
  gameEls.charEl.style.left = s.x + "px";
  gameEls.charEl.style.top = s.y + "px";
  const cam = Math.max(0, Math.min(WORLD_W - viewportW, s.x - viewportW / 2 + CHAR_W / 2));
  gameEls.world.style.transform = `translateX(${-cam}px)`;

  const paused = $("#reward-overlay").classList.contains("hidden") === false
    || $("#howto-overlay").classList.contains("hidden") === false;
  const state = s.finished ? "quieto" : paused ? "quieto" : !s.onGround ? "saltando" : "corriendo";
  if (gameEls.spriteState !== state) {
    gameEls.spriteState = state;
    const charEl = gameEls.charEl;
    gameEls.spriteImg.onload = () => charEl.classList.remove("sprite-missing");
    gameEls.spriteImg.onerror = () => charEl.classList.add("sprite-missing");
    gameEls.spriteImg.src = CONFIG.characterSprites[state];
  }
}

function jump() {
  const s = gameState;
  if (s && s.onGround && !s.finished) {
    s.vy = JUMP_VEL;
    s.onGround = false;
  }
}

function updateGemCounter() {
  const collectedSmall = Object.keys(progress.gems).length;
  const collectedBig = Object.keys(progress.rewards).length;
  $("#gem-counter").textContent = `💎 ${collectedSmall + collectedBig}/${GEMS.length + REWARD_GEMS.length}`;
}

/* ---- controls: un solo botón (o tocar la pantalla) para saltar ---- */
$("#btn-jump").addEventListener("pointerdown", (e) => { e.preventDefault(); jump(); });
$("#game-viewport").addEventListener("pointerdown", (e) => { e.preventDefault(); jump(); });

document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "ArrowUp") jump();
});

/* ---- REWARD POPUP (con transición: el ícono "vuela" hasta convertirse en la pantalla) ---- */
function populateRewardContent(reward) {
  const mediaWrap = $("#reward-media-wrap");
  $("#reward-message").textContent = reward.message || "";
  if (reward.type === "text") {
    mediaWrap.style.display = "none";
  } else {
    mediaWrap.style.display = "";
    // sin rotación si es video: una polaroid inclinada rompe el botón de pantalla completa
    // en varios navegadores (Safari/Chrome) cuando el video tiene un ancestro con transform.
    mediaWrap.style.setProperty("--rot", reward.type === "video" ? "0deg" : "-3deg");
    renderMedia($("#reward-media"), reward.type, reward.src, reward.caption);
    $("#reward-caption").textContent = reward.caption || "";
  }
}

function flyIconToReward(originRect, reward) {
  populateRewardContent(reward);
  // pausa el juego ya mismo (el overlay deja de estar "hidden"), pero el contenido
  // recién se muestra ("show") cuando termina de volar el ícono.
  $("#reward-overlay").classList.remove("hidden");
  $("#reward-overlay-inner").classList.remove("show");

  const viewport = $("#game-viewport");
  const vpRect = viewport.getBoundingClientRect();
  const targetSize = Math.min(vpRect.width, vpRect.height) * 0.55;
  const targetLeft = vpRect.left + vpRect.width / 2 - targetSize / 2;
  const targetTop = vpRect.top + vpRect.height / 2 - targetSize / 2;

  const flying = el("div", "flying-icon");
  flying.style.left = originRect.left + "px";
  flying.style.top = originRect.top + "px";
  flying.style.width = originRect.width + "px";
  flying.style.height = originRect.height + "px";
  if (reward.icon) {
    const img = document.createElement("img");
    img.src = reward.icon;
    img.alt = "";
    img.addEventListener("error", () => { flying.textContent = "🔶"; }, { once: true });
    flying.appendChild(img);
  } else {
    flying.textContent = "🔶";
  }
  document.body.appendChild(flying);

  // fuerza reflow para que la transición de la posición inicial funcione
  // eslint-disable-next-line no-unused-expressions
  flying.getBoundingClientRect();

  requestAnimationFrame(() => {
    flying.style.left = targetLeft + "px";
    flying.style.top = targetTop + "px";
    flying.style.width = targetSize + "px";
    flying.style.height = targetSize + "px";
    flying.style.opacity = "0";
  });

  setTimeout(() => {
    flying.remove();
    $("#reward-overlay-inner").classList.add("show");
  }, 460);
}

$("#btn-reward-continue").addEventListener("click", () => {
  $("#reward-overlay").classList.add("hidden");
  $("#reward-overlay-inner").classList.remove("show");
});

/* ---- FINALE / KEEPSAKE ---- */
function renderFinale() {
  $("#keepsake-heading").textContent = CONFIG.finale.heading;
  $("#keepsake-subheading").textContent = CONFIG.finale.subheading;
  const grid = $("#keepsake-grid");
  grid.innerHTML = "";

  const unlocked = CONFIG.rewards.filter(r => progress.rewards[r.id]);
  if (unlocked.length === 0) {
    grid.appendChild(el("div", "keepsake-empty", "Todavía no desbloqueaste nada. ¡Volvé a jugar!"));
  } else {
    unlocked.forEach((r, i) => {
      const rot = (i % 2 === 0 ? -4 : 4) + (i % 3);
      const card = el("div", "polaroid");
      // sin rotación si es video: rompe el botón de pantalla completa en varios navegadores
      card.style.setProperty("--rot", (r.type === "video" ? 0 : rot) + "deg");
      const slot = el("div", "photo-slot");
      card.appendChild(slot);
      const cap = el("p", "polaroid-caption", r.caption || "recuerdo");
      card.appendChild(cap);
      grid.appendChild(card);
      if (r.type === "text") {
        if (r.icon) {
          slot.innerHTML = `<div class="media-placeholder icon-only"><img src="${r.icon}" alt=""></div>`;
        } else {
          slot.innerHTML = `<div class="media-placeholder"><span class="emoji">💌</span><span>${r.message}</span></div>`;
        }
      } else {
        renderMedia(slot, r.type, r.src, r.caption);
      }
    });
  }

  const allDone = CONFIG.rewards.every(r => progress.rewards[r.id]);
  const finalBox = $("#finale-final-message");
  if (allDone) {
    finalBox.classList.remove("hidden");
    const fm = CONFIG.finale.finalMessage;
    finalBox.innerHTML = "";
    if (fm.type !== "text") {
      const mediaHolder = el("div", "photo-slot");
      finalBox.appendChild(mediaHolder);
      renderMedia(mediaHolder, fm.type, fm.src, "Video final");
    }
    finalBox.appendChild(el("p", "", fm.text));
  } else {
    finalBox.classList.add("hidden");
  }
}

/* ---- INIT ---- */
initIntro();
