require('dotenv').config();

module.exports = {
  line: {
    accessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    shouldBatch: true,
    sendMethod: 'reply',
    origin: process.env.LINE_ORIGIN || 'https://api.line.me',
  },
  messenger: {
    accessToken: process.env.MESSENGER_ACCESS_TOKEN,
    appSecret: process.env.MESSENGER_APP_SECRET,
    verifyToken: process.env.VERIFY_TOKEN,
    appId: process.env.APP_ID,
    profile: {
      get_started: { payload: '__GET_STARTED__' },
    },
    fields: [
      'messages',
      'messaging_postbacks',
      'messaging_referrals',
      'messaging_handovers',
    ],
  },
};
