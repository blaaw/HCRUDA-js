function cargarGuardarEjecutar(lista, url, funcion) {
    fetch(url)
        .then(texto => texto.json())
        .then(json => {
            lista.push(...json)
            if (funcion) funcion(json)
        })
        .catch(e => console.error(e))
}

function redirigirConSesion(usuario, password, rol, url) {
    location.href = url
}