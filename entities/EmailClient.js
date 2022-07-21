const { formatBody } = require('../lib/utilities/formatBody');
const { sendMail } = require('../lib/channels/sendMail');

class EmailClient {
  constructor(destination, results) {
    this.destination = destination;
    this.message = formatBody(results);
  }

  async send() {
    const result = await sendMail(this.destination, this.message);
    console.log('send email result: ', result);
    return result;
  }
}

module.exports = {
  EmailClient,
};
