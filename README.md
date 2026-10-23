# HCRUDA

Sistema de gestión hospitalaria (ERP/CRM) desarrollado en JavaScript puro, sin frameworks ni bundlers.

## Descripción

HCRUDA es una aplicación de gestión de pacientes, doctores, citas y tratamientos para entornos hospitalarios. Toda la interfaz sigue un sistema de diseño neumórfico (Soft UI) con tema claro, construido exclusivamente con tokens CSS y JavaScript vanilla.

## Características

- **JavaScript puro**: sin Angular, React, Vue ni ningún otro framework.
- **Diseño neumórfico**: interfaz basada en luz y sombra sobre una única superficie, con tema claro y accesibilidad (WCAG AA).
- **Datos simulados**: archivos JSON en `json/` que actúan como fuente inicial de datos (sin base de datos real ni servidor).
- **Sesión**: gestión de inicio de sesión y cierre de sesión mediante `sessionStorage`.
- **Docker**: servicio nginx listo para levantar en el puerto 8300.

## Estructura del proyecto

```
/ (raíz)
├── index.html              → Página de login (punto de entrada)
├── pages/                  → Páginas HTML de la aplicación
│   ├── registro.html       → Registro de usuarios
│   ├── dashboard.html      → Panel principal con resumen, citas y pacientes
│   ├── citas.html          → (pendiente)
│   ├── pacientes.html      → (pendiente)
│   ├── doctores.html       → (pendiente)
│   └── tratamientos.html   → (pendiente)
├── css/                    → Hojas de estilo
│   ├── design-system.css   → Tokens CSS del sistema de diseño
│   ├── base.css            → Estilos globales
│   ├── components.css      → Componentes reutilizables (inputs, botones, tarjetas, badges)
│   └── pages/              → Estilos específicos por página
├── js/                     → JavaScript
│   ├── utils.js            → Funciones compartidas (fetch JSON, sesión)
│   ├── pages/
│   │   ├── login.js        → Lógica de login
│   │   ├── registro.js     → (vacío, pendiente)
│   │   └── dashboard.js    → Lógica del dashboard (carga de datos, tabla, filtros)
│   └── classes/            → (pendiente: clases de objetos del modelo)
├── json/                   → Datos de simulación (seed)
│   ├── departamentos.json
│   ├── medicos.json
│   ├── pacientes.json
│   ├── citas.json
│   ├── tratamientos.json
│   └── usuarios.json
├── public/                 → Imágenes del logo/favicon
├── docker-compose.yml      → Nginx en puerto 8300
├── .gitignore              → Ignora .env/ y opencode.json
├── opencode.json           → Configuración de instrucciones para OpenCode
└── README.md               → Este archivo
```

## Documentación interna (`.env/`)

Todos los documentos de proyecto viven en el directorio `.env/` (ignorado por `.gitignore`):

- `HCRUDA_PROJECT.md`: alcance y requisitos del proyecto.
- `HCRUDA_DESIGN_SYSTEM.md`: contrato visual obligatorio (diseño, tokens, componentes).
- `MODELO_DATOS_Y_CLASES.md`: clases, relaciones y diagramas Mermaid del modelo de datos.
- `ESTRUCTURA_ARCHIVOS_Y_PAGINAS.md`: estructura de carpetas y responsabilidades de cada página.
- `AGENTS.md`: instrucciones para agentes de desarrollo.

## Cómo ejecutar

### Con Docker (recomendado)

```bash
docker compose up -d
```

Luego abrir en el navegador: `http://localhost:8300`

### Sin Docker

Abrir directamente `index.html` en el navegador. Algunas funciones que dependen de `fetch` para leer los archivos JSON pueden requerir servir los archivos mediante un servidor local debido a restricciones CORS del navegador.

## Estado actual

- **Implementado**: login, registro (HTML/CSS), dashboard con resumen, componente de citas, tabla de pacientes con búsqueda y filtros, estilos del sistema de diseño, datos seed en JSON.
- **Pendiente**: páginas de citas, pacientes, doctores y tratamientos; clases de objetos en `js/classes/`; lógica de registro en `js/pages/registro.js`; componente Web del menú de navegación.

## Tecnologías

- HTML5
- CSS3 (variables CSS, Flexbox, Grid)
- JavaScript ES6+ (vanilla, sin transpilador)
- Nginx (servidor estático vía Docker)
