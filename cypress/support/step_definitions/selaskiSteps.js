import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { TrackingPage } from '../pages/TrackingPage';

const loginPage = new LoginPage();
const trackingPage = new TrackingPage();

let testData;

before(() => {
  cy.fixture('loginData').then((data) => {
    testData = data;
  });
});
Given('el usuario accede a la página con un token inválido', () => {
  loginPage.visit(testData.tokenInvalido);
});

Given('el usuario accede a la página con un token válido', () => {
  loginPage.visit(testData.token);
});

Given('intercepta el endpoint needAuth', () => {
  loginPage.interceptarNeedAuth();
});

When('ingresa un PIN válido', () => {
  loginPage.ingresarPIN(testData.pinValido);
});

When('ingresa un PIN incorrecto', () => {
  loginPage.ingresarPIN(testData.pinInvalido);
});

When('presiona el botón Ingresar', () => {
  loginPage.clickIngresar();
});

Then('se muestra un mensaje de error por PIN inválido', () => {
  loginPage.validarPINInvalido();
});

Then('se muestra un mensaje de intentos excedidos', () => {
  loginPage.verificarErrorIntentos();
});

When('abre los filtros de búsqueda', () => {
  trackingPage.esperarContenedorPrincipal();
  trackingPage.abrirFiltros();
  trackingPage.abrirSelectorBusqueda();
});

When('selecciona el tipo de búsqueda', () => {
  trackingPage.seleccionarTipoBusqueda();
});

When('escribe una búsqueda sin resultados', () => {
  trackingPage.escribirBusqueda(testData.busquedaSinResultado);
});

When('escribe una búsqueda con resultados', () => {
  trackingPage.escribirBusqueda(testData.busquedaConResultado);
});

Then('se muestra el mensaje "Sin datos para mostrar"', () => {
  trackingPage.validarSinResultados();
  
});

Then('se muestra el resultado en el tag correspondiente', () => {
  trackingPage.validarResultadoEnTag(testData.busquedaConResultado);
});