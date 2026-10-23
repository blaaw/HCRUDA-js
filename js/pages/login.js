let usuarios = []

onload = () => {
    cargarGuardarEjecutar(usuarios, "json/usuarios.json")
    document.getElementById("btn-login")
        .addEventListener("click", checkearLoginVacio)

    document.getElementById("usuario")
        .addEventListener("focus", () => {
            document.getElementById("error-usuario")
                .textContent = ""
            document.getElementById("error-password")
                .textContent = ""
        })
}

function checkearLoginVacio() {
    let usuarioInput = document.getElementById("usuario").value.trim()
    let passwordInput = document.getElementById("password").value.trim()
    let errorUsuario = document.getElementById("error-usuario")
    let errorPassword = document.getElementById("error-password")
    let algunoVacio = false

    if(usuarioInput == "") {
        errorUsuario.textContent = "usuario vacio"
        algunoVacio = true
    }
    if(passwordInput == "") {
        errorPassword.textContent = "contraseña vacia"    
        algunoVacio = true
    }
    
    if(algunoVacio) {
        return null
    }else {
        validarLogin(usuarioInput, passwordInput)
    }
}

function validarLogin(usuario, password) {
    let validado = false
    usuarios.forEach(usuarioValido => {
        if (usuarioValido.id == usuario && usuarioValido.password == password) {
            validado = true
            redirigirConSesion(usuario, password, usuarioValido.rol, "pages/dashboard.html")
        }
    })
    let errorUsuario = document.getElementById("error-usuario")
    let errorPassword = document.getElementById("error-password")
    if (!validado){
        errorUsuario.textContent = "Datos incorrectos, intentelo de nuevo"
        errorPassword.textContent = ""
    } else {
        errorUsuario.textContent = ""
        errorPassword.textContent = ""

    }
}