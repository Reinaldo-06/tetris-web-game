/* ============================================
   TETRIS AVANZADO - LÓGICA DEL JUEGO v2.0
   ============================================ */

// ============ CONFIGURACIÓN INICIAL ============

let COLS = 10;
let ROWS = 20;

// Configuración de velocidad (ms entre caídas automáticas)
const LEVEL_SPEEDS = {
    1: 800,  // Suave
    2: 500,  // Medio
    3: 300,  // Rápido
    4: 100,  // Locura
    5: 70,   // Insano
    6: 50    // Caos
};

// ============ MODOS DE JUEGO ============
const GAME_MODES = {
    CLASSIC: 'classic',
    CHALLENGE: 'challenge'
};

const MODE_CONFIG = {
    classic: {
        name: 'Clásico',
        speedMultiplier: 1.0,
        levelUpMultiplier: 1.0,
        allowGameOver: true,
        description: 'Tetris clásico tradicional'
    },
    challenge: {
        name: 'Desafío',
        speedMultiplier: 1.2,
        levelUpMultiplier: 1.5,
        allowGameOver: true,
        description: 'Más difícil y rápido'
    }
};

// ============ SISTEMA DE AUDIO RETRO ============

let audioContext = null;
let soundEnabled = true;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Cargar preferencia de sonido de localStorage
    const savedSoundState = localStorage.getItem('soundEnabled');
    if (savedSoundState !== null) {
        soundEnabled = JSON.parse(savedSoundState);
    }
    updateSoundButton();
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    updateSoundButton();
}

function updateSoundButton() {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
        btn.textContent = soundEnabled ? '🔊' : '🔇';
        btn.classList.toggle('muted', !soundEnabled);
    }
}

// Sonido para rotar (beep corto agudo)
function playRotateSound() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
}

// Sonido para fijar pieza (dos beeps)
function playFixSound() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    
    // Primer beep
    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.setValueAtTime(400, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
    
    // Segundo beep
    osc = audioContext.createOscillator();
    gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.setValueAtTime(500, now + 0.1);
    gain.gain.setValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.start(now + 0.1);
    osc.stop(now + 0.18);
}

// Sonido para completar línea (sonido "victoria" rápido)
function playClearSound() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    const frequencies = [523, 659, 784]; // Do, Mi, Sol
    
    frequencies.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.1);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.1);
    });
}

// Sonido para subir de nivel (fanfarria corta)
function playLevelUpSound() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    const frequencies = [659, 784, 987, 1175]; // Mi, Sol, Si, Re
    
    frequencies.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.15);
    });
}

// Sonido para Game Over (nota grave y descendente)
function playGameOverSound() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    osc.start(now);
    osc.stop(now + 0.5);
}

// Música adaptativa simple (base de frecuencia)
function playAdaptiveMusic() {
    if (!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    
    const speedMultiplier = currentGameMode === GAME_MODES.CHALLENGE ? 1.3 : 1.0;
    const baseFreq = level <= 3 ? 220 : level <= 5 ? 262 : 330;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.1 * speedMultiplier);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.2 * speedMultiplier);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.3 * speedMultiplier);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3 * speedMultiplier);
    
    osc.start(now);
    osc.stop(now + 0.3 * speedMultiplier);
}

// Colores de piezas
const PIECE_COLORS = {
    I: '#00ffff',
    O: '#ffff00',
    T: '#ff00ff',
    L: '#ff8800',
    J: '#0088ff',
    S: '#00ff00',
    Z: '#ff0000'
};

// Definición de tetrominos
const TETROMINOS = {
    I: {
        color: 'I',
        rotations: [
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 } ]
        ]
    },
    O: {
        color: 'O',
        rotations: [
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ]
        ]
    },
    T: {
        color: 'T',
        rotations: [
            [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 } ],
            [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ]
        ]
    },
    S: {
        color: 'S',
        rotations: [
            [ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
            [ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ]
        ]
    },
    Z: {
        color: 'Z',
        rotations: [
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
            [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
            [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ]
        ]
    },
    J: {
        color: 'J',
        rotations: [
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 } ],
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ]
        ]
    },
    L: {
        color: 'L',
        rotations: [
            [ { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
            [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 } ]
        ]
    }
};

