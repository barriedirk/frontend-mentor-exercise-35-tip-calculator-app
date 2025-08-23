/// <reference types="cypress" />

describe('Tip Calculator App', () => {
  beforeEach(() => {
    cy.visit('/tip');
  });

  it('redirects from / to /tip', () => {
    cy.visit('/');
    cy.url().should('include', '/tip');
  });

  it('calculates tip and total per person correctly', () => {
    cy.get('input#bill').type('100');
    cy.get('input[type="radio"][value="10"]').click();
    cy.get('input#nPeople').type('2');

    cy.contains('Tip Amount').parent().contains('$5.00');
    cy.contains('Total').parent().contains('$55.00');
  });

  it('resets values when RESET is clicked', () => {
    cy.get('input#bill').type('50');
    cy.get('input[type="radio"][value="15"]').click();
    cy.get('input#nPeople').type('2');

    cy.contains('RESET').click();

    cy.get('input#bill').should('have.value', '');
    cy.get('input#nPeople').should('have.value', '');
    cy.contains('Tip Amount').parent().contains('$0.00');
    cy.contains('Total').parent().contains('$0.00');
  });

  it('allows entering custom tip percentage', () => {
    cy.get('input#bill').type('120');
    cy.get('input[placeholder="Custom"]').type('20');
    cy.get('input#nPeople').type('3');

    cy.contains('Tip Amount').parent().contains('$8.00');
    cy.contains('Total').parent().contains('$48.00');
  });

  it('prevents submission when form is invalid', () => {
    cy.get('input#bill').type('0');
    cy.get('input#nPeople').type('0');
    cy.contains('RESET').should('be.disabled');
  });
});
