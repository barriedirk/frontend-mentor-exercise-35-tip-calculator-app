/// <reference types="cypress" />

describe('Tip Calculator App', () => {
  beforeEach(() => {
    cy.visit('#/tip');
  });

  it('redirects from / to /tip', () => {
    cy.visit('#/');
    cy.url().should('include', '#/tip');
  });

  it('Verify if the inputs received the values', () => {
    cy.get('input#bill')
      .type('100')
      .should('have.value', '100');

    cy.get('label[for="tip-10"]').click();

    cy.get('input#tip-10').should('be.checked');

    cy.get('input#nPeople')
      .type('2')
      .should('have.value', '2');
  });

  it('calculates tip and total per person correctly', () => {
    // cy.get('[data-cy=bill]').type('100');
    // cy.get('input[type="radio"][data-value="10"]').click();

    cy.get('input#bill').type('100');
    cy.get('label[for="tip-10"]').click();
    cy.get('input#nPeople').type('2');

    // cy.contains('Tip Amount').parent().contains('$5.00');
    // cy.contains('Total').parent().contains('$55.00');

    // cy.wait(1000);

    // Wait for the DOM to update with the calculated results
    // Wait up to 2s for the value
    // cy.contains('Tip Amount')
    //   .parent()
    //   .then(el => {
    //     console.log('Tip amount parent text:', el.text());
    //   })
    //   .contains('$5.00', { timeout: 2000 });

    // cy.contains('Tip Amount')
    //   .parent()
    //   .contains('$5.00', { timeout: 2000 });
    // cy.contains('Total')
    //   .parent()
    //   .contains('$55.00', { timeout: 2000 });

    cy.get('[data-cy=tipAmount]').should('contain.text', '$5.00');
    cy.get('[data-cy=totalAmount]').should('contain.text', '$55.00');


  });

  it('resets values when RESET is clicked', () => {
    cy.get('input#bill').type('50');
    // cy.get('input[type="radio"][data-value="15"]').click();
    cy.get('label[for="tip-15"]').click();
    cy.get('input#nPeople').type('2');

    cy.contains('RESET').click();

    cy.get('input#bill').should('have.value', '');
    cy.get('input#nPeople').should('have.value', '');

    // cy.contains('Tip Amount').parent().contains('$0.00');
    // cy.contains('Total').parent().contains('$0.00');
    // cy.contains('Tip Amount')
    //   .parent()
    //   .contains('$0.00', { timeout: 2000 }); 
    // cy.contains('Total')
    //   .parent()
    //   .contains('$0.00', { timeout: 2000 });

    cy.get('[data-cy=tipAmount]').should('contain.text', '$0.00');
    cy.get('[data-cy=totalAmount]').should('contain.text', '$0.00');
  });

  it('allows entering custom tip percentage', () => {
    cy.get('input#bill').type('120');
    cy.get('input[placeholder="Custom"]').type('20');
    cy.get('input#nPeople').type('3');

    // cy.contains('Tip Amount').parent().contains('$8.00');
    // cy.contains('Total').parent().contains('$48.00');

    cy.get('[data-cy=tipAmount]').should('contain.text', '$8.00');
    cy.get('[data-cy=totalAmount]').should('contain.text', '$48.00');
  });

  it('prevents submission when form is invalid', () => {
    cy.get('input#bill').type('0');
    cy.get('input#nPeople').type('0');

    cy.contains('RESET').should('be.disabled');
  });
});
