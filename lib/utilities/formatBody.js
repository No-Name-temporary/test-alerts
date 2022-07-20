const formatBody = (results) => {
  let output = `<p>TEST: <strong>${results.title}</strong><br> REGION: <strong>${results.sender}</strong></p>\n`;

  results.results.forEach((result) => {
    if (!result.success) {
      const string = `FAILED: Assertion Type: ${result.assertionType}\nTarget: ${result.comparisonType} ${result.targetValue}\nActual: ${result.actualValue}\n<br>`;
      output += string;
    }
  });
  return `<p>${output}</p>`;
};

module.exports = {
  formatBody,
};
