# HCRUDA — Estructura de archivos y páginas

> Documento de referencia para organizar el proyecto. Sin código de ejemplo: solo estructura y responsabilidades.

## 1. Estructura de carpetas y archivos

```
/ (raíz del proyecto)
├── index.html              → Página de login (punto de entrada, ya creada)
├── pages/                  → Todas las páginas HTML de la aplicación
│   ├── registro.html       → Página de registro de usuarios (ya creada)
│   ├── dashboard.html      → Panel principal con resumen, componente citas y tabla pacientes (ya creada)
│   ├── citas.html          → Gestión de citas (pendiente de crear)
│   ├── pacientes.html      → Gestión de pacientes (ya creada: formulario alta/edición, filtros, tabla)
│   ├── doctores.html       → Gestión de doctores (pendiente de crear)
│   └── tratamientos.html   → Gestión de tratamientos (pendiente de crear)
├── css/                    → Hojas de estilo
│   ├── design-system.css   → Tokens CSS y variables del diseño (neumorphism) (ya creada)
│   ├── base.css            → Estilos globales (html, body, reset, tipografía) (ya creada)
│   ├── components.css      → Componentes reutilizables: .btn, .input, .select, .textarea, .card, .badge, .nm-divider (ya creada)
│   └── pages/              → Estilos específicos por página
│       ├── login.css       → (ya creada)
│       ├── registro.css    → (ya creada, con ajuste mobile)
│       └── dashboard.css   → (ya creada: resumen, componente citas, tabla pacientes, badges de tipo y estado)
│       └── pacientes.css   → (ya creada: formulario, filtros, tabla, menú lateral)
├── js/                     → Todo el JavaScript
│   ├── utils.js            → Funciones auxiliares compartidas (fetch JSON, redirección con sesión) (ya creada)
│   ├── pages/              → Lógica de cada página
│   │   ├── login.js        → Validación de login y redirección (ya creada)
│   │   ├── registro.js     → Archivo vacío, pendiente de implementar (ya existe)
│   │   └── dashboard.js    → Carga de datos, pintado de tabla de pacientes, filtros por nombre y tipo (ya creada)
│   └── classes/            → Clases de objetos del modelo (pendiente de crear)
│       ├── Departamento.js
│       ├── Medico.js
│       ├── Paciente.js
│       ├── Cita.js
│       ├── Tratamiento.js
│       └── Usuario.js
├── json/                   → Datos de simulación (seed, ya creados)
│   ├── departamentos.json  → 3 items
│   ├── medicos.json        → 5 items
│   ├── pacientes.json      → 8 items
│   ├── citas.json          → 6 items
│   ├── tratamientos.json   → 4 items
│   └── usuarios.json       → 2 items
├── public/                 → Recursos estáticos (imágenes del logo/favicon)
├── docker-compose.yml      → Servicio nginx en puerto 8300 sirviendo desde la raíz
├── .gitignore              → Ignora .env/ y opencode.json
└── opencode.json           → Configuración de instrucciones de OpenCode (ignorado en git)
```

### Estilo unificado de inputs

Todos los `<input>`, `<select>` y `<textarea>` de la aplicación usan la clase `.input` definida en `css/components.css`. Ese estilo es:
- Fondo cóncavo (`--grad-sunken`) con sombra inset (`--sh-inset-2`)
- Radio `--r-md`, altura mínima 44px, padding horizontal `--sp-4`
- En `:focus-visible` se añade anillo cian (`--cyan-400`) y glow
- Nunca se escriben hex ni sombras a mano fuera de los tokens

### Reglas de separación en JavaScript

- **`utils.js`**: funciones puras y auxiliares sin estado de negocio (fetch JSON, redirección con sesión). Ninguna depende de una página concreta.
- **`classes/`**: una clase por archivo. Cada clase encapsula campos, constructor, métodos de validación y métodos propios (≥3 por clase). No contienen lógica de DOM ni navegación.
- **`pages/`**: un archivo JS por página HTML. Solo lógica de interacción: eventos del formulario, instanciar clases, llamar a `utils`, renderizar listas, filtrar, ordenar, CRUD en memoria.

Ningún archivo de `pages/` debe duplicar lógica que pertenezca a `utils.js` o a una clase de `classes/`.

## 2. Páginas de la aplicación (mínimo 6 requeridas)

### index.html — Login (ya creada)
- Entrada única de la aplicación.
- Formulario de acceso con usuario y contraseña.
- Validación de campos vacíos antes de enviar.
- Al autenticar, guarda sesión en `sessionStorage` y redirige al dashboard.
- Enlace a la página de registro.
- Inputs con clase `.input` (estilo unificado).

