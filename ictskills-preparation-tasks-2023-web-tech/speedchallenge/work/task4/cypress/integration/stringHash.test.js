const stringHash = require('../../src/stringHash');

describe('String hash', () => {
  let results;

  beforeEach(() => {
    cy.visit('/test.html');

    results = [[], [], []];

    // set all colors
    [1, 2, 3].forEach((testId) => {
      cy.get(`.test-${testId}`).then(($test) => {
        const string = `${$test.data('string')}`;
        $test.find('.string').text(string);

        const [h, s, l] = stringHash(string);
        const hslString = `hsl(${h}, ${s}%, ${l}%)`;
        const [eH, eS, eL] = $test.data('hsl').split(',').map((x) => parseInt(x, 10));
        $test.find('.actual .color').css('background-color', hslString);
        $test.find('.actual .label').html(`${hslString}<br />(expected: ${eH}, ${eS}%, ${eL}%)`);

        results[testId - 1] = [[h, s, l], [eH, eS, eL], string];
      });
    });
  });

  it('calculates the H value correctly', () => {
    // check if they match
    results.forEach((result, i) => {
      cy.log(`Test ${i + 1}: ${result[2]}`).then(() => {
        expect(result[0][0]).to.be.be.a('number');
        expect(result[1][0]).to.be.be.a('number');
        expect(result[0][0]).to.equal(result[1][0]);
      });
    });
  });

  it('calculates the S value correctly', () => {
    // check if they match
    results.forEach((result, i) => {
      cy.log(`Test ${i + 1}: ${result[2]}`).then(() => {
        expect(result[0][1]).to.be.be.a('number');
        expect(result[1][1]).to.be.be.a('number');
        expect(result[0][1]).to.equal(result[1][1]);
      });
    });
  });

  it('calculates the L value correctly', () => {
    // check if they match
    results.forEach((result, i) => {
      cy.log(`Test ${i + 1}: ${result[2]}`).then(() => {
        expect(result[0][2]).to.be.be.a('number');
        expect(result[1][2]).to.be.be.a('number');
        expect(result[0][2]).to.equal(result[1][2]);
      });
    });
  });
});
