import { createServer } from 'bottender/koa';

import config from '../bottender.config';

import bots from './bot';
import db from './database';

const server = createServer(bots.line);

export default server;