### registro.html — Registro de usuario (ya creada)
- Formulario de alta de nuevo usuario (médico o enfermero).
- Campos: nombre, apellidos, DNI, email, rol, contraseña, confirmar contraseña.
- Validación con expresiones regulares (formato DNI, longitud de contraseña, campos obligatorios).
- Inputs y select con clase `.input` (estilo unificado).
- Archivo `js/pages/registro.js` existe pero está vacío: pendiente de implementar la lógica de registro.

### dashboard.html — Panel principal (ya creada)
- **Solo accesible si hay sesión iniciada.** Si no, redirige al login.
- Header con logo, título, bloque de usuario (avatar + nombre y rol a la derecha, antes de Cerrar sesión) y botón Cerrar sesión.
- **Resumen arriba**: tarjetas de Doctores y Tratamientos activos con valores numéricos.
- **Componente pequeño de citas**: botones por estado (Pendientes, Confirmadas, Completadas, Canceladas, Todas) con total de citas más grande debajo.
- **Sección pacientes**: search bar para buscar por nombre + select para filtrar por tipo (Todos/Urgencia/Planta/Casa) + tabla de pacientes con columnas: Nombre, Apellidos, DNI, Teléfono, Tipo (badge de color), Tratamiento (badge de estado o `---`).
- Filtros activos: búsqueda por nombre (keyup) y filtro por tipo (change).

### citas.html — Gestión de citas (pendiente de crear)
- CRUD completo de citas: listado, alta, modificar, eliminar.
- Filtrado por fecha, médico, paciente o estado. Ordenado por distintos campos.

### pacientes.html — Gestión de pacientes (ya creada)
- Layout de dos columnas en el main:
  - Izquierda (`.pacientes-detalle`): detalle del paciente seleccionado con foto de perfil (avatar desde pravatar.cc), nombre, DNI, teléfono, tipo (badge), y botones de acción (Editar, Eliminar, Ver historial clínico).
  - Derecha (`.pacientes-tabla-seccion`): filtros (search bar por nombre + select por tipo) y tabla reducida con columnas: Nombre, Apellidos, DNI, Teléfono, Tipo, Acciones.
- Menú lateral con hamburguesa idéntico al dashboard.
- Sin formulario de alta/edición oculto; las acciones se hacen desde el detalle o desde los botones de fila.

### doctores.html — Gestión de doctores (pendiente de crear)
- Debe seguir el **patrón de layout base** (ver sección 3).
- CRUD completo de doctores: nombre, apellidos, DNI, especialidad, departamento.
- Filtrado por departamento o especialidad.

### tratamientos.html — Gestión de tratamientos (pendiente de crear)
- Debe seguir el **patrón de layout base** (ver sección 3).
- CRUD completo de tratamientos: descripción, fecha inicio, estado, médico, paciente.

### citas.html — Gestión de citas (pendiente de crear)
- Debe seguir el **patrón de layout base** (ver sección 3).
- CRUD completo de citas: listado, alta, modificar, eliminar.
- Filtrado por fecha, médico, paciente o estado. Ordenado por distintos campos.

## 3. Patrón de layout base (logo + sidebar)

Todas las páginas de gestión (`dashboard.html`, `pacientes.html`, y las pendientes `citas.html`, `doctores.html`, `tratamientos.html`) comparten esta estructura de header y menú lateral. No se debe modificar el logo ni su tamaño.

### 3.1 HTML — Estructura obligatoria

