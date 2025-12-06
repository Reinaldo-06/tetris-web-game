/* ============================================
   TETRIS IA - LÓGICA DEL JUEGO
   ============================================ */

// ============ CONFIGURACIÓN INICIAL ============

// Configuración del tablero
let COLS = 10;
let ROWS = 20;

// Configuración de velocidad (ms entre caídas automáticas)
const LEVEL_SPEEDS = {
    1: 800,  // Suave
    2: 500,  // Medio
    3: 300,  // Rápido
    4: 100   // Locura
};

// Colores de piezas (formato RGB para canvas)
const PIECE_COLORS = {
    I: '#00ffff',  // Cian
    O: '#ffff00',  // Amarillo
    T: '#ff00ff',  // Morado
    L: '#ff8800',  // Naranja
    J: '#0088ff',  // Azul
    S: '#00ff00',  // Verde
    Z: '#ff0000'   // Rojo
};

// Definición de tetrominos (piezas)
// Cada pieza tiene 4 rotaciones explícitas como arrays de coordenadas {x, y} relativas
const TETROMINOS = {
  // Pieza I: barra de 4 bloques
  I: {
    color: 'I',
    rotations: [
      // Rotación 0: horizontal
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } ],
      // Rotación 1: vertical
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 } ],
      // Rotación 2: horizontal (igual a 0)
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } ],
      // Rotación 3: vertical (igual a 1)
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 } ]
    ]
  },

  // Pieza O: cuadrado 2x2 (no rota visualmente)
  O: {
    color: 'O',
    rotations: [
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ]
    ]
  },

  // Pieza T: forma de T
  T: {
    color: 'T',
    rotations: [
      // Rotación 0: T estándar
      [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
      // Rotación 1: T girada 90°
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
      // Rotación 2: T al revés
      [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 } ],
      // Rotación 3: T girada 270°
      [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ]
    ]
  },

  // Pieza S: forma de S (zigzag)
  S: {
    color: 'S',
    rotations: [
      // Rotación 0: S horizontal
      [ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
      // Rotación 1: S vertical
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
      // Rotación 2: S horizontal (igual a 0)
      [ { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ],
      // Rotación 3: S vertical (igual a 1)
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 } ]
    ]
  },

  // Pieza Z: forma de Z (zigzag inverso)
  Z: {
    color: 'Z',
    rotations: [
      // Rotación 0: Z horizontal
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
      // Rotación 1: Z vertical
      [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ],
      // Rotación 2: Z horizontal (igual a 0)
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
      // Rotación 3: Z vertical (igual a 1)
      [ { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 } ]
    ]
  },

  // Pieza J: L invertida (espejo de L)
  J: {
    color: 'J',
    rotations: [
      // Rotación 0: L invertida estándar
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 } ],
      // Rotación 1: J girada 90°
      [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 } ],
      // Rotación 2: J girada 180°
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
      // Rotación 3: J girada 270°
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ]
    ]
  },

  // Pieza L: L estándar
  L: {
    color: 'L',
    rotations: [
      // Rotación 0: L estándar
      [ { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
      // Rotación 1: L girada 90°
      [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 } ],
      // Rotación 2: L girada 180°
      [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 } ],
      // Rotación 3: L girada 270°
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

let score = 0;
let lines = 0;
let level = 1;
let dropSpeed = LEVEL_SPEEDS[1];

let lastDropTime = 0;
let gameLoopId = null;

// Canvas y contextos
let gameCanvas = null;
let gameCtx = null;
let nextCanvas = null;
let nextCtx = null;

// Animación de explosión de líneas
let clearingLines = [];
let clearingAnimationTime = 0;
const CLEAR_ANIMATION_DURATION = 250; // ms

// ============ ESTRUCTURA DE PIEZAS ============

class Piece {
    constructor(type) {
        this.type = type;
        this.shape = TETROMINOS[type];
        this.rotationIndex = 0;
        // this.blocks siempre apunta a la rotación actual (array de {x, y} relativos)
        this.blocks = this.shape.rotations[this.rotationIndex];
        // Posición en el tablero
        this.x = Math.floor(COLS / 2) - 1;
        this.y = 0;
    }

    // Obtener bloques con coordenadas absolutas (tablero)
    // Suma (piece.x, piece.y) a cada bloque relativo
    getAbsoluteBlocks() {
        return this.blocks.map(block => ({
            x: this.x + block.x,
            y: this.y + block.y
        }));
    }

    // Rotar a la siguiente rotación
    rotate() {
        const nextIndex = (this.rotationIndex + 1) % this.shape.rotations.length;
        this.rotationIndex = nextIndex;
        this.blocks = this.shape.rotations[nextIndex];
    }

    // Deshacer la última rotación (rollback)
    undoRotate() {
        const prevIndex = (this.rotationIndex - 1 + this.shape.rotations.length) % this.shape.rotations.length;
        this.rotationIndex = prevIndex;
        this.blocks = this.shape.rotations[prevIndex];
    }
}

// ============ INICIALIZACIÓN DEL JUEGO ============

function initGame() {
    // Crear tablero vacío
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
    dropSpeed = LEVEL_SPEEDS[level];
    gameRunning = true;
    gamePaused = false;
    clearingLines = [];
    clearingAnimationTime = 0;

    // Generar piezas iniciales
    const pieceTypes = Object.keys(TETROMINOS);
    nextPiece = new Piece(pieceTypes[Math.floor(Math.random() * pieceTypes.length)]);
    spawnNewPiece();

    updateHUD();
    lastDropTime = Date.now();
    gameLoopId = requestAnimationFrame(gameLoop);
}

// Generar nueva pieza (la next piece se convierte en actual)
function spawnNewPiece() {
    currentPiece = nextPiece;
    const pieceTypes = Object.keys(TETROMINOS);
    nextPiece = new Piece(pieceTypes[Math.floor(Math.random() * pieceTypes.length)]);

    // Verificar si hay colisión inmediata (Game Over)
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

        // Verificar límites
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return true;
        }

        // Verificar colisión con piezas fijas
        if (newY >= 0 && board[newY][newX] !== null) {
            return true;
        }
    }
    return false;
}

