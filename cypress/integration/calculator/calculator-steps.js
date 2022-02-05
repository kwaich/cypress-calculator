import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const getIframeDocument = () => {
    return cy
        .get('iframe')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
    // get the document
    return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
}

Given('Open chrome browser and start application', function () {
    cy.visit('https://www.online-calculator.com/full-screen-calculator/')
});

When('I enter following values and press CE button', datatable => {
    datatable.hashes().forEach(row => {
        cy.get('iframe')
            .type(row.value1)
            .type("{enter}")
            .type(row.operator)
            .type(row.value2)
            .type("=")
            .wait(500)
    })
});

Then('I should be able to see', datatable => {
    datatable.hashes().forEach(row => {
        getIframeBody().find('canvas').compareSnapshot(row.expected, 0.015);
    })
});