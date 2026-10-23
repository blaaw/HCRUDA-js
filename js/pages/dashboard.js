let usuarioSession
let usuarios = []
let pacientes = []
let tratamientos = []
cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)
usuarioSession = undefined

onload = () => {
    cargarGuardarEjecutar(pacientes, "../json/pacientes.json", pintarTablaPacientes)
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

        html += `
        <tr>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.dni}</td>
            <td>${paciente.telefono}</td>
            <td><span class="badge tipo--${paciente.tipo}">${paciente.tipo}</span></td>
            <td>${estadoTratamiento}</td>
        </tr>`
    })
    tbody.innerHTML = html
}