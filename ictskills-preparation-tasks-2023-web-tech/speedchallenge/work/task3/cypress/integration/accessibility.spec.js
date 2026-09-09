/// <reference types="Cypress" />
import axe from 'axe-core';

describe('Accessibility', () => {

    describe('Axe Checks', () => {
        let violations = [];

        before(() => {
            cy.visit('/');
            cy.injectAxe();
            cy.wait(1000); // sometimes the rendering is not complete and we get flaky color-contrast violations
            cy.checkA11y(undefined, undefined, vio => {
                violations = vio;
                if (vio.length > 0) {
                    cy.log(`⚠️⚠️ There are ${vio.length} violations to be fixed. Check the console log in the browser Dev Tools. ⚠️⚠️`);
                    console.log('Accessibility violations to be fixed:', vio);
                } else {
                    cy.log(`No violations remaining. Good job!`);
                }
            }, true);
        });

        const violationsToBeFixed = [
            'label',
            'landmark-one-main',
            'region',
            'html-lang-valid',
            'meta-refresh',
            'document-title',
            'image-alt',
            'duplicate-id-active',
        ];

        violationsToBeFixed.forEach(violation => {
            it(`Violation ID: ${violation}`, () => {
                const matchingViolations = violations.filter(vio => vio.id === violation)
                const help = matchingViolations.length > 0 ? matchingViolations[0].help : ''
                const description = matchingViolations.length > 0 ? matchingViolations[0].description : ''

                expect(matchingViolations.length).to.equal(0, `${help}. ${description}. Violation "${violation}" should not be found. Check the Dev Tools console (F12) to see more details.`);
            });
        });

        it('Check no new violations occur', () => {
            const remainingViolations = violations.filter(vio => !violationsToBeFixed.includes(vio.id));
            if (remainingViolations.length > 0) {
                console.log('Newly introduced Axe Violations which were not there before:', remainingViolations);
            }
            expect(remainingViolations.length).to.equal(0);
        });
    });

    describe('Regression Testing', () => {
        // These test cases ensure the page is as functional as before and still looks the same.
        // I.e. the competitor could theoretically just remove the markup, or replace it with an image.

        beforeEach(() => {
            cy.visit('/');
        });

        it('Check the same elements are still there', () => {
            cy.get('*').then(el => {
                expect(el.length).to.be.greaterThan(50);
            });
            cy.contains('Praesent Tincidunt').should('be.visible');
            cy.contains('Proin at efficitur enim').should('be.visible');
            cy.contains('Discere Plus').click();
            cy.contains('Cras Vulputate').should('be.visible');
            cy.contains('Email').should('be.visible');
            cy.contains('2022').should('be.visible');
            cy.get('[src="images/news.jpg"]').should('be.visible');
            cy.get('input#name').type('test input');
        });
    });
});
