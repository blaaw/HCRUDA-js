let usuarioSession
let usuarios = []
let pacientes = []
let tratamientos = []
usuarioSession = undefined
cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)

onload = () => {
    cargarGuardarEjecutar(pacientes, "../json/pacientes.json", pintarTablaPacientes)
    document.getElementById("buscar-paciente")
        .addEventListener("keyup", filtrarPacientesNombre)
    document.getElementById("filtro-tipo-paciente")
        .addEventListener("change", filtrarPacientesTipo)
}

function identificarUsuarioSesion(usuarios) {
    let session = {}
    if (window.sessionStorage.getItem("session")) {
        session = JSON.parse(window.sessionStorage.getItem("session"))
    } else {
        location.href = "../index.html"
    }

    usuarioSession = usuarios.find(usuario => usuario.id == session.usuario)
    if (usuarioSession) {
        pintarUsuario(usuarioSession.nombre, usuarioSession.rol)
    } else {
        location.href = "../index.html"
    }
}

function pintarUsuario(nombre, rol) {
    document.getElementById("usuario-nombre")
        .textContent = nombre
    document.getElementById("usuario-rol")
        .textContent = rol
    document.getElementsByClassName("dashboard-user__avatar")[0]
        .textContent = nombre.charAt(0)
}

function pintarTablaPacientes(listaPacientes) {
    const tbody = document.querySelector("tbody")
    let html = ""    

    listaPacientes.forEach(paciente => {
        let tratamientoPaciente = tratamientos
            .find(tratamiento => tratamiento.pacienteId == paciente.id)
        let estadoTratamiento = "---"
        if (tratamientoPaciente) {
           estadoTratamiento = tratamientoPaciente.estado 
        }

        let claseEstado = estadoTratamiento !== "---" ? `estado--${estadoTratamiento}` : ""
        html += `
        <tr>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.dni}</td>
            <td>${paciente.telefono}</td>
            <td><span class="badge tipo--${paciente.tipo}">${paciente.tipo}</span></td>
            <td>${estadoTratamiento !== "---" 
                ? `<span class="badge ${claseEstado}">${estadoTratamiento}</span>` 
                : estadoTratamiento}</td>
        </tr>`
    })
    tbody.innerHTML = html
}

function filtrarPacientesNombre() {
    const barraBusqueda = document.getElementById("buscar-paciente").value
    let pacientesFiltrados = pacientes
        .filter(paciente => paciente.nombre.includes(barraBusqueda) 
            || paciente.apellidos.includes(barraBusqueda))
    pintarTablaPacientes(pacientesFiltrados)
}

function filtrarPacientesTipo(event) {
    const tipo = event.target.value
    if (tipo) {
    let pacientesFiltrados = pacientes
        .filter(paciente => paciente.tipo == tipo)
    pintarTablaPacientes(pacientesFiltrados)
    } else {
        pintarTablaPacientes(pacientes)
    }
    
}

/* ───────── Menú lateral (hamburguesa) ───────── */

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