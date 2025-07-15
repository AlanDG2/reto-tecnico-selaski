
import { LoginPage } from '../support/pages/LoginPage';
import { TrackingPage } from '../support/pages/TrackingPage';

const loginPage = new LoginPage(); 
const trackingPage = new TrackingPage();

describe('Test de Login usando Page Object Model', () => {
  let testData;

  before(() => {
    cy.fixture('loginData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit(testData.token);
  });

  it('PIN inválido muestra error', () => {
    loginPage.ingresarPIN(testData.pinInvalido);
    loginPage.clickIngresar();
    loginPage.validarPINInvalido();
  });

  it('PIN válido y búsqueda sin resultados', () => {
    loginPage.ingresarPIN(testData.pinValido);
    loginPage.clickIngresar();
    trackingPage.esperarContenedorPrincipal();
    trackingPage.abrirFiltros();
    trackingPage.abrirSelectorBusqueda();
    trackingPage.seleccionarTipoBusqueda();
    trackingPage.escribirBusqueda(testData.busquedaSinResultado);
    trackingPage.validarSinResultados();
  });

  it('PIN válido y búsqueda con resultados', () => {
    loginPage.ingresarPIN(testData.pinValido);
    loginPage.clickIngresar();
    trackingPage.esperarContenedorPrincipal();
    trackingPage.abrirFiltros();
    trackingPage.abrirSelectorBusqueda();
    trackingPage.seleccionarTipoBusqueda();
    trackingPage.escribirBusqueda(testData.busquedaConResultado);
    trackingPage.validarResultadoEnTag(testData.busquedaConResultado);
  });

   it('PIN inválido excede intentos y muestra mensaje de bloqueo', () => {
    loginPage.visit(testData.tokenInvalido);
    loginPage.interceptarNeedAuth()
    loginPage.ingresarPIN(testData.pinInvalido);
    loginPage.clickIngresar();
    loginPage.verificarErrorIntentos()
  });
});
