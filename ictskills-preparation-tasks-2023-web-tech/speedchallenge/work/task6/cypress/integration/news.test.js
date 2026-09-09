describe('SkillNews', () => {
  before(() => {
    cy.visit('/src/index.html');
  });

  it('Header logo is as specified', () => {
    /**
     * Mobile test
     */
    cy.log('--------------------------');
    cy.log('       Mobile test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(411, 731);
    cy.get('header').should('be.visible').scrollIntoView();

    // logo should be right of the site title
    cy.get('header h1 svg').rect('left').then((logoLeft) => {
      cy.get('header h1 div').rect('right').then((textRight) => {
        expect(logoLeft).to.be.closeTo(textRight + 10, 3, 'expected the logo to be right of the text');
      });
    });

    // header should still have the correct height
    cy.get('header').rect('height').should('be.closeTo', 71, 3);

    // -----------------------------------------------------------------------------------------

    /**
     * Desktop test
     */
    cy.log('--------------------------');
    cy.log('       Desktop test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(1000, 731);
    cy.get('header').should('be.visible').scrollIntoView();

    // logo should be left of the site title
    cy.get('header h1 svg').rect('right').then((logoRight) => {
      cy.get('header h1 div').rect('left').then((textLeft) => {
        expect(textLeft).to.be.closeTo(logoRight + 10, 3, 'expected the logo to be right of the text');
      });
    });

    // header should still have the correct height
    cy.get('header').rect('height').should('be.closeTo', 71, 3);
  });

  it('Header language switch is as specified', () => {
    /**
     * Mobile test
     */
    cy.log('--------------------------');
    cy.log('       Mobile test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(411, 731);
    cy.get('header').should('be.visible').scrollIntoView();

    // only selected language should be visible
    cy.get('header ul li.selected').should('be.visible');
    cy.get('header ul li:not(.selected)').should('not.be.visible');

    // header should still have the correct height
    cy.get('header').rect('height').should('be.closeTo', 71, 3);

    // -----------------------------------------------------------------------------------------

    /**
     * Desktop test
     */
    cy.log('--------------------------');
    cy.log('       Desktop test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(1000, 731);
    cy.get('header').should('be.visible').scrollIntoView();

    // all languages should be visible
    cy.get('header ul li').should('be.visible');

    // languages should be next to each other
    cy.get('header ul li:nth-child(1)').rect('right').then((deRight) => {
      cy.get('header ul li:nth-child(2)').rect('left').then((frLeft) => {
        cy.get('header ul li:nth-child(2)').rect('right').then((frRight) => {
          cy.get('header ul li:nth-child(3)').rect('left').then((itLeft) => {
            expect(frLeft).to.be.closeTo(deRight + 10, 3, 'expected FR to be right of DE');
            expect(itLeft).to.be.closeTo(frRight + 10, 3, 'expected IT to be right of FR');
          });
        });
      });
    });

    // languages should be on the same line
    cy.get('header ul li:nth-child(1)').rect('top').then((deTop) => {
      cy.get('header ul li:nth-child(2)').rect('top').then((frTop) => {
        cy.get('header ul li:nth-child(3)').rect('top').then((itTop) => {
          expect(deTop).to.be.closeTo(frTop, 3, 'expected DE to be on the same line as FR');
          expect(frTop).to.be.closeTo(itTop, 3, 'expected FR to be on the same line as IT');
        });
      });
    });

    // header should still have the correct height
    cy.get('header').rect('height').should('be.closeTo', 71, 3);
  });

  it('Featured news is as specified', () => {
    /**
     * Mobile test
     */
    cy.log('--------------------------');
    cy.log('       Mobile test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(411, 731);
    cy.get('.featured').should('be.visible').scrollIntoView();

    // text preview is not visible
    cy.get('.featured .news .text p').should('not.be.visible');

    // -----------------------------------------------------------------------------------------

    /**
     * Desktop test
     */
    cy.log('--------------------------');
    cy.log('       Desktop test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(1000, 731);
    cy.get('.featured').should('be.visible').scrollIntoView();

    // text preview is visible
    cy.get('.featured .news .text p').should('be.visible');
  });

  it('Teaser news is as specified', () => {
    /**
     * Mobile test
     */
    cy.log('--------------------------');
    cy.log('       Mobile test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(411, 731);
    cy.get('.teasers').should('be.visible').scrollIntoView();

    for (let i = 1; i <= 6; i++) {
      // all teasers should have the same size and left & right position
      cy.get(`.teasers .news:nth-child(${i})`).rect('left').then((left) => {
        cy.get(`.teasers .news:nth-child(${i})`).rect('width').then((width) => {
          cy.get(`.teasers .news:nth-child(${i})`).rect('height').then((height) => {
            expect(left).to.be.closeTo(20, 3, 'expected news to spawn the whole width');
            expect(width).to.be.closeTo(356, 40, 'expected news to spawn the whole width');
            expect(height).to.be.closeTo(200, 5, 'expected news to have a height of 200');
          });
        });
      });

      // text should be over the image
      cy.get(`.teasers .news:nth-child(${i}) img`).rect('bottom').then((imageBottom) => {
        cy.get(`.teasers .news:nth-child(${i}) .text h2`).rect('bottom').then((textBottom) => {
          expect(textBottom).to.be.closeTo(imageBottom - 20, 10, 'expected text to be over the image');
        });
      });

      // check colors
      cy.get(`.teasers .news:nth-child(${i}) .text h2`).should('have.css', 'color', 'rgb(239, 239, 239)');
      cy.get(`.teasers .news:nth-child(${i}) .text h2`).should('have.css', 'background-color', 'rgb(45, 55, 72)');
    }

    // -----------------------------------------------------------------------------------------

    /**
     * Desktop test
     */
    cy.log('--------------------------');
    cy.log('       Desktop test');
    cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
    cy.viewport(1000, 731);
    cy.get('.teasers').should('be.visible').scrollIntoView();

    // check first row
    cy.get('.teasers .news:nth-child(1)').rect('top').then((top1) => {
      cy.get('.teasers .news:nth-child(2)').rect('top').then((top2) => {
        cy.get('.teasers .news:nth-child(3)').rect('top').then((top3) => {
          expect(top1).to.be.closeTo(top2, 3, 'expected first three news to be in the same row');
          expect(top2).to.be.closeTo(top3, 3, 'expected first three news to be in the same row');
        });
      });
    });
    cy.get('.teasers .news:nth-child(1)').rect('left').then((left1) => {
      expect(left1).to.be.closeTo(20, 10, 'expected first news to be at the left');
    });
    cy.get('.teasers .news:nth-child(2)').rect('left').then((left2) => {
      expect(left2).to.be.closeTo(341, 60, 'expected second news to be right of the first one');
    });
    cy.get('.teasers .news:nth-child(3)').rect('left').then((left3) => {
      expect(left3).to.be.closeTo(663, 30, 'expected third news to be right of the second one');
    });

    // check second row
    cy.get('.teasers .news:nth-child(4)').rect('top').then((top4) => {
      cy.get('.teasers .news:nth-child(5)').rect('top').then((top5) => {
        cy.get('.teasers .news:nth-child(6)').rect('top').then((top6) => {
          expect(top4).to.be.closeTo(top5, 3, 'expected second three news to be in the same row');
          expect(top5).to.be.closeTo(top6, 3, 'expected second three news to be in the same row');
        });
      });
    });
    cy.get('.teasers .news:nth-child(4)').rect('left').then((left4) => {
      expect(left4).to.be.closeTo(20, 10, 'expected fourth news to be at the left');
    });
    cy.get('.teasers .news:nth-child(5)').rect('left').then((left5) => {
      expect(left5).to.be.closeTo(341, 60, 'expected fifth news to be right of the fourth one');
    });
    cy.get('.teasers .news:nth-child(6)').rect('left').then((left6) => {
      expect(left6).to.be.closeTo(663, 30, 'expected sixth news to be right of the fifth one');
    });

    for (let i = 1; i <= 6; i++) {
      // text should be below image
      cy.get(`.teasers .news:nth-child(${i}) img`).rect('bottom').then((imageBottom) => {
        cy.get(`.teasers .news:nth-child(${i}) .text h2`).rect('top').then((textBottom) => {
          expect(textBottom).to.be.closeTo(imageBottom + 20, 10, 'expected text to be below the image');
        });
      });
    }

    // check colors
    cy.get(`.teasers .news .text h2`).should('have.css', 'color', 'rgb(45, 55, 72)');
    cy.get(`.teasers .news .text h2`).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
  });
});
