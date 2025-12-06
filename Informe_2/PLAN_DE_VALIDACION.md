# ✅ PLAN DE VALIDACIÓN - TETRIS v2.0

## 🧪 VERIFICACIÓN COMPLETA (Checklist de Testing)

---

## 1. INSTALACIÓN Y SETUP

- [ ] Descargar todos los archivos v2
- [ ] Colocar en carpeta: `video-juego-retro-main`
- [ ] Verificar que los 3 archivos existan:
  ```
  ✓ index_v2.html
  ✓ tetris_v2.js
  ✓ style_v2.css
  ```
- [ ] Abrir `index_v2.html` en navegador
- [ ] No debe haber error 404 o similar

---

## 2. MENÚ DE INICIO

### Verificar Elementos:
- [ ] Título: "Prompt TETRIS" visible
- [ ] Subtítulo: "Versión Avanzada 2.0"
- [ ] Desplegable: Tamaño tablero (10x20, 15x20, 8x16)
- [ ] Desplegable: Modo juego (Clásico, Sandbox, Desafío)
- [ ] Descripción dinámica del modo (cambia al seleccionar)
- [ ] Desplegable: Nivel inicial (1-6 con velocidades)
- [ ] Botón: "Iniciar juego"
- [ ] Botón: "📊 Ver Récords"

### Interactividad:
- [ ] Cambiar tamaño → Desplegable responde
- [ ] Cambiar modo → Descripción actualiza
- [ ] Cambiar nivel → Desplegable responde

---

## 3. PANTALLA DE JUEGO

### Layout:
- [ ] Canvas principal visible
- [ ] Canvas "Siguiente pieza" visible
- [ ] HUD con 4 campos: Puntuación, Líneas, Nivel, Velocidad
- [ ] Estadísticas: Muestra modo actual
- [ ] Ayuda de controles visible en panel lateral
- [ ] Botón 🔊 de sonido visible

### Responsivo:
- [ ] Desktop: Layout lado a lado
- [ ] Redimensionar ventana → Canvas se ajusta
- [ ] Mobile: Canvas ocupa espacio correcto

---

## 4. FUNCIONALIDAD #1: Reinicio Rápido (R)

1. **Inicia partida:** Nivel 3, modo Clásico
2. **Completa acciones:** Mueve piezas, completa algunas líneas
3. **Puntuación:** ~200 puntos
4. **Presiona R:**
   - [ ] Tablero se limpia
   - [ ] Puntuación vuelve a 0
   - [ ] Líneas vuelven a 0
   - [ ] Nivel sigue siendo 3 (inicial)
   - [ ] Juego continúa sin volver a menú
5. **Verifica:** Puedes seguir jugando normalmente

---

## 5. FUNCIONALIDAD #2: Canvas Responsivo

1. **Desktop (1920x1080):**
   - [ ] Canvas visible completamente
   - [ ] Proporciones correctas (10 ancho, 20 alto)

2. **Redimensionar a Tablet (800x600):**
   - [ ] Canvas se reduce proporcionalmente
   - [ ] Sigue siendo jugable

3. **Redimensionar a Mobile (480x800):**
   - [ ] Canvas optimizado para pantalla pequeña
   - [ ] Panel lateral se reorganiza
   - [ ] No hay desbordamiento

4. **F11 (Pantalla completa):**
   - [ ] Canvas maximizado
   - [ ] Sigue siendo proporcional

---

## 6. FUNCIONALIDAD #3: Toggle de Sonido (M)

1. **Presiona M durante juego:**
   - [ ] Botón 🔊 cambia a 🔇
   - [ ] Sonido desaparece (verifica completando línea)

2. **Presiona M nuevamente:**
   - [ ] Botón 🔊 vuelve
   - [ ] Sonido regresa

3. **Recarga página (F5):**
   - [ ] Sonido permanece en estado anterior (🔇 o 🔊)