```html
<div class="<pagina>-container">
  <!-- Overlay del menú lateral -->
  <div class="sidebar-overlay" id="sidebar-overlay"></div>

  <!-- Panel vertical de navegación -->
  <nav class="sidebar-panel" id="sidebar-panel">
    <button class="sidebar-close" id="sidebar-close" aria-label="Cerrar menú">✕</button>
    <ul class="sidebar-menu">
      <li><a href="citas.html" class="sidebar-link">Citas</a></li>
      <li><a href="pacientes.html" class="sidebar-link">Pacientes</a></li>
      <li><a href="doctores.html" class="sidebar-link">Doctores</a></li>
      <li><a href="tratamientos.html" class="sidebar-link">Tratamientos</a></li>
    </ul>
  </nav>

  <header class="<pagina>-header">
    <div class="<pagina>-brand">
      <!-- HAMBURGUESA SIEMPRE A LA IZQUIERDA DEL LOGO -->
      <button class="btn-hamburger" id="btn-hamburger" aria-label="Abrir menú de navegación">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <!-- LOGO: no tocar su tamaño ni sus clases -->
      <div class="<pagina>-logo nm-sign" style="--r: var(--r-md);">
        <img src="../public/34a7e23742c910627feb9b92baabdf71.jpg" alt="Logo HCRUDA" />
      </div>
      <h1 class="<pagina>-title">Título de la página</h1>
    </div>

    <div class="<pagina>-user">
      <div class="<pagina>-user__avatar">U</div>
      <div class="<pagina>-user__info">
        <span class="<pagina>-user__name" id="usuario-nombre">Usuario</span>
        <span class="<pagina>-user__rol" id="usuario-rol">Rol</span>
      </div>
    </div>

    <button type="button" class="btn btn-logout" id="btn-logout">
      Cerrar sesión
    </button>
  </header>

  <main class="<pagina>-main">
    <!-- Contenido específico de cada página -->
  </main>
</div>
```

**Reglas clave del layout:**
- El botón hamburguesa (`.btn-hamburger`) va **siempre antes del logo** dentro de `.<pagina>-brand`.
- El logo (`.<pagina>-logo nm-sign`) **no se modifica**: conserva `width: 70px`, `height: 70px`, `img` a `60px`, y `nm-sign` con `--r: var(--r-md)`.
- El bloque de usuario (`.<pagina>-user`) lleva `margin-left: auto` para ir a la derecha, antes del botón Cerrar sesión.
- El orden en el header es siempre: **brand → user → logout**.

### 3.2 CSS — Clases reutilizables

Copiar este bloque en el CSS de cada página nueva, adaptando el prefijo `<pagina>`:

```css
.<pagina>-container {
  min-height: 100vh;
  padding: var(--sp-6);
}

.<pagina>-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-7);
  flex-wrap: wrap;
  gap: var(--sp-4);
}

.<pagina>-brand {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.<pagina>-logo {
  width: 70px;
  height: 70px;
  border-radius: var(--r-md);
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.<pagina>-logo img {
  width: 60px;
  height: 60px;
  border-radius: var(--r-sm);
}

.<pagina>-title {
  font: 600 22px/30px var(--font-sans);
  color: var(--text-strong);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wordmark);
}

.<pagina>-user {
  margin-left: auto;
  min-width: 300px;
  max-width: 460px;
  padding: var(--sp-3) var(--sp-5);
  background: var(--grad-raised);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-raised-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
}

.<pagina>-user__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--r-pill);
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
  font-size: 16px;
  color: var(--text-strong);
}

.<pagina>-user__info {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 0;
  flex: 1;
}

.<pagina>-user__name {
  font: 600 14px/1 var(--font-sans);
  color: var(--text-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.<pagina>-user__rol {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-logout {
  --r: var(--r-md);
  min-height: 40px;
  padding: 0 var(--sp-4);
  font: 600 12px/1 var(--font-sans);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  color: var(--text-strong);
  background: var(--grad-raised);
  border: 0;
  border-radius: var(--r);
  box-shadow: var(--sh-raised-1);
  cursor: pointer;
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.btn-logout:hover {
  box-shadow: var(--sh-raised-2);
  transform: translateY(-1px);
}

.btn-logout:focus-visible {
  outline: none;
  box-shadow: var(--sh-raised-1), var(--focus-ring);
}

/* Sidebar */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgb(43 51 64 / 0.4);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--dur) var(--ease), visibility var(--dur) var(--ease);
}

.sidebar-overlay.open {
  opacity: 1;
  visibility: visible;
}

.sidebar-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-3);
  z-index: 101;
  transform: translateX(-100%);
  transition: transform var(--dur-slow) var(--ease);
  display: flex;
  flex-direction: column;
  padding: var(--sp-6) var(--sp-4);
  overflow-y: auto;
}

.sidebar-panel.open {
  transform: translateX(0);
}

.sidebar-close {
  --r: var(--r-md);
  width: 40px;
  height: 40px;
  background: var(--grad-raised);
  border: 0;
  border-radius: var(--r);
  box-shadow: var(--sh-raised-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-strong);
  margin-bottom: var(--sp-6);
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.sidebar-close:hover {
  box-shadow: var(--sh-raised-2);
  transform: translateY(-1px);
}

.sidebar-close:focus-visible {
  outline: none;
  box-shadow: var(--sh-raised-1), var(--focus-ring);
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  font: 500 14px/1 var(--font-sans);
  color: var(--text-default);
  border-radius: var(--r-lg);
  text-decoration: none;
  background: var(--nm-bg);
  box-shadow: var(--sh-inset-1);
  transition: box-shadow var(--dur) var(--ease), background var(--dur) var(--ease), color var(--dur) var(--ease);
}

.sidebar-link:hover,
.sidebar-link:focus-visible {
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-1);
  color: var(--text-strong);
  outline: none;
}

.sidebar-link:focus-visible {
  box-shadow: var(--sh-raised-1), var(--focus-ring);
}

.sidebar-link--active {
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-1);
  color: var(--cyan-700);
}

/* Hamburguesa */
.btn-hamburger {
  --r: var(--r-md);
  width: 44px;
  height: 44px;
  background: var(--grad-raised);
  border: 0;
  border-radius: var(--r);
  box-shadow: var(--sh-raised-1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: var(--sp-3);
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.btn-hamburger:hover {
  box-shadow: var(--sh-raised-2);
  transform: translateY(-1px);
}

.btn-hamburger:focus-visible {
  outline: none;
  box-shadow: var(--sh-raised-1), var(--focus-ring);
}

.hamburger-line {
  display: block;
  width: 20px;
  height: 1px;
  background: var(--text-muted);
  border-radius: var(--r-xs);
  margin: 3px 0;
  transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease), background var(--dur) var(--ease);
}
```

