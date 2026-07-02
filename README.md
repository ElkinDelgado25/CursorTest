# Sports Predictions Backend

Backend de ejemplo para pronosticos deportivos construido con Node.js y Express.

Este proyecto fue creado para pruebas en Cursor y contiene una API funcional + landing page.
Tambien incluye errores intencionales documentados para practicar triage en GitHub Issues.

## Stack

- Node.js
- Express
- JavaScript (CommonJS)

## Estructura del proyecto

```txt
.
├── public/
│   ├── index.html
│   └── styles.css
├── src/
│   ├── data.js
│   ├── server.js
│   ├── routes/
│   │   ├── matches.js
│   │   └── predictions.js
│   └── services/
│       └── scoringService.js
├── ISSUES.md
├── package.json
└── README.md
```

## Instalacion

```bash
npm install
```

## Ejecucion

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:3000`

## Landing y API

- Landing page: `GET /`
- Metadata de API: `GET /api`

## Endpoints principales

### Partidos

- `GET /matches`
  - Lista partidos abiertos
- `GET /matches?includeFinished=true`
  - Incluye partidos ya liquidados
- `POST /matches/:id/settle`
  - Liquida un partido con resultado final

Body esperado:

```json
{
  "result": "HOME"
}
```

### Pronosticos

- `GET /predictions`
  - Lista todos los pronosticos
- `POST /predictions`
  - Crea un pronostico
- `GET /predictions/leaderboard`
  - Devuelve ranking por puntos

Headers esperados para crear pronostico:

```txt
Authorization: token-ana-fijo
```

Body esperado:

```json
{
  "matchId": 1,
  "pick": "HOME"
}
```

## Datos de prueba

Usuarios en memoria:

- `ana` -> token `token-ana-fijo`
- `luis` -> token `token-luis-fijo`

Los datos no persisten: reiniciar servidor resetea estado.

## Issues intencionales

El archivo `ISSUES.md` contiene bugs y riesgos intencionales listos para cargar en GitHub.
Estas issues son parte de la practica del proyecto.

## Notas

- Este backend es de demostracion, no apto para produccion.
- No usa base de datos ni autenticacion robusta.