4. **localStorage:**
   - [ ] Abre consola F12
   - [ ] Escribe: `localStorage.getItem('soundEnabled')`
   - [ ] Devuelve: true o false

---

## 7. FUNCIONALIDAD #4: Volver al Menú (ESC/H)

1. **Inicia partida:** Con puntuación
2. **Presiona ESC:**
   - [ ] Juego se pausa automáticamente
   - [ ] Vuelve a menú de inicio
   - [ ] Modal de Game Over NO aparece

3. **Presiona ESC nuevamente en menú:**
   - [ ] Nada sucede (no está en juego)

4. **En juego, presiona H:**
   - [ ] Mismo comportamiento que ESC
   - [ ] Vuelve al menú

---

## 8. FUNCIONALIDAD #5: Pausa (P)

1. **Inicia partida normal**
2. **Presiona P:**
   - [ ] Texto "PAUSA" aparece en center del canvas
   - [ ] Pieza deja de caer
   - [ ] Piezas se congelan

3. **Intenta mover pieza:**
   - [ ] No responde a controles

4. **Presiona P nuevamente:**
   - [ ] "PAUSA" desaparece
   - [ ] Pieza continúa cayendo
   - [ ] Controles funcionan nuevamente

5. **Presiona P múltiples veces:**
   - [ ] Alterna correctamente cada vez

---

## 9. FUNCIONALIDAD #6: Récords (localStorage)

### Guardar:
1. **Inicia en Clásico, Nivel 1:**
   - Juega hasta Game Over
   - Completa mínimo 200 puntos

2. **Game Over aparece:**
   - [ ] Muestra "Puntuación final"
   - [ ] Muestra "Líneas completadas"
   - [ ] Muestra "Nivel alcanzado"
   - [ ] Muestra "Modo"
   - [ ] Tabla de récords visible

3. **Verifica localStorage:**
   ```javascript
   // Consola F12:
   JSON.parse(localStorage.getItem('tetrisHighScores'))
   // Devuelve array con tu récord
   ```

### Ver Récords:
1. **Vuelve al menú**
2. **Presiona "📊 Ver Récords":**
   - [ ] Modal se abre
   - [ ] Tabla muestra tu récord reciente
   - [ ] Columnas: #, Puntuación, Líneas, Nivel, Modo

3. **Presiona "Cerrar":**
   - [ ] Modal se cierra
   - [ ] Vuelves al menú

### Múltiples Récords:
1. **Juega 3 partidas diferentes:**
   - Clásico, 500 pts
   - Desafío, 300 pts
   - Clásico, 800 pts

2. **Abre Récords:**
   - [ ] Muestra máximo 5
   - [ ] Ordenados por puntuación (descendente)
   - [ ] Últimas partidas incluidas

---

## 10. FUNCIONALIDAD #7: Modos Alternativos

### Modo Clásico:
1. **Selecciona:** Clásico, Nivel 1
2. **Comienza a jugar:**
   - [ ] Velocidad normal (800ms en L1)
   - [ ] HUD muestra "Modo: Clásico"
   - [ ] Cada 5 líneas = +1 nivel

3. **Llena tablero:**
   - [ ] Game Over cuando pieza llega al tope

### Modo Sandbox:
1. **Selecciona:** Sandbox, Nivel 1
2. **Comienza a jugar:**
   - [ ] Velocidad normal (800ms en L1)
   - [ ] HUD muestra "Modo: Sandbox"
   - [ ] Cada 5 líneas = +1 nivel

3. **Llena tablero:**
   - [ ] **NO hay Game Over**
   - [ ] Puedes seguir jugando
   - [ ] Presiona R para reiniciar

### Modo Desafío:
1. **Selecciona:** Desafío, Nivel 1
2. **Comienza a jugar:**
   - [ ] Velocidad más rápida (667ms, no 800ms)
   - [ ] HUD muestra "Modo: Desafío"
   - [ ] Cada ~3.3 líneas = +1 nivel (50% más rápido)

