# 🎮 REFERENCIA RÁPIDA - TETRIS v2.0

## 📁 ARCHIVOS NUEVOS

| Archivo | Descripción |
|---------|-------------|
| `tetris_v2.js` | Lógica del juego con todas las 10 mejoras |
| `index_v2.html` | HTML mejorado con nuevas opciones y modales |
| `style_v2.css` | Estilos mejorados y responsivos |
| `README_v2.md` | Guía completa (este archivo contiene más detalles) |

> **NOTA:** Los archivos originales (`tetris.js`, `index.html`, `style.css`) se mantienen intactos como backup.

---

## ⌨️ CONTROLES COMPLETOS

```
MOVIMIENTO:
  ← →     Mover pieza izquierda/derecha
  ↓       Bajar pieza
  ESPACIO Hard drop (baja al fondo)
  Z / ↑   Rotar pieza

JUEGO:
  P       Pausa / Reanuda
  R       Reinicia partida actual
  ESC/H   Vuelve al menú

SONIDO:
  M       Mute / Sonido (también botón 🔊)
```

---

## 🎮 LOS 3 MODOS

### 1️⃣ CLÁSICO
```
Velocidad:   1.0x (normal)
Nivel+:      1.0x (normal)
Game Over:   SÍ
Récords:     SÍ
```

### 2️⃣ SANDBOX
```
Velocidad:   1.0x (normal)
Nivel+:      1.0x (normal)
Game Over:   NO (nunca termina)
Récords:     NO (es práctica)
```

### 3️⃣ DESAFÍO
```
Velocidad:   1.2x (20% más rápido)
Nivel+:      1.5x (50% más rápido)
Game Over:   SÍ
Récords:     SÍ
```

---

## 📊 FUNCIONALIDADES NUEVAS

| # | Función | Acceso | Descripción |
|---|---------|--------|-------------|
| 1 | Reinicio Rápido | Tecla **R** | Reinicia sin volver al menú |
| 2 | Canvas Responsivo | Automático | Se ajusta a cualquier pantalla |
| 3 | Toggle Sonido | Tecla **M** o botón 🔊 | Mute/Sonido (guardado) |
| 4 | Volver al Menú | **ESC** / **H** | Pausa y regresa |
| 5 | Pausa | Tecla **P** | Pausa/Reanuda |
| 6 | Récords | localStorage | Guardados automáticamente |
| 7 | Modos | Menú inicial | 3 modos diferentes |
| 8 | Partículas | Auto | Al completar líneas |
| 9 | Música | Auto | Al subir nivel |
| 10 | HUD Mejorado | Auto | Muestra modo + más info |

---

## 💾 DATOS GUARDADOS

### En `localStorage`:
```javascript
// Sonido (true/false)
localStorage.getItem('soundEnabled')

// Récords (máximo 5)
localStorage.getItem('tetrisHighScores')
// Array con: score, lines, level, mode, date
```

### Borrar Datos:
```javascript
// En consola del navegador:
localStorage.clear()
```

---

## 🎯 FLUJO DE JUEGO

```
┌─ INICIO ─────────────────────┐
│  Selecciona:                 │
│  • Tamaño (10x20, 15x20, ...) │
│  • Modo (Clásico/Sandbox/...) │
│  • Nivel (1-6)               │
│  Botón: INICIAR JUEGO        │
└─────────────┬────────────────┘
              ↓
        ┌─ EN JUEGO ────────┐
        │ R: Reinicia       │
        │ P: Pausa          │
        │ ESC: Menú         │
        │ M: Sonido         │
        └─────────┬─────────┘
                  ↓
    ┌─ GAME OVER (Clásico/Desafío) ────┐
    │ • Muestra puntuación final        │
    │ • Guarda récord automáticamente   │
    │ • Botones: Reiniciar / Menú      │
    └──────────────┬────────────────────┘
                   ↓
        ┌─ MENÚ PRINCIPAL ────┐
        │ • Botón Ver Récords  │
        │ • Botón Reiniciar    │
        │ • Selecciona configs │
        └─────────────────────┘
```

---

## 🎵 MÚSICA Y SONIDOS

### Sonidos Incluidos:
- 🔄 **Rotar:** Beep agudo corto
- 📌 **Fijar:** Dos beeps progresivos
- ✨ **Línea completa:** Progresión Do-Mi-Sol
- ⬆️ **Subir nivel:** Fanfarria Mi-Sol-Si-Re
- 💀 **Game Over:** Nota grave descendente
- 🎵 **Música:** Melodía adaptativa al nivel

### Control:
- **M** o 🔊 para mutar.
- Se guarda la preferencia.

---

## 📱 RESPONSIVE

```
DESKTOP:      Canvas grande + Panel lateral con next piece + Controles
              (90% del espacio)

TABLET:       Canvas mediano + Panel lateral debajo
              (75% del espacio)

MOBILE:       Canvas redimensionado + Controles comprimidos
              (50-60% del espacio, scrollable si es necesario)
```

---

## 🔢 VELOCIDADES (ms entre caídas)

| Nivel | Clásico | Sandbox | Desafío |
|-------|---------|---------|---------|
| 1 | 800ms | 800ms | 667ms |
| 2 | 500ms | 500ms | 417ms |
| 3 | 300ms | 300ms | 250ms |
| 4 | 100ms | 100ms | 83ms |
| 5 | 70ms | 70ms | 58ms |
| 6 | 50ms | 50ms | 42ms |

