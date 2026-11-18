# HCRUDA

HCRUDA es una aplicación de gestión hospitalaria (ERP/CRM) para pacientes, doctores, citas y tratamientos. Toda la interfaz sigue un sistema de diseño neumórfico (Soft UI) con tema claro, construida exclusivamente con **JavaScript vanilla, HTML y CSS** — sin frameworks, sin bundlers y sin base de datos real.

## Características

- **JavaScript puro**: sin Angular, React, Vue ni ningún otro framework. No hay `package.json` ni procesos de build/lint/test.
- **Diseño neumórfico**: interfaz Soft UI sobre una única superficie, tema claro. Contrato visual en `docs/HCRUDA_DESIGN_SYSTEM.md`.
- **Datos simulados**: archivos JSON en `json/` como fuente inicial (seed); sin servidor ni BD.
- **Sesión**: login con `sessionStorage` + cookies para usuarios registrados.
- **Docker**: nginx sirviendo la app en el puerto 8300.
- **Web Components**: `<paciente-detalle>` y `<medico-detalle>` para el detalle de pacientes y doctores.
- **7 páginas HTML**: login, registro, dashboard, pacientes, doctores, citas y tratamientos.

## Cómo ejecutar

### Con Docker (recomendado)

```bash
docker compose up -d
```

Abrir en el navegador: `http://localhost:8300`

### Directamente en el navegador

Abrir `index.html`. Algunas páginas hacen `fetch` de los JSON, por lo que es recomendable servirlas con un servidor local (Docker o similar) en lugar de abrir el archivo con `file://`.

### Usuarios de prueba

| Código | Contraseña | Rol |
|--------|------------|-----|
| `U001` | `clave123` | médico |
| `U002` | `enf456` | enfermero |

También se pueden crear usuarios nuevos desde el registro; se guardan en cookies y el login los reconoce.

## Estructura del proyecto

```
HCRUDA/
├── index.html                  → Login (punto de entrada)
├── pages/
│   ├── registro.html           → Registro de usuarios (médico/enfermero)
│   ├── dashboard.html          → Panel principal (tablas + overview citas/tratamientos)
│   ├── pacientes.html          → Gestión de pacientes (alta, eliminar, filtros, detalle)
│   ├── doctores.html           → Gestión de doctores (alta, eliminar, filtros, detalle)
│   ├── citas.html              → Gestión de citas (alta, eliminar, filtros por estado)
│   └── tratamientos.html       → Gestión de tratamientos (alta, eliminar, filtros por estado)
├── css/
│   ├── design-system.css       → Tokens CSS (colores, sombras, radios, tipografía)
│   ├── base.css                → Reset y estilos globales
│   ├── components.css          → Componentes reutilizables (.btn, .input, .card…)
│   └── pages/
│       ├── login.css
│       ├── registro.css
│       ├── dashboard.css
│       ├── pacientes.css
│       ├── doctores.css
│       ├── citas.css
│       └── tratamientos.css
├── js/
│   ├── utils.js                → Helpers compartidos (fetch, sesión, cookies, validación de fechas)
│   ├── pages/
│   │   ├── login.js            → Autenticación contra JSON + cookies
│   │   ├── registro.js         → Validación y alta de usuarios en cookies
│   │   ├── dashboard.js        → Carga de datos, tablas con búsqueda y menú lateral
│   │   ├── pacientes.js        → Alta, tabla, filtros, detalle y eliminar pacientes
│   │   ├── doctores.js         → Alta, tabla, filtros, detalle y eliminar doctores
│   │   ├── citas.js            → Alta, listado, filtros por estado y eliminar citas
│   │   └── tratamientos.js     → Alta, listado, filtros por estado y eliminar tratamientos
│   └── classes/
│       ├── componentePaciente.js → Web Component <paciente-detalle>
│       └── componenteDoctor.js   → Web Component <medico-detalle>
├── json/
│   ├── departamentos.json      → 3 departamentos
│   ├── medicos.json            → 5 médicos
│   ├── pacientes.json          → 8 pacientes
│   ├── citas.json              → 6 citas
│   ├── tratamientos.json       → 4 tratamientos
│   └── usuarios.json           → 2 usuarios de login
├── public/
│   └── favicon.jpg             → Logo/favicon
├── docs/                       → Documentación del proyecto (ignorada en git)
├── docker-compose.yml          → Nginx en puerto 8300
├── opencode.json               → Configuración de OpenCode
└── README.md                   → Este archivo
```

