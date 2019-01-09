// This is the local testing function, directly call the generating function if needed
// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');
require('dotenv').config();

const generateImage = require('./generateImage').default;

process.on('unhandledRejection', (e, p) => {
  /* eslint-disable no-console */
  console.error(e);
  console.log(p);
  process.exit(1);
});

async function draw() {
  /* eslint-enable no-console */
  console.log(await generateImage({ text: 'PRO' }));
}

draw();
