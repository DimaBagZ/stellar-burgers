/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to drag and drop an element
     * @example cy.dragAndDrop('[data-testid="ingredient-item"]', '[data-testid="burger-constructor"]')
     */
    dragAndDrop(source: string, target: string): Chainable<Element>;
  }
}

Cypress.Commands.add('dragAndDrop', (source, target) => {
  cy.get(source).trigger('dragstart');
  cy.get(target).trigger('drop');
});
