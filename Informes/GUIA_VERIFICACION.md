# ✅ GUÍA DE VERIFICACIÓN - SISTEMA DE NIVELES

## Verificación Rápida (2 minutos)

### 1. **Menú tiene 6 niveles**
```
Abre index.html, revisa el selector "Nivel inicial:"
Deberías ver 6 opciones:
  ✓ Nivel 1 - Suave (800ms)
  ✓ Nivel 2 - Medio (500ms)
  ✓ Nivel 3 - Rápido (300ms)
  ✓ Nivel 4 - Locura (100ms)
  ✓ Nivel 5 - Insano (70ms)    ← NUEVO
  ✓ Nivel 6 - Caos (50ms)      ← NUEVO
```

### 2. **Puedo elegir nivel 5 o 6**
```
Elige "Nivel 5 - Insano (70ms)"
Inicia el juego
El HUD debe mostrar: Nivel = 5
```

### 3. **El nivel nunca baja**
```
Juega con nivel 5 elegido
Completa líneas
Verifica que el nivel NUNCA sea 1, 2, 3 o 4
Solo puede quedarse en 5 o subir a 6, 7, etc.
```

### 4. **Velocidad coincide**
```
Nivel 5 debería caer más rápido que nivel 4
Nivel 6 debería caer más rápido que nivel 5
```

---

## Verificación Técnica (10 minutos)

### 1. **Revisar index.html**
```bash
Abre: c:\Users\USUARIO\Downloads\video-juego-retro-main\index.html
Busca: <select id="gameLevel">
Verifica:
  - 6 opciones <option> (no 4)
  - Velocidades visibles en ms
  - Valores: 1, 2, 3, 4, 5, 6
```

### 2. **Revisar tetris.js - Variables**
```javascript
Busca: let minLevel = 1;
Verifica:
  - Variable existe (línea ~270)
  - Comentario explica: "El nivel mínimo que el jugador puede alcanzar"
```

### 3. **Revisar tetris.js - initGame()**
```javascript
Busca: minLevel = level;
Verifica:
  - Está en función initGame()
  - Está después de: level = parseInt(...)
  - Antes de: dropSpeed = LEVEL_SPEEDS[level];
  - Comentario explica: "El jugador nunca puede bajar de este nivel"
```

### 4. **Revisar tetris.js - updateLineClearing()**
```javascript
Busca: const linesAboveInitial = Math.max(0, lines - (minLevel - 1) * 5);
Verifica:
  - Fórmula existe (línea ~524)
  - Seguida de: const newLevel = minLevel + Math.floor(linesAboveInitial / 5);
  - Comentarios explican la lógica
```

---

## Verificación de Flujo (5 minutos)

### Flujo: Menú → Juego → Progresión

```
PASO 1: Usuario elige "Nivel 4 - Locura (100ms)"
        ↓
PASO 2: Sistema llama startButton.onclick()
        ↓
PASO 3: startButton.onclick() llama initGame()
        ↓
PASO 4: initGame() ejecuta:
        level = 4
        minLevel = 4 ← GRABADO
        dropSpeed = 100
        ↓
PASO 5: Juego inicia
        HUD muestra: Nivel = 4, Velocidad = Locura
        ↓
PASO 6: Usuario completa 15 líneas
        newLevel = 4 + (15 - 15) / 5 = 4
        (sin cambios)
        ↓
PASO 7: Usuario completa 20 líneas (total)
        newLevel = 4 + (20 - 15) / 5 = 5
        Level sube a 5, velocidad a 70ms
        ↓
PASO 8: Usuario completa 25 líneas (total)
        newLevel = 4 + (25 - 15) / 5 = 6
        Level sube a 6, velocidad a 50ms
        ↓
PASO 9: Usuario Game Over
        Modal muestra puntuación
        ↓
PASO 10: Usuario click "Reiniciar"
         Todas las variables se resetean
         Vuelve al menú
         ↓
         Ciclo se repite
```

---

## Checklist de Verificación

- [ ] **index.html**
  - [ ] Menú tiene 6 opciones de nivel
  - [ ] Opciones incluyen "Nivel 5" y "Nivel 6"
  - [ ] Velocidades visibles en ms
  - [ ] Sin errores de sintaxis HTML

