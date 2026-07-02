# Issues para subir a GitHub (manual)

Este proyecto contiene errores intencionales para practica de triage.  
Cada issue incluye archivo, parte afectada, impacto y sugerencia.

## 1) Autenticacion debil con token fijo en texto plano
- **Archivo:** `src/routes/predictions.js`
- **Parte:** funcion `getCurrentUser`
- **Problema:** se acepta cualquier valor exacto en `Authorization` sin formato `Bearer`, expiracion ni firma.
- **Impacto:** suplantacion de usuario y acceso no autorizado a creacion de pronosticos.
- **Sugerencia:** usar JWT firmado, validar esquema `Bearer`, exp y claims.

## 2) Comparacion de fecha incorrecta por uso de `toLocaleString`
- **Archivo:** `src/routes/predictions.js`
- **Parte:** `POST /predictions`, validacion de inicio de partido
- **Problema:** compara un string local (`now`) contra `startsAt` (ISO UTC). La comparacion lexica puede fallar segun locale.
- **Impacto:** permite apostar cuando el partido ya empezo o bloquea apuestas validas.
- **Sugerencia:** comparar `Date` numericas (`Date.now()` vs `new Date(startsAt).getTime()`).

## 3) Falta de validacion de seleccion (`pick`)
- **Archivo:** `src/routes/predictions.js`
- **Parte:** `POST /predictions`, construccion de `oddsMap[pick]`
- **Problema:** no se valida que `pick` sea `HOME`, `DRAW` o `AWAY`.
- **Impacto:** se guardan pronosticos con `oddsUsed: undefined`, luego rompe calculo de puntos.
- **Sugerencia:** validar enum y rechazar con `400 Bad Request`.

## 4) Pronosticos duplicados para mismo usuario y partido
- **Archivo:** `src/routes/predictions.js`
- **Parte:** `POST /predictions`, antes de `predictions.push(prediction)`
- **Problema:** no existe verificacion de unicidad (`userId` + `matchId`).
- **Impacto:** usuario puede enviar multiples picks y multiplicar su beneficio.
- **Sugerencia:** bloquear duplicados o implementar actualizacion controlada.

## 5) Liquidacion de partidos sin autorizacion
- **Archivo:** `src/routes/matches.js`
- **Parte:** `POST /matches/:id/settle`
- **Problema:** endpoint critico sin autenticacion ni rol administrador.
- **Impacto:** cualquier cliente puede cerrar partidos y alterar ranking.
- **Sugerencia:** agregar middleware de auth + autorizacion por rol.

## 6) Calculo de puntos incorrecto por `parseInt` en cuotas
- **Archivo:** `src/services/scoringService.js`
- **Parte:** funcion `settleMatch`, linea de suma de puntos
- **Problema:** `parseInt(prediction.oddsUsed, 10)` elimina decimales (2.3 -> 2).
- **Impacto:** puntuaciones menores a las esperadas y ranking inconsistente.
- **Sugerencia:** usar `Number`/`parseFloat` y redondeo explicito de negocio.

## 7) `leaderboard` muta estado global al ordenar
- **Archivo:** `src/services/scoringService.js`
- **Parte:** funcion `leaderboard`
- **Problema:** `users.sort(...)` modifica el arreglo original en memoria.
- **Impacto:** efectos secundarios no deseados y orden no determinista entre requests.
- **Sugerencia:** clonar antes de ordenar (`[...users].sort(...)`).

## 8) Falta de validacion de `result` al liquidar
- **Archivo:** `src/services/scoringService.js`
- **Parte:** funcion `settleMatch`, asignacion `match.result = realResult`
- **Problema:** acepta cualquier string como resultado final.
- **Impacto:** liquidaciones invalidas y puntos mal calculados.
- **Sugerencia:** validar contra enum permitido y devolver `400` en caso invalido.
