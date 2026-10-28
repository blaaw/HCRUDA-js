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
│   ├── pacientes.html      → Gestión de pacientes (pendiente de crear)
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

### pacientes.html — Gestión de pacientes (pendiente de crear)
- CRUD completo de pacientes: nombre, apellidos, DNI, teléfono, tipo.
- Filtrado por tipo y ordenado por nombre, DNI o tipo.

### doctores.html — Gestión de doctores (pendiente de crear)
- CRUD completo de doctores: nombre, apellidos, DNI, especialidad, departamento.
- Filtrado por departamento o especialidad.

### tratamientos.html — Gestión de tratamientos (pendiente de crear)
- CRUD completo de tratamientos: descripción, fecha inicio, estado, médico, paciente.

## 3. Web Component del menú

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
