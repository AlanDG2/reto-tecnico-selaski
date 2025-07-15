Feature: Pruebas de autenticación y búsqueda en Selaski
  Scenario: PIN inválido muestra mensaje de error
    Given el usuario accede a la página con un token válido
    When ingresa un PIN incorrecto
    And presiona el botón Ingresar
    Then se muestra un mensaje de error por PIN inválido

  Scenario: PIN inválido excede intentos y muestra mensaje de bloqueo
    Given el usuario accede a la página con un token inválido
    And intercepta el endpoint needAuth
    When ingresa un PIN incorrecto
    And presiona el botón Ingresar
    Then se muestra un mensaje de intentos excedidos

  Scenario: PIN válido y búsqueda sin resultados
    Given el usuario accede a la página con un token válido
    When ingresa un PIN válido
    And presiona el botón Ingresar
    And abre los filtros de búsqueda
    And selecciona el tipo de búsqueda
    And escribe una búsqueda sin resultados
    Then se muestra el mensaje "Sin datos para mostrar"

  Scenario: PIN válido y búsqueda con resultados
    Given el usuario accede a la página con un token válido
    When ingresa un PIN válido
    And presiona el botón Ingresar
    And abre los filtros de búsqueda
    And selecciona el tipo de búsqueda
    And escribe una búsqueda con resultados
    Then se muestra el resultado en el tag correspondiente