3. **Juega y sube de nivel:**
   - [ ] Nivel sube más rápido que Clásico
   - [ ] Piezas caen más rápido

---

## 11. FUNCIONALIDAD #8: Partículas

1. **Inicia partida cualquier modo**
2. **Completa una línea (4 bloques horizontales):**
   - [ ] Animación de destello (línea pulsa)
   - [ ] **10 pequeñas chispas salen en abanico**
   - [ ] Chispas tienen color neón (magenta)
   - [ ] Chispas caen con gravedad
   - [ ] Desaparecen suavemente (fade out)
   - [ ] Duran ~1 segundo

3. **Completa 4 líneas seguidas:**
   - [ ] Se generan partículas múltiples
   - [ ] Efecto visible y coherente

---

## 12. FUNCIONALIDAD #9: Música Adaptativa

1. **Nivel 1, cualquier modo:**
   - [ ] No hay música constante (solo sonidos FX)

2. **Completa 5 líneas (sube a Nivel 2):**
   - [ ] Se toca una melodía corta
   - [ ] Frecuencia base (La3 = 220Hz)
   - [ ] Duración: ~0.3 segundos

3. **Sube a Nivel 4:**
   - [ ] Melodía suena nuevamente
   - [ ] Frecuencia diferente (más aguda)

4. **En Modo Desafío, sube nivel:**
   - [ ] Melodía se toca 30% más rápida
   - [ ] Diferencia audible

5. **Presiona M (Mute):**
   - [ ] Música no suena más
   - [ ] Presiona M nuevamente:
     - [ ] Música suena en siguiente level up

---

## 13. FUNCIONALIDAD #10: Coherencia y HUD Mejorado

### HUD Actualizado:
1. **Durante juego:**
   - [ ] Puntuación en tiempo real
   - [ ] Líneas actualizadas al completar
   - [ ] Nivel muestra correctamente
   - [ ] Velocidad muestra: Lento/Medio/Rápido/Locura/Insano/¡CAOS!
   - [ ] Modo muestra: Clásico/Sandbox/Desafío

### Coherencia de Niveles:
1. **Menú muestra 6 opciones:**
   - [ ] Nivel 1 - Suave (800ms)
   - [ ] Nivel 2 - Medio (500ms)
   - [ ] Nivel 3 - Rápido (300ms)
   - [ ] Nivel 4 - Locura (100ms)
   - [ ] Nivel 5 - Insano (70ms)
   - [ ] Nivel 6 - Caos (50ms)

2. **Selecciona Nivel 4:**
   - [ ] Inicia en Nivel 4
   - [ ] Velocidad es 100ms (Locura)
   - [ ] HUD muestra Nivel 4
   - [ ] Complete 5 líneas → Sube a 5
   - [ ] **Nunca baja a 3 o menos**

---

## 14. CONTROLES COMPLETOS

### Movimiento:
- [ ] ← : Pieza se mueve izquierda
- [ ] → : Pieza se mueve derecha
- [ ] ↓ : Pieza baja lentamente
- [ ] ESPACIO : Hard drop (baja al fondo)

### Rotación:
- [ ] Z : Pieza rota
- [ ] ↑ : Pieza rota

### Juego:
- [ ] P : Pausa/Reanuda
- [ ] R : Reinicia partida actual
- [ ] ESC : Vuelve al menú
- [ ] H : Vuelve al menú (alternativa)
- [ ] M : Toggle Sonido/Mute

---

## 15. NAVEGADORES Y DISPOSITIVOS

### Chrome:
- [ ] Juego funciona correctamente
- [ ] Sin errores en consola

### Firefox:
- [ ] Juego funciona correctamente
- [ ] Sin errores en consola

### Safari:
- [ ] Juego funciona correctamente
- [ ] Sin errores en consola

### Edge:
- [ ] Juego funciona correctamente
- [ ] Sin errores en consola

### Mobile (iPhone/Android):
- [ ] Juego visible
- [ ] Canvas redimensionado
- [ ] Controles funcionan (si tienes teclado o mapeo)

