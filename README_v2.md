# 🎮 TETRIS AVANZADO v2.0 - Guía Completa

## 📋 Resumen de Mejoras

Se han implementado **10 funcionalidades principales** de forma coherente, profesional y sin romper la lógica existente:

---

## 🎯 1. Reinicio Rápido con Tecla R

**Función:** `resetCurrentGame()`

### Cómo Funciona:
- Presiona **R** en cualquier momento durante la partida.
- Reinicia el tablero, puntuación y líneas.
- **Mantiene:** Tamaño de tablero, modo de juego y nivel inicial.
- **No regresa** al menú, solo resetea la partida actual.

### Ejemplo:
```javascript
// Tecla R activada en event listener
case 'r':
    e.preventDefault();
    resetCurrentGame();
    break;
```

### Función de Reinicio:
```javascript
function resetCurrentGame() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gamePaused = false;
    initGame(); // Reinicia todo
}
```

---

## 📏 2. Canvas Responsivo

**Función:** `setupResponsiveCanvas()`

### Cómo Funciona:
- El canvas se ajusta dinámicamente según el tamaño de la ventana.
- Calcula `cellSize` en función del espacio disponible:
  ```
  cellSize = Math.floor(min(availableWidth / COLS, availableHeight / ROWS))
  ```
- Se aplica:
  - Al iniciar el juego.
  - Al cambiar el tamaño de la ventana (`window.resize`).

### Implementación:
```javascript
function setupResponsiveCanvas() {
    const container = document.getElementById('gameContainer');
    const availableWidth = container.clientWidth * 0.6;
    const availableHeight = container.clientHeight * 0.9;

    cellSize = Math.floor(Math.min(availableWidth / COLS, availableHeight / ROWS));
    
    gameCanvas.width = COLS * cellSize;
    gameCanvas.height = ROWS * cellSize;
}
```

### Resultado:
- ✅ Tablero siempre visible sin desbordarse.
- ✅ Proporciones correctas en cualquier resolución.
- ✅ Responsive en dispositivos móviles.

---

## 🔊 3. Toggle de Sonido / Mute

**Variable:** `soundEnabled` (guardada en `localStorage`)

### Cómo Funciona:
- Presiona **M** para alternar sonido ON/OFF.
- O haz clic en el botón **🔊 / 🔇** en pantalla.
- El estado se **guarda automáticamente** en `localStorage`.

### Implementación:
```javascript
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    updateSoundButton();
}
```

### Efecto:
- Desactiva/activa **todos** los sonidos:
  - Rotación, fijación, líneas completadas, nivel up, game over.
  - Música adaptativa.
- El botón muestra: 🔊 (activado) o 🔇 (mute).

---

## 🚪 4. Tecla para Volver al Menú

**Función:** `backToMenu()`

### Cómo Funciona:
- Presiona **ESC** o **H** desde la partida.
- Pausa el juego y muestra el menú principal.
- Cancela animaciones y timers.

### Implementación:
```javascript
function backToMenu() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gameRunning = false;
    gamePaused = false;
    showStartScreen();
}
```

### Uso:
- ESC: Standard (común en videojuegos).
- H: Alternativa (Help/Home).

---

## ⏸️ 5. Pausa con Tecla P

**Variable:** `gamePaused`

### Cómo Funciona:
- Presiona **P** para pausar/reanudar.
- En pausa:
  - El juego **no avanza** en lógica.
  - Se muestra un overlay "PAUSA" en pantalla.
  - Solo se renderiza (dibuja) el estado actual.

### Implementación:
```javascript
function togglePause() {
    if (!gameRunning) return;
    gamePaused = !gamePaused;
    if (!gamePaused) {
        lastDropTime = Date.now(); // Resetea timer de caída
    }
}
```

### En el Loop:
```javascript
if (!gamePaused) {
    // Lógica de juego (caída, colisiones, etc.)
} else {
    // Solo dibuja "PAUSA"
    gameCtx.fillText('PAUSA', ...);
}
```

### Visual:
- Se dibuja un rectángulo semi-transparente.
- Texto magenta "PAUSA" al centro.

---

## 🏆 6. Tabla de Récords (localStorage)

**Funciones:** `saveHighScore()`, `getHighScores()`, `displayHighScores()`

### Cómo Funciona:
- Al terminar una partida (Game Over), se guarda automáticamente:
  ```
  { score, lines, level, mode, date }
  ```
- Se ordenan por puntuación (descendente).
- Se guardan **máximo 5 registros**.

### Implementación:
```javascript
function saveHighScore(score, lines, level, mode) {
    let scores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || '[]');
    
    scores.push({ score, lines, level, mode: MODE_CONFIG[mode].name, date: new Date().toLocaleString() });
    
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, MAX_HIGH_SCORES); // Max 5
    
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
}
```

### Visualización:
- **En pantalla Game Over:** Se muestra tabla con récords actuales.
- **Botón "Ver Récords":** En menú principal accedes a todos los récords.
- Tabla muestra: #, Puntuación, Líneas, Nivel, Modo.

