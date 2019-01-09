import {
  ConsoleBot,
  LineBot,
  MessengerBot,
  MongoSessionStore,
} from 'bottender';
import { each } from 'lodash';

import config from '../bottender.config';

import generateImage from './generateImage';
import { MONGO_URL } from './database';

export const sessionStore = new MongoSessionStore(MONGO_URL);

const setting = {
  messenger: {
    accessToken: config.messenger.accessToken,
    appSecret: config.messenger.appSecret,
    sessionStore,
  },
  line: {
    ...config.line,
    sessionStore,
  },
  console: {
    fallbackMethods: true,
    mockPlatform: process.env.MOCK_PLATFORM || 'console',
  },
};

const bots =
  process.env.USE_CONSOLE_BOT === 'true'
    ? { consoleBot: new ConsoleBot(setting.console) }
    : {
        messenger: new MessengerBot(setting.messenger),
        line: new LineBot(setting.line),
      };

each(bots, bot => {
  bot.onEvent(async ctx => {
    if (ctx.event.isImage && ctx.platform === 'line') {
      const link = await generateImage({
        lineMessageId: ctx.event.image.id,
        text: 'PRO',
      });
      await ctx.sendImage({ originalContentUrl: link });
    }
  });
});

export default bots;
