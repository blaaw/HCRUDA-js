class Paciente extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback(){
        this.innerHTML = this.template
    }

    get template(){
        let paciente = JSON.parse(this.getAttribute("paciente"))
        let tratamiento = JSON.parse(this.getAttribute("tratamiento"))
        let html = `
      <section class="pacientes-detalle">
        <div class="pacientes-detalle__foto">
          <img src="${paciente.foto}" alt="Foto de perfil del paciente" />
        </div>
        <div class="pacientes-detalle__datos">
          <span class="pacientes-detalle__etiqueta">${paciente.id}</span>
          <h2 class="pacientes-detalle__nombre">${paciente.nombre} ${paciente.apellidos}</h2>
          <p class="pacientes-detalle__dni"><span class="pacientes-detalle__etiqueta">DNI:</span> ${paciente.dni}</p>
          <p class="pacientes-detalle__telefono"><span class="pacientes-detalle__etiqueta">Teléfono:</span> ${paciente.telefono}</p>
          <p class="pacientes-detalle__tipo"><span class="pacientes-detalle__etiqueta">Tipo:</span> <span class="badge tipo--${paciente.tipo}">${paciente.tipo}</span></p>
          <div class="pacientes-detalle__tratamiento">
            <span class="pacientes-detalle__etiqueta">Tratamiento:</span>
            ${tratamiento
                ? `
                <span class="badge estado--${tratamiento.estado}">${tratamiento.estado}</span>
                <p class="pacientes-detalle__tratamiento-texto">${tratamiento.descripcion}</p>
                `
                : `<span class="badge tipo--urgencia">sin tratamiento</span>`
            }
          </div>
        </div>
        <div class="pacientes-detalle__acciones">
          <button type="button" class="btn btn--primary">Editar paciente</button>
          <button type="button" class="btn btn--danger" onclick="eliminarPaciente('${paciente.id}')">Eliminar paciente</button>
        </div>
      </section>
        `
        return html
    }

    static get observedAttributes() {
        return ["paciente", "tratamiento"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = this.template
    }
}

export const paciente = window.customElements.define("paciente-detalle", Paciente)