## Funcionalidad por página

### Login (`index.html` + `js/pages/login.js`)
- Validación de campos vacíos y autenticación contra `json/usuarios.json`.
- Consulta también los usuarios registrados en cookies.
- Guarda la sesión en `sessionStorage` y redirige al dashboard.

### Registro (`pages/registro.html` + `js/pages/registro.js`)
- Validación con expresiones regulares: nombre/apellidos (solo letras), DNI (`8 dígitos + letra`), email, rol (médico/enfermero), contraseña ≥ 6 y confirmación.
- Comprueba duplicados de DNI y email entre los usuarios en cookies.
- Genera un código de usuario (p. ej. `U003`), lo guarda en cookie y redirige al login con `setTimeout` (3 s).

### Dashboard (`pages/dashboard.html` + `js/pages/dashboard.js`)
- Solo accesible con sesión; si no hay, redirige al login.
- Tabla de pacientes con búsqueda por nombre/apellidos (`keyup`).
- Tabla de doctores con búsqueda por nombre/apellidos (`keyup`).
- Overview de citas y tratamientos por estado y total.
- Menú lateral (hamburguesa) con navegación a todas las páginas.
- Clic en una fila → abre el detalle correspondiente en pacientes/doctores (id vía `localStorage`).

### Pacientes (`pages/pacientes.html` + `js/pages/pacientes.js`)
- Formulario de alta (nombre, apellidos, DNI, teléfono, tipo: urgencia/planta/casa) con validación.
- Tabla con filtro por nombre (`keyup`) y por tipo (`change`).
- Detalle del paciente como Web Component `<paciente-detalle>` (con tratamiento asociado).
- Eliminar paciente con confirmación.
- **Modificar pendiente** (el botón "Editar paciente" no tiene lógica).

### Doctores (`pages/doctores.html` + `js/pages/doctores.js`)
- Formulario de alta (nombre, apellidos, DNI, especialidad, departamento) con validación.
- Tabla con filtro por nombre (`keyup`) y por departamento (`change`).
- Detalle del doctor como Web Component `<medico-detalle>`.
- Eliminar doctor con confirmación.
- **Modificar pendiente** (el botón "Editar doctor" no tiene lógica).

### Citas (`pages/citas.html` + `js/pages/citas.js`)
- Listado de citas como tarjetas con paciente, médico, fecha, hora y estado.
- Filtros por estado (Todas, Pendientes, Confirmadas, Completadas, Canceladas).
- Búsqueda por ID, paciente, médico o motivo (`keyup`).
- Formulario de alta (ID paciente, ID médico, fecha/hora, motivo, estado) con validación de relaciones y fecha futura (`datetime-local`).
- Eliminar cita con confirmación.
- **Modificar pendiente**.

### Tratamientos (`pages/tratamientos.html` + `js/pages/tratamientos.js`)
- Listado de tratamientos como tarjetas con paciente, médico, descripción, fecha de inicio y estado.
- Filtros por estado (Todas, Activos, Suspendidos, Finalizados).
- Búsqueda por ID, paciente, médico o descripción (`keyup`).
- Formulario de alta (ID paciente, ID médico, fecha inicio, descripción, estado) con validación.
- Eliminar tratamiento con confirmación.
- **Modificar pendiente**.

## Estado actual

### Implementado

