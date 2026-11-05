let usuarios = []
let pacientes = []
let tratamientos = []
import { paciente } from "../classes/Paciente.js"
cargarGuardarEjecutar(tratamientos, "../json/tratamientos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)

onload = () => {
    cargarGuardarEjecutar(pacientes, "../json/pacientes.json", pintarTablaPacientes)
    document.getElementById("buscar-paciente")
        .addEventListener("keyup", filtrarPacientesNombre)
    document.getElementById("filtro-tipo-paciente")
        .addEventListener("change", filtrarPacientesTipo)
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