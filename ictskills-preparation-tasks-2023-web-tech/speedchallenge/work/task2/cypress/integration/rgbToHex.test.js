const rgbToHex = require('../../src/rgbToHex');

describe('Rgb to hex', () => {
  let results;

  beforeEach(() => {
    cy.visit('/test.html');

    results = [[], [], []];

    // set all colors
    [1, 2, 3].forEach((testId) => {
      cy.get(`.test-${testId}`).then(($test) => {
        const [r, g, b] = $test.data('rgb').split(',').map((x) => parseInt(x, 10));
        $test.find('.expected .color').css('background-color', `rgb(${r}, ${g}, ${b})`);
        $test.find('.expected .label').text(`rgb(${r}, ${g}, ${b})`);

        const hex = rgbToHex(r, g, b).toLowerCase();
        const hexExpected = $test.data('hex');
        $test.find('.actual .color').css('background-color', hex);
        $test.find('.actual .label').html(`${hex}<br />(expected: ${hexExpected})`);

        results[testId - 1] = [hex, hexExpected];
      });
    });
  });

  it('converts rgb colors to hex', () => {
    // check if they match
    results.forEach((result) => {
      expect(result[0]).to.be.be.a('string');
      expect(result[1]).to.be.be.a('string');
      expect(result[0]).to.equal(result[1]);
    });
  });
});
