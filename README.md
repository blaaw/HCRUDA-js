# HCRUDA

HCRUDA es una aplicación de gestión de pacientes, doctores, citas y tratamientos para entornos hospitalarios. Toda la interfaz sigue un sistema de diseño neumórfico (Soft UI) con tema claro, construido exclusivamente con tokens CSS y JavaScript vanilla.

## Características

- **JavaScript puro**: sin Angular, React, Vue ni ningún otro framework.
- **Diseño neumórfico**: interfaz basada en luz y sombra sobre una única superficie.
- **Datos simulados**: archivos JSON en `json/` que actúan como fuente inicial de datos (sin base de datos real ni servidor por ahora).
- **Sesión**: gestión de inicio de sesión y cierre de sesión mediante `sessionStorage`.
- **Docker**: servicio nginx listo para levantar en el puerto 8300.
- **Web Components**: componentes personalizados `<paciente-detalle>` y `<medico-detalle>` para el detalle de pacientes y doctores.

## Estructura del proyecto

```
/ (raíz)
├── index.html              → Página de login (punto de entrada)
├── pages/                  → Páginas HTML de la aplicación
│   ├── registro.html       → Registro de usuarios
│   ├── dashboard.html      → Panel principal con resumen, citas, pacientes y doctores
│   ├── pacientes.html      → Gestión de pacientes (formulario alta, tabla, filtros, detalle)
│   ├── doctores.html       → Gestión de doctores (formulario alta, tabla, filtros, detalle)
│   ├── citas.html          → (pendiente: no existe)
│   └── tratamientos.html   → (pendiente: no existe)
├── css/                    → Hojas de estilo
│   ├── design-system.css   → Tokens CSS del sistema de diseño
│   ├── base.css            → Estilos globales
│   ├── components.css      → Componentes reutilizables (inputs, botones, tarjetas, badges)
│   └── pages/              → Estilos específicos por página
│       ├── login.css
│       ├── registro.css
│       ├── dashboard.css
│       ├── pacientes.css
│       └── doctores.css
├── js/                     → JavaScript
│   ├── utils.js            → Funciones compartidas (fetch JSON, sesión)
│   ├── pages/
│   │   ├── login.js        → Lógica de login
│   │   ├── registro.js     → (vacío, pendiente de implementar)
│   │   ├── dashboard.js    → Lógica del dashboard (carga de datos, tablas, filtros)
│   │   ├── pacientes.js    → Lógica de pacientes (alta, tabla, filtros, detalle)
│   │   └── doctores.js     → Lógica de doctores (alta, tabla, filtros, detalle)
│   └── classes/            → Web Components del detalle (no son clases del modelo)
│       ├── componentePaciente.js  → <paciente-detalle>
│       └── componenteDoctor.js    → <medico-detalle>
│   └── (pendiente: clases del modelo Departamento, Medico, Paciente, Cita, Tratamiento, Usuario)
├── json/                   → Datos de simulación (seed)
│   ├── departamentos.json  → 3 items
│   ├── medicos.json        → 5 items
│   ├── pacientes.json      → 8 items
│   ├── citas.json          → 6 items
│   ├── tratamientos.json   → 4 items
│   └── usuarios.json       → 2 items
├── public/                 → Imágenes del logo/favicon (favicon.jpg)
├── docker-compose.yml      → Nginx en puerto 8300
├── .gitignore              → Ignora .env/ y opencode.json
├── opencode.json           → Configuración de instrucciones para OpenCode
├── docs/                   → Documentación del proyecto (ignorado en git)
└── README.md               → Este archivo
```

## Cómo ejecutar (con Docker)

```bash
docker compose up -d
```

Luego abrir en el navegador: `http://localhost:8300`

También se puede abrir `index.html` directamente en el navegador.

## Estado actual

### Implementado

- **index.html**: página de login con validación de campos vacíos y autenticación contra `json/usuarios.json`.
- **pages/registro.html**: formulario de registro con validación (nombre, apellidos, DNI con regex, email, rol, contraseña ≥ 6, confirmar contraseña). Lógica pendiente (`js/pages/registro.js` está vacío).
- **pages/dashboard.html**: panel principal accesible solo con sesión. Incluye:
  - Bloque de usuario (nombre, rol, avatar) y botón Cerrar sesión.
  - Tabla de pacientes con búsqueda por nombre (keyup) y tratamiento asociado.
  - Tabla de doctores con búsqueda por nombre (keyup) y filtro por departamento (change).
  - Componente de citas con botones por estado (Pendientes, Confirmadas, Completadas, Canceladas, Todas) y total.
  - Listado de departamentos.
  - Menú lateral (hamburguesa) con navegación a Citas, Pacientes, Doctores, Tratamientos.
- **pages/pacientes.html**: gestión de pacientes con formulario de alta (nombre, apellidos, DNI, teléfono, tipo), tabla con filtros (nombre + tipo) y detalle del paciente seleccionado como Web Component `<paciente-detalle>`.
- **pages/doctores.html**: gestión de doctores con formulario de alta (nombre, apellidos, DNI, especialidad, departamento), tabla con filtros (nombre + departamento) y detalle del doctor seleccionado como Web Component `<medico-detalle>`.
- **css/**: `design-system.css` (tokens), `base.css`, `components.css` y estilos de página para login, registro, dashboard, pacientes y doctores.
- **js/utils.js**: `cargarGuardarEjecutar()` (fetch de JSON), `redirigirConSesion()`, `identificarUsuarioSesion()`, `pintarUsuario()`, `cerrarSession()`.
- **json/**: 6 archivos de seed poblados (usuarios, pacientes, medicos, departamentos, citas, tratamientos).
- Sesión con `sessionStorage`; redirección al login si no hay sesión.

### Pendiente

- **Páginas faltantes**: `citas.html` y `tratamientos.html` (no existen aún).
- **Lógica faltante**: `js/pages/citas.js` y `js/pages/tratamientos.js`.
- **`js/pages/registro.js`**: existe pero está vacío; hay que implementar la lógica de registro.
- **Clases del modelo**: faltan en `js/classes/` las clases `Departamento`, `Medico`, `Paciente`, `Cita`, `Tratamiento`, `Usuario` (constructor, ≥5 campos, ≥3 métodos cada una, `toJSON()`, `validar()`). Actualmente `js/classes/` solo tiene los Web Components de detalle.
- **Web Component del menú**: navegación como custom element (pendiente).
- **CRUD completo**: alta implementada en pacientes y doctores; modificar y eliminar no implementados en ninguna página.
- **Persistencia de datos**: solo se usa `sessionStorage` para la sesión; falta `localStorage` para los cambios del CRUD.
- **Temporizadores**: no se usa `setInterval` ni `setTimeout` (requisito obligatorio del proyecto).
- **localStorage para datos CRUD**: los cambios de alta no persisten al recargar.

---

Beckham Lawrence -- 2DAW 2026
