import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

import axios from 'axios';

import invariant from 'invariant';
import tmp from 'tmp';

import gm from './gm';

const imgurAxios = axios.create({
  baseURL: 'https://api.imgur.com/3',
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_Client_ID}`,
  },
});

const lineAxios = axios.create({
  baseURL: 'https://api.line.me/v2/bot/message/',
  headers: {
    Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
  },
});

export default async function generateDoctorProfile(messageId, text) {
  const _tmp = tmp.dirSync({ unsafeCleanup: true });

  try {
    const { data } = await lineAxios.get(`${messageId}/content`, {
      responseType: 'arraybuffer',
    });

    invariant(process.env.FONT_PATH, 'FONT_PATH is not in process.env');

    fs.writeFileSync(`${_tmp.name}/tmp.png`, data);

    await gm()
      .in(`${_tmp.name}/tmp.png`)
      .resize(230, 230)
      .write(`${_tmp.name}/tmp_avatar_resized.png`);

    const buffer = await gm()
      .encoding('Unicode')
      .in('-page', '+0+0')
      .in(`${_tmp.name}/tmp_avatar_resized.png`)
      .fill('#6f42c1')
      .drawRectangle(0, 160, 230, 230)
      .mosaic()
      .font(process.env.FONT_PATH, 50)
      .fill('#ffffff')
      .drawText(0, 75, `${text}`, 'Center')
      .toBuffer('PNG'); // or
    //.write(path.join(__dirname, `./output/profile.png`));

    const {
      data: {
        data: { link },
      },
    } = await imgurAxios.post('/image', buffer);

    return link;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`error occor when generating picture `, err.message);
  }
}