### Datos Almacenados:
```json
[
  {
    "score": 5400,
    "lines": 54,
    "level": 6,
    "mode": "Clásico",
    "date": "12/6/2025 14:30:45"
  }
]
```

---

## 🎮 7. Modos Alternativos de Juego

**Variable:** `currentGameMode`

### Tres Modos Disponibles:

#### 🎯 **Modo Clásico** (`classic`)
- Tetris tradicional.
- Velocidad normal (1.0x).
- Subida de nivel normal (1.0x).
- **Game Over** cuando pieza llegue al tope.
- Puntuación y récords normales.

#### 🎨 **Modo Sandbox** (`sandbox`)
- **Sin Game Over:** El juego nunca termina.
- Velocidad normal (1.0x).
- Subida de nivel normal (1.0x).
- Perfecto para **practicar** sin presión.
- No guarda récords.

#### ⚡ **Modo Desafío** (`challenge`)
- **Más difícil** que clásico:
  - Velocidad **20% más rápida** (1.2x).
  - Subida de nivel **50% más rápida** (1.5x).
  - Empezar en un nivel más alto recomendado.
- **Game Over** activado.
- Puntuación y récords (separados por modo).

### Configuración por Modo:
```javascript
const MODE_CONFIG = {
    classic: {
        name: 'Clásico',
        speedMultiplier: 1.0,
        levelUpMultiplier: 1.0,
        allowGameOver: true
    },
    sandbox: {
        name: 'Sandbox',
        speedMultiplier: 1.0,
        levelUpMultiplier: 1.0,
        allowGameOver: false  // ← Sin Game Over
    },
    challenge: {
        name: 'Desafío',
        speedMultiplier: 1.2,    // ← 20% más rápido
        levelUpMultiplier: 1.5,  // ← 50% más rápido
        allowGameOver: true
    }
};
```

### Cómo Seleccionar:
1. En la **pantalla de inicio**, abre el desplegable "Modo de juego".
2. Elige: **Clásico**, **Sandbox** o **Desafío**.
3. Se muestra **descripción** del modo elegido.
4. El HUD en juego muestra el modo actual.

### Impacto en Velocidad:
```javascript
// Velocidad ajustada por modo
dropSpeed = LEVEL_SPEEDS[level] / modeConfig.speedMultiplier;

// Ejemplo Desafío Nivel 4:
// LEVEL_SPEEDS[4] = 100ms
// 100 / 1.2 = 83.3ms (más rápido)
```

---

## ✨ 8. Efectos de Partículas

**Clase:** `Particle`

### Cómo Funciona:
- Al completar líneas, salen pequeñas "chispas" desde las celdas.
- Se desvanecen gradualmente (fade out).
- Tienen velocidad, gravedad y vida útil.

### Implementación:
```javascript
class Particle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;      // Velocidad X
        this.vy = vy;      // Velocidad Y
        this.color = color;
        this.life = 1.0;   // 0 a 1
        this.maxLife = 1.0;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += 0.02 * deltaTime; // Gravedad
        this.life -= deltaTime / 1000;
    }

    draw(ctx, cellSize) {
        const alpha = this.life / this.maxLife;
        // Dibuja con opacidad que disminuye
    }
}
```

### Generación:
```javascript
function createParticles(y, colorType) {
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 0.5 + Math.random() * 1.0;
        particles.push(new Particle(...));
    }
}
```

### Cuándo se Disparan:
- ✅ Al completar líneas.
- ✅ Se distribuyen en 10 direcciones.
- ✅ Color coincide con la pieza tipo 'T' (morado neón).
- ✅ Viven ~1 segundo y se desvanecen.

### Visual:
- Chispas neón que salen en abanico.
- Caen con gravedad.
- Se desvanecen suavemente.

---

## 🎵 9. Música Adaptativa

**Función:** `playAdaptiveMusic()`

### Cómo Funciona:
- Se toca una **pequeña melodía** que varía según:
  - **Nivel actual** (más aguda en niveles altos).
  - **Modo de juego** (1.3x más rápida en Desafío).

### Implementación:
```javascript
function playAdaptiveMusic() {
    const speedMultiplier = currentGameMode === GAME_MODES.CHALLENGE ? 1.3 : 1.0;
    const baseFreq = level <= 3 ? 220 : level <= 5 ? 262 : 330;
    
    // Toca una progresión de notas simples
    // Duración varía según modo y nivel
}
```

### Características:
- ✅ Se toca al **subir de nivel**.
- ✅ Respeta toggle de sonido (M).
- ✅ No consume recursos (síntesis en tiempo real).
- ✅ Coherente con estética neón.

### Notas Generadas:
- **Niveles 1-3:** Frecuencia base 220 Hz (La3).
- **Niveles 4-5:** Frecuencia base 262 Hz (Do4).
- **Niveles 6+:** Frecuencia base 330 Hz (Mi4).

---

## 🎮 10. Coherencia y Limpieza Final

