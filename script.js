const bootScreen = document.getElementById("boot-screen");
const bootText = document.getElementById("boot-text");
const bootStatus = document.getElementById("boot-status");
const app = document.getElementById("app");
const terminal = document.getElementById("terminal");
const commandForm = document.getElementById("command-form");
const commandInput = document.getElementById("command-input");
const commandList = document.getElementById("command-list");
const assistantOutput = document.getElementById("assistant-output");
const soundState = document.getElementById("sound-state");
const clock = document.getElementById("clock");

let audioEnabled = false;
let audioCtx = null;

const commands = {
  help: () => renderBlock([
    "AVAILABLE COMMANDS",
    "help     show this list",
    "about    site info",
    "status   system status",
    "roast    random roast",
    "matrix   green screen effect",
    "lab      computer lab mode",
    "panic    emergency mode",
    "clear    clear terminal",
    "secret   hidden message",
    "shutdown fake shutdown"
  ], "system"),
  about: () => renderBlock([
    "This is Evan's website.",
    "He used ChatGPT for the code.",
    "That is the whole situation."
  ], "system"),
  status: () => renderBlock([
    "SYSTEM STATUS",
    "mode: retro",
    "vibe: terminal",
    "code quality: questionable",
    "confidence: fluctuating",
    "boredom: active",
    "oddness: approved"
  ], "system"),
  roast: () => renderBlock([
    pick([
      "You opened a terminal on a personal website. That's commitment.",
      "This page has more structure than a group project.",
      "ChatGPT did the code. You did the pretending.",
      "This is what happens when a keyboard gets access to a dream."
    ])
  ], "warn"),
  matrix: () => {
    flashMatrix();
    renderBlock([
      "MATRIX MODE ENABLED",
      "reality.exe is taking a break"
    ], "system");
  },
  lab: () => renderBlock([
    "COMPUTER LAB MODE",
    "Act normal.",
    "Do not click everything like a raccoon."
  ], "warn"),
  panic: () => renderBlock([
    "EMERGENCY MODE",
    "Pretend to be busy.",
    "Open a new tab and stare seriously."
  ], "error"),
  clear: () => {
    terminal.innerHTML = "";
    renderPrompt("Terminal cleared.");
  },
  secret: () => renderBlock([
    "ACCESS GRANTED",
    "hidden mode: unlocked",
    "achievement: keyboard wizard"
  ], "system"),
  shutdown: () => renderBlock([
    "SYSTEM SHUTTING DOWN...",
    "just kidding.",
    "you still have school."
  ], "error")
};

const commandMeta = [
  ["help", "show commands"],
  ["about", "site info"],
  ["status", "system status"],
  ["roast", "random roast"],
  ["matrix", "visual effect"],
  ["lab", "lab mode"],
  ["panic", "emergency"],
  ["clear", "wipe screen"],
  ["secret", "hidden"],
  ["shutdown", "fake off"]
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function initAudio() {
  if (audioEnabled) return;
  audioEnabled = true;
  soundState.textContent = "SND: ON";

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch {
    audioCtx = null;
  }
}

function beep(frequency = 440, duration = 0.05, type = "square", gainValue = 0.025) {
  if (!audioEnabled || !audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = gainValue;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function line(text, cls = "") {
  const div = document.createElement("div");
  div.className = `terminal-line ${cls}`;
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function renderPrompt(text) {
  line(`> ${text}`, "muted");
}

function renderBlock(lines, cls = "system") {
  const input = commandInput.value.trim();
  renderPrompt(input || currentCommandText || " ");
  lines.forEach((txt) => line(txt, cls));
  assistantOutput.textContent = lines[lines.length - 1] || "OK";
  beep(cls === "error" ? 160 : cls === "warn" ? 280 : 420, 0.05, "square", 0.022);
}

function flashMatrix() {
  document.body.classList.add("matrix-mode");
  beep(610, 0.04, "square", 0.025);
  setTimeout(() => document.body.classList.remove("matrix-mode"), 1600);
}

function executeCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  currentCommandText = cmd;
  initAudio();
  beep(520, 0.04, "square", 0.018);

  renderPrompt(cmd);

  if (commands[cmd]) {
    commands[cmd]();
  } else {
    renderBlock([
      `Unknown command: ${cmd}`,
      "Type help for the command list."
    ], "warn");
  }
}

let currentCommandText = "";

function buildCommandList() {
  commandList.innerHTML = "";
  commandMeta.forEach(([cmd, desc]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "command-item";
    btn.innerHTML = `<strong>${cmd}</strong><span>${desc}</span>`;
    btn.addEventListener("click", () => {
      commandInput.value = cmd;
      commandInput.focus();
      executeCommand(cmd);
      commandInput.value = "";
    });
    commandList.appendChild(btn);
  });
}

function tickClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

async function bootSequence() {
  const bootLines = [
    "BOOTING EVAN.EXE...",
    "LOADING RETRO INTERFACE...",
    "CHECKING KEYBOARD INPUT... OK",
    "CHECKING COMMON SENSE... NOT FOUND",
    "INITIALIZING TERMINAL...",
    "STARTUP COMPLETE."
  ];

  bootText.innerHTML = "";
  bootStatus.textContent = "BOOT";

  for (let i = 0; i < bootLines.length; i++) {
    await typeLine(bootLines[i], i === bootLines.length - 1 ? 0 : 18);
    await wait(280);
  }

  await wait(520);
  bootScreen.style.opacity = "0";
  bootScreen.style.transition = "opacity 0.45s ease";
  await wait(460);
  bootScreen.remove();

  app.classList.remove("hidden");
  buildCommandList();
  renderPrompt("help");
  commands.help();
  assistantOutput.textContent = "Type a command.";
}

function typeLine(text, speed = 22) {
  return new Promise((resolve) => {
    const lineEl = document.createElement("div");
    lineEl.className = "boot-line";
    bootText.appendChild(lineEl);

    let idx = 0;
    const timer = setInterval(() => {
      lineEl.textContent += text[idx];
      idx += 1;
      if (idx >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

commandForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = commandInput.value;
  if (!value.trim()) return;
  executeCommand(value);
  commandInput.value = "";
  commandInput.focus();
});

document.addEventListener("pointerdown", initAudio, { once: true });
document.addEventListener("keydown", initAudio, { once: true });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    commandInput.blur();
  }
});

window.addEventListener("load", () => {
  tickClock();
  setInterval(tickClock, 1000);
  bootSequence();
});

function welcomeLine(text) {
  line(text, "muted");
}