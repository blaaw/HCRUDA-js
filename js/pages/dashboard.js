let usuarioSession
let usuarios = []
cargarGuardarEjecutar(usuarios, "../json/usuarios.json", identificarUsuarioSesion)
usuarioSession = undefined

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