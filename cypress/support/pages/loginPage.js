
export class LoginPage {
  // Localizadores
  get = {
    url: () => cy.url(),
    title: () => cy.title(),
    pinInputs: () => cy.get('form input'),
    ingresarButton: () => cy.contains('button', 'Ingresar'),
    errorMensajePIN: () => cy.get('p.text-red-500.text-sm'),
    errorIntentosExcedidos: () => cy.contains('p', 'Has excedido el número de intentos permitidos'),
   
  };

  // Acciones
  visit(token) {
    cy.visit(`https://www.selaski.com/public/reports/shared?token=${token}`);
  }

  ingresarPIN(pinArray) {
    this.get.pinInputs().each(($input, index) => {
      cy.wrap($input).type(pinArray[index]);
    });
  }

  clickIngresar() {
    this.get.ingresarButton().click();
  }

  validarPINInvalido() {
    this.get.errorMensajePIN().should('be.visible')
      .and('contain.text', 'Código incorrecto. Por favor ingresa el código correcto para tener acceso');
  }
   verificarErrorIntentos() {
  this.get.errorIntentosExcedidos().should('be.visible');
}

interceptarNeedAuth() {
    cy.intercept('GET', '**/api/v2/auth/needAuth*', {
      statusCode: 200,
      body: {
        message: 'token needs auth',
        needAuth: true
      }
    }).as('mockNeedAuth');
  }

}
