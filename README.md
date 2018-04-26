# Testeando features en 5 minutos con Cypress
Esta es una lightning talk preparada para dar en el domo de [Acamica](https://acamica.com.ar) en la [Campus Party 2018](http://argentina.campus-party.org/).

## Que vamos a hacer?
Vamos a testear el formulario de login de [Acamica](https://www.acamica.com). Los tests van a incluir:
* El botón de iniciar sesión esta deshabilitado al no tener datos
* El botón de iniciar sesión esta deshabilitado al ingresar un mail incorrecto
* El botón de iniciar sesión esta deshabilitado al no ingresar una contraseña
* Cierra el formulario de login

## Como lo vamos a hacer?
Vamos a usar [Cypress](https://cypress.io), un framework de testing fácil de usar para testear cualquier cosa que corra en una web.

## Requisitos
* Cualquier editor de texto, recomiendo [Visual Studio Code](https://code.visualstudio.com/).
* [Node.js](https://nodejs.org/es/) instalado, con `npm` en la última versión estable.

> *Tip*: Para ver que versión de `npm` tenes instalada, una vez que tengas instalado `node`, en consola corré: `npm -v`.
> Para instalar la última versión estable de `npm` corré: `npm install -g npm`.
> Agregá `sudo` al principio si te da problema de permisos al instalar en `Linux` o `Mac`.

## Recomendable
* Conocimiento básico de `JavaScript`

## Temario
* [Iniciando nuestro proyecto](#iniciando-nuestro-proyecto)
* [Instalando Cypress](#instalando-cypress)
* [Corriendo Cypress](#corriendo-cypress)
* [Escribiendo nuestros tests](#escribiendo-nuestros-tests)
* [Corriendo nuestros tests](#corriendo-nuestros-tests)

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
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Instalando Cypress
Volvemos a la terminal y ejecutamos:
```bash
npm install cypress --save-dev
```
Eso va a instalar `Cypress` en nuestro proyecto y va a agregar la dependencia a nuestro `package.json`

### Corriendo Cypress
Para abrir `Cypress` necesitamos modificar el `script` `test` de nuestro `package.json`por lo siguiente:
```json
"scripts": {
  "test": "cypress open"
}
```
Una vez hecho esto, vamos a la terminal y ejecutamos:
```bash
npm test
```
Esto nos va a abrir `Cypress` y a su vez va a crear una carpeta `cypress` en nuestro proyecto junto a un archivo `cypress.json`

### Escribiendo nuestros tests
Vamos a ir a la carpeta `cypress/integration`, vamos a borrar el archivo `example_spec.js` (el test por defecto) y vamos a crear uno nuevo llamado `login.test.js` con el siguiente contenido:

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
```

Vamos a repasar las cosas que usamos para nuestros tests:
* `describe`: Sirve para agrupar nuestros tests en categorías
* `it`: Sirve para definir un nombre para nuestro test
* `before` / `beforeEach`: Ambos son `hooks`, su función es ser ejecutados en un tiempo determinado de nuestros tests, `before` se ejecuta una sola vez antes de correr todos nuestros tests y `beforeEach` se ejecuta antes de cada test
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
> Tip: Para terminar el proceso de los tests presioná `ctrl + c` en la terminal donde se está ejecutando

## Links útiles
* [Documentación de `Cypress`](https://docs.cypress.io/api/introduction/api.html)
* [Mi otra lección de `Cypress`](https://github.com/goncy/cypress-lesson)
* [Slides de la charla](https://cypress-lightning-talk.netlify.com/)