// ============ MOVIMIENTO DE PIEZAS ============

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

    // Guardar estado actual por si hay que revertir
    const oldRotationIndex = currentPiece.rotationIndex;
    const oldBlocks = currentPiece.blocks;

    // Aplicar rotación
    currentPiece.rotate();

    // Validar colisión con la nueva rotación
    if (hasCollision(currentPiece, 0, 0)) {
        // Si hay colisión, revertir (rollback)
        currentPiece.rotationIndex = oldRotationIndex;
        currentPiece.blocks = oldBlocks;
    }
}

// Hard Drop: bajar pieza hasta el fondo
function hardDrop() {
    if (!currentPiece) return;

    // Bajar hasta que colisione
    while (movePiece(0, 1)) {}

    // Fijar pieza
    fixPiece();

    // Comprobar líneas completas
    checkAndClearLines();

    // Generar nueva pieza
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
            board[block.y][block.x] = currentPiece.shape.color;
        }
    }
}

// ============ DETECCIÓN Y ANIMACIÓN DE LÍNEAS COMPLETAS ============

function checkAndClearLines() {
    clearingLines = [];

    // Detectar líneas completas
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

    // Si hay líneas, iniciar animación
    if (clearingLines.length > 0) {
        clearingAnimationTime = 0;
    }
}

function updateLineClearing() {
    if (clearingLines.length === 0) return;

    clearingAnimationTime += 16; // Asumir ~60fps

    if (clearingAnimationTime >= CLEAR_ANIMATION_DURATION) {
        // Animar terminó, eliminar líneas
        for (let y of clearingLines.sort((a, b) => a - b)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(null));
        }

        // Actualizar puntuación
        const clearedCount = clearingLines.length;
        score += clearedCount * 100;
        lines += clearedCount;

        // Actualizar nivel (opcional: aumentar cada 10 líneas)
        const newLevel = Math.floor(lines / 10) + 1;
        if (newLevel !== level && newLevel <= 4) {
            level = newLevel;
            dropSpeed = LEVEL_SPEEDS[level];
        }

        clearingLines = [];
        clearingAnimationTime = 0;
    }
}

// ============ DIBUJO EN CANVAS ============

function drawBoard() {
    gameCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    const cellSize = gameCanvas.width / COLS;

    // Dibujar celdas fijas
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const color = board[y][x];
            if (color !== null) {
                const isClearing = clearingLines.includes(y);
                drawCell(x, y, color, isClearing);
            }
        }
    }

    // Dibujar pieza actual
    if (currentPiece) {
        const blocks = currentPiece.getAbsoluteBlocks();
        for (let block of blocks) {
            if (block.y >= 0) {
                drawCell(block.x, block.y, currentPiece.shape.color, false);
            }
        }
    }

    // Dibujar grid (opcional)
    drawGrid();
}

function drawCell(x, y, colorType, isClearing) {
    const cellSize = gameCanvas.width / COLS;
    const baseColor = PIECE_COLORS[colorType];

    let color = baseColor;
    if (isClearing && clearingAnimationTime < CLEAR_ANIMATION_DURATION) {
        // Efecto de parpadeo durante la animación
        const phase = Math.floor((clearingAnimationTime / CLEAR_ANIMATION_DURATION) * 4);
        if (phase % 2 === 0) {
            color = '#ffffff'; // Flash blanco
        }
    }

    // Dibujar celda
    gameCtx.fillStyle = color;
    gameCtx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);

    // Glow neon
    gameCtx.shadowColor = color;
    gameCtx.shadowBlur = 5;
    gameCtx.strokeStyle = color;
    gameCtx.lineWidth = 1;
    gameCtx.strokeRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
    gameCtx.shadowBlur = 0;
}