(Desafío es 20% más rápido: velocidad / 1.2)

---

## 📈 PROGRESIÓN DE NIVELES

**Clásico/Sandbox:** 5 líneas = +1 nivel
**Desafío:** 3.3 líneas ≈ +1 nivel (50% más rápido)

### Ejemplo Clásico:
```
0 líneas → Nivel 1
5 líneas → Nivel 2
10 líneas → Nivel 3
15 líneas → Nivel 4
...
```

### Ejemplo Desafío:
```
0 líneas → Nivel 1
3 líneas → Nivel 2 (más rápido)
7 líneas → Nivel 3
11 líneas → Nivel 4
...
```

---

## 🏆 RÉCORDS

### Qué se Guarda:
- Puntuación (score)
- Líneas completadas
- Nivel final alcanzado
- Modo de juego
- Fecha y hora

### Dónde Verlos:
1. **Pantalla Game Over:** Tabla en modal
2. **Menú Principal:** Botón "📊 Ver Récords"

### Máximo:
- **5 registros** por navegador (localStorage)

---

## 🎨 EFECTOS VISUALES

### Líneas Completadas:
1. Animación de destello (250ms)
2. Partículas en abanico (10 chispas)
3. Sonido "victoria"
4. Tablero se ilumina
5. Línea se elimina con gravedad

### Subida de Nivel:
1. Borde del canvas pulsa
2. Color neón cambia
3. Glow intensidad aumenta
4. Sonido "fanfarria"
5. Música adaptativa

### Pausa:
1. Overlay semi-transparente
2. Texto "PAUSA" magenta
3. Se congela la física

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "No suena"
→ Presiona M o 🔊 para activar sonido

### "Canvas muy grande/pequeño"
→ Se ajusta automáticamente, cambia tamaño de ventana

### "Olvidé la puntuación anterior"
→ Borra localStorage:
```javascript
localStorage.clear()
// Recarga página
```

### "¿Cómo cambio de modo?"
→ ESC para volver al menú, selecciona otro modo

### "Desafío es muy rápido"
→ Es normal, aumenta nivel y velocidad 50% más

---

## 📝 EJEMPLOS DE FLUJO

### Flujo 1: Usuario Nueva Partida
```
1. Abre index_v2.html
2. Ve menú de inicio
3. Selecciona: 10x20, Clásico, Nivel 3
4. Presiona INICIAR JUEGO
5. Aparece canvas responsivo
6. Comienza a jugar
```

### Flujo 2: Usuario Pausa y Reinicia
```
1. Está jugando (30 puntos, 5 líneas)
2. Presiona P → PAUSA activada
3. Presiona P → Juego continúa
4. Presiona R → Tablero limpio (pero mismo nivel, tamaño, modo)
5. Comienza nueva partida desde 0 puntos
```

### Flujo 3: Usuario Cambia de Modo
```
1. Está en Clásico (1500 pts)
2. Presiona ESC → Vuelve al menú
3. Selecciona Desafío
4. Presiona INICIAR JUEGO
5. Nueva partida en Modo Desafío (20% más rápido)
```

### Flujo 4: Usuario Ve Récords
```
1. En menú principal
2. Presiona "📊 Ver Récords"
3. Se abre modal con top 5
4. Presiona Cerrar
5. Vuelve al menú
```

---

## 🎯 CHECKLIST DE PRUEBA

- [ ] Presiona R → Reinicia partida actual
- [ ] Presiona P → Pausa/Reanuda
- [ ] Presiona ESC → Vuelve al menú
- [ ] Presiona M → Mute/Sonido
- [ ] Canvas se ajusta al redimensionar
- [ ] Selecciona Sandbox → Sin Game Over
- [ ] Selecciona Desafío → Más rápido
- [ ] Completa línea → Efecto partículas
- [ ] Sube nivel → Suena música
- [ ] Game Over → Récord se guarda
- [ ] Recarga página → Sonido en estado anterior
- [ ] Ve botón "📊 Ver Récords"

---

## 📞 RESUMEN DE CAMBIOS

### Nuevas Variables Globales:
```javascript
soundEnabled          // Toggle de sonido
currentGameMode       // Modo actual
particles[]           // Array de partículas
gamePaused           // Estado de pausa
cellSize             // Tamaño responsivo
```

### Nuevas Funciones:
```javascript
toggleSound()               // M key
resetCurrentGame()          // R key
togglePause()               // P key
backToMenu()                // ESC key
createParticles()           // Al completar línea
updateParticles()           // En loop
setupResponsiveCanvas()     // Al inicio y resize
saveHighScore()             // En Game Over
getHighScores()             // Para mostrar
displayHighScores()         // HTML table
playAdaptiveMusic()         // Al subir nivel
```

### Eventos Nuevos:
```javascript
window.addEventListener('resize', setupResponsiveCanvas)
document.getElementById('soundToggleBtn').addEventListener(...)
document.getElementById('viewScoresButton').addEventListener(...)
document.getElementById('gameMode').addEventListener('change', ...)
```

---

**Versión:** 2.0
**Fecha:** Diciembre 6, 2025
**Estado:** ✅ LISTO PARA JUGAR