// ============ VARIABLES DE ESTADO ============

let board = [];
let currentPiece = null;
let nextPiece = null;
let gameRunning = false;
let gamePaused = false;
let currentGameMode = GAME_MODES.CLASSIC;

let score = 0;
let lines = 0;
let level = 1;
let minLevel = 1;
let dropSpeed = LEVEL_SPEEDS[1];

let lastDropTime = 0;
let gameLoopId = null;

// Canvas
let gameCanvas = null;
let gameCtx = null;
let nextCanvas = null;
let nextCtx = null;
let cellSize = 20;

// Animación de líneas
let clearingLines = [];
let clearingAnimationTime = 0;
const CLEAR_ANIMATION_DURATION = 250;

// Efectos visuales
let levelUpAnimationTime = 0;
const LEVEL_UP_ANIMATION_DURATION = 500;
let boardGlowIntensity = 0.5;
const NEON_COLORS = ['#00ff88', '#00ffff', '#ff00ff', '#ffff00', '#ff6600'];
let currentNeonColorIndex = 0;

// ============ SISTEMA DE PARTÍCULAS ============

let particles = [];

class Particle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = 1.0;
        this.maxLife = 1.0;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += 0.02 * deltaTime; // Gravedad
        this.life -= deltaTime / 1000; // Decrece con tiempo
    }

    draw(ctx, cellSize) {
        const alpha = this.life / this.maxLife;
        ctx.fillStyle = this.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.fillRect(
            this.x * cellSize + 5,
            this.y * cellSize + 5,
            4, 4
        );
    }

    isAlive() {
        return this.life > 0;
    }
}

function createParticles(y, colorType) {
    const baseColor = PIECE_COLORS[colorType];
    const rgbColor = hexToRgb(baseColor);
    
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 0.5 + Math.random() * 1.0;
        const p = new Particle(
            COLS / 2,
            y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed - 0.5,
            rgbColor
        );
        particles.push(p);
    }
}

function updateParticles(deltaTime) {
    particles = particles.filter(p => {
        p.update(deltaTime);
        return p.isAlive();
    });
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

// ============ CLASE PIEZA ============

class Piece {
    constructor(type) {
        this.type = type;
        this.shape = TETROMINOS[type];
        this.rotationIndex = 0;
        this.blocks = this.shape.rotations[this.rotationIndex];
        this.x = Math.floor(COLS / 2) - 1;
        this.y = 0;
    }

    getAbsoluteBlocks() {
        return this.blocks.map(block => ({
            x: this.x + block.x,
            y: this.y + block.y
        }));
    }

    rotate() {
        const nextIndex = (this.rotationIndex + 1) % this.shape.rotations.length;
        this.rotationIndex = nextIndex;
        this.blocks = this.shape.rotations[nextIndex];
    }

    undoRotate() {
        const prevIndex = (this.rotationIndex - 1 + this.shape.rotations.length) % this.shape.rotations.length;
        this.rotationIndex = prevIndex;
        this.blocks = this.shape.rotations[prevIndex];
    }
}

// ============ INICIALIZACIÓN DEL JUEGO ============

function initGame() {
    initAudio();
    
    board = [];
    for (let y = 0; y < ROWS; y++) {
        board[y] = [];
        for (let x = 0; x < COLS; x++) {
            board[y][x] = null;
        }
    }

    score = 0;
    lines = 0;
    level = parseInt(document.getElementById('gameLevel').value);
    currentGameMode = document.getElementById('gameMode').value;
    minLevel = level;
    
    // Aplicar multiplicadores de modo
    const modeConfig = MODE_CONFIG[currentGameMode];
    dropSpeed = LEVEL_SPEEDS[level] / modeConfig.speedMultiplier;
    
    gameRunning = true;
    gamePaused = false;
    clearingLines = [];
    clearingAnimationTime = 0;
    levelUpAnimationTime = 0;
    boardGlowIntensity = 0.5;
    currentNeonColorIndex = 0;
    particles = [];

    // Piezas iniciales
    const pieceTypes = Object.keys(TETROMINOS);
    nextPiece = new Piece(pieceTypes[Math.floor(Math.random() * pieceTypes.length)]);
    spawnNewPiece();

    updateHUD();
    lastDropTime = Date.now();
    gameLoopId = requestAnimationFrame(gameLoop);
}

// ============ REINICIO RÁPIDO (Tecla R) ============

function resetCurrentGame() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gamePaused = false;
    initGame();
}

