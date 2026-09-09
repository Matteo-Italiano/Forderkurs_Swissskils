describe('People', () => {
    context('mobile', () => {
        const vw = 414
        const vh = 896

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#people')
        })

        it('has correct vertical padding', () => {
            cy.get('.people h2')
                .distance('.people', 'top')
                .should('be.equal', 96)
            cy.get('.people h2 + div')
                .distance('.people', 'bottom')
                .should('be.equal', 96)
        })

        it('has a colored background', () => {
            cy.get('.people')
                .should('have.css', 'background-color', 'rgb(252, 242, 230)')
        })

        it('has correct heading spacing', () => {
            cy.get('.people h2')
                .distance('.people h2 + div', 'top')
                .should('be.equal', 32)
        })

        it('has correctly positioned cards', () => {
            for (let i = 0; i < 6; i++) {
                cy.get(`.people .card:nth-child(${i + 1})`)
                    .rect('x').should(x => expect(x).to.be.closeTo(
                        (i + 1) * 24 + i * 290, i * 20
                    ))
            }
        })

        it('scrolls horizontally', () => {
            cy.get('.people .card').parent()
                .should('have.css', 'overflow-x', 'auto')

            cy.get('.people .card').parent()
                .rect('height').should(x => expect(x).to.be.closeTo(310, 20))

            cy.get('.people .card:first-child')
                .rect('x').should(x => expect(x).to.be.closeTo(24, 10))
            cy.get('.people .card:nth-child(2)')
                .rect('x').should(x => expect(x).to.be.closeTo(314, 40))
            cy.get('.people .card:last-child')
                .rect('x').should('be.gt', vw)

            cy.get('.people .card:nth-child(2)')
                .scrollIntoView()
                .wait(500)

            cy.get('.people .card:nth-child(2)')
                .rect('x').should('be.lt', 290)
        })

        it('snaps to the cards when scrolling horizontally', () => {
            cy.get('.people .card:nth-child(2)')
                .rect('x').should(x => expect(x).to.be.closeTo(314, 40))

            cy.get('.people .card:nth-child(2)')
                .scrollIntoView()
                .wait(500)

            cy.get('.people .card:nth-child(2)')
                .rect('x').should(x => expect(x).to.be.closeTo(24, 10))
        })
    })

    context('desktop', () => {
        const vw = 1440
        const vh = 900

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#people')
        })

        it('has correct vertical padding', () => {
            cy.get('.people h2')
                .distance('.people', 'top')
                .should('be.equal', 128)
            cy.get('.people h2 + div')
                .distance('.people', 'bottom')
                .should('be.equal', 128)
        })

        it('has correct heading spacing', () => {
            cy.get('.people h2')
                .distance('.people h2 + div', 'top')
                .should('be.equal', 32)
        })

        it('has correctly positioned card wrapper', () => {
            cy.get('.people h2')
                .distance('body', 'left')
                .should(x => expect(x).to.be.closeTo(75, 15))
            cy.get('.people h2')
                .distance('body', 'right')
                .should(x => expect(x).to.be.closeTo(75, 15))
        })

        it('has correctly positioned cards', () => {
            cy.get('.people .card')
                .rect('width')
                .then(width => expect(width).to.be.closeTo(290, 40))

            for (let i = 0; i < 4; i++) {
                cy.get(`.people .card:nth-child(${i + 1})`)
                    .distance('body', 'left')
                    .should(x => expect(x).to.be.closeTo(
                        75 + i * 24 + i * 290, 15 + i * 20
                    ))
            }

            for (let i = 0; i < 2; i++) {
                cy.get(`.people .card:nth-child(${i + 5})`)
                    .distance('body', 'left')
                    .should(x => expect(x).to.be.closeTo(
                        75 + i * 24 + i * 290, 15 + i * 20
                    ))
                cy.get(`.people .card:nth-child(${i + 5})`)
                    .distance('.people .card:first-child', 'bottom')
                    .should('be.equal', 24)
            }
        })

        // it('has a hover effect on the cards', () => {
        //     cy.get('.people .card:first-child')
        //         .should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px')
        //         .hover()
        //         .should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px')
        // })
    })
})