function drawGrid() {
    const cellSize = gameCanvas.width / COLS;
    gameCtx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
    gameCtx.lineWidth = 0.5;

    // Líneas verticales
    for (let x = 0; x <= COLS; x++) {
        gameCtx.beginPath();
        gameCtx.moveTo(x * cellSize, 0);
        gameCtx.lineTo(x * cellSize, gameCanvas.height);
        gameCtx.stroke();
    }

    // Líneas horizontales
    for (let y = 0; y <= ROWS; y++) {
        gameCtx.beginPath();
        gameCtx.moveTo(0, y * cellSize);
        gameCtx.lineTo(gameCanvas.width, y * cellSize);
        gameCtx.stroke();
    }
}

// Dibujar pieza siguiente
function drawNextPiece() {
    nextCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    if (nextPiece) {
        // Usar los bloques relativos (NO getAbsoluteBlocks)
        const blocks = nextPiece.blocks;  // Array de {x, y} relativos

        // Calcular bounding box de la pieza
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        for (let block of blocks) {
            minX = Math.min(minX, block.x);
            maxX = Math.max(maxX, block.x);
            minY = Math.min(minY, block.y);
            maxY = Math.max(maxY, block.y);
        }

        // Dimensiones de la pieza
        const pieceWidth = maxX - minX + 1;
        const pieceHeight = maxY - minY + 1;

        // Calcular tamaño de celda para que la pieza quepa sin recortes
        const cellSizeX = (nextCanvas.width - 10) / pieceWidth;
        const cellSizeY = (nextCanvas.height - 10) / pieceHeight;
        const cellSize = Math.floor(Math.min(cellSizeX, cellSizeY));

        // Calcular offset para centrar la pieza en el canvas
        const totalWidth = pieceWidth * cellSize;
        const totalHeight = pieceHeight * cellSize;
        const offsetX = (nextCanvas.width - totalWidth) / 2;
        const offsetY = (nextCanvas.height - totalHeight) / 2;

        // Dibujar bloques
        const color = PIECE_COLORS[nextPiece.shape.color];
        for (let block of blocks) {
            // Ajustar coordenadas al bounding box
            const px = offsetX + (block.x - minX) * cellSize;
            const py = offsetY + (block.y - minY) * cellSize;

            nextCtx.fillStyle = color;
            nextCtx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);

            // Glow neon
            nextCtx.shadowColor = color;
            nextCtx.shadowBlur = 4;
            nextCtx.strokeStyle = color;
            nextCtx.lineWidth = 1;
            nextCtx.strokeRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
            nextCtx.shadowBlur = 0;
        }
    }
}

// ============ HUD ============

function updateHUD() {
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;
}

// ============ BUCLE PRINCIPAL DEL JUEGO ============

function gameLoop() {
    if (!gameRunning) {
        return;
    }

    // Actualizar animación de líneas
    updateLineClearing();

    // Auto-drop: bajar pieza automáticamente según velocidad
    const now = Date.now();
    if (now - lastDropTime > dropSpeed) {
        if (!movePiece(0, 1)) {
            // No puede bajar, fijar pieza
            fixPiece();
            checkAndClearLines();
            if (gameRunning) {
                spawnNewPiece();
            }
        }
        lastDropTime = now;
    }

    // Dibujar
    drawBoard();
    drawNextPiece();
    updateHUD();

    // Siguiente frame
    gameLoopId = requestAnimationFrame(gameLoop);
}

// ============ CONTROLES DEL JUGADOR ============

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            movePiece(-1, 0);
            break;
        case 'ArrowRight':
            e.preventDefault();
            movePiece(1, 0);
            break;
        case 'ArrowDown':
            e.preventDefault();
            movePiece(0, 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            rotatePiece();
            break;
        case ' ':
            e.preventDefault();
            hardDrop();
            break;
    }
});

// ============ GAME OVER ============

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(gameLoopId);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLines').textContent = lines;
    document.getElementById('gameOverModal').classList.remove('hidden');
}

// ============ GESTIÓN DEL MENÚ DE INICIO ============

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
    // Leer configuración del menú
    const boardSizeSelect = document.getElementById('boardSize').value;
    const [cols, rows] = boardSizeSelect.split('x').map(Number);
    COLS = cols;
    ROWS = rows;

    hideStartScreen();

    // Esperar a que el canvas esté visible para obtener sus dimensiones
    setTimeout(() => {
        gameCanvas = document.getElementById('gameCanvas');
        gameCtx = gameCanvas.getContext('2d');
        nextCanvas = document.getElementById('nextPieceCanvas');
        nextCtx = nextCanvas.getContext('2d');

        // Ajustar tamaño del canvas principal según tablero
        const cellSize = 30;
        gameCanvas.width = COLS * cellSize;
        gameCanvas.height = ROWS * cellSize;

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

    initGame();
});

document.getElementById('menuButton').addEventListener('click', () => {
    showStartScreen();
});

// Mostrar pantalla de inicio al cargar
window.addEventListener('DOMContentLoaded', () => {
    showStartScreen();
});
