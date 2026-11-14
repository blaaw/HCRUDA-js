let usuarios = []
let tratamientos = []
let pacientes = []
let doctores = []

cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)
cargarGuardarEjecutar(pacientes, "../json/pacientes.json")
cargarGuardarEjecutar(doctores, "../json/medicos.json")

onload = () => {
    cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json", pintarTablaTratamientos)
    document.getElementById("btn-logout")
        .addEventListener("click", cerrarSession)
    document.getElementById("buscar-tratamiento")
        .addEventListener("keyup", filtrarTratamientos)
    document.getElementById("filtro-todas")
        .addEventListener("click", () => filtrarTratamientosEstado(""))
    document.getElementById("filtro-activo")
        .addEventListener("click", () => filtrarTratamientosEstado("activo"))
    document.getElementById("filtro-suspendido")
        .addEventListener("click", () => filtrarTratamientosEstado("suspendido"))
    document.getElementById("filtro-finalizado")
        .addEventListener("click", () => filtrarTratamientosEstado("finalizado"))
    document.getElementById("btn-hamburger")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-close")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-overlay")
        .addEventListener("click", toggleSidebar)
}

function pintarTablaTratamientos(listaTratamientos) {
    const lista = document.getElementById("tratamientos-lista")
    let html = ""

    listaTratamientos.forEach(tratamiento => {
        let paciente = pacientes.find(p => p.id == tratamiento.pacienteId)
        let medico = doctores.find(m => m.id == tratamiento.medicoId)
        let nombrePaciente = paciente ? paciente.nombre + " " + paciente.apellidos : "Desconocido"
        let nombreMedico = medico ? medico.nombre + " " + medico.apellidos : "Desconocido"

        html += `
        <article class="tratamiento-item" data-id="${tratamiento.id}" data-estado="${tratamiento.estado}">
            <div class="tratamiento-item__header">
                <span class="tratamiento-item__id">${tratamiento.id}</span>
                <span class="badge estado--${tratamiento.estado}">${tratamiento.estado}</span>
                <button type="button" class="btn btn--danger btn-eliminar-tratamiento" onclick="eliminarTratamiento('${tratamiento.id}')" aria-label="Eliminar tratamiento ${tratamiento.id}">
                    Eliminar
                </button>
            </div>
            <div class="tratamiento-item__datos">
                <p><span class="tratamiento-item__etiqueta">Paciente:</span> ${nombrePaciente}</p>
                <p><span class="tratamiento-item__etiqueta">Médico:</span> ${nombreMedico}</p>
                <p><span class="tratamiento-item__etiqueta">Descripción:</span> ${tratamiento.descripcion}</p>
                <p><span class="tratamiento-item__etiqueta">Fecha inicio:</span> ${tratamiento.fechaInicio}</p>
            </div>
        </article>`
    })
    lista.innerHTML = html
}

function filtrarTratamientos() {
    const barraBusqueda = document.getElementById("buscar-tratamiento").value.toLowerCase()
    if (barraBusqueda.trim() !== "") {
        let tratamientosFiltrados = tratamientos.filter(tratamiento => {
            let paciente = pacientes.find(p => p.id == tratamiento.pacienteId)
            let medico = doctores.find(m => m.id == tratamiento.medicoId)
            let nombrePaciente = paciente ? (paciente.nombre + " " + paciente.apellidos).toLowerCase() : ""
            let nombreMedico = medico ? (medico.nombre + " " + medico.apellidos).toLowerCase() : ""
            return tratamiento.id.toLowerCase().includes(barraBusqueda)
                || tratamiento.descripcion.toLowerCase().includes(barraBusqueda)
                || nombrePaciente.includes(barraBusqueda)
                || nombreMedico.includes(barraBusqueda)
        })
        pintarTablaTratamientos(tratamientosFiltrados)
    } else {
        pintarTablaTratamientos(tratamientos)
    }
}

function filtrarTratamientosEstado(estado) {
    if (estado) {
        let tratamientosFiltrados = tratamientos.filter(tratamiento => tratamiento.estado == estado)
        pintarTablaTratamientos(tratamientosFiltrados)
    } else {
        pintarTablaTratamientos(tratamientos)
    }
}

function eliminarTratamiento(id) {
    if (confirm("¿Estás seguro de eliminar este tratamiento?")) {
        tratamientos = tratamientos.filter(t => t.id !== id)
        pintarTablaTratamientos(tratamientos)
    }
}

function toggleSidebar() {
    const sidebarClose = document.getElementById("sidebar-close")
    const sidebarPanel = document.getElementById("sidebar-panel")

    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}
