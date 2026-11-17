let usuarios = []

const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/
const PATRON_DNI = /^[0-9]{8}[A-Z]$/
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

onload = () => {
    cargarGuardarEjecutar(usuarios, "../json/usuarios.json")
    document.getElementById("btn-registro")
        .addEventListener("click", validarFormulario)

    document.querySelectorAll(".input").forEach(input => {
        input.addEventListener("focus", () => limpiarError(input.id))
        input.addEventListener("input", () => limpiarError(input.id))
    })
}

function limpiarError(idCampo) {
    let error = document.getElementById("error-" + idCampo)
    if (error) {
        error.textContent = ""
    }
    let campo = document.getElementById(idCampo)
    if (campo) {
        campo.removeAttribute("aria-invalid")
    }
}

function limpiarErrores() {
    document.querySelectorAll(".field__error").forEach(error => {
        error.textContent = ""
    })
    document.querySelectorAll(".input").forEach(input => {
        input.removeAttribute("aria-invalid")
    })
}

function mostrarError(idCampo, mensaje) {
    let error = document.getElementById("error-" + idCampo)
    if (error) {
        error.textContent = mensaje
    }
    let campo = document.getElementById(idCampo)
    if (campo) {
        campo.setAttribute("aria-invalid", "true")
    }
}

function validarFormulario(evento) {
    evento.preventDefault()
    let nombreInput = document.getElementById("nombre")
    let apellidosInput = document.getElementById("apellidos")
    let dniInput = document.getElementById("dni")
    let emailInput = document.getElementById("email")
    let rolInput = document.getElementById("rol")
    let passwordInput = document.getElementById("password")
    let passwordConfirmInput = document.getElementById("password-confirm")
    let hayErrores = false

    limpiarErrores()

    let nombre = nombreInput.value.trim()
    let apellidos = apellidosInput.value.trim()
    let dni = dniInput.value.trim().toUpperCase()
    let email = emailInput.value.trim().toLowerCase()
    let rol = rolInput.value
    let password = passwordInput.value.trim()
    let passwordConfirm = passwordConfirmInput.value.trim()
    let usuariosRegistrados = leerUsuariosCookie()

    dniInput.value = dni
    passwordInput.value = password
    passwordConfirmInput.value = passwordConfirm

    if (nombre == "") {
        mostrarError("nombre", "nombre vacio")
        hayErrores = true
    } else if (!PATRON_NOMBRE.test(nombre)) {
        mostrarError("nombre", "nombre no valido (solo letras, minimo 2)")
        hayErrores = true
    }

    if (apellidos == "") {
        mostrarError("apellidos", "apellidos vacios")
        hayErrores = true
    } else if (!PATRON_NOMBRE.test(apellidos)) {
        mostrarError("apellidos", "apellidos no validos (solo letras, minimo 2)")
        hayErrores = true
    }

    if (dni == "") {
        mostrarError("dni", "dni vacio")
        hayErrores = true
    } else if (!PATRON_DNI.test(dni)) {
        mostrarError("dni", "dni no valido (8 numeros y una letra mayuscula)")
        hayErrores = true
    } else if (usuariosRegistrados.some(usuario => usuario.dni == dni)) {
        mostrarError("dni", "ya existe un usuario con este dni")
        hayErrores = true
    }

    if (email == "") {
        mostrarError("email", "email vacio")
        hayErrores = true
    } else if (!PATRON_EMAIL.test(email)) {
        mostrarError("email", "email no valido")
        hayErrores = true
    } else if (usuariosRegistrados.some(usuario => usuario.email && usuario.email.toLowerCase() == email)) {
        mostrarError("email", "ya existe un usuario con este email")
        hayErrores = true
    }

    if (rol == "") {
        mostrarError("rol", "selecciona un rol")
        hayErrores = true
    } else if (rol != "medico" && rol != "enfermero") {
        mostrarError("rol", "rol no valido")
        hayErrores = true
    }

    if (password == "") {
        mostrarError("password", "contraseña vacia")
        hayErrores = true
    } else if (password.length < 6) {
        mostrarError("password", "la contraseña debe tener al menos 6 caracteres")
        hayErrores = true
    }

    if (passwordConfirm == "") {
        mostrarError("password-confirm", "confirma la contraseña")
        hayErrores = true
    } else if (passwordConfirm != password) {
        mostrarError("password-confirm", "las contraseñas no coinciden")
        hayErrores = true
    }

    if (!hayErrores) {
        let nuevoUsuario = crearNuevoUsuario(nombre, apellidos, dni, email, rol, password)
        usuariosRegistrados.push(nuevoUsuario)
        guardarUsuariosCookie(usuariosRegistrados)
        mostrarCodigoUsuario(nuevoUsuario.id)
    }
}

function crearNuevoUsuario(nombre, apellidos, dni, email, rol, password) {
    return {
        id: generarNuevoIdUsuario(),
        nombre: nombre + " " + apellidos,
        rol: rol,
        password: password,
        dni: dni,
        email: email
    }
}

function generarNuevoIdUsuario() {
    const totalUsuarios = usuarios.length + leerUsuariosCookie().length
    const nuevoId = "U0" + ((totalUsuarios + 1) < 10 ?
                        "0" + (totalUsuarios + 1 ) :
                        totalUsuarios + 1)
    return nuevoId
}

function mostrarCodigoUsuario(codigoUsuario) {
    document.getElementById("registro-exito").hidden = false
    document.getElementById("codigo-usuario").textContent = codigoUsuario
    document.getElementById("btn-registro").disabled = true

    // Muestra el código 3 segundos y después vuelve al login
    setTimeout(() => {
        location.href = "../index.html"
    }, 3000)
}
