const { EmailClient } = require('./entities/EmailClient');
// const { SlackCLient } = require('./entities/SlackClient');
const { getAlertInfo, getTestId } = require('./lib/db/db_query');
require('dotenv').config();

exports.handler = async (event) => {
  const { id: testId } = await getTestId(event.title);
  const alertChannels = await getAlertInfo(testId);

  const targets = [];

  alertChannels.forEach((target) => {
    switch (target.type) {
      case 'email':
        targets.push(new EmailClient(target.destination, event));
        break;
      case 'slack':
        console.log('slack implementaiton pending...');
        // targets.push(new SlackCLient(target));
        break;
      default:
        targets.push({ error: 'Unrecognized channel type' });
    }
  });

  targets.forEach((target) => target.send());
};
