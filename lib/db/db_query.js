const { dbQuery } = require('./db_conn');

async function getAlertInfo(testId) {
  const query = `
    SELECT t.test_id, a.type, a.destination 
    FROM alerts as a
    INNER JOIN tests_alerts as t
        ON t.alerts_id = a.id
    WHERE t.test_id = $1;
  `;

  const result = await dbQuery(query, testId);
  return result.rows;
}

async function getTestId(testTitle) {
  const query = `
    SELECT id 
    FROM tests
    WHERE name = $1
  `;

  const result = await dbQuery(query, testTitle);
  return result.rows[0];
}

module.exports = {
  getAlertInfo,
  getTestId,
};
