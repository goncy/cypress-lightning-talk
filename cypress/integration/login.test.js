describe('Formulario de login de Acamica', function () {
  before(function () {
    cy.visit('https://www.acamica.com/') // Navegamos a la web de Acamica
    cy.get('.button[ac-auth-dialog]').click() // Clickeamos el botón de login para mostrar el modal
  })

  beforeEach(function() {
    // Nos guardamos en aliases todos los botones que vamos a usar
    cy.get('.modal-body [name="email"]').as('email')
    cy.get('.modal-body [name="password"]').as('password')
    cy.get('.modal-footer [type="submit"]').as('submit')
    cy.get('.modal-footer [type="button"]').as('cancel')

    // Limpiamos los inputs de email y password antes de cada test
    cy.get('@email').clear()
    cy.get('@password').clear()
  })

  it('el botón de iniciar sesión esta deshabilitado al no tener datos', function () {
    cy.get('@submit').should('be.disabled')
  })

  it('el botón de iniciar sesión esta deshabilitado al ingresar un mail incorrecto', function () {
    cy.get('@email').type('esto no es un email')
    cy.get('@password').type('una_contr4se3ña')
    cy.get('@submit').should('be.disabled')
  })

  it('el botón de iniciar sesión esta deshabilitado al no ingresar una contraseña', function () {
    cy.get('@email').type('mi-correo@acamica.com')
    cy.get('@submit').should('be.disabled')
  })

  it('cierra el formulario de login', function () {
      cy.get('@cancel').click()
      cy.get('.modal').should('not.exist')
  })
})