describe('Facts', () => {
    context('mobile', () => {
        const vw = 414
        const vh = 896

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#facts')
        })

        it('has correct vertical padding', () => {
            cy.get('.facts .fact:first-child')
                .distance('.facts', 'top')
                .should('be.equal', 96)

            cy.get('.facts .fact:last-child')
                .distance('.facts', 'bottom')
                .should('be.equal', 96)
        })

        it('has correctly positioned facts', () => {
            cy.get('.facts .fact').contains('1\'150')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('1\'150')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })

            cy.get('.facts .fact').contains('Hours')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('Hours')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })

            cy.get('.facts .fact:nth-child(2)')
                .distance('.facts .fact:first-child', 'bottom')
                .should('be.equal', 32)

            cy.get('.facts .fact').contains('150')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('150')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })

            cy.get('.facts .fact').contains('Candidates')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('Candidates')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })

            cy.get('.facts .fact:last-child')
                .distance('.facts .fact:nth-child(2)', 'bottom')
                .should('be.equal', 32)

            cy.get('.facts .fact').contains('6')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('6')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })

            cy.get('.facts .fact').contains('People')
                .rect('width').should('be.at.most', vw - 24 * 2)
            // Element should be centered
            cy.get('.facts .fact').contains('People')
                .then(els => {
                    const rect = els[0].getBoundingClientRect()
                    expect(rect.x * 2 + rect.width).to.be.closeTo(vw, 20)
                })
        })

        it('has correctly styled facts', () => {
            cy.get('.facts .fact').contains('1\'150')
                .should('have.css', 'font-size', '56px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(225, 125, 0)')

            cy.get('.facts .fact').contains('Hours')
                .should('have.css', 'font-size', '24px')
                .and('have.css', 'line-height', '36px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')
        })
    })

    context('desktop', () => {
        const vw = 1440
        const vh = 900

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#facts')
        })

        it('has correct vertical padding', () => {
            cy.get('.facts .fact')
                .distance('.facts', 'top')
                .should('be.equal', 128)

            cy.get('.facts .fact')
                .distance('.facts', 'bottom')
                .should('be.equal', 128)
        })

        it('has correctly positioned facts', () => {
            cy.get('.facts .fact:first-child')
                .rect('width').should('be.at.most', (vw - 24 * 2) / 3)
            cy.get('.facts .fact:first-child')
                .distance('body', 'left')
                .should('be.at.most', 340)

            cy.get('.facts .fact:nth-child(2)')
                .rect('width').should('be.at.most', (vw - 24 * 2) / 3)
            cy.get('.facts .fact:nth-child(2)')
                .distance('.facts .fact:first-child', 'bottom')
                .should('be.equal', 0)

            cy.get('.facts .fact:last-child')
                .rect('width').should('be.at.most', (vw - 24 * 2) / 3)
            cy.get('.facts .fact:last-child')
                .distance('body', 'right')
                .should('be.at.most', 340)
            cy.get('.facts .fact:last-child')
                .distance('.facts .fact:nth-child(2)', 'bottom')
                .should('be.equal', 0)
        })

        it('has correctly styled facts', () => {
            cy.get('.facts .fact').contains('1\'150')
                .should('have.css', 'font-size', '56px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(225, 125, 0)')

            cy.get('.facts .fact').contains('Hours')
                .should('have.css', 'font-size', '24px')
                .and('have.css', 'line-height', '36px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')
        })
    })
})
