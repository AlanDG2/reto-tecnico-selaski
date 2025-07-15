

export class TrackingPage {
  // Localizadores
  get = {

    contenedorPrincipal: () => cy.get('#orders-container'),
    filtroBoton: () => cy.contains('app-atom-filter-tab p', 'Filtros'),
    seleccionarDropdown: () => cy.get("app-atom-select-input").contains("span", "Seleccionar "),
    tipoBusquedaOpcion: () => cy.get('app-molecule-general-search-select span p'),
    inputBusqueda: () => cy.get('input[placeholder="Escribe aquí tu búsqueda"]'),
    mensajeSinResultados: () => cy.contains('h3', 'Sin datos para mostrar'),
    tagResultado: () => cy.get('app-atom-tag p'),
    cargandoMensaje: () => cy.contains('h2', 'Cargando...'),
    
  };


  esperarContenedorPrincipal() {
    this.get.contenedorPrincipal().should('be.visible');
  }

  esperarCargaDesaparezca() {
    this.get.cargandoMensaje().should('not.exist');
  }

  abrirFiltros() {
    this.get.filtroBoton().click();
  }

  abrirSelectorBusqueda() {
    this.get.seleccionarDropdown().scrollIntoView().click({ force: true });
  }

  seleccionarTipoBusqueda(texto = 'Embarque') {
    this.get.tipoBusquedaOpcion().contains(texto).scrollIntoView().click({ force: true });
  }

  escribirBusqueda(valor) {
    this.get.inputBusqueda().type(`${valor}{enter}`);
  }

  validarSinResultados() {
    this.get.mensajeSinResultados().should('be.visible');
  }

  validarResultadoEnTag(valorBuscado) {
    this.get.tagResultado().should('be.visible').and('contain.text', `Embarque: ${valorBuscado}`);
  }

 
}
