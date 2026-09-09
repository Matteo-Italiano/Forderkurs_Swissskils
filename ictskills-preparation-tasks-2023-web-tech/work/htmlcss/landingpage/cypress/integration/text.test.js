describe('Text', () => {
    context('mobile', () => {
        const vw = 414
        const vh = 896

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#text1')
        })

        it('has correct vertical padding', () => {
            cy.get('.text h2').parent()
                .distance('.text', 'top')
                .should('be.equal', 96)
            cy.get('.text h3').parent()
                .distance('.text', 'bottom')
                .should('be.equal', 96)
        })

        it('is correctly sized and positioned', () => {
            cy.get('.text h2').parent()
                .distance('.text', 'left')
                .should('be.equal', 24)

            cy.get('.text h3').parent()
                .distance('.text', 'left')
                .should('be.equal', 24)
            cy.get('.text h3').parent()
                .distance('.text', 'right')
                .should('be.equal', 24)
        })

        it('has correctly styled headings', () => {
            cy.get('.text h2')
                .should('have.css', 'font-size', '32px')
                .and('have.css', 'line-height', '40px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('.text h3')
                .should('have.css', 'font-size', '20px')
                .and('have.css', 'line-height', '30px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('.text h3')
                .distance('.text h3 + p', 'top')
                .should('be.equal', 16)

            cy.get('.text p')
                .distance('.text p + h3', 'top')
                .should('be.equal', 24)
        })

        it('has correctly styled text', () => {
            cy.get('.text p')
                .should('have.css', 'font-size', '16px')
                .and('have.css', 'line-height', '24px')
                .and('have.css', 'font-weight', '400')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('#text2 p')
                .distance('#text2 p + p', 'top')
                .should('be.equal', 16)

            cy.get('.text a:not(.button)')
                .should('have.css', 'font-size', '16px')
                .and('have.css', 'line-height', '24px')
                .and('have.css', 'font-weight', '600')
                .and('have.css', 'color', 'rgb(225, 125, 0)')
                .and('contain.css', 'text-decoration', 'none solid rgb(225, 125, 0)')
        })

        it('has correctly styled lists', () => {
            cy.get('.text ul')
                .distance('.text ul + *', 'top')
                .should('be.equal', 16)

            cy.get('.text ul li')
                .should('have.css', 'font-size', '16px')
                .and('have.css', 'line-height', '24px')
                .and('have.css', 'font-weight', '400')
                .and('have.css', 'color', 'rgb(51, 51, 51)')
                .and('have.css', 'padding-left', '8px')
                .and('have.css', 'list-style-type', '"🔸"')

            cy.get('.text ul li')
                .distance('.text ul', 'left')
                .should('be.equal', 24)
        })

        it('has correctly styled buttons', () => {
            cy.get('.text a.button')
                .should('have.css', 'font-size', '16px')
                .and('have.css', 'line-height', '24px')
                .and('have.css', 'font-weight', '600')
                .and('have.css', 'color', 'rgb(255, 255, 255)')
                .and('have.css', 'background-color', 'rgb(225, 125, 0)')
                .and('contain.css', 'text-decoration', 'none solid rgb(255, 255, 255)')
                .and('have.css', 'padding-top', '8px')
                .and('have.css', 'padding-right', '24px')
                .and('have.css', 'padding-bottom', '8px')
                .and('have.css', 'padding-left', '24px')
                .and('not.have.css', 'border-radius', '0px')

            cy.get('.text a.button svg')
                .rect('width').should('be.equal', 20)
            cy.get('.text a.button svg')
                .rect('height').should('be.equal', 20)
            cy.get('.text a.button svg')
                .should('have.css', 'color', 'rgb(255, 255, 255)')

            cy.get('.text a.button svg')
                .distance('.text a.button span', 'right')
                .should('be.equal', 8)
        })
    })

    context('desktop', () => {
        const vw = 1440
        const vh = 900

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#text1')
        })

        it('has correct vertical padding', () => {
            cy.get('.text h2').parent()
                .distance('.text', 'top')
                .should('be.equal', 128)
            cy.get('.text h3').parent()
                .distance('.text', 'top')
                .should('be.equal', 128)
            cy.get('.text h3').parent()
                .distance('.text', 'bottom')
                .should('be.equal', 128)
        })

        it('is correctly sized and positioned', () => {
            cy.get('.text h2').parent()
                .distance('.text', 'left')
                .should(x => expect(x).to.be.closeTo(75, 15))

            cy.get('.text h3').parent()
                .distance('.text', 'right')
                .should(x => expect(x).to.be.closeTo(75, 15))
        })

        it('has two columns', () => {
            cy.get('.text h2')
                .rect('width').should(x => expect(x).to.be.closeTo(1280 * 0.4, 20))
            cy.get('.text h2')
                .rect('x').should(x => expect(x).to.be.closeTo(80, 20))

            cy.get('.text h3')
                .rect('width').should(x => expect(x).to.be.closeTo(1280 * 0.6, 20))
            cy.get('.text h3')
                .rect('x').should('be.gt', 500)
        })
    })
})
