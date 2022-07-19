const formatBody = (results) => {
  let output = `<h3>Test: ${results.title}</h3>\n`;

  results.results.forEach((result) => {
    if (!result.success) {
      const string = `FAILED: Assertion Type: ${result.assertionType}\nTarget: ${result.comparisonType} ${result.targetValue}\nActual: ${result.actualValue}\n<br />`;
      output += string;
    }
  });
  return `<p>${output}</p>`;
};

module.exports = {
  formatBody,
};
