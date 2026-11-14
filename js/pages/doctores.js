let usuarios = []
let doctores = []
let departamentos = []
import { medico } from "../classes/componenteDoctor.js"
cargarGuardarEjecutar(departamentos, "../json/departamentos.json")
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)

onload = () => {
    cargarGuardarEjecutar(doctores, "../json/medicos.json", () => {
        pintarTablaDoctores(doctores)
        checkearComponenteDashboard("doctor-dashboard")
    })
    document.getElementById("btn-logout")
        .addEventListener("click", cerrarSession)
    document.getElementById("buscar-medico")
        .addEventListener("keyup", filtrarDoctoresNombre)
    document.getElementById("filtro-departamento-medico")
        .addEventListener("change", filtrarDoctoresDepartamento)
    document.getElementsByClassName("btn btn--primary")[0]
        .addEventListener("click", validarFurmulario)
    document.getElementById("btn-hamburger")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-close")
        .addEventListener("click", toggleSidebar)
    document.getElementById("sidebar-overlay")
        .addEventListener("click", toggleSidebar)
}

function pintarTablaDoctores(listaDoctores) {
    const tbody = document.querySelector("tbody")
    let html = ""    

    listaDoctores.forEach(doctor => {
        let departamento = departamentos.find(d => d.id == doctor.departamentoId)
        let nombreDepartamento = departamento ? departamento.nombre : "Sin departamento"
        let slugDepartamento = nombreDepartamento.toLowerCase()
            .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
            .replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n')
            .replace(/ /g, '')
        html += `
        <tr onclick=pintarComponente("${doctor.id}")>
            <td>${doctor.nombre}</td>
            <td>${doctor.apellidos}</td>
            <td>${doctor.dni}</td>
            <td>${doctor.especialidad}</td>
            <td><span class="badge departamento--${slugDepartamento}">${nombreDepartamento}</span></td>
        </tr>`
    })
    tbody.innerHTML = html
}

function pintarComponente(idDoctor) {
    document.querySelector("medico-detalle").remove()
    let medicoDetalle = document.createElement("medico-detalle")
    let doctor = doctores.find(d => d.id == idDoctor)
    let departamento = departamentos.find(dep => dep.id == doctor.departamentoId)
    
    console.log(doctor)
    medicoDetalle.setAttribute("medico", JSON.stringify(doctor))
    medicoDetalle.setAttribute("departamento", JSON.stringify(departamento))
    document.querySelector(".doctores-main")
        .insertAdjacentElement("afterbegin",medicoDetalle)

}
window.pintarComponente = pintarComponente

function filtrarDoctoresNombre() {
    const barraBusqueda = document.getElementById("buscar-medico").value
    let doctoresFiltrados = doctores
        .filter(doctor => doctor.nombre.includes(barraBusqueda) 
            || doctor.apellidos.includes(barraBusqueda))
    pintarTablaDoctores(doctoresFiltrados)
}

function filtrarDoctoresDepartamento(event) {
    const departamento = event.target.value
    if (departamento) {
    let doctoresFiltrados = doctores
        .filter(doctor => doctor.departamentoId == departamento)
    pintarTablaDoctores(doctoresFiltrados)
    } else {
        pintarTablaDoctores(doctores)
    }
    
}

function validarFurmulario(evento) {
    evento.preventDefault()
    let nombreInput = document.getElementById("nuevo-nombre")
    let apellidosInput = document.getElementById("nuevo-apellidos")
    let dniInput = document.getElementById("nuevo-dni")
    let especialidadInput = document.getElementById("nuevo-especialidad")
    let departamentoInput = document.getElementById("nuevo-departamento")
    let hayErrores = false

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(nombreInput.value.trim())) {
        nombreInput.value = "campo no valido"
        hayErrores = true
    }

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(apellidosInput.value.trim())) {
        apellidosInput.value = "campo no valido"
        hayErrores = true
    }

    if (!/^[0-9]{8}[A-Z]$/.test(dniInput.value.trim())) {
        dniInput.value = "campo no valido"
        hayErrores = true
    }

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]+/.test(especialidadInput.value.trim())) {
        especialidadInput.value = "campo no valido"
        hayErrores = true
    }

    if (!departamentoInput.value) {
        departamentoInput.value = "campo no valido"
        hayErrores = true
    }

    if (!hayErrores) {
        crearNuevoDoctor(
            nombreInput.value.trim(),
            apellidosInput.value.trim(),
            dniInput.value.trim(),
            especialidadInput.value.trim(),
            departamentoInput.value
        )

        nombreInput.value = ""
        apellidosInput.value = ""
        dniInput.value = ""
        especialidadInput.value = ""
        departamentoInput.value = ""
    }
}

function crearNuevoDoctor(nombre, apellidos, dni, especialidad, departamento) {
    const nuevoId = "D0" + ((doctores.length + 1) < 10 ? 
                        "0" + (doctores.length + 1 ) : 
                        doctores.length + 1)
    doctores.push({
        id: nuevoId,
        nombre,
        apellidos,
        dni,
        especialidad,
        departamento,
        departamentoId: departamento,
        foto: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 10)
    })
    alert("Doctor creado")
    pintarTablaDoctores(doctores)
}

function eliminarDoctor(id) {
    if (confirm("¿Estás seguro de eliminar este doctor?")) {
        doctores = doctores.filter(d => d.id !== id)
        pintarTablaDoctores(doctores)
        document.querySelector("medico-detalle").remove()
        let medicoDetalle = document.createElement("medico-detalle")
        document.querySelector(".doctores-main")
            .insertAdjacentElement("afterbegin",medicoDetalle)
    }
}
window.eliminarDoctor = eliminarDoctor

function toggleSidebar() {
    const sidebarPanel = document.getElementById("sidebar-panel")
    const sidebarOverlay = document.getElementById("sidebar-overlay")

    const isOpen = sidebarPanel.classList.toggle("open")
    sidebarOverlay.classList.toggle("open", isOpen)
}