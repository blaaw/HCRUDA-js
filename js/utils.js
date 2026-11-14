function cargarGuardarEjecutar(lista, url, funcion) {
    fetch(url)
        .then(texto => texto.json())
        .then(json => {
            lista.push(...json)
            if (funcion) funcion(json)
        })
        .catch(e => console.error(e))
}

function redirigirConSesion(usuario, rol, url) {
    let sesionUsuario = {"usuario": usuario,"rol": rol}
    window.sessionStorage.setItem("session", JSON.stringify(sesionUsuario))
    location.href = url
}

function identificarUsuarioSesion(usuarios) {
    let usuarioSession = undefined
    let session = {}
    if (window.sessionStorage.getItem("session")) {
        session = JSON.parse(window.sessionStorage.getItem("session"))
    } else {
        location.href = "../index.html"
    }

    usuarioSession = usuarios.find(usuario => usuario.id == session.usuario)
    if (!usuarioSession) {
        location.href = "../index.html"
    } else {
        pintarUsuario(usuarioSession.nombre, usuarioSession.rol)
    }
}

function pintarUsuario(nombre, rol) {
    document.getElementById("usuario-nombre")
        .textContent = nombre
    document.getElementById("usuario-rol")
        .textContent = rol
    document.getElementById("user__avatar")
        .textContent = nombre.charAt(0)
}

function mostrarComponentePorId(id, componente, url) {
    window.localStorage.setItem(componente + "-dashboard", id)
    location.href = url
}

function checkearComponenteDashboard(componente) {
    let componenteDashboard = window.localStorage.getItem(componente)
    if (componenteDashboard != null) {
        pintarComponente(componenteDashboard)
        window.localStorage.removeItem(componente)
    }
}

function validarFecha(textoFechaHora) {
    if (!textoFechaHora) return false
    let fechaHora = new Date(textoFechaHora)
    let ahora = new Date()
    ahora.setHours(ahora.getHours() + 24)
    return fechaHora >= ahora
}

function cerrarSession() {
    window.sessionStorage.removeItem("session")
    location.href = "../index.html"
}