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