---

## 16. CASOS EXTREMOS

### Múltiples Reinicios:
1. **Presiona R rapidamente 10 veces:**
   - [ ] Sin crashes
   - [ ] Tablero siempre se limpia

### Pausa Prolongada:
1. **Presiona P (pausa)**
2. **Espera 30 segundos**
3. **Presiona P (reanuda):**
   - [ ] Juego continúa sin problemas

### Cambiar de Pestaña:
1. **Pausa el juego**
2. **Cambia a otra pestaña**
3. **Vuelve después de 1 minuto:**
   - [ ] Sigue en pausa
   - [ ] Sin reset involuntario

### localStorage Lleno:
1. **Completa 10 partidas diferentes:**
   - [ ] Récords se guardan correctamente
   - [ ] Mantiene top 5
   - [ ] No hay error de almacenamiento

---

## 17. VALIDACIÓN TÉCNICA

### Consola (F12):
- [ ] Sin errores rojos
- [ ] Sin advertencias críticas
- [ ] Sin undefined variables

### Network (F12):
- [ ] Todos los archivos cargan (HTML, CSS, JS)
- [ ] Sin 404 errors

### Performance (F12 → Performance):
- [ ] FPS estable en 60 durante juego
- [ ] Sin lag visible
- [ ] Memory estable (<100MB)

### Storage (F12 → Application):
- [ ] localStorage muestra:
  - [ ] `soundEnabled`: true/false
  - [ ] `tetrisHighScores`: array de récords

---

## 18. FLUJOS COMPLEJOS

### Flujo A: Cambio de Modo Mid-Game
```
1. Clásico, Nivel 2, 500 pts
2. Presiona ESC → Menú
3. Cambia a Desafío
4. INICIAR JUEGO → Nueva partida
5. Verifica: Más rápido, más nivel up rápido
6. Game Over → Récord se guarda (Desafío, no Clásico)
```

### Flujo B: Práctica + Desafío
```
1. Sandbox, Nivel 6 (práctica sin presión)
2. Completa 50 líneas sin Game Over
3. ESC → Menú
4. Desafío, Nivel 6 (real)
5. Game Over → Puntuación guardada
6. Compara con "Ver Récords"
```

### Flujo C: Récords en Diferentes Modos
```
1. Clásico L3 → 600 pts
2. Sandbox L6 → No guarda
3. Desafío L4 → 400 pts
4. Clásico L1 → 200 pts
5. Ver Récords:
   - Muestra: 600 (Clásico), 400 (Desafío), 200 (Clásico)
```

---

## 19. SIGNOS DE ÉXITO ✅

- [ ] Juego inicia sin errores
- [ ] Todos los controles responden
- [ ] Canvas es responsivo
- [ ] Sonido se puede mutearen
- [ ] Récords se guardan
- [ ] Modos funcionan diferente
- [ ] Partículas salen bonito
- [ ] Música suena adaptativa
- [ ] HUD actualiza en tiempo real
- [ ] No hay crashes
- [ ] localStorage funciona
- [ ] Sin breaking changes del original

---

## 20. SIGNOS DE FALLO ❌

- [ ] Error 404 en algún archivo
- [ ] Consola con errores rojos
- [ ] Canvas no se ve
- [ ] Controles no responden
- [ ] Game Over en Sandbox
- [ ] Nivel baja por debajo del inicial
- [ ] localStorage no guarda
- [ ] FPS por debajo de 30

---

## 📋 RESUMEN FINAL

**Total de Verificaciones:** 100+
**Tiempo estimado:** 30-45 minutos
**Éxito esperado:** 100%

### Si todas las casillas están marcadas ✅:
→ **VERSIÓN 2.0 VALIDADA Y LISTA PARA PRODUCCIÓN**

---

**Fecha:** Diciembre 6, 2025
**Versión:** 2.0
**Estado:** ✅ PLAN DE VALIDACIÓN COMPLETO
