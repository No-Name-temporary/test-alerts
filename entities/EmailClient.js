const { formatBody } = require('../lib/utilities/formatBody');
// const { sendMail } = require('../lib/channels/sendMail');
const { sendSES } = require('../lib/channels/sendSES');

class EmailClient {
  constructor(destination, results) {
    this.destination = destination;
    this.message = formatBody(results);
  }

  async send() {
    const result = await sendSES(this.destination, this.message);
    console.log('send email result: ', result);
    return result;
  }
}

module.exports = {
  EmailClient,
};
