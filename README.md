# 🎮 Tetris Retro Neon - Web Game

Un juego de Tetris clásico rediseñado con un espectacular estilo **retro neon** ejecutado en el navegador. Versión avanzada con características modernas, efectos visuales impresionantes y múltiples modos de juego.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Status](https://img.shields.io/badge/status-stable-green)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Controles del Juego](#controles-del-juego)
- [Modos de Juego](#modos-de-juego)
- [Sistema de Niveles](#sistema-de-niveles)
- [Características Especiales](#características-especiales)
- [Persistencia de Datos](#persistencia-de-datos)
- [Arquitectura del Código](#arquitectura-del-código)
- [Requisitos Técnicos](#requisitos-técnicos)

---

## ✨ Características

### Experiencia Visual
- **Estilo Neon Retro**: Interfaz completa con colores neón brillantes y efectos de brillo
- **Animaciones Fluidas**: Transiciones suaves y animaciones de 60fps
- **Efectos de Partículas**: Sistema de partículas cuando completas líneas
- **Tablero Responsivo**: Se adapta a cualquier tamaño de pantalla (móvil, tablet, desktop)

### Gameplay
- **Dos Modos de Juego**: Clásico y Desafío
- **6 Niveles de Dificultad**: Desde "Suave" hasta "Caos"
- **Sistema de Puntuación**: Puntos, líneas completadas, nivel alcanzado
- **Tabla de Récords**: Guarda automáticamente tus mejores puntuaciones

### Control del Juego
- **Pausa y Reinicio Rápido**: Controla el flujo de juego en cualquier momento
- **Sistema de Sonido**: Efectos de audio retro sintetizados (opcional)
- **Música Adaptativa**: La música cambia según el nivel y modo
- **Controles Configurables**: Múltiples opciones de teclado para movimiento

---

## 🚀 Instalación y Ejecución

### Requisitos
- Un navegador moderno (Chrome, Firefox, Edge, Safari - últimas versiones)
- JavaScript habilitado
- Web Audio API compatible (para los sonidos)

### Pasos

1. **Descargar/Clonar los archivos**:
   ```bash
   git clone https://github.com/tu-usuario/tetris-web-game.git
   cd tetris-web-game
   ```

2. **Abrir en el navegador**:
   - Simplemente abre el archivo `index.html` en tu navegador favorito
   - O sirve los archivos con un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server instalado)
   http-server
   ```

3. **¡A jugar!**:
   - La pantalla de inicio te permitirá configurar el juego
   - Elige tu modo, nivel y tamaño de tablero
   - ¡Presiona "Iniciar juego" para comenzar!

---

## 🎮 Controles del Juego

### Movimiento y Rotación

| Tecla | Acción |
|-------|--------|
| **← / →** | Mover pieza izquierda/derecha |
| **↓** | Bajar pieza rápidamente |
| **ESPACIO** | Hard Drop (caída completa instantánea) |
| **Z** o **↑** | Rotar pieza |

### Control del Juego

| Tecla | Acción |
|-------|--------|
| **P** | Pausar/Reanudar juego |
| **R** | Reiniciar partida actual |
| **ESC** o **H** | Volver al menú principal |
| **M** | Alternar sonido (ON/OFF) |

### Interfaz

- **Botón 🔊**: Toggle de sonido en la interfaz gráfica
- **Botón 📊**: Ver tabla de récords guardados
- **Selector de Modo**: Elige entre Clásico y Desafío
- **Selector de Nivel**: Comienza en el nivel que prefieras

---

## 🏆 Modos de Juego

### 🎯 Modo Clásico
- **Velocidad**: Normal (1.0x)
- **Progresión**: Estándar (1.0x por nivel)
- **Game Over**: Habilitado
- **Objetivo**: Conseguir la máxima puntuación antes de que se llene el tablero
- **Ideal para**: Jugadores que buscan la experiencia Tetris tradicional

**Características**:
- Velocidad moderada y previsible
- Progresión equilibrada de dificultad
- Las partidas terminan cuando pierdes
- Los récords se guardan automáticamente

### 🔥 Modo Desafío
- **Velocidad**: Acelerada (1.2x más rápida)
- **Progresión**: Rápida (1.5x más rápida por nivel)
- **Game Over**: Habilitado
- **Objetivo**: Superar el modo clásico con piezas cayendo más rápido
- **Ideal para**: Jugadores experimentados que buscan adrenalina

**Características**:
- Piezas caen un 20% más rápido desde el inicio
- Los niveles suben con el doble de velocidad
- La música adaptativa toca más rápido
- Las partidas son más intensas y desafiantes
- Los récords de Desafío se guardan por separado

---

## 📈 Sistema de Niveles

El juego incluye **6 niveles de dificultad** configurables antes de cada partida:

| Nivel | Velocidad | Tiempo/Caída | Descripción |
|-------|-----------|--------------|-------------|
| **Nivel 1** | Suave | 800ms | Perfecto para principiantes |
| **Nivel 2** | Medio | 500ms | Desafío moderado |
| **Nivel 3** | Rápido | 300ms | Para jugadores intermedios |
| **Nivel 4** | Locura | 100ms | Muy rápido |
| **Nivel 5** | Insano | 70ms | Extremadamente rápido |
| **Nivel 6** | Caos | 50ms | ¡Imposible de manejar! |

### Progresión Durante el Juego

Mientras juegas, el nivel **sube automáticamente** cuando completas cierta cantidad de líneas:

- **Dentro del Juego**: El nivel puede aumentar dinámicamente basado en rendimiento
- **Velocidad Adaptativa**: Cada nivel aumenta la velocidad de caída
- **Multiplicadores de Modo**: 
  - **Clásico**: Cambios de velocidad normales
  - **Desafío**: La velocidad sube mucho más rápido (1.5x)

---

## 🎨 Características Especiales

### Sistema de Partículas ✨

Cuando completas una o más líneas, se desencadena un espectacular efecto de partículas:

- **10 partículas por línea** generadas en la línea completada
- **Movimiento físico**: Las partículas tienen velocidad, gravedad y caída suave
- **Efecto visual**: Desaparecen gradualmente con animación de fade-out
- **Personalizado por pieza**: Cada tipo de pieza tiene su color de partícula
- **Rendimiento**: Optimizado para no afectar el framerate

### Música Adaptativa 🎵

La música sintetizada cambia según tu progreso:

- **Frecuencia Base Variable**:
  - Niveles 1-3: 220Hz (Do grave)
  - Niveles 4-5: 262Hz (Do# intermedio)
  - Niveles 6+: 330Hz (Mi agudo)

- **Velocidad Dinámica**:
  - Modo Clásico: Velocidad normal
  - Modo Desafío: 30% más rápido

- **Sonidos Incluidos**:
  - 🔄 Sonido de rotación (beep agudo)
  - 📌 Sonido de fijación (doble beep)
  - 🟩 Sonido de línea completada (arpeggio)
  - ⬆️ Sonido de subida de nivel (fanfarria)
  - 💀 Sonido de Game Over (nota descendente)

### Efectos Visuales Neon 💫

- **Brillo Dinámico**: El tablero tiene efecto de brillo que cambia con el nivel
- **Colores de Piezas**: Cada tetromino tiene su propio color neón único
- **Animación de Línea**: Líneas que se completan parpadean antes de desaparecer
- **Grid Visual**: Rejilla de fondo para facilitar la lectura del tablero

---

## 💾 Persistencia de Datos

El juego guarda automáticamente tus datos usando **localStorage** del navegador:

### Datos Guardados

1. **Preferencia de Sonido**
   - Clave: `soundEnabled`
   - Se recuerda tu última elección de sonido on/off

2. **Tabla de Récords**
   - Clave: `tetrisHighScores`
   - Se guardan hasta **5 récords máximo**
   - Ordenados por puntuación más alta

### Información por Récord

Cada récord guardado contiene:
- **Puntuación**: Puntos totales acumulados
- **Líneas**: Cantidad de líneas completadas
- **Nivel**: Nivel máximo alcanzado
- **Modo**: Clásico o Desafío
- **Fecha**: Cuándo se logró la puntuación

### Acceso a Récords

- **Desde el Menú**: Botón "📊 Ver Récords"
- **Al Terminar Juego**: Se muestra la tabla de récords actualizada
- **Automático**: Se actualiza después de cada partida

### Borrar Datos

Para limpiar los datos guardados:
```javascript
// En la consola del navegador (F12)
localStorage.removeItem('tetrisHighScores');
localStorage.removeItem('soundEnabled');
// O borrar todo
localStorage.clear();
```

---

## 🏗️ Arquitectura del Código

### Estructura de Archivos

```
tetris-web-game/
├── index.html          # Estructura HTML y elementos DOM
├── tetris.js           # Lógica completa del juego (~1050 líneas)
├── style.css           # Estilos y diseño responsivo (~800 líneas)
└── README.md           # Este archivo
```

### Componentes Principales

#### `tetris.js` - Motor del Juego

**Módulos Principales**:

1. **Configuración** (líneas 1-50)
   - Dimensiones del tablero (COLS, ROWS)
   - Velocidades de nivel (LEVEL_SPEEDS)
   - Definición de modos (GAME_MODES, MODE_CONFIG)

2. **Sistema de Audio** (líneas 50-220)
   - Audio Web API integrada
   - 5 funciones de sonido sintetizadas
   - Control de volumen y preferencias

3. **Tetrominos** (líneas 220-320)
   - Definición de 7 tipos de piezas
   - Sistema de rotación
   - Paleta de colores neón

4. **Sistema de Partículas** (líneas 330-400)
   - Clase `Particle` con física simple
   - Generación y actualización de efectos

5. **Clase Pieza** (líneas 400-450)
   - Representación de piezas en juego
   - Métodos de rotación y colisión

6. **Lógica Principal** (líneas 450-700)
   - `initGame()`: Inicialización
   - `gameLoop()`: Bucle de 60fps
   - `updateLineClearing()`: Animaciones de líneas
   - `spawnNewPiece()`: Generación de piezas

7. **Detección de Colisiones** (líneas 500-570)
   - `hasCollision()`: Choque con paredes y piezas
   - `movePiece()`: Movimiento seguro
   - `rotatePiece()`: Rotación con validación

8. **Renderizado** (líneas 580-750)
   - `drawBoard()`: Dibuja el estado actual
   - `drawCell()`: Celda individual con efectos
   - `drawNextPiece()`: Preview de siguiente pieza
   - `drawGrid()`: Malla de fondo

9. **High Scores** (líneas 940-980)
   - `saveHighScore()`: Guardar en localStorage
   - `getHighScores()`: Recuperar récords
   - `displayHighScores()`: Renderizar tabla

10. **Event Listeners** (líneas 1000+)
    - Teclado: Movimiento, rotación, acciones
    - Interfaz: Botones, selectores
    - Ventana: Resize, DOMContentLoaded

#### `index.html` - Interfaz de Usuario

**Secciones**:
- Pantalla de inicio con configuración
- Modal de récords
- Contenedor principal del juego
- Canvas de juego y siguiente pieza
- HUD (score, líneas, nivel, velocidad, modo)
- Panel lateral con sonido y controles
- Modal de Game Over

#### `style.css` - Diseño y Responsividad

**Características**:
- Gradientes neon oscuros
- Efectos de brillo (box-shadow, text-shadow)
- Animaciones de transición
- Media queries para adaptabilidad
- Variables CSS implícitas
- Breakpoints: Desktop (1200px), Tablet (900px), Mobile (600px)

---

## 🖥️ Requisitos Técnicos

### Navegadores Soportados

| Navegador | Versión Mínima | Estado |
|-----------|---|---|
| **Chrome** | 50+ | ✅ Completo |
| **Firefox** | 55+ | ✅ Completo |
| **Safari** | 12+ | ✅ Completo |
| **Edge** | 15+ | ✅ Completo |
| **Opera** | 37+ | ✅ Completo |

### APIs Utilizadas

- **Canvas 2D API**: Renderizado de gráficos
- **Web Audio API**: Síntesis de sonido
- **localStorage API**: Persistencia de datos
- **requestAnimationFrame**: Animación a 60fps
- **Keyboard Events**: Entrada de usuario

### Requisitos de Sistema

- **RAM**: Mínimo 256MB (típico 512MB+)
- **CPU**: Procesador moderno (2010+)
- **Conexión**: Solo para descargar archivos iniciales
- **Almacenamiento**: ~200KB para archivos + ~2KB para datos

---

## 🎯 Consejos de Juego

### Estrategias

1. **Modo Clásico**:
   - Practica los patrones básicos
   - Aprende la rotación de piezas
   - Controla el ritmo del juego
   - Mantén espacio para nuevas piezas

2. **Modo Desafío**:
   - Requiere anticipación rápida
   - Los movimientos deben ser decisivos
   - Aprovecha las piezas I para limpiar
   - Mantén baja la altura del tablero

### Mejora tu Puntuación

- **Líneas Múltiples**: Completa 4 líneas simultáneamente (Tetris)
- **Combo Score**: Encadena líneas rápidamente
- **Level Up**: Sube de nivel para más puntos
- **Persistence**: Los datos se guardan automáticamente

---

## 🐛 Solución de Problemas

### El sonido no funciona
- Verifica que Web Audio API esté soportada en tu navegador
- Comprueba que el sonido está habilitado en el juego (botón M)
- Algunos navegadores requieren interacción del usuario antes de reproducir sonido

### El juego va lento
- Reduce efectos gráficos (particulas, brillo)
- Cierra otras pestañas/aplicaciones
- Actualiza tu navegador
- Verifica que tu GPU esté activa

### Los récords no se guardan
- Verifica que localStorage esté habilitado
- Comprueba el espacio disponible en localStorage
- No uses navegación privada/incógnito (limitaciones)

### Canvas de juego distorsionado en móvil
- El juego se adapta automáticamente
- Si persiste, refresca la página
- Prueba en orientación apaisada para mejor experiencia

---

## 📱 Experiencia Responsiva

El juego se adapta perfectamente a:

- **Desktop** (1920x1080+): Layout horizontal optimizado
- **Tablet** (800x600 - 1200x900): Interfaz compacta
- **Mobile** (360x640+): Interfaz vertical optimizada

Todos los elementos se escalan automáticamente para ofrecer la mejor experiencia.

---

## 📝 Notas Técnicas

### Optimizaciones

1. **Renderizado**: Usa Canvas 2D nativo sin librerías
2. **Audio**: Síntesis en tiempo real, sin archivos
3. **Memoria**: Gestión eficiente de partículas
4. **Rendimiento**: Constante 60 FPS en dispositivos modernos

### Limitaciones Conocidas

- Máximo 5 récords guardados (por limitación de localStorage)
- Audio sintetizado (no melodías complejas)
- Sin soporte offline (requiere assets locales)

---

## 🎓 Aprendizaje

Este proyecto es excelente para:
- Aprender Canvas 2D API
- Entender Web Audio API
- Estudiar física básica de juegos (gravedad, colisiones)
- Practicar diseño responsivo
- Explorar localStorage y persistencia

---

## 📄 Licencia

MIT License - Siéntete libre de usar, modificar y distribuir

---

## 🤝 Contribuciones

¿Encontraste un bug o tienes una idea?
- Abre un issue en GitHub
- Propón mejoras y nuevas características
- Comparte tu puntuación más alta

---

## 👾 Créditos

- **Inspiración**: El clásico juego Tetris de 1984
- **Estilo**: Retro neon 80s/90s
- **Tecnología**: HTML5, CSS3, JavaScript ES6+

---

## 🎉 ¡Diviértete!

¡Bienvenido al Tetris Retro Neon! Que disfrutes del juego y que consigas la máxima puntuación. 

**¿Cuál es tu mejor puntuación? ¡Comparte tus récords!**

---

*Última actualización: Diciembre 2025*
*Versión: 2.0 - Edición Final*
