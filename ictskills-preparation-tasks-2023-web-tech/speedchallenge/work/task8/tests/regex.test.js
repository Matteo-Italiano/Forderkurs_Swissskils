describe('Regex', () => {

  // merge original regex with the competitors solution
  const mergedRegex = regexOriginal.solutions.map((original, i) => ({
    ...original,
    regex: regex.solutions.length > i ? regex.solutions[i].regex : undefined,
  }));

  for (let i = 1; i < mergedRegex.length; i++) {
    const solution = mergedRegex[i];

    it(`Regex ${i} - ${solution.description}`, () => {
      // Test if regex is defined
      if (!solution.regex) {
        throw new Error('No regex defined.');
      }

      // Test if regex is short enough
      if (solution.regex.source.length > solution.maxLength) {
        const oversize = (solution.regex.source.length - solution.maxLength);
        throw new Error(`Regex is ${oversize} characters too long. Try to shorten it.`);
      }

      // Compute results
      const results = mapRegexMatch(true, solution.matches, solution.regex)
        .concat(mapRegexMatch(false, solution.skip, solution.regex));

      // Test not all are matching
      if (!results.every(result => result.success)) {
        let errorString = 'Regex is incorrect.';
        errorString += reportShouldMatch(results);
        errorString += reportShouldNotMatch(results);
        errorString += `\n`;
        throw new Error(errorString);
      }
    });
  }
});