// ============ PAUSA (Tecla P) ============

function togglePause() {
    if (!gameRunning) return;
    gamePaused = !gamePaused;
    if (!gamePaused) {
        lastDropTime = Date.now();
    }
}

// ============ VOLVER AL MENÚ (Tecla ESC o H) ============

function backToMenu() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gameRunning = false;
    gamePaused = false;
    showStartScreen();
}

// Generar nueva pieza
function spawnNewPiece() {
    currentPiece = nextPiece;
    const pieceTypes = Object.keys(TETROMINOS);
    nextPiece = new Piece(pieceTypes[Math.floor(Math.random() * pieceTypes.length)]);

    if (hasCollision(currentPiece, 0, 0)) {
        gameRunning = false;
        endGame();
    }
}

// ============ DETECCIÓN DE COLISIONES ============

function hasCollision(piece, offsetX, offsetY) {
    const blocks = piece.getAbsoluteBlocks();
    for (let block of blocks) {
        const newX = block.x + offsetX;
        const newY = block.y + offsetY;

        if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return true;
        }

        if (newY >= 0 && board[newY][newX] !== null) {
            return true;
        }
    }
    return false;
}

// ============ MOVIMIENTO ============

function movePiece(offsetX, offsetY) {
    if (!hasCollision(currentPiece, offsetX, offsetY)) {
        currentPiece.x += offsetX;
        currentPiece.y += offsetY;
        return true;
    }
    return false;
}

function rotatePiece() {
    if (!currentPiece) return;

    const oldRotationIndex = currentPiece.rotationIndex;
    const oldBlocks = currentPiece.blocks;

    currentPiece.rotate();

    if (hasCollision(currentPiece, 0, 0)) {
        currentPiece.rotationIndex = oldRotationIndex;
        currentPiece.blocks = oldBlocks;
    } else {
        playRotateSound();
    }
}

function hardDrop() {
    if (!currentPiece) return;

    while (movePiece(0, 1)) {}

    fixPiece();
    playFixSound();
    checkAndClearLines();

    if (gameRunning) {
        spawnNewPiece();
    }
}

// ============ FIJACIÓN DE PIEZAS ============

function fixPiece() {
    if (!currentPiece) return;

    const blocks = currentPiece.getAbsoluteBlocks();
    for (let block of blocks) {
        if (block.y >= 0 && block.y < ROWS && block.x >= 0 && block.x < COLS) {
            board[block.y][block.x] = currentPiece.type;
        }
    }
}

// ============ DETECCIÓN Y ANIMACIÓN DE LÍNEAS ============

function checkAndClearLines() {
    clearingLines = [];

    for (let y = ROWS - 1; y >= 0; y--) {
        let isComplete = true;
        for (let x = 0; x < COLS; x++) {
            if (board[y][x] === null) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            clearingLines.push(y);
        }
    }

    if (clearingLines.length > 0) {
        clearingAnimationTime = 0;
        // Crear partículas para cada línea
        clearingLines.forEach(y => {
            createParticles(y, 'T');
        });
    }
}

