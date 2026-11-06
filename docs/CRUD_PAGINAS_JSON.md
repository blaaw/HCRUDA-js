# HCRUDA — Páginas CRUD, clases y datos JSON

> Guía de implementación para conectar clases JS, páginas HTML y archivos JSON de `json/` y poder hacer operaciones CRUD sobre listas y objetos individuales.

## 1. Patrón general (aplica a cualquier objeto: Paciente, Medico, Cita, Tratamiento, Departamento)

Cada objeto del modelo sigue tres capas separadas:

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Modelo | `js/classes/<Objeto>.js` | Campos, constructor, métodos propios (≥3), `toJSON()`, `validar()`. No sabe del DOM ni de `fetch`. |
| Datos seed | `json/<objeto>.json` | Array de objetos planos (sin métodos). Simula la base de datos. |
| Vista + lógica | `pages/<objeto>.html` + `js/pages/<objeto>.js` | Formulario, tabla, filtros, botones, fetch del JSON, array en memoria, CRUD, persistencia en `sessionStorage`/`localStorage`. |

---

## 2. La clase JS (`js/classes/Paciente.js`)

Ejemplo para **Paciente**. Cada objeto debe tener ≥5 campos, constructor y ≥3 métodos propios.

```javascript
class Paciente {
  constructor(id, nombre, apellidos, dni, telefono, tipo) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.telefono = telefono;
    this.tipo = tipo; // "urgencia" | "planta" | "casa"
  }

  // Método 1: validar campos del objeto
  validar() {
    // retorna true/false o array de errores
  }

  // Método 2: convertir a objeto plano para guardar en JSON o storage
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellidos: this.apellidos,
      dni: this.dni,
      telefono: this.telefono,
      tipo: this.tipo
    };
  }

  // Método 3: cambiar tipo de paciente
  cambiarTipo(nuevoTipo) {
    this.tipo = nuevoTipo;
  }
}
```

**Regla:** la clase no manipula el DOM, no llama a `fetch` ni a `sessionStorage`. Solo maneja datos y lógica de negocio del objeto.

---

## 3. El archivo JSON de seed (`json/pacientes.json`)

Array de objetos planos (sin métodos):

```json
[
  {
    "id": "P001",
    "nombre": "Luis Martín",
    "apellidos": "Hernández",
    "dni": "11111111A",
    "telefono": "600111222",
    "tipo": "urgencia"
  },
  ...
]
```

Al arrancar la app se hace `fetch` de este archivo, se recorre el array y se crean instancias de la clase:

```javascript
fetch("json/pacientes.json")
  .then(r => r.json())
  .then(data => {
    pacientes = data.map(p => new Paciente(
      p.id, p.nombre, p.apellidos, p.dni, p.telefono, p.tipo
    ));
    pintarTabla(pacientes);
  });
```

---

## 4. La página HTML (`pages/pacientes.html`)

Zonas mínimas que debe contener:

- **Listado:** tabla con `<tbody id="tabla-pacientes-body"></body>` que se rellena con JS.
- **Formulario CRUD:** oculto por defecto o en modal, con campos para alta y modificación.
  - `<input type="hidden" id="paciente-id">` para saber si se está editando o creando.
  - Campos: nombre, apellidos, DNI, teléfono, tipo (select).
- **Botones:**
  - "Nuevo paciente" (muestra el formulario limpio).
  - "Guardar" y "Cancelar" dentro del formulario.
  - Por cada fila de la tabla: "Editar" y "Eliminar" (con `data-id` para identificar el objeto).
- **Filtros:** search bar por nombre + select por tipo (reutilizable del dashboard).

Ejemplo mínimo de estructura:

```html
<section>
  <button id="btn-nuevo-paciente">Nuevo paciente</button>

  <form id="form-paciente" style="display:none;">
    <input type="hidden" id="paciente-id">
    <input type="text" id="paciente-nombre" required>
    <input type="text" id="paciente-apellidos" required>
    <input type="text" id="paciente-dni" required pattern="^[0-9]{8}[A-Z]$">
    <input type="text" id="paciente-telefono" required>
    <select id="paciente-tipo" required>
      <option value="urgencia">Urgencia</option>
      <option value="planta">Planta</option>
      <option value="casa">Casa</option>
    </select>
    <button type="button" id="btn-guardar-paciente">Guardar</button>
    <button type="button" id="btn-cancelar-paciente">Cancelar</button>
  </form>

  <table id="tabla-pacientes">
    <thead>
      <tr>
        <th>Nombre</th><th>Apellidos</th><th>DNI</th><th>Teléfono</th><th>Tipo</th><th>Acciones</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</section>
```

