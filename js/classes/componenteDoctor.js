class Medico extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback(){
        this.innerHTML = this.template
    }

    get template(){
        let medico = JSON.parse(this.getAttribute("medico"))
        let departamento = JSON.parse(this.getAttribute("departamento"))
        let html = `
      <section class="doctores-detalle">
        <div class="doctores-detalle__datos">
          <h2 class="doctores-detalle__nombre">${medico.nombre} ${medico.apellidos}</h2>
          <p class="doctores-detalle__dni"><span class="doctores-detalle__etiqueta">DNI:</span> ${medico.dni}</p>
          <p class="doctores-detalle__especialidad"><span class="doctores-detalle__etiqueta">Especialidad:</span> ${medico.especialidad}</p>
          <p class="doctores-detalle__departamento"><span class="doctores-detalle__etiqueta">Departamento:</span> ${departamento ? departamento.nombre : "Sin departamento"}</p>
        </div>
        <div class="doctores-detalle__acciones">
          <button type="button" class="btn btn--primary">Editar doctor</button>
          <button type="button" class="btn btn--danger">Eliminar doctor</button>
        </div>
      </section>
        `
        return html
    }

    static get observedAttributes() {
        return ["medico", "departamento"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = this.template
    }
}

export const medico = window.customElements.define("medico-detalle", Medico)