function updateLineClearing() {
    if (clearingLines.length === 0) return;

    clearingAnimationTime += 16;

    if (clearingAnimationTime >= CLEAR_ANIMATION_DURATION) {
        // Eliminar líneas
        clearingLines.sort((a, b) => a - b);
        for (let y of clearingLines) {
            board.splice(y, 1);
            board.unshift(new Array(COLS).fill(null));
        }

        // Actualizar puntuación y líneas
        const clearedLineCount = clearingLines.length;
        lines += clearedLineCount;
        score += clearedLineCount * 100 * level;

        // Actualizar nivel con fórmula correcta
        const modeConfig = MODE_CONFIG[currentGameMode];
        const linesAboveInitial = Math.max(0, lines - (minLevel - 1) * 5);
        const newLevel = minLevel + Math.floor(linesAboveInitial / (5 / modeConfig.levelUpMultiplier));

        if (newLevel > level) {
            level = newLevel;
            dropSpeed = LEVEL_SPEEDS[Math.min(level, 6)] / modeConfig.speedMultiplier;
            playLevelUpSound();
            levelUpAnimationTime = 0;
            boardGlowIntensity = 1.5;
            playAdaptiveMusic();
        }

        playClearSound();
        clearingLines = [];
        clearingAnimationTime = 0;
    }
}

// ============ DIBUJO EN CANVAS ============

function drawBoard() {
    gameCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    if (levelUpAnimationTime < LEVEL_UP_ANIMATION_DURATION) {
        const progress = levelUpAnimationTime / LEVEL_UP_ANIMATION_DURATION;
        const pulse = Math.sin(progress * Math.PI) * 0.5;
        currentNeonColorIndex = (currentNeonColorIndex + 1) % NEON_COLORS.length;
        boardGlowIntensity = 1.0 + pulse;
        levelUpAnimationTime += 16;
    }

    // Dibujar celdas fijas
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x] !== null) {
                const isClearing = clearingLines.includes(y);
                drawCell(x, y, board[y][x], isClearing);
            }
        }
    }

    // Dibujar pieza actual
    if (currentPiece) {
        const blocks = currentPiece.getAbsoluteBlocks();
        for (let block of blocks) {
            drawCell(block.x, block.y, currentPiece.type, false);
        }
    }

    // Dibujar partículas
    particles.forEach(p => p.draw(gameCtx, cellSize));

    // Overlay de pausa
    if (gamePaused) {
        gameCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.fillStyle = '#ff00ff';
        gameCtx.font = 'bold 30px Arial';
        gameCtx.textAlign = 'center';
        gameCtx.textBaseline = 'middle';
        gameCtx.fillText('PAUSA', gameCanvas.width / 2, gameCanvas.height / 2);
    }

    drawGrid();
}

function drawCell(x, y, colorType, isClearing) {
    const baseColor = PIECE_COLORS[colorType];

    let color = baseColor;
    if (isClearing && clearingAnimationTime < CLEAR_ANIMATION_DURATION) {
        const progress = clearingAnimationTime / CLEAR_ANIMATION_DURATION;
        const brightness = Math.sin(progress * Math.PI * 4) * 0.5 + 1;
        color = baseColor;
    }

    gameCtx.fillStyle = color;
    gameCtx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);

    const glowIntensity = level <= 2 ? 5 : level <= 4 ? 8 : 12;
    gameCtx.shadowColor = color;
    gameCtx.shadowBlur = glowIntensity * boardGlowIntensity;
    gameCtx.strokeStyle = color;
    gameCtx.lineWidth = 1;
    gameCtx.strokeRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
    gameCtx.shadowBlur = 0;
}

function drawGrid() {
    gameCtx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
    gameCtx.lineWidth = 0.5;

    for (let x = 0; x <= COLS; x++) {
        gameCtx.beginPath();
        gameCtx.moveTo(x * cellSize, 0);
        gameCtx.lineTo(x * cellSize, gameCanvas.height);
        gameCtx.stroke();
    }

    for (let y = 0; y <= ROWS; y++) {
        gameCtx.beginPath();
        gameCtx.moveTo(0, y * cellSize);
        gameCtx.lineTo(gameCanvas.width, y * cellSize);
        gameCtx.stroke();
    }
}

