let usuarios = []
let pacientes = []
let tratamientos = []
import { paciente } from "../classes/componentePaciente.js"
cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)

onload = () => {
    cargarGuardarEjecutar(pacientes, "../json/pacientes.json", pintarTablaPacientes)
    document.getElementById("buscar-paciente")
        .addEventListener("keyup", filtrarPacientesNombre)
    document.getElementById("filtro-tipo-paciente")
        .addEventListener("change", filtrarPacientesTipo)
    document.getElementsByClassName("btn btn--primary")[0]
        .addEventListener("click", validarFurmulario)
}

function pintarTablaPacientes(listaPacientes) {
    const tbody = document.querySelector("tbody")
    let html = ""    

    listaPacientes.forEach(paciente => {
        html += `
        <tr onclick=pintarComponente("${paciente.id}")>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.telefono}</td>
            <td><span class="badge tipo--${paciente.tipo}">${paciente.tipo}</span></td>
        </tr>`
    })
    tbody.innerHTML = html
}

function pintarComponente(idPaciente) {
    document.querySelector("paciente-detalle").remove()
    let pacienteDetalle = document.createElement("paciente-detalle")
    let paciente = pacientes.find(p => p.id == idPaciente)
    let tratamiento = tratamientos.find(t => t.pacienteId == idPaciente)
    
    console.log(paciente)
    pacienteDetalle.setAttribute("paciente", JSON.stringify(paciente))
    pacienteDetalle.setAttribute("tratamiento", JSON.stringify(tratamiento))
    document.querySelector(".pacientes-main")
        .insertAdjacentElement("afterbegin",pacienteDetalle)

}
window.pintarComponente = pintarComponente

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

function validarFurmulario(evento) {
    evento.preventDefault()
    let nombreInput = document.getElementById("nuevo-nombre")
    let apellidosInput = document.getElementById("nuevo-apellidos")
    let dniInput = document.getElementById("nuevo-dni")
    let telefonoInput = document.getElementById("nuevo-telefono")
    let tipoInput = document.getElementById("nuevo-tipo")
    let hayErrores = false

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(nombreInput.value.trim())) {
        nombreInput.style.borderColor = "red"
        hayErrores = true
    }

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(apellidosInput.value.trim())) {
        apellidosInput.style.borderColor = "red"
        hayErrores = true
    }

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(dniInput.value.trim())) {
        dniInput.style.borderColor = "red"
        hayErrores = true
    }

    if (!/^\d{9}$/.test(telefonoInput.value.trim())) {
        telefonoInput.style.borderColor = "red"
        hayErrores = true
    }

    if (!hayErrores) {
        crearNuevoPaciente(
            nombreInput.value.trim(),
            apellidosInput.value.trim(),
            dniInput.value.trim(),
            telefonoInput.value.trim(),
            tipoInput.value
        )
    }
}

function crearNuevoPaciente(nombre, apellidos, dni, telefono, tipo) {
    const nuevoId = "P0" + ((pacientes.length + 1) < 10 ? 
                        "0" + (pacientes.length + 1 ) : 
                        pacientes.length + 1)
    pacientes.push({
        id: nuevoId,
        nombre,
        apellidos,
        dni,
        telefono,
        tipo,
        foto: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 10)
    })
    pintarTablaPacientes(pacientes)
}