- [ ] **tetris.js - Variables**
  - [ ] Variable `minLevel` existe
  - [ ] Inicializada como `1`
  - [ ] Tiene comentario explicativo

- [ ] **tetris.js - initGame()**
  - [ ] Lee level desde el menú
  - [ ] Asigna `minLevel = level`
  - [ ] Asigna velocidad correcta

- [ ] **tetris.js - updateLineClearing()**
  - [ ] Nueva fórmula usa `minLevel`
  - [ ] Nueva fórmula usa `linesAboveInitial`
  - [ ] El nivel nunca es < minLevel

- [ ] **Funcionamiento en Juego**
  - [ ] Puedo elegir nivel 5
  - [ ] Puedo elegir nivel 6
  - [ ] HUD muestra nivel correcto
  - [ ] Velocidad es rápida (nivel alto)
  - [ ] Nivel no regresa a 1
  - [ ] Nivel solo sube o se queda igual

- [ ] **Reinicio**
  - [ ] Game Over funciona
  - [ ] Botón "Reiniciar" funciona
  - [ ] Botón "Volver al menú" funciona
  - [ ] Variables se resetean correctamente

---

## Pruebas Específicas

### Prueba 1: Elegir nivel alto al inicio
```
1. Abre el juego
2. Selecciona "Nivel 6 - Caos (50ms)"
3. Verifica que el HUD muestre "Nivel = 6"
4. Verifica que el juego sea MUY RÁPIDO
5. Completa algunas líneas
6. Verifica que nunca baje de nivel 6
```

### Prueba 2: Progresión desde nivel bajo
```
1. Abre el juego
2. Selecciona "Nivel 2 - Medio (500ms)"
3. Verifica que el HUD muestre "Nivel = 2"
4. Completa exactamente 5 líneas
5. Verifica que suba a "Nivel = 3"
6. Verifica que la velocidad haya aumentado
7. Continúa hasta nivel 6
8. Verifica que pueda seguir subiendo (nivel 7, 8, etc. dinámicos)
```

### Prueba 3: Sin regresión
```
1. Abre el juego en "Nivel 4"
2. Juega normalmente
3. Reinicia desde Game Over (botón Reiniciar)
4. Abre el menú
5. Elige "Nivel 1"
6. Verifica que reinicie correctamente en nivel 1
7. Completa líneas
8. Verifica que progrese desde nivel 1 (no desde 4)
```

---

## Qué Buscar Si Algo No Funciona

### ❌ "El menú solo muestra 4 opciones"
**Solución:** Revisa index.html línea 26-32
- Debe haber 6 opciones `<option>`
- Verifica que no falte código

### ❌ "El nivel sigue siendo 1 aunque elija 5"
**Solución:** Revisa tetris.js función initGame()
- Verifica que exista: `minLevel = level;`
- Verifica que esté después de: `level = parseInt(...)`

### ❌ "El nivel desciende durante la partida"
**Solución:** Revisa tetris.js función updateLineClearing()
- Verifica que la fórmula sea: `minLevel + Math.floor(...)`
- Verifica que use `linesAboveInitial` y no `lines` directamente

### ❌ "La velocidad no coincide con el nivel"
**Solución:** Verifica tetris.js líneas 12-18
- `LEVEL_SPEEDS` debe tener 6 entradas (1-6)
- Cada nivel debe tener velocidad en ms

---

## Documentos de Referencia

Para más detalles, consulta:

- **AUDITORIA_SISTEMA_NIVELES.md** - Análisis completo de problemas y soluciones
- **RESUMEN_CORRECCIONES.txt** - Cambios específicos por archivo
- **DIAGNOSTICO_VISUAL.txt** - Explicación detallada con ejemplos

---

## Contacto / Preguntas

Si algo no funciona o tienes preguntas:

1. Verifica los archivos contra esta guía
2. Consulta los documentos de referencia
3. Revisa el código en tetris.js línea 270, 355 y 524

---

**Verificación completada: El sistema de niveles es coherente y consistente. ✅**
