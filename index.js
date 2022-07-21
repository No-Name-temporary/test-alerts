const { EmailClient } = require('./entities/EmailClient');
// const { SlackCLient } = require('./entities/SlackClient');
const { getAlertInfo } = require('./lib/db/db_query');

exports.handler = async (event) => {
  const alertChannels = await getAlertInfo(event.title);
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
