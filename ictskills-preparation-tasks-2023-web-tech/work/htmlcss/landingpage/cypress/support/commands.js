// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('rect', { prevSubject: true }, (subject, property) => {
    if (property) {
        return subject[0].getBoundingClientRect()[property]
    }

    return subject[0].getBoundingClientRect()
})

Cypress.Commands.add('edge', { prevSubject: true }, (subject, edge) => {
    const rect = subject[0].getBoundingClientRect()

    switch (edge) {
        case 'top':
            return rect.top
        case 'right':
            return rect.right
        case 'bottom':
            return rect.bottom
        case 'left':
            return rect.left

        default:
            throw new Error(`Unexpected edge '${edge}' requested`)
    }
})

Cypress.Commands.add('distanceTo', { prevSubject: true }, (subject, selector, edge) => {
    return cy.get(selector).edge(edge).then(
        targetPos => Math.abs(subject - targetPos)
    )
})

Cypress.Commands.add('distance', { prevSubject: 'element' }, (subject, targetSelector, targetEdge, subjectEdge) => {
    // If both edges were specified,
    // we return the distance between them.
    if (subjectEdge && targetEdge) {
        return cy.wrap(subject)
            .edge(subjectEdge)
            .distanceTo(targetSelector, targetEdge)
    }

    // If only the subject's edge was specified,
    // we return it's distance to the closest edge of the target.
    if (subjectEdge) {
        return cy.wrap(subject)
            .edge(subjectEdge)
            .then(
                subjectEdgePos =>
                    cy.get(targetSelector)
                        .rect()
                        .then(
                            targetRect => {
                                console.log({
                                    subjectEdge,
                                    subjectEdgePos,
                                    targetTop: targetRect.top,
                                    targetBottom: targetRect.bottom,
                                    targetLeft: targetRect.left,
                                    targetRight: targetRect.right,
                                })
                                if (['top', 'bottom'].includes(subjectEdge)) {
                                    return Math.min(
                                        Math.abs(targetRect.top - subjectEdgePos),
                                        Math.abs(targetRect.bottom - subjectEdgePos)
                                    )
                                } else if (['left', 'right'].includes(subjectEdge)) {
                                    return Math.min(
                                        Math.abs(targetRect.left - subjectEdgePos),
                                        Math.abs(targetRect.right - subjectEdgePos)
                                    )
                                } else {
                                    throw new Error(`Unexpected edge '${subjectEdge}' requested`)
                                }
                            }
                        )
            )
    }

    // If only the target's edge was specified,
    // we return it's distance to the closest edge of the subject.
    if (targetEdge) {
        return cy.get(targetSelector)
            .edge(targetEdge)
            .then(
                targetEdgePos =>
                    cy.wrap(subject)
                        .rect()
                        .then(
                            subjectRect => {
                                if (['top', 'bottom'].includes(targetEdge)) {
                                    return Math.min(
                                        Math.abs(subjectRect.top - targetEdgePos),
                                        Math.abs(subjectRect.bottom - targetEdgePos)
                                    )
                                } else if (['left', 'right'].includes(targetEdge)) {
                                    return Math.min(
                                        Math.abs(subjectRect.left - targetEdgePos),
                                        Math.abs(subjectRect.right - targetEdgePos)
                                    )
                                } else {
                                    throw new Error(`Unexpected edge '${targetEdge}' requested`)
                                }
                            }
                        )
            )
    }
})
