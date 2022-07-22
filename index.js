const { EmailClient } = require('./entities/EmailClient');
const { SlackClient } = require('./entities/SlackClient');
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
        targets.push(new SlackClient(target.destination, event));
        break;
      default:
        console.log('Unrecognized channel type: ', target.type);
    }
  });

  targets.forEach((target) => target.send());
};
