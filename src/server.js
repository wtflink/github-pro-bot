import { createServer } from 'bottender/koa';

import bots from './bots';

const server = createServer(bots.line);

export default server;