### 3.3 JavaScript — Toggle del sidebar

Añadir en el JS de cada página:

```javascript
const btnHamburger = document.getElementById("btn-hamburger")
const sidebarPanel = document.getElementById("sidebar-panel")
const sidebarOverlay = document.getElementById("sidebar-overlay")
const sidebarClose = document.getElementById("sidebar-close")

function toggleSidebar() {
    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}

btnHamburger.addEventListener("click", toggleSidebar)
sidebarClose.addEventListener("click", toggleSidebar)
sidebarOverlay.addEventListener("click", toggleSidebar)
```

## 4. Web Component del menú

- Debe ser un **componente Web nativo** (custom element).
- Se ubicará en el dashboard (y opcionalmente en otras páginas).
- Muestra enlaces de navegación según el rol del usuario logueado.
- Solo aparece si el usuario está logueado.
- Pendiente de implementar.

## 4. Flujo de navegación recomendado

1. Usuario llega a `index.html` (login).
2. Si no tiene cuenta, va a `registro.html`, se registra y vuelve al login.
3. Tras iniciar sesión, llega a `dashboard.html`.
4. Desde el dashboard navega al resto de páginas de gestión.
5. Desde cualquier página puede volver al dashboard o cerrar sesión.

## 5. Dónde vive cada cosa (resumen por capa)

| Capa | Carpeta | Qué contiene |
|------|---------|--------------|
| Entrada | raíz (`index.html`) | Login |
| Vistas | `pages/*.html` | Una HTML por pantalla (registro, dashboard, citas, pacientes, doctores, tratamientos) |
| Estilos | `css/` | Tokens del diseño, base, componentes y estilos por página |
| Utilidades | `js/utils.js` | Funciones auxiliares compartidas |
| Modelo | `js/classes/*.js` | Clases de objetos (Departamento, Medico, Paciente, Cita, Tratamiento, Usuario) — pendiente |
| Lógica de página | `js/pages/*.js` | Interacción DOM, eventos, CRUD y renderizado de cada pantalla |
| Datos seed | `json/*.json` | Datos iniciales que simulan una base de datos (sin servidor real) |

## 6. Requisitos del proyecto que esta estructura cumple

- ≥ 6 páginas HTML: login, registro, dashboard, citas, pacientes, doctores (+ tratamientos opcional).
- Página de login y registro con validación de formularios (regex, tipos).
- Menú como componente Web (pendiente de implementar).
- Gestión de ≥ 2 tipos de objetos con relación (pacientes y doctores, citas y tratamientos, etc.).
- Cada objeto con ≥ 5 campos, constructor y ≥ 3 métodos (en `js/classes/` — pendiente).
- CRUD completo (alta, modificar, eliminar, consultar) en las páginas de gestión.
- Filtrado y ordenado por distintos campos en los listados.
- Eventos variados (click en botones, keypress en formularios, cambio de selects).
- Uso obligatorio de `setInterval` y `setTimeout`.
- Carga inicial de objetos desde `json/` (no partir del sistema vacío).
- Uso de `sessionStorage` y `localStorage` para sesión y datos.
- Código organizado, comentado, con nombres legibles.
