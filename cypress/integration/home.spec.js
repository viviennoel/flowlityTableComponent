/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('link on the logo functional', () => {
    cy.get('#logo')
      .should('be.visible')
      .click()
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/`)
  })

  it('link to dashboard functional', () => {
    cy.get('#dashboard')
      .should('be.visible')
      .click()
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/`)
  })

  it('link to warehouse functional', () => {
    cy.get('#warehouse')
      .should('be.visible')
      .click()
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/warehouse`)
  })

  it("without input, the button save doesn't appear", () => {
    cy.get('[data-testid="2inputTest"]')
    .should('exist')
    cy.get('#save').should('not.exist')
  })

  it("input on the table of text doesn't make the button appear", () => {
    cy.get('[data-testid="2inputTest"]')
    .type('testText')
    cy.get('#save').should('not.exist')
  })

  it('input on the table make the button save appear', () => {
    cy.get('[data-testid="2inputTest"]')
    .type('110')
    cy.get('#save').should('exist').and('be.visible')
  })

  // These functional test of non regression are carried out in order to present the possibility of cypress

})