---

## 5. La lógica JS (`js/pages/pacientes.js`)

Este archivo orquesta todo. Mantiene un **array en memoria** que es la "base de datos" de la sesión.

### Flujo CRUD

**C — Create (alta):**
1. Usuario rellena formulario y pulsa "Guardar".
2. JS lee los campos, genera un `id` nuevo y crea `new Paciente(...)`.
3. Valida con `paciente.validar()`.
4. Añade al array: `pacientes.push(nuevoPaciente)`.
5. Guarda en `sessionStorage` (o `localStorage`).
6. Vuelve a pintar la tabla y oculta el formulario.

**R — Read (consultar):**
- Al cargar: `fetch` del JSON → instancias de clase → pintar tabla.
- Búsqueda por nombre y filtro por tipo filtran el array en memoria y vuelven a pintar.

**U — Update (modificar):**
1. Pulsa "Editar" en una fila.
2. JS busca el objeto en el array por `id`.
3. Rellena el formulario con esos valores y lo muestra.
4. Al guardar, busca el índice en el array y lo reemplaza: `pacientes[index] = pacienteActualizado`.
5. Guarda en storage y repinta.

**D — Delete (eliminar):**
1. Pulsa "Eliminar" en una fila.
2. Confirma.
3. `pacientes = pacientes.filter(p => p.id !== idABorrar)`.
4. Guarda en storage y repinta.

### Función de pintado (clave)

```javascript
function pintarTabla(lista) {
  const tbody = document.querySelector("#tabla-pacientes tbody");
  tbody.innerHTML = "";

  lista.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.apellidos}</td>
      <td>${p.dni}</td>
      <td>${p.telefono}</td>
      <td><span class="badge tipo--${p.tipo}">${p.tipo}</span></td>
      <td>
        <button class="btn-editar" data-id="${p.id}">Editar</button>
        <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Asignar event listeners a los botones de esta fila
  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", () => editarPaciente(btn.dataset.id));
  });
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => eliminarPaciente(btn.dataset.id));
  });
}
```

---

## 6. Relaciones entre objetos (claves foráneas simuladas)

No hay SQL real, pero se simulan relaciones con **IDs**:

- **Cita** → `pacienteId` y `medicoId` (referencian IDs existentes en `pacientes.json` y `medicos.json`).
- **Tratamiento** → `pacienteId` y `medicoId`.
- **Medico** → `departamentoId` (referencia a `departamentos.json`).

Al pintar citas o tratamientos, se busca el nombre por ID para mostrarlo legible:

```javascript
const medico = medicos.find(m => m.id === cita.medicoId);
// medico.nombre + " " + medico.apellidos
```

---

## 7. Persistencia (sin base de datos real)

| Momento | Qué se hace |
|---------|-------------|
| Carga inicial | `fetch` de `json/*.json` al abrir la app. |
| Tras cada CRUD | `sessionStorage.setItem("pacientes", JSON.stringify(pacientes))`. |
| Al recargar | Leer de `sessionStorage` si existe; si no, volver a `fetch` del JSON original. |

---

## 8. Orden de implementación recomendado

1. Crear `js/classes/Paciente.js` (constructor + ≥3 métodos + `toJSON()` + `validar()`).
2. Crear `pages/pacientes.html` (formulario oculto + tabla vacía con IDs en los elementos clave).
3. Crear `js/pages/pacientes.js` (fetch del JSON, array en memoria, CRUD, pintado, filtros, persistencia).
4. Conectar el botón "Pacientes" del menú del dashboard a esta página.
5. Repetir para Médicos, Citas, Tratamientos, Departamentos.

---

## 9. Archivos ya existentes en el proyecto (estado actual)

- `json/pacientes.json`: 8 pacientes con datos ficticios.
- `pages/dashboard.html`: ya incluye una tabla de pacientes con búsqueda por nombre y filtro por tipo (puede servir de referencia visual).
- `js/pages/dashboard.js`: ya tiene lógica de carga de pacientes y filtros (puede reutilizarse como modelo).
- `js/utils.js`: tiene `cargarGuardarEjecutar()` para hacer `fetch` de JSON y `redirigirConSesion()` para manejar sesión.
