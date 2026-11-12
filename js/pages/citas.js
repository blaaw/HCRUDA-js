let usuarios = []
let citas = []
let pacientes = []
let doctores = []

cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)
cargarGuardarEjecutar(pacientes, "../json/pacientes.json")
cargarGuardarEjecutar(doctores, "../json/medicos.json")

onload = () => {
    cargarGuardarEjecutar(citas, "../json/citas.json", pintarTablaCitas)
    document.getElementById("btn-logout")
        .addEventListener("click", cerrarSession)
    document.getElementById("buscar-cita")
        .addEventListener("keyup", filtrarCitas)
    document.getElementById("filtro-todas")
        .addEventListener("click", () => filtrarCitasEstado(""))
    document.getElementById("filtro-pendiente")
        .addEventListener("click", () => filtrarCitasEstado("pendiente"))
    document.getElementById("filtro-confirmada")
        .addEventListener("click", () => filtrarCitasEstado("confirmada"))
    document.getElementById("filtro-completada")
        .addEventListener("click", () => filtrarCitasEstado("completada"))
    document.getElementById("filtro-cancelada")
        .addEventListener("click", () => filtrarCitasEstado("cancelada"))
    document.getElementById("btn-hamburger")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-close")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-overlay")
        .addEventListener("click", toggleSidebar)
}

function pintarTablaCitas(listaCitas) {
    const lista = document.getElementById("citas-lista")
    let html = ""

    listaCitas.forEach(cita => {
        let paciente = pacientes.find(p => p.id == cita.pacienteId)
        let medico = doctores.find(m => m.id == cita.medicoId)
        let nombrePaciente = paciente ? paciente.nombre + " " + paciente.apellidos : "Desconocido"
        let nombreMedico = medico ? medico.nombre + " " + medico.apellidos : "Desconocido"

        html += `
        <article class="cita-item" data-id="${cita.id}" data-estado="${cita.estado}">
            <div class="cita-item__header">
                <span class="cita-item__id">${cita.id}</span>
                <span class="badge estado--${cita.estado}">${cita.estado}</span>
                <button type="button" class="btn btn--danger btn-eliminar-cita" aria-label="Eliminar cita ${cita.id}">
                    Eliminar
                </button>
            </div>
            <div class="cita-item__datos">
                <p><span class="cita-item__etiqueta">Paciente:</span> ${nombrePaciente}</p>
                <p><span class="cita-item__etiqueta">Médico:</span> ${nombreMedico}</p>
                <p><span class="cita-item__etiqueta">Fecha:</span> ${cita.fecha}</p>
                <p><span class="cita-item__etiqueta">Hora:</span> ${cita.hora}</p>
            </div>
        </article>`
    })
    lista.innerHTML = html

    document.querySelectorAll(".btn-eliminar-cita").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.closest(".cita-item").dataset.id
            eliminarCita(id)
        })
    })
}

function filtrarCitas() {
    const barraBusqueda = document.getElementById("buscar-cita").value.toLowerCase()
    if (barraBusqueda.trim() !== "") {
        let citasFiltradas = citas.filter(cita => {
            let paciente = pacientes.find(p => p.id == cita.pacienteId)
            let medico = doctores.find(m => m.id == cita.medicoId)
            let nombrePaciente = paciente ? (paciente.nombre + " " + paciente.apellidos).toLowerCase() : ""
            let nombreMedico = medico ? (medico.nombre + " " + medico.apellidos).toLowerCase() : ""
            return cita.id.toLowerCase().includes(barraBusqueda)
                || cita.motivo.toLowerCase().includes(barraBusqueda)
                || nombrePaciente.includes(barraBusqueda)
                || nombreMedico.includes(barraBusqueda)
        })
        pintarTablaCitas(citasFiltradas)
    } else {
        pintarTablaCitas(citas)
    }
}

function filtrarCitasEstado(estado) {
    if (estado) {
        let citasFiltradas = citas.filter(cita => cita.estado == estado)
        pintarTablaCitas(citasFiltradas)
    } else {
        pintarTablaCitas(citas)
    }
}

function eliminarCita(id) {
    if (confirm("¿Estás seguro de eliminar esta cita?")) {
        citas = citas.filter(c => c.id !== id)
        pintarTablaCitas(citas)
    }
}

function toggleSidebar() {
    const sidebarClose = document.getElementById("sidebar-close")
    const sidebarPanel = document.getElementById("sidebar-panel")

    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}
