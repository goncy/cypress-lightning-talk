# Testeando features en 5 minutos con Cypress
Esta es una lighting talk preparada para dar en el domo de [Acamica](https://acamica.com.ar) en la [Campus Party 2017](http://argentina.campus-party.org/).

## Que vamos a hacer?
Vamos a testear el formulario de login de [Acamica](https://www.acamica.com) en 5 / 10 minutos.

## Como lo vamos a hacer?
Vamos a usar [Cypress](https://cypress.io), un framework de testing fácil de usar para testear cualquier cosa que corra en una web.

## Temario
* Iniciando nuestro proyecto
* Instalando Cypress
* Corriendo Cypress
* Escribiendo nuestros tests
* Corriendo nuestros tests

### Iniciando nuestro proyecto
Lo primero que vamos a hacer es crear una carpeta para nuestro proyecto, luego vamos a la terminal, nos paramos en la carpeta que acabamos de crear y ejecutamos:
```bash
npm init -y
```
Vamos a ver que se crea un nuevo archivo `package.json` en nuestra carpeta con un contenido parecido al siguiente:
```json
{
  "name": "<nombre-de-la-carpeta>",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

### Instalando Cypress
Volvemos a la terminal y ejecutamos:
```bash
npm install cypress --save-dev
```
Eso va a instalar `Cypress` en nuestro proyecto y va a agregar la dependencia a nuestro `package.json`

### Corriendo Cypress
Para abrir `Cypress` necesitamos agregar un `script` `test` a nuestro `package.json`, vamos a agregar esto al final del archivo:
```json
"scripts": {
  "test": "cypress open"
}
```
> Asegurarse de que quede una coma al final de la linea anterior a `scripts`
Una vez hecho esto, vamos a la terminal y ejecutamos:
```bash
npm test
```
Esto nos va a abrir `Cypress` y a su vez va a crear una carpeta `cypress` en nuestro proyecto junto a un archivo `cypress.json`

### Escribiendo nuestros tests
Vamos a crear dentro de `cypress/integration` un archivo `acamica.test.js` con el siguiente contenido:

```javascript
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
    cy.get('@email').type('not-valid')
    cy.get('@password').type('a-valid-password')
    cy.get('@submit').should('be.disabled')
  })

  it('el botón de iniciar sesión esta deshabilitado al no ingresar una contraseña', function () {
    cy.get('@email').type('valid@acamica.com')
    cy.get('@submit').should('be.disabled')
  })

  it('cierra el formulario de login', function () {
      cy.get('@cancel').click()
      cy.get('.modal').should('not.exist')
  })
})
```

Vamos a repasar las cosas que usamos para nuestros tests:
* `describe`: Una función que proviene de [Mocha](https://mochajs.org/) y sirve meramente para agrupar nuestros tests en categorías
* `it`: Otra función que proviene de [Mocha](https://mochajs.org/) y sirve para definir un nombre para cada test y definir que es lo que va a hacer
* `before` / `beforeEach`: También provienen de [Mocha](https://mochajs.org/) y se llaman `hooks`, su función es se ejecutados en un tiempo determinado de nuestros tests, `before` se ejecuta una sola vez antes de correr todos nuestros tests y `beforeEach` se ejecuta antes de cada test
* `cy`: Funciones pertenecientes a `Cypress`
  * `.visit(url)`: Visita una URL
  * `.get(selector | alias)`: Nos permite obtener un elemento del DOM mediante un selector o alias
    * `.click()`: Clickea un elemento
    * `.type(texto)`: Escribe un valor a un elemento
    * `.clear()`: Limpia el contenido de un elemento
    * `.as(nombre)`: Guarda la referencia a un elemento bajo un `alias`
    * `.should(afirmación)`: Espera una afirmación sobre un elemento, en caso de ser falsa, el test falla

### Corriendo nuestros tests
Si volvemos a la ventana de `Cypress` vamos a ver que nuestro nuevo archivo está ahí, lo clickeamos y vamos a ver todos nuestros tests corriendo, felicitaciones!

### Bonus
Si la interfaz gráfica te parece muy linda, pero preferís correr los tests mas rápido o desde consola, podes cambiar el script `test` de nuestro `package.json` para que en vez de ser `cypress open` sea `cypress run`. Esto además de correr nuestros tests en modo `headless`, va a guardar un video de los tests corriendo en `cypress/videos`

## Links útiles
* [Documentación de `Cypress`](https://docs.cypress.io/api/introduction/api.htm)
