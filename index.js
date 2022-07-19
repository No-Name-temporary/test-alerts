const { formatBody } = require('./lib/formatBody');
const { sendMail } = require('./lib/sendMail');

exports.handler = async (event) => {
  const emailAddress = event.alerting.alerts[1].address;
  // const { results } = event.results;
  const formattedResults = formatBody(event.results);
  sendMail(emailAddress, formattedResults)
    .then((result) => console.log('sent mail... ', result))
    .catch((err) => console.error(err.message));
};