function drawNextPiece() {
    nextCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    if (nextPiece) {
        const nextCellSize = Math.floor(nextCanvas.width / 5);
        const blocks = nextPiece.blocks;
        const offsetX = (nextCanvas.width - nextCellSize * 4) / 2;
        const offsetY = (nextCanvas.height - nextCellSize * 4) / 2;

        const color = PIECE_COLORS[nextPiece.type];
        for (let block of blocks) {
            const x = block.x * nextCellSize + offsetX;
            const y = block.y * nextCellSize + offsetY;

            nextCtx.fillStyle = color;
            nextCtx.fillRect(x + 1, y + 1, nextCellSize - 2, nextCellSize - 2);
            nextCtx.strokeStyle = color;
            nextCtx.lineWidth = 1;
            nextCtx.strokeRect(x + 1, y + 1, nextCellSize - 2, nextCellSize - 2);
        }
    }
}

// ============ CANVAS RESPONSIVO ============

function setupResponsiveCanvas() {
    const container = document.getElementById('gameContainer');
    const availableWidth = container.clientWidth * 0.5; // 60% del ancho
    const availableHeight = container.clientHeight * 0.8; // 90% del alto

        cellSize = Math.floor(Math.min(availableWidth / COLS, availableHeight / ROWS));
    
    gameCanvas.width = COLS * cellSize;
    gameCanvas.height = ROWS * cellSize;

    // Reescalar next piece canvas proporcionalmente
    nextCanvas.width = nextCanvas.height;
}

// ============ HUD ============

function updateHUD() {
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;
    
    let speedLabel = 'Lento';
    if (level >= 2 && level < 3) speedLabel = 'Medio';
    else if (level >= 3 && level < 4) speedLabel = 'Rápido';
    else if (level >= 4 && level < 5) speedLabel = 'Locura';
    else if (level >= 5 && level < 6) speedLabel = 'Insano';
    else if (level >= 6) speedLabel = '¡CAOS!';
    
    document.getElementById('speed').textContent = speedLabel;
    document.getElementById('mode').textContent = MODE_CONFIG[currentGameMode].name;
}

// ============ HIGH SCORES ============

const HIGH_SCORES_KEY = 'tetrisHighScores';
const MAX_HIGH_SCORES = 5;

function saveHighScore(score, lines, level, mode) {
    let scores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || '[]');
    
    scores.push({
        score,
        lines,
        level,
        mode: MODE_CONFIG[mode].name,
        date: new Date().toLocaleString()
    });

    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, MAX_HIGH_SCORES);

    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    return scores;
}

function getHighScores() {
    return JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || '[]');
}

function displayHighScores() {
    const scores = getHighScores();
    let html = '<table class="high-scores-table"><tr><th>#</th><th>Puntuación</th><th>Líneas</th><th>Nivel</th><th>Modo</th></tr>';
    
    scores.forEach((s, i) => {
        html += `<tr>
            <td>${i + 1}</td>
            <td>${s.score}</td>
            <td>${s.lines}</td>
            <td>${s.level}</td>
            <td>${s.mode}</td>
        </tr>`;
    });

    html += '</table>';
    return html;
}

// ============ BUCLE PRINCIPAL ============

function gameLoop() {
    if (!gameRunning) {
        return;
    }

    if (!gamePaused) {
        updateLineClearing();

        const now = Date.now();
        if (now - lastDropTime > dropSpeed) {
            if (!movePiece(0, 1)) {
                fixPiece();
                playFixSound();
                checkAndClearLines();

                if (gameRunning) {
                    spawnNewPiece();
                }
            }
            lastDropTime = now;
        }

        if (boardGlowIntensity > 0.5) {
            boardGlowIntensity -= 0.02;
        }

        updateParticles(16);
    }

    drawBoard();
    drawNextPiece();
    updateHUD();

    gameLoopId = requestAnimationFrame(gameLoop);
}

// ============ CONTROLES ============

