let usuarios = []
let pacientes = []
let doctores = []
let departamentos = []
let citas = []
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)
cargarGuardarEjecutar(doctores, "../json/medicos.json")
cargarGuardarEjecutar(pacientes, "../json/pacientes.json")
cargarGuardarEjecutar(departamentos, "../json/departamentos.json")
cargarGuardarEjecutar(citas, "../json/citas.json")

onload = () => {
    document.getElementById("btn-logout")
        .addEventListener("click", cerrarSession)
    document.getElementById("buscar-paciente")
        .addEventListener("keyup", filtrarPacientesNombre)
    document.getElementById("buscar-doctor")
        .addEventListener("keyup", filtrarDoctoresNombre)
    document.getElementById("btn-hamburger")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-close")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-overlay")
        .addEventListener("click", toggleSidebar)
}


function pintarTablaPacientes(listaPacientes) {
    const tbody = document.querySelector("#tabla-pacientes tbody")
    let html = ""    

    listaPacientes.forEach(paciente => {
        html += `
        <tr onclick="mostrarPaciente('${paciente.id}')">
            <td>${paciente.nombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.telefono}</td>
            <td><span class="badge tipo--${paciente.tipo}">${paciente.tipo}</span></td>
        </tr>`
    })
    tbody.innerHTML = html
}

function pintarTablaDoctores(listaDoctores) {
    const tbody = document.querySelector("#tabla-doctores tbody")
    let html = ""    

    listaDoctores.forEach(doctor => {
        let departamento = departamentos.find(d => d.id == doctor.departamentoId)
        let nombreDepartamento = departamento ? departamento.nombre : "Sin departamento"
        html += `
        <tr onclick="mostrarDoctor('${doctor.id}')">
            <td>${doctor.nombre}</td>
            <td>${doctor.apellidos}</td>
            <td><span class="badge departamento--${nombreDepartamento.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/ /g,'')}">${nombreDepartamento}</span></td>
            <td>${doctor.especialidad}</td>
        </tr>`
    })
    tbody.innerHTML = html
}

function filtrarPacientesNombre() {
    const barraBusqueda = document.getElementById("buscar-paciente").value
    if (barraBusqueda.trim() !== "") {
        let pacientesFiltrados = pacientes
            .filter(paciente => paciente.nombre.includes(barraBusqueda) 
                || paciente.apellidos.includes(barraBusqueda))
        pintarTablaPacientes(pacientesFiltrados)
    }
}

function filtrarDoctoresNombre() {
    const barraBusqueda = document.getElementById("buscar-doctor").value
    if (barraBusqueda.trim() !== "") {
        let doctoresFiltrados = doctores
            .filter(doctor => doctor.nombre.includes(barraBusqueda) 
                || doctor.apellidos.includes(barraBusqueda))
        pintarTablaDoctores(doctoresFiltrados)
    }
}

function toggleSidebar() {
    const sidebarClose = document.getElementById("sidebar-close")
    const sidebarPanel = document.getElementById("sidebar-panel")

    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}

//TODO: transformar esto en una unica funcion general de utils
function mostrarPaciente(id) {
    window.localStorage.setItem("paciente-dashboard", id)
    location.href = "pacientes.html"
}

function mostrarDoctor(id) {
    window.localStorage.setItem("doctor-dashboard", id)
    location.href = "doctores.html"
}
