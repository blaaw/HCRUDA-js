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
    document.getElementById("btn-anadir-cita")
        .addEventListener("click", validarFormulario)
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
                <button type="button" class="btn btn--danger btn-eliminar-cita" onclick="eliminarCita('${cita.id}')" aria-label="Eliminar cita ${cita.id}">
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

function validarFormulario(){
    let pacienteIdInput = document.getElementById("cita-paciente-id")
    let doctorIdInput = document.getElementById("cita-medico-id")
    let fechaHoraInput = document.getElementById("cita-fecha-hora")
    let motivoInput = document.getElementById("cita-motivo")
    let estadoInput = document.getElementById("cita-estado")
    let hayErrores = false

    let pacienteValido = pacientes.findIndex(p => p.id == pacienteIdInput.value.trim())
    if (pacienteValido == -1) {
        pacienteIdInput.value = "paciente no existente"
        hayErrores = true
    }

    let doctorValido = doctores.findIndex(d => d.id == doctorIdInput.value.trim())
    if (doctorValido == -1) {
        doctorIdInput.value = "doctor no existente"
        hayErrores = true
    }

    if (!validarFecha(fechaHoraInput.value)) {
        fechaHoraInput.value = ""
        hayErrores = true
    }

    if (motivoInput.value.trim() == "") {
        motivoInput.value = "Rellene el motivo de la cita"
        hayErrores = true
    }

    if (!hayErrores) {
        crearNuevaCita(
            pacienteIdInput.value.trim(),
            doctorIdInput.value.trim(),
            fechaHoraInput.value,
            motivoInput.value.trim(),
            estadoInput.value
        )

        pacienteIdInput.value = ""
        doctorIdInput.value = ""
        fechaHoraInput.value = ""
        motivoInput.value = ""
        estadoInput.value = ""
    }
}

function crearNuevaCita(pacienteId, doctorId, fechaHora, motivo, estado) {
    const nuevoId = "C0" + ((citas.length + 1) < 10 ? "0" + (citas.length + 1) : citas.length + 1)

    let fecha = ""
    let hora = ""
    const partes = fechaHora.split("T")
    fecha = partes[0]
    hora = partes[1]
    
    const nuevaCita = {
        id: nuevoId,
        pacienteId: pacienteId,
        medicoId: doctorId,
        fecha: fecha,
        hora: hora,
        motivo: motivo,
        estado: estado
    }

    citas.push(nuevaCita)
    pintarTablaCitas(citas)
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