document.addEventListener('keydown', (e) => {
    if (!gameRunning && !gamePaused) return;

    switch (e.key.toLowerCase()) {
        case 'arrowleft':
            e.preventDefault();
            if (!gamePaused && gameRunning) movePiece(-1, 0);
            break;
        case 'arrowright':
            e.preventDefault();
            if (!gamePaused && gameRunning) movePiece(1, 0);
            break;
        case 'arrowdown':
            e.preventDefault();
            if (!gamePaused && gameRunning) movePiece(0, 1);
            break;
        case ' ':
            e.preventDefault();
            if (!gamePaused && gameRunning) hardDrop();
            break;
        case 'z':
        case 'arrowup':
            e.preventDefault();
            if (!gamePaused && gameRunning) rotatePiece();
            break;
        case 'p':
            e.preventDefault();
            togglePause();
            break;
        case 'r':
            e.preventDefault();
            resetCurrentGame();
            break;
        case 'escape':
        case 'h':
            e.preventDefault();
            backToMenu();
            break;
        case 'm':
            e.preventDefault();
            toggleSound();
            break;
    }
});

// ============ GAME OVER ============

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(gameLoopId);
    playGameOverSound();

    // Guardar high score
    if (MODE_CONFIG[currentGameMode].allowGameOver) {
        saveHighScore(score, lines, level, currentGameMode);
    }

    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLines').textContent = lines;
    document.getElementById('finalLevel').textContent = level;
    document.getElementById('finalMode').textContent = MODE_CONFIG[currentGameMode].name;
    document.getElementById('highScoresDisplay').innerHTML = displayHighScores();
    document.getElementById('gameOverModal').classList.remove('hidden');
}

// ============ GESTIÓN DEL MENÚ ============

function showStartScreen() {
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('gameOverModal').classList.add('hidden');
}

function hideStartScreen() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
}

// ============ EVENT LISTENERS ============

document.getElementById('startButton').addEventListener('click', () => {
    const boardSizeSelect = document.getElementById('boardSize').value;
    const [cols, rows] = boardSizeSelect.split('x').map(Number);
    COLS = cols;
    ROWS = rows;

    hideStartScreen();

    setTimeout(() => {
        gameCanvas = document.getElementById('gameCanvas');
        gameCtx = gameCanvas.getContext('2d');
        nextCanvas = document.getElementById('nextPieceCanvas');
        nextCtx = nextCanvas.getContext('2d');

        setupResponsiveCanvas();
        initGame();
    }, 50);
});

document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('gameOverModal').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');

    gameCanvas = document.getElementById('gameCanvas');
    gameCtx = gameCanvas.getContext('2d');
    nextCanvas = document.getElementById('nextPieceCanvas');
    nextCtx = nextCanvas.getContext('2d');

    resetCurrentGame();
});

document.getElementById('menuButton').addEventListener('click', () => {
    showStartScreen();
});

document.getElementById('soundToggleBtn').addEventListener('click', () => {
    toggleSound();
});

window.addEventListener('resize', () => {
    if (gameRunning || gamePaused) {
        setupResponsiveCanvas();
    }
});

document.getElementById('gameMode').addEventListener('change', (e) => {
    const mode = e.target.value;
    const descriptions = {
        classic: 'Tetris clásico tradicional',
        challenge: 'Más difícil y rápido - 20% velocidad, 50% progresión'
    };
    document.getElementById('modeDescription').textContent = descriptions[mode] || '';
});

document.getElementById('viewScoresButton').addEventListener('click', () => {
    const recordsContent = document.getElementById('recordsContent');
    recordsContent.innerHTML = displayHighScores() || '<p>No hay récords aún. ¡Juega tu primera partida!</p>';
    document.getElementById('recordsModal').classList.remove('hidden');
});

document.getElementById('closeRecordsButton').addEventListener('click', () => {
    document.getElementById('recordsModal').classList.add('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    showStartScreen();
    
    // Actualizar descripción de modo por defecto
    const mode = document.getElementById('gameMode').value;
    const descriptions = {
        classic: 'Tetris clásico tradicional',
        challenge: 'Más difícil y rápido - 20% velocidad, 50% progresión'
    };
    document.getElementById('modeDescription').textContent = descriptions[mode] || '';
});
