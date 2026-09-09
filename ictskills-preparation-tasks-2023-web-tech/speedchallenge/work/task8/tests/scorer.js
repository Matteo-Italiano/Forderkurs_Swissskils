const mapRegexMatch = (shouldMatch, strings, regex) => {
  if (!strings) {
    return [];
  }

  if (!Array.isArray(strings)) {
    return Object.keys(strings).map(key => {
      const result = regex.exec(key);

      return {
        string: `${key}: ${strings[key]}`,
        shouldMatch,
        success: !strings[key] || (result && result[1] === strings[key])
      };
    });
  }

  return strings.map(string => ({
    string,
    shouldMatch,
    success: regex.test(string) ? shouldMatch : !shouldMatch
  }));
}

const reportShouldMatch = (results) => {
  let matchString = '';

  if (results.some(result => result.shouldMatch && !result.success)) {
    matchString += `\n\nYour regex should match the following strings:`;
    results.filter(result => result.shouldMatch)
      .filter(result => !result.success)
      .forEach(result => matchString += `\n  ${result.string}`);
  }

  return matchString;
}

const reportShouldNotMatch = (results) => {
  let matchString = '';

  if (results.some(result => !result.shouldMatch && !result.success)) {
    matchString += `\n\nYour regex should not match the following strings:`;
    results.filter(result => !result.shouldMatch)
      .filter(result => !result.success)
      .forEach(result => matchString += `\n  ${result.string}`);
  }

  return matchString;
}
