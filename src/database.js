import monk from 'monk';

export const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/github-pro-bot';

export default monk(MONGO_URL);
