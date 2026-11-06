let usuarios = []
let pacientes = []
let tratamientos = []
cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)

onload = () => {
    cargarGuardarEjecutar(pacientes, "../json/pacientes.json", pintarTablaPacientes)
    document.getElementById("buscar-paciente")
        .addEventListener("keyup", filtrarPacientesNombre)
    document.getElementById("filtro-tipo-paciente")
        .addEventListener("change", filtrarPacientesTipo)
    document.getElementById("btn-hamburger")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-close")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-overlay")
        .addEventListener("click", toggleSidebar)
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

function toggleSidebar() {
    const sidebarClose = document.getElementById("sidebar-close")
    const sidebarPanel = document.getElementById("sidebar-panel")

    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}
