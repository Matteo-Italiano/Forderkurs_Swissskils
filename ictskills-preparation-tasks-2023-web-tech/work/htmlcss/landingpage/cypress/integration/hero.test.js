describe('Hero', () => {
    context('mobile', () => {
        const vw = 414
        const vh = 896

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#hero')
        })

        it('is 100% of the viewport\'s height', () => {
            cy.get('.hero')
                .rect('height').should(x => expect(x).to.be.closeTo(vh, 10))
        })

        it('is at the very top', () => {
            cy.get('.hero')
                .rect('y').should(x => expect(x).to.be.equal(0))
        })

        it('has an image', () => {
            cy.get('.hero').find('img').should('be.visible')

            cy.get('.hero').find('img')
                .rect('height').should(x => expect(x).to.be.closeTo(580, 20))
            cy.get('.hero').find('img')
                .rect('width').should(x => expect(x).to.be.closeTo(vw, 20))
            cy.get('.hero').find('img')
                .rect('x').should(x => expect(x).to.be.equal(0))
            cy.get('.hero').find('img')
                .rect('y').should(x => expect(x).to.be.equal(0))
        })

        it('has correctly styled text', () => {
            cy.get('html')
                .should('have.css', 'font-family', '"Open Sans", sans-serif')

            cy.get('.hero').find('h1')
                .should('have.css', 'font-size', '32px')
                .and('have.css', 'line-height', '40px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('.hero').find('p')
                .should('have.css', 'font-size', '16px')
                .and('have.css', 'line-height', '24px')
                .and('have.css', 'font-weight', '400')
                .and('have.css', 'color', 'rgb(51, 51, 51)')
        })

        it('has correctly positioned text', () => {
            cy.get('.hero').find('h1')
                .rect('width').should(x => expect(x).to.be.closeTo(350, 20))
            cy.get('.hero').find('h1')
                .rect('height').should(x => expect(x).to.be.closeTo(40, 10))
            cy.get('.hero').find('h1')
                .rect('x').should(x => expect(x).to.be.closeTo(24, 10))
            cy.get('.hero').find('h1')
                .rect('y').should(x => expect(x).to.be.closeTo(600, 40))

            cy.get('.hero').find('p')
                .rect('width').should(x => expect(x).to.be.closeTo(350, 20))
            cy.get('.hero').find('p')
                .rect('height').should(x => expect(x).to.be.closeTo(130, 20))
            cy.get('.hero').find('p')
                .rect('x').should(x => expect(x).to.be.closeTo(24, 10))
            cy.get('.hero').find('p')
                .rect('y').should(x => expect(x).to.be.closeTo(666, 40))
        })

        it('has a scroll link to the next section', () => {
            cy.get('.hero').find('a')
                .should('be.visible')
                .and('have.css', 'font-size', '16px')
                .and('have.css', 'font-weight', '400')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('.hero').find('a')
                .rect('height').should(x => expect(x).to.be.closeTo(38, 4))
            cy.get('.hero').find('a')
                .rect('y').should(x => expect(x).to.be.closeTo(842, 10))

            cy.get('.hero').find('a span')
                .rect('width').should(x => expect(x).to.be.closeTo(36, 4))
            cy.get('.hero').find('a span')
                .rect('height').should(x => expect(x).to.be.closeTo(18, 4))
            cy.get('.hero').find('a span')
                .rect('x').should(x => expect(x).to.be.closeTo(190, 20))
            cy.get('.hero').find('a span')
                .rect('y').should(x => expect(x).to.be.closeTo(842, 10))

            cy.get('.hero').find('a svg')
                .rect('width').should(x => expect(x).to.be.closeTo(20, 4))
            cy.get('.hero').find('a svg')
                .rect('height').should(x => expect(x).to.be.closeTo(20, 4))
            cy.get('.hero').find('a svg')
                .rect('x').should(x => expect(x).to.be.closeTo(190, 20))
            cy.get('.hero').find('a svg')
                .rect('y').should(x => expect(x).to.be.closeTo(860, 10))
        })
    })

    context('desktop', () => {
        const vw = 1440
        const vh = 900

        beforeEach(() => {
          cy.viewport(vw, vh)

          cy.visit('../../src/task.html#hero')
        })

        it('is 70% of the viewport\'s height', () => {
            cy.get('.hero')
                .rect('height').should(x => expect(x).to.be.closeTo(vh * 0.7, 10))
        })

        it('is at the very top', () => {
            cy.get('.hero')
                .rect('y').should(x => expect(x).to.be.equal(0))
        })

        it('has a background image', () => {
            cy.get('.hero').find('img').should('be.visible')

            cy.get('.hero').find('img')
                .rect('height').should(x => expect(x).to.be.closeTo(vh * 0.7, 10))
            cy.get('.hero').find('img')
                .rect('width').should(x => expect(x).to.be.closeTo(vw, 20))
            cy.get('.hero').find('img')
                .rect('x').should(x => expect(x).to.be.equal(0))
            cy.get('.hero').find('img')
                .rect('y').should(x => expect(x).to.be.equal(0))
        })

        it('has a gradient and blur overlay over the image', () => {
            cy.get('.hero').find('img')
                .should('have.css', 'filter', 'blur(4px)')

            cy.get('.hero')
                .then($els => {
                    const window = $els[0].ownerDocument.defaultView
                    const after = window.getComputedStyle($els[0], 'after')

                    expect(after.getPropertyValue('content'))
                        .to.be.equal('""')
                    expect(parseInt(after.getPropertyValue('width')))
                        .to.be.closeTo(vw, 20)
                    expect(parseInt(after.getPropertyValue('height')))
                        .to.be.closeTo(vh * 0.7, 10)
                    expect(after.getPropertyValue('background'))
                        .to.contain(
                            'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%)'
                        )
                })
        })

        it('has correctly styled text', () => {
            cy.get('.hero').find('h1')
                .should('have.css', 'font-size', '56px')
                .and('have.css', 'line-height', '70px')
                .and('have.css', 'font-weight', '800')
                .and('have.css', 'color', 'rgb(51, 51, 51)')

            cy.get('.hero').find('p')
                .should('have.css', 'font-size', '24px')
                .and('have.css', 'line-height', '36px')
                .and('have.css', 'font-weight', '400')
                .and('have.css', 'color', 'rgb(51, 51, 51)')
        })

        it('has correctly positioned text', () => {
            cy.get('.hero').find('h1')
                .rect('width').should(x => expect(x).to.be.closeTo(1280, 20))
            cy.get('.hero').find('h1')
                .rect('height').should(x => expect(x).to.be.closeTo(80, 20))
            cy.get('.hero').find('h1')
                .rect('x').should(x => expect(x).to.be.closeTo(80, 20))
            cy.get('.hero').find('h1')
                .rect('y').should(x => expect(x).to.be.closeTo(390, 40))

            cy.get('.hero').find('p')
                .rect('width').should(x => expect(x).to.be.closeTo(1024, 20))
            cy.get('.hero').find('p')
                .rect('height').should(x => expect(x).to.be.closeTo(108, 10))
            cy.get('.hero').find('p')
                .rect('x').should(x => expect(x).to.be.closeTo(80, 20))
            cy.get('.hero').find('p')
                .rect('y').should(x => expect(x).to.be.closeTo(490, 40))
        })

        it('does not have a scroll link to the next section', () => {
            cy.get('.hero').find('a')
                .should('not.be.visible')
        })
    })
})