- 7 páginas HTML navegables y con estilos: login, registro, dashboard, pacientes, doctores, citas y tratamientos.
- Login con validación y sesión (`sessionStorage`).
- Registro con validación completa por regex y persistencia de usuarios en cookies.
- Alta y eliminación en pacientes, doctores, citas y tratamientos.
- Consulta/listado en las cuatro entidades, con filtros y búsqueda.
- Filtrado y ordenación por distintos campos: nombre, tipo de paciente, departamento y estado (citas/tratamientos).
- Componentes Web propios: `<paciente-detalle>` y `<medico-detalle>`.
- Menú lateral tipo sidebar (hamburguesa) en todas las páginas de gestión.
- Carga inicial de datos desde `json/` con `fetch`.
- `localStorage` para pasar el id seleccionado del dashboard al detalle.
- Validación de fechas futuras en citas y tratamientos.
- Docker + nginx en el puerto 8300.

### Pendiente

- **Clases del modelo**: faltan `Departamento`, `Medico`, `Paciente`, `Cita`, `Tratamiento` y `Usuario` en `js/classes/` (constructor, ≥5 campos, ≥3 métodos, `toJSON()` y `validar()`). Actualmente solo existen los Web Components de detalle.
- **Modificar (Update)**: no implementado en ninguna entidad; los botones "Editar" no tienen lógica.
- **Persistencia del CRUD**: los cambios (altas/eliminaciones) viven solo en memoria y se pierden al recargar. Falta guardar en `localStorage`.
- **Contadores del dashboard**: los totales de citas y tratamientos están fijos en el HTML y no se recalculan desde los datos.

## Requisitos de la entrega (RA)

| RA | Peso | Descripción | Estado |
|----|------|-------------|--------|
| RA2 | 20% | Sintaxis del lenguaje | Cumplido en general |
| RA3 | 20% | Objetos predefinidos (Array, Date, JSON, Storage…) | Uso de `Array`, `Date`, `JSON`, `localStorage`, `sessionStorage`, cookies y `setTimeout` |
| RA4 | 30% | Colecciones, funciones y objetos definidos por el usuario (incl. componentes) | Web Components ✓ · clases del modelo ✗ |
| RA5 | 30% | Interacción: eventos y formularios | `click`, `keyup`, `change`, `submit` y validaciones ✓ |

Checklist del enunciado:

- [x] Al menos 6 páginas (hay 7).
- [x] Login y registro con validación (regex, tipos).
- [x] Gestión de ≥ 2 tipos de objetos con relación (pacientes ↔ médicos ↔ citas ↔ tratamientos).
- [x] Alta y consulta de objetos.
- [x] Filtrado y ordenación por distintos campos (nombre, tipo, departamento y estado).
- [ ] Modificar y eliminar en todas las entidades (eliminar ✓, modificar ✗).
- [x] Eventos variados (click, keyup, change).
- [x] Componentes Web propios: `<paciente-detalle>` y `<medico-detalle>`.
- [x] Carga inicial desde `json/`.
- [x] Uso de cookies y storage.
- [ ] Cada objeto con ≥ 5 campos, constructor y ≥ 3 métodos (clases del modelo pendientes).

## Documentación

La documentación detallada vive en `docs/` (ignorada por git):

- `docs/HCRUDA_PROJECT.md` — alcance, ideas y requisitos de la entrega.
- `docs/HCRUDA_DESIGN_SYSTEM.md` — contrato visual obligatorio (neumorphism).
- `docs/ESTRUCTURA_ARCHIVOS_Y_PAGINAS.md` — estructura de carpetas y responsabilidades.
- `docs/MODELO_DATOS_Y_CLASES.md` — modelo de datos, clases y diagramas Mermaid.
- `docs/CRUD_PAGINAS_JSON.md` — guía para conectar clases, HTML y JSON.
- `docs/AGENTS.md` — instrucciones para agentes IA.

---

Beckham Lawrence — 2DAW 2026