const config = require('@skills17/karma-helpers');

module.exports = config({
  frameworks: ['mocha', 'chai'],
  plugins: ['karma-mocha', 'karma-chai', 'karma-chrome-launcher'],
});