### Estructura de Código:
```
tetris_v2.js (1050+ líneas)
├── CONFIGURACIÓN INICIAL
├── SISTEMA DE AUDIO RETRO (mejorado)
├── MODOS DE JUEGO (NUEVO)
├── SISTEMA DE PARTÍCULAS (NUEVO)
├── CLASE PIEZA (intacta)
├── INICIALIZACIÓN (mejorada)
├── REINICIO RÁPIDO (NUEVO)
├── PAUSA (NUEVO)
├── VOLVER AL MENÚ (NUEVO)
├── DETECCIÓN DE COLISIONES (intacta)
├── MOVIMIENTO (intacto)
├── FIJACIÓN (intacta)
├── LÍNEAS (mejorada con partículas)
├── DIBUJO EN CANVAS (mejorado)
├── CANVAS RESPONSIVO (NUEVO)
├── HUD (mejorado con modo)
├── HIGH SCORES (NUEVO)
├── BUCLE PRINCIPAL (mejorado)
├── CONTROLES (expandidos)
└── GAME OVER (mejorado con guardar récords)
```

### Teclado Completo:

| Tecla | Función |
|-------|---------|
| **←** / **→** | Mover pieza |
| **↓** | Bajar pieza |
| **ESPACIO** | Hard Drop |
| **Z** / **↑** | Rotar |
| **P** | Pausa/Reanuda |
| **R** | Reinicia partida actual |
| **ESC** / **H** | Vuelve al menú |
| **M** | Toggle Sonido/Mute |

### Validaciones:
- ✅ Niveles coherentes entre menú, código, HUD y modos.
- ✅ Minivel protegido (nunca regresa a 1).
- ✅ Fórmula de progresión correcta.
- ✅ Modos aplicados correctamente.
- ✅ Next piece siempre visible.
- ✅ Animaciones de líneas funcionan.
- ✅ Partículas se dibujan y se actualizan.
- ✅ Sonido respeta toggle.
- ✅ Récords se guardan en localStorage.

---

## 📚 Cómo Usar el Juego

### 1. **Abrir Juego**
```html
<!-- En index_v2.html -->
<script src="tetris_v2.js"></script>
```

### 2. **Configurar Partida**
- **Tamaño tablero:** 10x20 (Clásico), 15x20 (Ancho), 8x16 (Mini).
- **Modo:** Clásico, Sandbox, Desafío.
- **Nivel inicial:** 1-6.

### 3. **Durante la Partida**
- Mueve con flechas.
- Rota con Z o ↑.
- Hard drop con ESPACIO.
- Pausa con P.
- Reinicia con R.
- Vuelve al menú con ESC.

### 4. **Game Over (Modo Clásico)**
- Ver puntuación, líneas, nivel.
- Ver table de récords actual.
- Reiniciar o volver al menú.
- Récord se guarda automáticamente.

### 5. **Ver Récords**
- Botón "📊 Ver Récords" en menú principal.
- Muestra los 5 mejores registros.

---

## 🔧 Detalles Técnicos

### LocalStorage Keys:
```javascript
'soundEnabled'           // true/false
'tetrisHighScores'       // Array de objetos con score, lines, level, mode, date
```

### Constantes Clave:
```javascript
MAX_HIGH_SCORES = 5      // Máximo 5 récords
CLEAR_ANIMATION_DURATION = 250  // ms
LEVEL_UP_ANIMATION_DURATION = 500  // ms
LEVEL_SPEEDS = { 1: 800, 2: 500, ... 6: 50 }  // ms entre caídas
```

### Variables Globales Clave:
```javascript
gameRunning         // Partida en curso
gamePaused          // Pausa activada
currentGameMode     // Modo actual (classic/sandbox/challenge)
soundEnabled        // Audio activo/mute
cellSize            // Tamaño de celda responsivo
particles[]         // Array de partículas activas
```

---

## 📱 Responsive Design

- ✅ Desktop: Layout completo lado a lado.
- ✅ Tablet: Canvas arriba, controles abajo.
- ✅ Mobile: Optimizado para pantallas pequeñas.
- ✅ Canvas se redimensiona automáticamente.

---

## 🎯 Ejemplos de Uso

### Reinicio Rápido
```
Presionas R → Tablero se limpia → Puntuación en 0 → Mismo nivel inicial
```

### Cambio de Modo Mid-Game
```
ESC → Vuelves al menú → Cambias de Clásico a Desafío → Inicias nueva partida
```

### Récord Guardado
```
Game Over (1500 pts) → Se guarda en localStorage → Ves tu nombre en Top 5
```

---

## 🚀 Conclusión

El juego ahora incluye:
- ✅ 6 niveles con velocidades correctas.
- ✅ 3 modos de juego diferentes.
- ✅ Canvas responsivo en cualquier pantalla.
- ✅ Música adaptativa.
- ✅ Efectos de partículas.
- ✅ Sistema de récords con localStorage.
- ✅ Pausa, reinicio y menú accesibles.
- ✅ Toggle de sonido.
- ✅ Todo coherente, sin breaking changes.

**Versión:** 2.0
**Fecha:** Diciembre 6, 2025
**Estado:** ✅ COMPLETO Y FUNCIONAL
